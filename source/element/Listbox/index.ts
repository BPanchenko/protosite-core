import checkFalsy from '#library/fn.checkFalsy'
import checkTruth from '#library/fn.checkTruth'
import initShadowRoot from '#library/fn.initShadowRoot'
import updateAttributes from '#library/fn.updateAttributes'

import type { FormAssociatedCustomElement } from '#types'
import type { Option, OptionCollection, OptionRef } from './types'

export type { Option }

const template = '<slot></slot>'

export class ListboxElement
	extends HTMLElement
	implements FormAssociatedCustomElement {
	#index: number = 0
	#internals: ElementInternals = this.attachInternals()
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

	static initOptionAttributes($element: HTMLElement) {
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
			template,
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

	shift(offset: number) {
		this.#index =
			(((this.#index + offset) % this.size) + this.size) % this.size
		this.options[this.#index].$ref.deref()?.focus()
		return this
	}

	/**
	 * Returns an first option wich value is fully equal to the query string.
	 */
	findByValue(query: string): Option | null {
		for (const [id_, option] of this.#options) {
			if (query === option.value) return option
		}
		return null
	}

	/**
	 * Сall returns array of options for wich the query string is started substring of the label or value option.
	 * @todo Check requirements for returned result
	 */
	search(query: string) {
		const result = new Set<Option>()
		for (const [id_, option] of this.#options)
			if (
				0 === option.label?.indexOf(query) ||
				0 === option.value?.indexOf(query)
			)
				result.add(option)
		return result.size > 0 ? result : null
	}

	select($element: HTMLElement | null): boolean
	select($ref: OptionRef): boolean
	select(identifier: string): boolean
	select(index: number): boolean
	select(param: unknown): boolean {
		let $element: HTMLElement | undefined

		if (param instanceof HTMLElement) $element = param
		else if (param instanceof WeakRef) $element = param.deref()
		else if (typeof param === 'string' || typeof param === 'number') {
			const option = this.#options.get(param)
			if (option !== undefined) $element = option.$ref.deref()
		}

		if ($element !== undefined) {
			if (this.multiple === false) this.unselect()
			return this.#selectElement($element)
		} else return false
	}

	unselect($element?: HTMLElement): boolean {
		// 1.
		if ($element instanceof HTMLElement) {
			$element.setAttribute('aria-selected', 'false')
			return true
		}

		// 2.
		const $$selected = this.selectedElements
		if ($$selected && $$selected.length > 0) {
			this.selectedElements.forEach(($element) =>
				$element.setAttribute('aria-selected', 'false'),
			)
			return true
		}

		return false
	}

	#selectElement($element?: HTMLElement) {
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
		const $$elements: Array<HTMLElement> = []
		for (const { $ref } of this.#options.values()) {
			const $element = $ref.deref()
			if ($element && checkTruth($element.ariaSelected))
				$$elements.push($element)
		}
		return $$elements.length > 0 ? $$elements : null
	}

	get size(): number {
		return this.#options.size
	}

	#listenAssignedNodes(): AbortController {
		this.#slotChangeCont?.abort()
		this.#slotChangeCont = new AbortController()

		this.addEventListener(
			'slotchange',
			(event) => {
				this.#options.clear()

				const $$elements = (
					event.target as HTMLSlotElement
				).assignedElements({ flatten: true }) as HTMLElement[]

				$$elements.forEach(($element, idx) => {
					if ($element.role === 'option') {
						ListboxElement.initOptionAttributes($element)

						const option = {
							$ref: new WeakRef($element),
							label: $element.ariaLabel || $element.textContent,
							value:
								$element.dataset.value ??
								$element.getAttribute('value'),
						}

						this.#options.set($element.id, option)
						this.#options.set(idx, option)
					}
				})

				this.#log('SlotChange Event')
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

		this.addEventListener('focus', (e) => this.#onFocus(e), options)
		this.addEventListener('blur', (e) => this.#onBlur(e), options)

		return this.#focusCont
	}

	#onBlur(event: FocusEvent) {
		this.#interCont?.abort()
		this.#log(`event:${event.type}`)
	}

	#onFocus(event: FocusEvent) {
		this.#listenInteraction()
		this.#log(`event:${event.type}`)
	}

	#listenInteraction(): AbortController {
		this.#interCont?.abort()
		this.#interCont = new AbortController()

		const options = {
			capture: false,
			passive: false,
			signal: this.#interCont.signal,
		}

		this.addEventListener('click', (e) => this.#onClick(e), options)
		this.addEventListener('keydown', (e) => this.#onKeyDown(e), options)

		return this.#interCont
	}

	#onClick(event: MouseEvent) {
		this.#log(`event:${event.type}`)
	}

	#onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter':
				this.select(this.activeElement)
				event.stopPropagation()
				break
			case 'End':
				break
			case 'Home':
				break
			case 'ArrowUp':
				if (this.#index) {
					this.shift(-1)
					event.stopPropagation()
				}
				break
			case 'ArrowDown':
				break
			default:
				if (/\w+/.test(event.key)) {
					// TODO
				}
				return
		}

		this.#log(`event:${event.type}`)
	}

	#log(label: string, ...args) {
		console.groupCollapsed(`ListboxElement: ${label}`)
		args.length > 0 && console.log('Arguments: ', args)
		console.table(this.#options)
		console.debug(this.#internals)
		console.dir(this)
		console.groupEnd()
	}
}

customElements.define(ListboxElement.tagName, ListboxElement)
export default customElements.get(ListboxElement.tagName)
