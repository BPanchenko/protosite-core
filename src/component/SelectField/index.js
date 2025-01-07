import '#element/Listbox.ts'

import initShadowRoot from '#library/fn.initShadowRoot.js'
import checkTruth from '#library/fn.checkTruth.ts'
import updateAttributes from '#library/fn.updateAttributes.js'

import template from './template.pug'

export const tagName = 'c-select-field'

/** @typedef {'--defined' | '--interactive' | '--loaded' } ComponentReadyState */
/** @typedef {'collapsed' | 'expanded'} ListBoxState */
/** @typedef {ComponentReadyState | ListBoxState } SelectFieldState */

/** @typedef {{ $element: HTMLElement, label: string, value: string }} Option */
/** @typedef {Map<WeakRef<Option['$element']>, Option>} OptionCollection */

export class SelectField extends HTMLElement {
	/** @type {Map<number, string>} */
	#feed = new Map()

	/** @type {AbortController} */
	#focusCont

	/** @type {AbortController} */
	#interCont

	/** @type {ElementInternals} */
	#internals = this.attachInternals()

	/** @type {OptionCollection} */
	#options = new Map()

	/** @type {AbortController} */
	#slotChangeCont

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

	/**
	 * @param {SelectField} element
	 * @param {Object} [options]
	 * @param {ElementInternals} [options.internals]
	 * @param {ShadowRoot} [options.shadowRoot]
	 */
	static initAttributes(element, { internals, shadowRoot }) {
		const data = {
			'aria-atomic': true,
			'aria-expanded': false,
			role: SelectField.role,
		}

		// [exportparts]

		if (
			false === element.hasAttribute('exportparts') &&
			shadowRoot instanceof ShadowRoot
		) {
			const $$parts = shadowRoot.querySelectorAll('[part]').values()

			if ($$parts.length) {
				data.exportparts = Array.from($$parts)
					.map(($elem) => $elem.part.toString())
					.join(', ')
			}
		}

		// [id]

		if (element.isConnected && false === Boolean(element.id)) {
			data.id = [SelectField.role, Math.round(performance.now())].join(
				'-',
			)
		}

		// [tabindex]

		if (
			element.isConnected &&
			element.tabIndex < 0 &&
			internals instanceof ElementInternals &&
			internals.form instanceof HTMLElement
		) {
			data.tabindex = 0
		}

		return updateAttributes(element, data)
	}

	/**
	 * @param {SelectField} element
	 * @param {Object} [options]
	 * @param {ElementInternals} [options.internals]
	 * @param {ShadowRoot} [options.shadowRoot_]
	 */
	static initAccessibilityTree(element, { internals, $listbox }) {
		internals.ariaAtomic = true
		internals.ariaLive = 'polite'
		internals.role = SelectField.role

		internals.ariaDisabled = element.ariaDisabled === 'true'
		internals.ariaExpanded = element.ariaExpanded === 'true'
		internals.ariaRequired = element.ariaRequired === 'true'
		internals.ariaHasPopup = 'listbox'
		internals.ariaMultiSelectable = element.ariaMultiSelectable === 'true'

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
		this.#listenAssignedNodes()
		this.#states.add('--defined')
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
		this.#states.add('--interactive')

		// (3)
		this.#$root.querySelector('link').onload = () =>
			this.#states.add('--loaded')
	}

	disconnectedCallback() {
		this.#interCont?.abort()
		this.#focusCont?.abort()
		this.#slotChangeCont?.abort()
	}

	adoptedCallback() {}

	attributeChangedCallback(name, previous, current) {
		if (false === this.isConnected) return
		if (previous === current) return

		const isTruth = checkTruth(current)

		switch (name) {
			case 'aria-disabled':
				if (isTruth) {
					this.#states.add('disabled')
					this.#interCont?.abort()
				} else {
					this.#states.delete('disabled')
				}
				this.#internals.ariaDisabled = current
				break
			case 'aria-expanded':
				this.#states.add(isTruth ? 'expanded' : 'collapsed')
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

	formAssociatedCallback(form_) {}
	formDisabledCallback(disabled) {
		this.setAttribute('aria-disabled', disabled)
	}
	formResetCallback() {}
	formStateRestoreCallback(state, reason_) {
		this.value = state
	}

	collapse() {
		this.#states.delete('expanded')
		updateAttributes(this, 'aria-expanded', false)
		this.#$button.focus()
	}

	expand() {
		this.#states.delete('collapsed')
		updateAttributes(this, 'aria-expanded', true)
		this.#$listbox.focus()
	}

	/**
	 * @param {HTMLElement | string} value
	 * @returns {boolean}
	 */
	select(value) {
		let option
		if (value instanceof HTMLElement) {
			option = this.#options.get(value)
		} else if (typeof value === 'string') {
			option = this.#findByValue(value)
		}
		return Boolean(option) && this.#selectElement(option.$element)
	}

	/**
	 * @param {HTMLElement} $element
	 */
	#selectElement($element) {
		const attribute = this.multiple ? 'aria-checked' : 'aria-selected'
		$element.setAttribute(attribute, true)
	}

	/** @type {boolean} */
	get disabled() {
		return (
			this.#states.has('disabled') &&
			checkTruth(this.#internals.ariaDisabled) &&
			checkTruth(this.ariaDisabled)
		)
	}

	/** @type {boolean} */
	get expanded() {
		return (
			this.#states.has('expanded') &&
			checkTruth(this.#internals.ariaExpanded) &&
			checkTruth(this.ariaExpanded)
		)
	}

	/** @type {boolean} */
	get multiple() {
		return checkTruth(this.#internals.ariaMultiSelectable)
	}

	/** @type {MapIterator<Option>} */
	get options() {
		return this.#options.values()
	}

	/** @type {boolean} */
	get readonly() {
		return checkTruth(this.#internals.ariaReadOnly)
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

		this.dispatchEvent(new Event('change'))
	}

	/** @type {HTMLElement} */
	get #$button() {
		return this.#$root.getElementById('button')
	}

	/** @type {HTMLElement} */
	get #$status() {
		return this.#$root.getElementById('value_text')
	}

	/** @type {HTMLElement} */
	get #$listbox() {
		return this.#$root.getElementById('listbox')
	}

	/** @type {ShadowRoot} */
	get #$root() {
		return this.#internals.shadowRoot
	}

	/** @type {CustomStateSet} */
	get #states() {
		return this.#internals.states
	}

	/**
	 * Сall will find the first option wich value is fully equal to the query string.
	 *
	 * @param {string} query
	 * @returns {Option | null}
	 */
	#findByValue(query) {
		for (const option of this.options)
			if (query === option.value) return option
		return null
	}

	/** @returns {AbortController} */
	#listenAssignedNodes() {
		this.#slotChangeCont?.abort()
		this.#slotChangeCont = new AbortController()

		/** @type {OptionCollection} */
		const list = this.#options

		/** @param {OptionCollection} list */
		const cleanup = (list) =>
			list.forEach(
				({ $element }, $ref, map) =>
					($element.isConnected && $element.parentElement === this) ||
					map.delete($ref),
			)

		this.#$listbox.children[0].addEventListener(
			'slotchange',
			(event) => {
				const $$elements = event.target.assignedElements()
				for (const $element of $$elements)
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

	/** @returns {AbortController} */
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

	#onBlur() {
		this.collapse()
		this.#interCont?.abort()

		// this.#internals.ariaActiveDescendantElement = this.#$root.activeElement
		console.log('onFocusOut', this.#internals)
	}

	#onFocus() {
		this.#listenInteraction()

		// this.#internals.ariaActiveDescendantElement = this.#$root.activeElement
		console.log('onFocusIn', this.#internals)
	}

	/** @returns {AbortController} */
	#listenInteraction() {
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

		this.addEventListener(
			'focusin',
			(event) => console.log('focus-in', event),
			options,
		)
		this.addEventListener(
			'focusout',
			(event) => console.log('focus-out', event),
			options,
		)

		return this.#interCont
	}

	#onClick(event_) {
		this.#toggle()
	}

	#onKeyPress(event) {
		const { key } = event
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

		console.log('onKeyPress', key)
		console.dir($focused)
		console.dir(this.#internals)
	}

	/**
	 * Toggle the `aria-expanded` state
	 */
	#toggle() {
		this.expanded ? this.collapse() : this.expand()
	}

	/**
	 * Сall returns the first option for wich the query string is started substring of the label or value option.
	 *
	 * @param {string} query
	 * @returns {Option | null}
	 */
	#search(query) {
		for (const option of this.options)
			if (
				0 === option.label.indexOf(query) ||
				0 === option.value.indexOf(query)
			)
				return option
		return null
	}
}

customElements.define(tagName, SelectField)
export default customElements.get(tagName)
