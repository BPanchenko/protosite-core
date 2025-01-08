import checkTruth from '#library/fn.checkTruth.js'
import initShadowRoot from '#library/fn.initShadowRoot.js'
import updateAttributes from '#library/fn.updateAttributes.js'

import type { FormAssociatedCustomElement } from '#types'
import type {
	Option,
	OptionCollection,
	OptionRef,
	SearchResult,
} from './types.js'

export type { Option }

export class ListboxElement
	extends HTMLElement
	implements FormAssociatedCustomElement {
	#internals: ElementInternals = this.attachInternals()
	#index: number
	#options: OptionCollection = new Map()

	#focusCont: AbortController
	#interCont: AbortController
	#slotChangeCont: AbortController

	static formAssociated = true
	static role = 'listbox'
	static tagName = 'e-listbox'

	static observedAttributes = [
		'aria-disabled',
		'aria-multiselectable',
		'aria-required',
		'name',
		'value',
	]

	static initAttributes($element: ListboxElement) {
		const data = {
			'aria-orientation': $element.ariaOrientation ?? 'vertical',
			id: $element.id,
			role: this.role,
		}

		// [id]

		if ($element.isConnected && false === Boolean(data.id)) {
			data.id = [this.role, Math.round(performance.now())].join('-')
		}

		return updateAttributes($element, data)
	}

	static initAttributesForOption($element: Option['$element']) {
		const data = {
			'aria-selected': $element.ariaSelected ?? 'false',
			id: $element.id,
		}

		// [id]

		if (false === Boolean(data.id)) {
			data.id = [$element.role, Math.round(performance.now())].join('-')
		}
	}

	constructor() {
		super()
		initShadowRoot.call(this, {
			template: '<slot></slot>',
		})
		ListboxElement.initAttributes(this)
		this.#listenAssignedNodes()
	}

	attributeChangedCallback(name, previous, current) {
		if (false === this.isConnected) return
		if (previous === current) return

		const isTruth_ = checkTruth(current)

		switch (name) {
			case 'aria-disabled':
				break
			case 'aria-multiselectable':
				break
			case 'aria-required':
				break
			case 'name':
				break
			case 'value':
				break
			default:
		}
	}

	connectedCallback() {
		ListboxElement.initAttributes(this)
		this.#listenFocus()
	}

	disconnectedCallback() {
		this.#interCont?.abort()
		this.#focusCont?.abort()
		this.#slotChangeCont?.abort()
	}

	formAssociatedCallback(form_) { }
	formDisabledCallback(state_) { }
	formResetCallback() { }
	formStateRestoreCallback(state_, reason_) { }

	shift(offset: number): HTMLElement {
		const updated =
			(((this.#index + offset) % this.size) + this.size) % this.size
		return (this.activeElement = this.options[updated].$element)
	}

	/**
	 * Сall will find the first option wich value is fully equal to the query string.
	 */
	getByID(query: string): SearchResult {
		for (const [$ref, option] of this.#options) {
			if (query === option.$element.id)
				return {
					$ref,
					option,
				}
		}
		return null
	}

	/**
	 * Сall will find the first option wich value is fully equal to the query string.
	 */
	findByValue(query: string): SearchResult {
		for (const [$ref, option] of this.#options) {
			if (query === option.value)
				return {
					$ref,
					option,
				}
		}
		return null
	}

	/**
	 * Сall returns the first option for wich the query string is started substring of the label or value option.
	 */
	search(query: string): SearchResult {
		for (const [$ref, option] of this.#options)
			if (
				0 === option.label.indexOf(query) ||
				0 === option.value.indexOf(query)
			)
				return {
					$ref,
					option,
				}
		return null
	}

	select(value: HTMLElement | OptionRef | string): boolean {
		let $element: HTMLElement = null

		if (value instanceof HTMLElement) $element = value
		else if (value instanceof WeakRef)
			$element = this.#options.get(value)?.$element
		else if (typeof value === 'string')
			$element = this.getByID(value)?.option.$element

		if ($element !== null) {
			if (this.multiple === false) this.unselect()
			return this.#selectElement($element)
		} else return false
	}

	unselect($element?: HTMLElement): boolean {
		const $$selected =
			$element instanceof HTMLElement ? [$element] : this.selectedElements
		if ($$selected.length > 0) {
			$$selected.forEach(($element) =>
				$element.setAttribute('aria-selected', 'false'),
			)
			return true
		} else return false
	}

	get activeElement(): HTMLElement | null {
		// @ts-ignore
		return this.#internals.ariaActiveDescendantElement
	}

	set activeElement($element: HTMLElement | null) {
		// @ts-ignore
		this.#internals.ariaActiveDescendant = $element?.id
		// @ts-ignore
		this.#internals.ariaActiveDescendantElement = $element
	}

	get multiple(): boolean {
		return checkTruth(this.ariaMultiSelectable)
	}

	get options(): Option[] {
		return Array.from(this.#options.values())
	}

	get selectedElements(): Option[] {
		const $$elements = []
		for (const { $element } of this.#options.values())
			if (checkTruth($element.ariaSelected)) $$elements.push($element)
		return $$elements
	}

	get size(): number {
		return this.#options.size
	}

	#listenAssignedNodes(): AbortController {
		this.#slotChangeCont?.abort()
		this.#slotChangeCont = new AbortController()

		const list = this.#options

		const normalize = (data: OptionCollection) =>
			data.forEach(({ $element }, $ref, data) => {
				if ($element.isConnected && $element.parentElement === this)
					ListboxElement.initAttributesForOption($element)
				else data.delete($ref)
			})

		this.addEventListener(
			'slotchange',
			(event) => {
				const $$elements = (
					event.target as HTMLSlotElement
				).assignedElements({ flatten: true }) as HTMLOptionElement[]

				$$elements
					.filter(
						($element) =>
							$element.hasAttribute('role') &&
							$element.role === 'option',
					)
					.forEach(($element, index) => {
						const $ref = new WeakRef($element)
						const label = $element.ariaLabel || $element.textContent
						list.set($ref, {
							$element,
							label,
							value:
								$element.getAttribute('value') ||
								$element.dataset.value ||
								$element.value ||
								label,
							index,
						})
					})

				normalize(list)
			},
			{
				signal: this.#slotChangeCont.signal,
			},
		)

		return this.#slotChangeCont
	}

	#listenFocus() {
		this.#focusCont?.abort()
		this.#focusCont = new AbortController()

		const options = {
			signal: this.#focusCont.signal,
		}

		this.addEventListener('focus', (event_) => this.#onFocus(), options)
		this.addEventListener('blur', (event_) => this.#onBlur(), options)

		this.addEventListener(
			'slotchange',
			(event) => console.log('slotchange', event),
			options,
		)

		return this.#focusCont
	}

	#onBlur(): void {
		this.#interCont?.abort()
	}

	#onFocus(): void {
		this.#listenInteraction()
	}

	#listenInteraction(): AbortController {
		this.#interCont?.abort()
		this.#interCont = new AbortController()

		const options = {
			capture: false,
			passive: false,
			signal: this.#interCont.signal,
		}

		this.addEventListener('click', (event) => this.#onClick(event), options)
		this.addEventListener(
			'keydown',
			(event) => this.#onKeyPress(event),
			options,
		)

		return this.#interCont
	}

	#onClick(event): void {
		console.info('Listbox.onClick')
		console.dir(event)
	}

	#onKeyPress(event): void {
		const { key } = event

		switch (key) {
			case 'Enter':
				this.select(this.activeElement)
				break
			case 'End':
				this.options[this.size - 1].$element.focus()
				break
			case 'Home':
				this.options[0].$element.focus()
				break
			case 'ArrowUp':
				break
			case 'ArrowDown':
				break
			default:
				if (/\w+/.test(key)) {
					// TODO
				}
		}
	}

	#selectElement($element?: HTMLElement) {
		if ($element instanceof HTMLElement) {
			$element.setAttribute('aria-selected', 'true')
			return true
		} else return false
	}
}

customElements.define(ListboxElement.tagName, ListboxElement)
export default customElements.get(ListboxElement.tagName)
