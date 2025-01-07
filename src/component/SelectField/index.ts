import '#element/Listbox.ts'

import initShadowRoot from '#library/fn.initShadowRoot.js'
import checkFalsy from '#library/fn.checkFalsy'
import checkTruth from '#library/fn.checkTruth'
import updateAttributes from '#library/fn.updateAttributes.js'
import { ComboboxState, ComponentReadyState, FieldState } from '../settings'

import template from './template.pug'

import type {
	InitAccessibilityTreeOptions,
	InitAttributesOptions,
	Option,
	OptionCollection,
} from './types'

import type { Listbox } from '#element/Listbox'
import type { FormAssociatedCustomElement } from '#types/iface.FormAssociatedCustomElement'

export const tagName = 'c-select-field'

export class SelectField
	extends HTMLElement
	implements FormAssociatedCustomElement {
	// #feed = new Map<number, string>()
	#focusCont: AbortController
	#interCont: AbortController
	#internals: ElementInternals = this.attachInternals()
	#options: OptionCollection = new Map()
	#slotChangeCont: AbortController

	static formAssociated = true
	static role = 'combobox'

	static observedAttributes = [
		'aria-disabled',
		'aria-expanded',
		'aria-label',
		'aria-multiselectable',
		'aria-placeholder',
		'aria-required',
		'name',
		'value',
	]

	static initAttributes(
		element: SelectField,
		options: InitAttributesOptions,
	) {
		const data = {
			'aria-atomic': true,
			'aria-expanded': false,
			exportparts: element.getAttribute('exportparts'),
			id: element.id,
			role: SelectField.role,
			tabIndex: <number>element.tabIndex,
		}

		const { internals, shadowRoot } = options

		// [exportparts]

		if (checkFalsy(data.exportparts) && shadowRoot instanceof ShadowRoot) {
			const $$parts = shadowRoot.querySelectorAll('[part]')

			if ($$parts.length) {
				data.exportparts = Array.from($$parts)
					.map(($elem) => $elem.part.toString())
					.join(', ')
			}
		}

		// [id]

		if (checkFalsy(data.id) && element.isConnected) {
			data.id = [SelectField.role, Math.round(performance.now())].join(
				'-',
			)
		}

		// [tabindex]

		if (
			element.isConnected &&
			data.tabIndex < 0 &&
			internals instanceof ElementInternals &&
			internals.form instanceof HTMLElement
		) {
			data.tabIndex = 0
		}

		return updateAttributes(element, data)
	}

	static initAccessibilityTree(
		element: SelectField,
		options: InitAccessibilityTreeOptions,
	) {
		const { internals, $listbox } = options

		internals.ariaAtomic = 'true'
		internals.ariaLive = 'polite'
		internals.role = SelectField.role

		internals.ariaDisabled = String(element.ariaDisabled === 'true')
		internals.ariaExpanded = String(element.ariaExpanded === 'true')
		internals.ariaRequired = String(element.ariaRequired === 'true')
		internals.ariaHasPopup = 'listbox'
		internals.ariaMultiSelectable = String(
			element.ariaMultiSelectable === 'true',
		)

		$listbox.ariaMultiSelectable = internals.ariaMultiSelectable
	}

	constructor() {
		super()
		initShadowRoot.call(this, {
			template,
			delegatesFocus: true,
		})
		SelectField.initAttributes(this, {
			shadowRoot: this.#$root,
		})
		ElementInternals
		this.#listenAssignedNodes()
		this.#states.add(ComponentReadyState.Defined)
		ElementInternals
		ElementInternals
	}

	connectedCallback() {
		// (1)
		SelectField.initAttributes(this, {
			internals: this.#internals,
		})
		SelectField.initAccessibilityTree(this, {
			$listbox: this.#$listbox,
			internals: this.#internals,
		})

		// (2)
		this.#listenFocus()
		this.#states.add(ComponentReadyState.Interactive)

		// (3)
		this.#$root.querySelector('link').onload = () =>
			this.#states.add(ComponentReadyState.Loaded)
	}

	disconnectedCallback() {
		this.#interCont?.abort()
		this.#focusCont?.abort()
		this.#slotChangeCont?.abort()
	}

	adoptedCallback() { }

	attributeChangedCallback(name, previous, current) {
		if (false === this.isConnected) return
		if (previous === current) return

		const isTruth = checkTruth(current)

		switch (name) {
			case 'aria-disabled':
				if (isTruth) {
					this.#states.add(FieldState.Disabled)
					this.#interCont?.abort()
				} else {
					this.#states.delete(FieldState.Disabled)
				}
				this.#internals.ariaDisabled = current
				break
			case 'aria-expanded':
				this.#states.add(
					isTruth ? ComboboxState.Expanded : ComboboxState.Collapsed,
				)
				this.#internals.ariaExpanded = current
				break
			case 'aria-label':
				this.#internals.ariaLabel = current
				this.#$status.ariaLabel = current
				break
			case 'aria-placeholder':
				this.#internals.ariaPlaceholder = current
				this.#$status.ariaPlaceholder = current
				break
			case 'value':
				this.value = current
				break
			default:
		}
	}

	formAssociatedCallback(form_) { }
	formDisabledCallback(disabled) {
		this.setAttribute('aria-disabled', disabled)
	}
	formResetCallback() { }
	formStateRestoreCallback(state, reason_) {
		this.value = state
	}

	collapse(): void {
		this.#states.delete(ComboboxState.Expanded)
		updateAttributes(this, 'aria-expanded', false)
		this.#$button.focus()
	}

	expand(): void {
		this.#states.delete(ComboboxState.Collapsed)
		updateAttributes(this, 'aria-expanded', true)
		this.#$listbox.focus()
	}

	select(value: HTMLElement | string): boolean {
		let option
		if (value instanceof HTMLElement) {
			// @ts-ignore
			option = this.#options.get(value)
		} else if (typeof value === 'string') {
			option = this.#findByValue(value)
		}
		return Boolean(option) && this.#selectElement(option.$element)
	}

	#selectElement($element: HTMLElement) {
		const attribute = this.multiple ? 'aria-checked' : 'aria-selected'
		$element.setAttribute(attribute, 'true')
		return true
	}

	get disabled(): boolean {
		return (
			this.#states.has(FieldState.Disabled) &&
			checkTruth(this.#internals.ariaDisabled) &&
			checkTruth(this.ariaDisabled)
		)
	}

	get expanded(): boolean {
		return (
			this.#states.has(ComboboxState.Expanded) &&
			checkTruth(this.#internals.ariaExpanded) &&
			checkTruth(this.ariaExpanded)
		)
	}

	get multiple(): boolean {
		return checkTruth(this.#internals.ariaMultiSelectable)
	}

	get options(): MapIterator<Option> {
		return this.#options.values()
	}

	get readonly(): boolean {
		return checkTruth(this.#internals.ariaReadOnly)
	}

	get size(): number {
		return this.#options.size
	}

	get value(): string {
		return this.#internals.ariaValueNow
	}

	set value(updated: string) {
		this.#internals.ariaValueNow = updated

		this.dispatchEvent(new Event('change'))
	}

	get #$button(): HTMLElement {
		return this.#$root.getElementById('button')
	}

	get #$status(): HTMLElement {
		return this.#$root.getElementById('value_text')
	}

	get #$listbox(): Listbox {
		return this.#$root.getElementById('listbox') as Listbox
	}

	get #$root(): ShadowRoot {
		return this.#internals.shadowRoot
	}

	get #states(): CustomStateSet {
		return this.#internals.states
	}

	/**
	 * Сall will find the first option wich value is fully equal to the query string.
	 */
	#findByValue(query: string): Option | null {
		for (const option of this.#options) {
			// @ts-ignore
			if (query === option.value) return option
		}
		return null
	}

	#listenAssignedNodes(): AbortController {
		this.#slotChangeCont?.abort()
		this.#slotChangeCont = new AbortController()

		const list = this.#options

		const cleanup = (list: OptionCollection) =>
			list.forEach(
				({ $element }, $ref, map) =>
					($element.isConnected && $element.parentElement === this) ||
					map.delete($ref),
			)

		this.#$listbox.children[0].addEventListener(
			'slotchange',
			(event) => {
				const $$elements = (
					event.target as HTMLSlotElement
				).assignedElements()
				for (const $element of $$elements as HTMLElement[])
					if (
						$element.hasAttribute('role') &&
						$element.role === 'option'
					) {
						const $ref = new WeakRef($element)
						const label = $element.ariaLabel || $element.textContent
						list.set($ref, {
							$element,
							label,
							value:
								$element.getAttribute('value') ||
								$element.dataset.value ||
								(undefined !== $element['value'] &&
									($element as HTMLOptionElement).value) ||
								label,
						})
					} else $element.remove()
				cleanup(list)
			},
			{
				signal: this.#slotChangeCont.signal,
			},
		)

		return this.#slotChangeCont
	}

	#listenFocus(): AbortController {
		this.#focusCont?.abort()
		this.#focusCont = new AbortController()

		const options = {
			signal: this.#focusCont.signal,
		}

		this.addEventListener('focus', (event) => this.#onFocus(event), options)
		this.addEventListener('blur', (event) => this.#onBlur(event), options)

		return this.#focusCont
	}

	#onBlur(event_): void {
		this.collapse()
		this.#interCont?.abort()
	}

	#onFocus(event_): void {
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

		this.addEventListener('focusin', (event) => { }, options)
		this.addEventListener('focusout', (event) => { }, options)

		return this.#interCont
	}

	#onClick(event_): void {
		this.#toggle()
	}

	#onKeyPress(event): void {
		const { key } = event
		// @ts-ignore
		const $focused = this.#internals.ariaActiveDescendantElement

		switch (key) {
			case 'Enter':
				if ($focused === this.#$button) {
					this.expand()
				}
				break
			case 'Backspace':
			case 'Escape':
				this.collapse()
				break
			case 'End':
				this.options[this.size - 1].focus()
				break
			case 'Home':
				this.options[0].focus()
				break
			case 'ArrowUp':
				this.collapse()
				break
			case 'ArrowDown':
				this.expand()
				break
			default:
				if (/\w+/.test(key)) {
					// TODO
				}
		}
	}

	/**
	 * Toggle the `aria-expanded` state
	 */
	#toggle(): void {
		this.expanded ? this.collapse() : this.expand()
	}

	/**
	 * Сall returns the first option for wich the query string is started substring of the label or value option.
	 */
	/**
	 * #search(query: string): Option | null {
		for (const option of this.options)
			if (
				0 === option.label.indexOf(query) ||
				0 === option.value.indexOf(query)
			)
				return option
		return null
	}
	 */
}

customElements.define(tagName, SelectField)
export default customElements.get(tagName)
