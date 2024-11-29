/// <reference path="./select-field.d.ts" />

import { TemplateInstance } from '@github/template-parts'

const tpl = new TemplateInstance(document.getElementById('tpl-select-field'))
const shadowMode = typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

const tagName = 'c-select-field'

/** @typedef {'collapsed' | 'expanded'} ListBoxState */

class SelectField extends HTMLElement {
	/** @type {ShadowRoot} */
	#shadow_

	/** @type {ElementInternals} */
	#internals_

	/** @type {boolean} */
	#interactive = false

	static formAssociated = false

	/** @type Array<SelectField.Attributes> */
	static observedAttributes = [
		'aria-expanded',
		'status-label',
		'name',
		'size',
	]

	/** @param {SelectField.Attributes} [attributes] */
	constructor(attributes = {}) {
		super()
		this.setAttribute('exportparts', 'button, listbox, value')
		this.#applyAttributes(attributes)
		this.#internals_ = this.attachInternals()
		this.#shadow_ = this.attachShadow({ mode: shadowMode })
		this.#shadow_.appendChild(tpl.cloneNode(true))
	}

	attributeChangedCallback(name, previous, current) {
		if (this.isConnected === false) return

		switch (name) {
			case 'expanded':
				this.$button.ariaExpanded = current
				break
			case 'name':
				this.$input.setAttribute('name', current)
				break
			case 'status-label':
				this.$status.ariaLabel = current
				break
			default:
				this.#internals_ = this.attachInternals()
		}
	}

	connectedCallback() {
		this.$button.addEventListener('click', () => this.toggle())
		this.addEventListener('focus', this.#onFocus)
		this.addEventListener('blur', this.#onBlur)
	}

	selectOption(idx) {
		this.options[idx].ariaSelected = true
		this.options[idx].ariaChecked = true
	}

	/**
	 * @param {ListBoxState}  [state] - New value of state
	 * @returns {ListBoxState} Current state after call
	 */
	toggle(state) {
		const { states } = this.#internals_
		const expanded =
			state === 'expanded' || states.has('expanded') === false

		if (expanded) {
			states.add('expanded')
			states.delete('collapsed')
		} else {
			states.add('collapsed')
			states.delete('expanded')
			this.#focus(this.$button)
		}
		this.ariaExpanded = expanded
		return expanded ? 'expanded' : 'collapsed'
	}

	get focused() {
		return this.#focus()
	}

	get focusedRole() {
		return this.focused.getAttribute('role')
	}

	get interactive() {
		return this.#interactive
	}

	get value() {
		const result = this.$input.value
		this.setAttribute('value', result)
		return result
	}

	set exportparts(value) {
		throw new Error(`Don't Change! ${value.toString()}`)
	}

	/** @type {HTMLDivElement} */
	get $button() {
		return this.#shadow_.querySelector('[role=button]')
	}

	/** @type {HTMLInputElement} */
	get $input() {
		return this.#shadow_.querySelector('input')
	}

	/** @type {HTMLDivElement} */
	get $status() {
		return this.#shadow_.querySelector('[role=status]')
	}

	/** @type {HTMLDivElement} */
	get $listbox() {
		return this.#shadow_.querySelector('[role=listbox]')
	}

	/** @type {NodeListOf<HTMLElement>} */
	get $options() {
		return this.$listbox.querySelectorAll('[role=option]')
	}

	/** @type {HTMLElement} */
	get $lastOption() {
		return this.$listbox.querySelectorAll('[role=option]:last-of-type')
	}

	/** @type {HTMLElement} */
	get $firstOption() {
		return this.$listbox.querySelectorAll('[role=option]:first-of-type')
	}

	#applyAttributes(attrs = {}) {
		const valid = SelectField.observedAttributes
		const pairs = Object.entries(attrs)
		const badly = pairs.filter(([attr]) => valid.includes(attr) === false)
		const goodly = pairs.filter(([attr]) => valid.includes(attr))

		if (badly.length > 0)
			console.warn(
				`Unsupported attributes: "${badly.map(([key]) => key).join(', ')}"`,
			)

		goodly.forEach(([key, value]) => this.setAttribute(key, value))
	}

	/**
	 * Set/Get focused element
	 *
	 * @param {HTMLElement} [element]
	 * @returns {HTMLElement} Current focused element
	 */
	#focus(element) {
		let focused = this.#focus()
		if (HTMLElement.prototype.isPrototypeOf(element)) {
			if (focused !== null)
				focused.removeAttribute('aria-activedescendant')
			element.setAttribute('aria-activedescendant', 'true')
			focused = element
		}
		if (focused) return focused
		else return this.#focus(this.$button)
	}

	#setInteractionHandlers() {
		if (this.#interactive === false) {
			this.addEventListener('click', this.#onClick)
			this.addEventListener('keypress', this.#onKeyPress)
			this.#interactive = true
		}
	}

	#deleteInteractionHandlers() {
		if (this.#interactive) {
			this.removeEventListener('click', this.#onClick)
			this.removeEventListener('keypress', this.#onKeyPress)
			this.#interactive = false
		}
	}

	#onFocus() {
		this.#setInteractionHandlers()
	}

	#onClick() {}

	#onKeyPress({ key }) {
		switch (key) {
			case 'Backspace':
			case 'Enter':
				if (this.focused === this.$button) {
					this.toggle('expanded')
				}
				break
			case 'Escape':
				if (this.focused !== this.$button) {
					this.toggle('collapsed')
				}
				break
			case 'End':
				this.focus(this.$lastOption)
				break
			case 'Home':
				this.focus(this.$firstOption)
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

	#onBlur() {
		this.#deleteInteractionHandlers()
		this.toggle('collapsed')
	}
}

customElements.define(tagName, SelectField)

export default customElements.get(tagName)
