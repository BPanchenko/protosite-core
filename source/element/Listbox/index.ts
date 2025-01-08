import checkFalsy from '#library/fn.checkFalsy'
import checkTruth from '#library/fn.checkTruth'
import updateAttributes from '#library/fn.updateAttributes'

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
	 * Returns an Element object representing the element whose id property matches the specified string.
	 * @todo Check requirements for returned result
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
	 * Returns an first option wich value is fully equal to the query string.
	 * @todo Check requirements for returned result
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
	 * Сall returns array of options for wich the query string is started substring of the label or value option.
	 * @todo Check requirements for returned result
	 */
	search(query: string) {
		const result = new Set<SearchResult>()
		for (const [$ref, option] of this.#options)
			if (
				0 === option.label?.indexOf(query) ||
				0 === option.value?.indexOf(query)
			)
				result.add({
					$ref,
					option,
				})
		return result.size > 0 ? result : null
	}

	select($element: HTMLElement | null): boolean
	select(identifier: string): boolean
	select($ref: OptionRef): boolean
	select(listitem: unknown): boolean {
		let $element: HTMLElement | null = null

		if (listitem instanceof HTMLElement) $element = listitem
		else if (listitem instanceof WeakRef) $element = listitem.deref()
		else if (typeof listitem === 'string') {
			const searchResult = this.getByID(listitem)
			if (searchResult !== null) $element = searchResult.option.$element
		}

		if ($element !== null) {
			if (this.multiple === false) this.unselect()
			return this.#selectElement($element)
		} else return false
	}

	unselect($element?: HTMLElement): boolean {
		const $$selected =
			$element instanceof HTMLElement
				? new Set([$element])
				: this.selectedElements
		if ($$selected.size > 0) {
			$$selected.forEach(($element) =>
				$element.setAttribute('aria-selected', 'false'),
			)
			return true
		} else return false
	}

	#selectElement($element?: Option['$element']) {
		if ($element !== undefined) {
			const attr = $element.getAttributeNode('aria-selected')
			this.#log('Select Element', $element, attr)
			return attr !== null && checkFalsy(attr.value)
				? ((attr.value = 'true'), true)
				: false
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

	get selectedElements() {
		const $$elements = new Set<Option['$element']>()
		for (const { $element } of this.#options.values())
			if (checkTruth($element.ariaSelected)) $$elements.add($element)
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

				for (const $element of $$elements)
					if ($element.role === 'option') {
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
						})
					}
				normalize(list)

				this.#log('SlotChange Event', list)
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

		this.addEventListener('focus', (event) => this.#onFocus(event), options)
		this.addEventListener('blur', (event) => this.#onBlur(event), options)

		return this.#focusCont
	}

	#onBlur({ currentTarget, target }: FocusEvent) {
		this.#interCont?.abort()
		this.#log('Blur Event', { currentTarget, target })
	}

	#onFocus({ currentTarget, target }: FocusEvent) {
		this.#listenInteraction()
		this.#log('Focus Event', { currentTarget, target })
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

	#onClick(event) {
		this.#log('Click Event', event)
	}

	#onKeyPress(event) {
		this.#log('KeyPress Event', event)

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

	#log(label: string, ...args) {
		console.groupCollapsed(`ListboxElement: ${label}`)
		console.debug(args)
		console.table(this.#internals)
		console.dirxml(this)
		console.groupEnd()
	}
}

customElements.define(ListboxElement.tagName, ListboxElement)
export default customElements.get(ListboxElement.tagName)
