/// <reference path="./types.d.ts" />

import template from './template.pug'

import applyAttributes from '#lib/fn.applyAttributes.js'
import initShadowRoot from '#lib/fn.initShadowRoot.js'

export const tagName = 'c-select-field'

/** @typedef {'defined' | 'interactive' | 'loaded' } ComponentReadyState */
/** @typedef {'collapsed' | 'expanded'} ListBoxState */
/** @typedef {ComponentReadyState | ListBoxState } SelectFieldState */

/** @typedef {{ label: string, value: string }} ListItem */
/** @typedef {Map<WeakRef<Element>, ListItem>} RefOptionMap */
/** @typedef {ListItem & { $element: HTMLElement}} SearchResult */

export class SelectField extends HTMLElement {
	/** @type {Map<string, string>} */
	#initialAttributes

	/** @type {ElementInternals} */
	#internals

	/** @type {RefOptionMap} */
	#options = new Map()

	static formAssociated = true

	/** @type Array<SelectField.Attributes> */
	static observedAttributes = [
		'aria-disabled',
		'aria-expanded',
		'aria-label',
		'aria-placeholder',
		'aria-readonly',
		'onchange',
		'value',
	]

	constructor() {
		initShadowRoot.call(super(), {
			template,
			delegatesFocus: true,
		})

		this.#internals = this.attachInternals()
		this.#initInternalProperties()
		this.#initElementAttributes()
		this.#states.add('defined')
		this.#listenAssignedNodes()
	}

	#initElementAttributes() {
		const $$parts = this.#internals.shadowRoot.querySelectorAll('[part]')

		const attrs = {
			role: this.#internals.role,
		}
	}

	#initInternalProperties() {
		this.#internals.ariaAtomic = true
		this.#internals.role = 'combobox'
	}

	connectedCallback() {
		// (1)
		this.#syncAccessibilityTree()

		// (2)
		this.#listenFocus()
		this.#states.add('interactive')

		// (3)
		this.#$('link').onload = () => this.#states.add('loaded')
	}

	disconnectedCallback() {
		this.#interCont?.abort()
		this.#focusCont?.abort()
		this.#slotChangeCont?.abort()
	}

	adoptedCallback() {}

	attributeChangedCallback(name, previous, updated) {
		if (false === this.isConnected) return
		if (previous === updated) return

		switch (name) {
			case 'aria-disabled':
				this.disabled =
					(this.#internals.ariaDisabled = updated) === 'true'
				break
			case 'aria-expanded':
				this.expanded =
					(this.#internals.ariaExpanded = updated) === 'true'
				break
			case 'aria-label':
				this.#$status.ariaLabel = updated
				break
			case 'aria-placeholder':
				this.#$status.ariaPlaceholder = updated
				break
			case 'value':
				this.value = updated
				break
			default:
				this.#syncAccessibilityTree()
		}
	}

	formAssociatedCallback(_form) {}
	formDisabledCallback(disabled) {
		this.setAttribute('aria-disabled', disabled)
	}
	formResetCallback() {
		applyAttributes(this, this.#initialAttributes)
	}
	formStateRestoreCallback(state, _reason) {
		this.value = state
	}

	/**
	 * Сall returns the first option for wich the query string is started substring of the label or value option.
	 *
	 * @param {string} query
	 * @returns {SearchResult | null}
	 */
	search(query) {
		for (const [ref, option] of this.#options)
			if (
				0 === option.label.indexOf(query) ||
				0 === option.value.indexOf(query)
			)
				return {
					$element: ref.deref(),
					...option,
				}
		return null
	}

	/**
	 * Сall will find the first option wich value is fully equal to the query string.
	 *
	 * @param {string} query
	 * @returns {SearchResult | null}
	 */
	findByValue(query) {
		for (const [ref, option] of this.#options)
			if (query === option.value)
				return {
					$element: ref.deref(),
					...option,
				}
		return null
	}

	/**
	 * @param {ListBoxState} state - New value of state
	 * @returns {ListBoxState} Current state after call
	 */
	toggle(state = null) {
		const current = state ?? (this.expanded ? 'collapsed' : 'expanded')
		this[current] = true
		return current
	}

	/** @type {HTMLFormElement} */
	get form() {
		return this.#internals.form
	}

	/** @type {string} */
	get name() {
		return this.getAttribute('name') ?? 'unknown'
	}

	/** @type {string} */
	get options() {
		const $$elements = new Set()
		for (const [ref, _option] of this.#options) $$elements.add(ref.deref())
		return null
	}

	/** @type {string} */
	get type() {
		return this.getAttribute('type') ?? 'text'
	}

	/** @type {number} */
	get size() {
		return this.#options.size
	}

	/** @type {string} */
	get value() {
		return this.#internals.ariaValueNow
	}

	/** @param {string} updated */
	set value(updated) {
		this.#internals.ariaValueNow = updated
		this.setAttribute('value', updated)

		this.dispatchEvent(new Event('change'))
	}

	/** @type {boolean} */
	get interacting() {
		return (
			Boolean(this.#interCont) &&
			false === this.#interCont?.signal.aborted
		)
	}

	/** @type {CustomStateSet} */
	get #states() {
		return this.#internals.states
	}

	/** @type {boolean} */
	get disabled() {
		return this.#internals.ariaDisabled === 'true'
	}

	/** @param {boolean} flag */
	set disabled(flag) {
		if (flag) {
			this.#states.add('disabled')
			this.#interCont?.abort()
		} else if (this.#states.has('disabled')) {
			this.#states.delete('disabled')
		}

		this.setAttribute('aria-disabled', flag)
	}

	/** @type {boolean} */
	get expanded() {
		return this.#internals.ariaExpanded === 'true'
	}

	/** @param {boolean} flag */
	set expanded(flag) {
		this.setAttribute('aria-expanded', flag)
		this.#states[flag ? 'add' : 'delete']('expanded')
		this.#states[flag ? 'delete' : 'add']('collapsed')
	}

	/** @param {boolean} flag */
	set collapsed(flag) {
		this.expanded = false === flag
	}

	/** @type {AbortController} */
	#focusCont

	/** @returns {AbortController} */
	#listenFocus() {
		this.#focusCont?.abort()
		this.#focusCont = new AbortController()

		const options = {
			capture: false,
			passive: true,
			signal: this.#focusCont.signal,
		}

		this.addEventListener('focus', (event) => this.#onFocus(event), options)
		this.addEventListener(
			'focusin',
			(event) => this.#onFocusIn(event),
			options,
		)
		this.addEventListener('blur', (event) => this.#onBlur(event), options)
		this.addEventListener(
			'focusout',
			(event) => this.#onFocusOut(event),
			options,
		)

		return this.#focusCont
	}

	#onFocus(event) {
		this.#listenInteraction()
	}

	#onFocusIn(event) {}

	#onBlur(event) {}

	#onFocusOut(event) {
		this.toggle('collapsed')
		this.#interCont?.abort()
	}

	/** @type {AbortController} */
	#interCont

	/** @returns {AbortController} */
	#listenInteraction() {
		this.#interCont?.abort()
		this.#interCont = new AbortController()

		const options = {
			capture: true,
			passive: false,
			signal: this.#interCont.signal,
		}

		this.#$button.addEventListener(
			'click',
			(event) => this.#onClickButton(event),
			options,
		)
		this.#$listbox.addEventListener(
			'click',
			(event) => this.#onClickListBox(event),
			options,
		)
		this.addEventListener(
			'keypress',
			(event) => this.#onKeyPress(event),
			options,
		)

		return this.#interCont
	}

	#onClickButton(event) {
		this.toggle()
	}

	#onClickListBox(event) {}

	#onKeyPress(event) {
		const { key } = event

		switch (key) {
			case 'Backspace':
			case 'Enter':
				if (this.focused === this.#$button) {
					this.toggle('expanded')
				}
				break
			case 'Escape':
				if (this.focused !== this.#$button) {
					this.toggle('collapsed')
				}
				break
			case 'End':
				this.options[this.size - 1].focus()
				break
			case 'Home':
				this.options[0].focus()
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

	/** @type {AbortController} */
	#slotChangeCont

	/** @returns {AbortController} */
	#listenAssignedNodes() {
		this.#slotChangeCont?.abort()
		this.#slotChangeCont = new AbortController()

		/** @type {RefOptionMap} */
		const list = this.#options

		const cleanup = (list) =>
			list.forEach((_, ref, map) => {
				const $element = ref.deref()
				Boolean(
					$element.isConnected && $element.parentElement === this,
				) || map.delete(ref)
			})

		this.#$listbox.children[0].addEventListener(
			'slotchange',
			(event) => {
				const $$elements = event.target.assignedElements()
				for (const $element of $$elements)
					if (
						$element.hasAttribute('role') &&
						$element.role === 'option'
					) {
						const label = $element.ariaLabel || $element.textContent
						list.set(new WeakRef($element), {
							label,
							value:
								$element.value ||
								$element.dataset.value ||
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

	#syncAccessibilityTree() {
		this.#internals.ariaActiveDescendantElement =
			this.#internals.shadowRoot.activeElement

		this.#internals.ariaAutoComplete = this.ariaAutoComplete
		this.#internals.ariaDisabled = this.ariaDisabled
		this.#internals.ariaHasPopup = this.ariaHasPopup
		this.#internals.ariaExpanded = this.ariaExpanded
		this.#internals.ariaMultiSelectable = this.ariaMultiSelectable
		this.#internals.ariaPlaceholder = this.ariaPlaceholder
		this.#internals.role = this.role
	}

	/**
	 * Returns the first element that is a descendant of element that matches selector.
	 *
	 * @param {string} selector
	 * @param {HTMLElement | ShadowRoot} [$parent]
	 * @returns {HTMLElement | null}
	 */
	#$(selector, $parent) {
		return ($parent ?? this.#internals.shadowRoot).querySelector(selector)
	}

	/** @type {HTMLElement} */
	get #$button() {
		return this.#$('[role=button]')
	}

	/** @type {HTMLElement} */
	get #$status() {
		return this.#$('[role=status]', this.#$button)
	}

	/** @type {HTMLElement} */
	get #$listbox() {
		return this.#$('[role=listbox]')
	}
}

customElements.define(tagName, SelectField)

export default customElements.get(tagName)
