/// <reference path="./select-field.d.ts" />

import { TemplateInstance } from '@github/template-parts'
import applyAttributes from '../lib/fn.applyAttributes'
import initShadowRoot from '../lib/fn.initShadowRoot'

const $template = new TemplateInstance(
	document.getElementById('tpl-select-field'),
)

const tagName = 'c-select-field'

/** @typedef {'collapsed' | 'expanded'} ListBoxState */
/** @typedef {{ label: string, value: string }} ListItem */
/** @typedef {Map<WeakRef<Element>, ListItem>} RefOptionList */
/** @typedef {ListItem & { $element: HTMLElement}} SearchResult */

class SelectField extends HTMLElement {
	#controller = new AbortController()

	/** @type {RefOptionList} */
	#options = new Map()

	/** @type {boolean} */
	#interactive = false

	/** @type {ElementInternals} */
	#internals

	/** @type {Map<string, string>} */
	#defaults

	/** @type {ShadowRoot} */
	#shadow

	static formAssociated = true

	/** @type Array<SelectField.Attributes> */
	static observedAttributes = [
		'aria-label',
		'aria-expanded',
		'aria-disabled',
		'aria-readonly',
		'value',
	]

	/** @param {SelectField.Attributes} [attributes] */
	constructor(attributes = {}) {
		super()

		this.#defaults = applyAttributes.call(this, {
			'aria-autocomplete': 'list',
			'aria-haspopup': 'listbox',
			'aria-expanded': false,
			exportparts: 'button, choice, listbox',
			role: 'combobox',
			tabindex: 0,
			...attributes,
		})

		this.#shadow = initShadowRoot.call(this, {
			$template,
			delegatesFocus: true,
		})

		this.#options = this.#observeOptionList()
		this.#internals = this.#initInternals()
	}

	connectedCallback() {
		this.#syncAccessibilityTree()
		this.#setFocusHandlers()
		this.#state('customized', true)
	}

	disconnectedCallback() {
		this.#controller.abort()
		this.#interactive = false
	}

	adoptedCallback() {}

	attributeChangedCallback(name, previous, current) {
		if (false === this.isConnected) return

		switch (name) {
			case 'aria-disabled':
				this.#state('disabled', current)
				break
			case 'aria-label':
				this.#$status.ariaLabel = current
				break
			case 'value':
				this.#internals.ariaValueNow = current
				this.#internals.setFormValue(current, 'valid')
				break
			default:
		}

		this.#syncAccessibilityTree()
	}

	stateAddedCallback(name) {
		switch (name) {
			case 'disabled':
				this.#deleteInteractionHandlers()
			case 'collapsed':
				this.setAttribute('aria-expanded', false)
				this.#internals.ariaExpanded = this.ariaExpanded
				this.#states.delete('expanded')
				this.#$active = this.#$button
				break
			case 'expanded':
				this.setAttribute('aria-expanded', true)
				this.#internals.ariaExpanded = this.ariaExpanded
				this.#states.delete('collapsed')
				break
			default:
		}
	}

	formAssociatedCallback(form) {}
	formDisabledCallback(isDisabled) {
		this.setAttribute('aria-disabled', isDisabled)
	}
	formResetCallback() {
		applyAttributes.call(this, this.#defaults)
	}
	formStateRestoreCallback(state, reason) {
		this.value = state
	}

	updateValidity(newValue) {
		if (newValue.length >= 2) {
			this.#internals.setValidity({})
			return
		}
		this.#internals.setValidity(
			{ tooShort: true },
			'value is too short',
			this.#shadow.firstChild,
		)
		this.#internals.reportValidity()
	}

	/**
	 *
	 * @param {string} query
	 * @returns {SearchResult | null}
	 */
	search(query) {
		for (const [ref, option] of this.#options)
			if (option.value.indexOf(query) === 0)
				return {
					$element: ref.deref(),
					...option,
				}
		return null
	}

	select(idx) {
		this.options[idx].ariaSelected = true
		this.options[idx].ariaChecked = true
	}

	/**
	 * @param {ListBoxState} state - New value of state
	 * @returns {ListBoxState} Current state after call
	 */
	toggle(state = null) {
		const current =
			state ?? (this.#state('collapsed') ? 'expanded' : 'collapsed')
		this.#state(current, true)
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
	get type() {
		return this.getAttribute('type') ?? 'text'
	}

	/** @type {boolean} */
	get interactive() {
		return false === this.disabled && this.#interactive
	}

	/** @type {boolean} */
	get disabled() {
		return this.#internals.ariaDisabled
	}

	/** @param {boolean} flag */
	set disabled(flag) {
		this.setAttribute('aria-disabled', Boolean(flag))
		this.setAttribute(
			'tabindex',
			this.disabled ? '-1' : this.#defaults.get('tabindex'),
		)
	}

	/** @type {string} */
	get value() {
		return this.#internals.ariaValueNow
	}

	/** @param {string} updated */
	set value(updated) {
		this.setAttribute('value', updated)
	}

	/** @type {CustomStateSet} */
	get #states() {
		return this.#internals.states
	}

	/**
	 * Returns the first element that is a descendant of element that matches selector.
	 *
	 * @param {'defined' | 'uncustomized' | 'precustomized' | 'custom' | 'collapsed' | 'expanded'} state
	 * @param {boolean} [flag]
	 * @returns {HTMLElement | null}
	 */

	#state(state, flag) {
		if (flag === true) {
			this.#states.add(state)
			this.stateAddedCallback(state)
		} else if (flag === false) {
			this.#states.delete(state)
		}
		return this.#states.has(state)
	}

	/** @returns {SelectField} */
	#setFocusHandlers() {
		this.addEventListener('click', this.#onClick, {
			signal: this.#controller.signal,
		})
		this.addEventListener('focus', this.#onFocus, {
			signal: this.#controller.signal,
		})
		this.addEventListener('blur', this.#onBlur, {
			signal: this.#controller.signal,
		})
	}

	/** @returns {SelectField} */
	#setInteractionHandlers() {
		if (false === this.#interactive) {
			this.addEventListener('click', this.#onClick, {
				signal: this.#controller.signal,
			})
			this.addEventListener('keypress', this.#onKeyPress, {
				signal: this.#controller.signal,
			})
			this.#interactive = true
		}
		return this
	}

	/** @returns {SelectField} */
	#deleteInteractionHandlers() {
		if (this.#interactive) {
			this.removeEventListener('click', this.#onClick)
			this.removeEventListener('keypress', this.#onKeyPress)
			this.#interactive = false
		}
		return this
	}

	#onFocus() {
		this.#setInteractionHandlers()
	}

	#onBlur() {
		this.#deleteInteractionHandlers()
		this.toggle('collapsed')
	}

	#onClick() {
		this.toggle()
	}

	#onKeyPress({ key }) {
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
				this.focus(this.#$lastOption)
				break
			case 'Home':
				this.focus(this.#$firstOption)
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

	/**
	 * This method allows a custom element to participate in HTML forms.
	 * The ElementInternals interface provides utilities for working with these elements in the same way you would work with any standard HTML form element, and also exposes the Accessibility Object Model to the element.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/attachInternals)
	 *
	 * @returns {ElementInternals | never}
	 */
	#initInternals() {
		const elem = this.attachInternals()

		elem.ariaActiveDescendantElement = this.#$(
			'[aria-activedescendant=true]',
		)

		console.assert(
			elem.ariaActiveDescendantElement,
			'Attribute `[aria-activedescendant]` requires specifying for some child element',
		)

		return elem
	}

	#observeOptionList() {
		/** @type {RefOptionList} */
		const list = this.#options

		const cleanup = (list) =>
			list.forEach(
				(_, ref, map) =>
					Boolean(ref.deref()?.isConnected) || map.delete(ref),
			)

		this.#$slotListbox.addEventListener(
			'slotchange',
			() => {
				const $$elements = this.#$slot.assignedElements()
				for (const $element of $$elements)
					if (
						$element.hasAttribute('role') &&
						$element.role === 'option'
					)
						list.set(new WeakRef($element), {
							label:
								$element.textContent || $element.dataset.value,
							value:
								$element.dataset.value || $element.textContent,
						})
					else $element.remove()
				cleanup(list)
			},
			{
				signal: this.#controller.signal,
			},
		)

		return list
	}

	#syncAccessibilityTree() {
		this.#internals.ariaAutoComplete = this.ariaAutoComplete
		this.#internals.ariaDisabled = this.ariaDisabled === 'true'
		this.#internals.ariaHasPopup = this.ariaHasPopup
		this.#internals.ariaExpanded = this.ariaExpanded === 'true'
		this.#internals.ariaMultiSelectable =
			this.ariaMultiSelectable === 'true'
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
		return ($parent ?? this.#shadow).querySelector(selector)
	}

	/**
	 * @type {HTMLElement}
	 *
	 * Get focused element
	 */
	get #$active() {
		return (
			this.#shadow.activeElement ??
			this.#internals.ariaActiveDescendantElement
		)
	}

	/**
	 * @param {HTMLElement} $element
	 *
	 * Set/Get focused element
	 */
	set #$active($element) {
		if (this.#$active !== null) this.#$active.ariaActiveDescendant = null

		$element.ariaActiveDescendant = true
		// this.#shadow.activeElement = $element
		this.#internals.ariaActiveDescendantElement = $element
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

	/** @type {HTMLSlotElement} */
	get #$slot() {
		return this.#$listbox.children[0]
	}

	/** @type {HTMLSlotElement} */
	get #$slotListbox() {
		return this.#$('slot[name=listbox]')
	}

	/** @type {HTMLElement} */
	get #$lastOption() {
		return this.#$('[role=option]:last-of-type', this.#$listbox)
	}

	/** @type {HTMLElement} */
	get #$firstOption() {
		return this.#$('[role=option]:first-of-type', this.#$listbox)
	}
}

customElements.define(tagName, SelectField)

export default customElements.get(tagName)
