import checkFalsy from '#library/fn.checkFalsy'
import checkTruth from '#library/fn.checkTruth'
import initShadowRoot from '#library/fn.initShadowRoot'
import updateAttributes from '#library/fn.updateAttributes'

import { ComboboxState, ComponentReadyState, FieldState } from '../settings'
import { ListboxElement, type Option } from '#element/Listbox/index'

import template from './template.pug'

import type { FormAssociatedCustomElement } from '#types'

type InitAttributesOptions = {
	shadowRoot?: ShadowRoot
	internals?: ElementInternals
}

type InitAccessibilityTreeOptions = {
	$listbox: ListboxElement
	internals: ElementInternals
}

export class SelectField
	extends HTMLElement
	implements FormAssociatedCustomElement {
	#$root: ShadowRoot
	// #feed = new Map<number, string>()
	#internals: ElementInternals = this.attachInternals()

	#focusCont: AbortController
	#interCont: AbortController
	#slotChangeCont: AbortController

	static formAssociated = true
	static role = 'combobox'
	static tagName = 'c-select-field'

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
			role: this.role,
			tabIndex: <number>element.tabIndex,
		}

		const { internals, shadowRoot } = options

		// [exportparts]

		if (checkFalsy(data.exportparts) && shadowRoot instanceof ShadowRoot) {
			const $$parts = shadowRoot.querySelectorAll('[part]')

			if ($$parts.length) {
				data.exportparts = Array.from($$parts)
					.map(($elem) => $elem.part.toString())
					.join(' ')
			}
		}

		// [id]

		if (checkFalsy(data.id) && element.isConnected) {
			data.id = [this.role, Math.round(performance.now())].join('-')
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
		internals.role = this.role

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
		this.#$root = initShadowRoot.call(this, {
			template,
			delegatesFocus: true,
		})
		SelectField.initAttributes(this, {
			shadowRoot: this.#$root,
		})
		this.#states.add(ComponentReadyState.Defined)

		this.#log('Defined')
	}

	connectedCallback() {
		// (1)
		SelectField.initAttributes(this, {
			internals: this.#internals,
		})
		SelectField.initAccessibilityTree(this, {
			$listbox: this.#$listbox as ListboxElement,
			internals: this.#internals,
		})

		// (2)
		this.#listenFocus()
		this.#states.add(ComponentReadyState.Interactive)

		// (3)
		const link = this.#$root.querySelector('link')
		link &&
			(link.onload = () => this.#states.add(ComponentReadyState.Loaded))

		this.#log('Connected Callback')
	}

	disconnectedCallback() {
		this.#interCont?.abort()
		this.#focusCont?.abort()
		this.#slotChangeCont?.abort()
	}

	attributeChangedCallback(name, previous, current) {
		this.#log('Attribute Changed', name, previous, current)

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
				this.#$status && (this.#$status.ariaLabel = current)
				break
			case 'aria-placeholder':
				this.#internals.ariaPlaceholder = current
				this.#$status && (this.#$status.ariaPlaceholder = current)
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

	collapse() {
		this.#states.delete(ComboboxState.Expanded)
		updateAttributes(this, 'aria-expanded', false)
		this.#$listbox && (this.#$listbox.tabIndex = -1)
	}

	expand() {
		this.#states.delete(ComboboxState.Collapsed)
		updateAttributes(this, 'aria-expanded', true)
		if (this.#$listbox) {
			this.#$listbox.tabIndex = 0
			this.#$listbox.focus()
		}
	}

	toggle() {
		this.expanded ? this.collapse() : this.expand()
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

	get options(): Option[] | undefined {
		return this.#$listbox instanceof ListboxElement
			? this.#$listbox.options
			: undefined
	}

	get readonly(): boolean {
		return checkTruth(this.#internals.ariaReadOnly)
	}

	get size(): number | undefined {
		return this.#$listbox instanceof ListboxElement
			? this.#$listbox.size
			: undefined
	}

	get value(): string | null {
		return this.#internals.ariaValueNow
	}

	set value(updated: string | null) {
		this.#internals.ariaValueNow = updated

		this.dispatchEvent(new Event('change'))
		this.#log('Dispatch Change Event')
	}

	get #$button(): HTMLElement | null {
		return this.#$root.getElementById('button')
	}

	get #$status(): HTMLElement | null {
		return this.#$root.getElementById('status')
	}

	get #$listbox(): HTMLElement | null {
		return this.#$root.getElementById('listbox')
	}

	get #states(): CustomStateSet {
		return this.#internals.states
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

	#onBlur({ currentTarget, target }: FocusEvent) {
		this.collapse()
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

	#onClick({ currentTarget, target }: MouseEvent) {
		this.toggle()
		this.#log('Click Event', { currentTarget, target })
	}

	#onKeyPress(event: KeyboardEvent) {
		const { key, currentTarget, target } = event

		this.#log('KeyPress Event', event, { key, currentTarget, target })

		// @ts-ignore
		const $focused = this.#internals.ariaActiveDescendantElement

		switch (key) {
			case 'Enter':
				if ($focused === this.#$button) {
					this.expand()
				}
				break
			case 'ArrowUp':
			case 'Backspace':
			case 'Escape':
				this.#$button && this.#$button.focus()
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

	#log(label: string, ...args) {
		console.groupCollapsed(`SelectField: ${label}`)
		console.log('Arguments: ', args)
		console.debug(this.#internals)
		console.dir(this)
		console.groupEnd()
	}
}

customElements.define(SelectField.tagName, SelectField)
export default customElements.get(SelectField.tagName)
