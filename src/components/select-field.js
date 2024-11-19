/// <reference path="./select-field.d.ts" />

import cssStyleSheet, { cSelectField } from '#uikit/component/select-field'

import { TemplateInstance } from '@github/template-parts'

const tpl = new TemplateInstance(document.getElementById('tpl-select-field'))
const shadowMode = typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

const tagName = cSelectField

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

	constructor() {
		super()
		this.setAttribute('exportparts', 'button, listbox, value')
		this.#internals_ = this.attachInternals()
		this.#shadow_ = this.attachShadow({ mode: shadowMode })
		this.#shadow_.appendChild(tpl.cloneNode(true))
	}

	connectedCallback() {
		this.#shadow_.adoptedStyleSheets.push(cssStyleSheet)
		this.toggle(false)
	}

	selectOption(idx) {
		this.options[idx].ariaSelected = true
		this.options[idx].ariaChecked = true
	}

	$byID(elId) {
		return this.#shadow_.getElementById(elId)
	}

	get listbox() {
		return this.#shadow_.querySelector('[role=listbox]')
	}

	get button() {
		return this.#shadow_.querySelector('[role=button]')
	}

	get options() {
		return this.#shadow_.querySelectorAll('[role=option]')
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

	onFocus(event, $anchor) {
		console.log('[EVENT]:', event, $anchor)
	}
	static OnClick(event, $anchor) {
		console.log('[EVENT]:', event, $anchor)
	}
}

customElements.define(tagName, SelectField)

export default customElements.get(tagName)
