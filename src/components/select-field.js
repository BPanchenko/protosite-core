/// <reference path="./select-field.d.ts" />

import { TemplateInstance } from '@github/template-parts'

const tpl = new TemplateInstance(document.getElementById('tpl-select-field'))
const shadowMode = typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

const tagName = 'c-select-field'

/**
 * @typedef {object} State
 * @property {Direction | Direction[]} direction
 * @property {Figure | Figure[]} figure
 * @property {Style | Style[]} style
 * */

class SelectField extends HTMLElement {
	/** @type {ShadowRoot} */
	#shadow_

	/** @type {ElementInternals} */
	#internals_

	static formAssociated = true

	/** @type Array<SelectField.Attributes> */
	static observedAttributes = ['expanded', 'status-label', 'name', 'size']

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
		this.toggle(false)
	}

	selectOption(idx) {
		this.options[idx].ariaSelected = true
		this.options[idx].ariaChecked = true
	}

	$byID(elId) {
		return this.#shadow_.getElementById(elId)
	}

	get $button() {
		return this.#shadow_.querySelector('[role=button]')
	}

	/**
	 * @type {HTMLInputElement}
	 *
	 * Resizes the component. The default size is defined in UIKit.
	 *
	 * [MDN Reference](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/get)
	 */
	get $input() {
		return this.#shadow_.querySelector('input')
	}

	get $listbox() {
		return this.#shadow_.querySelector('[role=listbox]')
	}

	get $options() {
		return this.#shadow_.querySelectorAll('[role=option]')
	}

	get $status() {
		return this.#shadow_.querySelector('[role=status]')
	}

	/** @param {Array<string>} selector */
	/*

	$options(selector) {
		return this.#shadow_.querySelectorAll('[role=option]')
	}
	*/

	get value() {
		const result = this.$input.value
		this.setAttribute('value', result)
		return result
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

	set exportparts(value) {
		throw new Error(`Don't Change! ${value.toString()}`)
	}

	/** @type {(state: null || 'collapsed' | 'expanded')) => state} */
	toggle(state = null) {
		this.#internals_.ariaExpanded =
			state === 'expanded' || !this.#internals_.ariaExpanded

		if (this.#internals_.ariaExpanded) {
			this.#internals_.states.delete('collapsed')
			this.#internals_.states.add('expanded')
		} else {
			this.#internals_.states.delete('expanded')
			this.#internals_.states.add('collapsed')
		}
	}

	static onFocus(ctx, event) {
		console.log('[EVENT]:', event, ctx)
	}
	static OnClick(ctx, event) {
		console.log('[EVENT]:', event, ctx)
	}

	static onKeyUp(ctx, event) {
		console.log('[EVENT]:', event, ctx)
	}
}

customElements.define(tagName, SelectField)

export default customElements.get(tagName)

/**
 *
 */
