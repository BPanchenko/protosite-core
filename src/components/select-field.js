/// <reference path="./select-field.d.ts" />

import { cSelectField } from '#uikit/component/select-field'

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
		this.#internals_ = this.attachInternals()
		this.ariaActivedescendant = true
		this.ariaExpanded = true
		this.#internals_.ariaExpanded = true
		this.#internals_.states.add('expanded')
		this.#shadow_ = this.attachShadow({ mode: shadowMode })
		// this.#internals_.ariaChecked = true
		// this.#internals_.ariaSelected = true
		this.#internals_.ariaActivedescendant = true
	}

	connectedCallback() {
		this.#shadow_.appendChild(tpl.cloneNode(true))
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

	get internals() {
		return this.#internals_
	}

	get options() {
		return this.#shadow_.querySelectorAll('[role=option]')
	}

	/** @type {(state: null || 'collapsed' | 'expanded')) => state} */
	toggle(state = null) {
		this.#internals_.ariaExpanded =
			state === 'expanded' || !this.#internals_.ariaExpanded
	}

	static OnClick(event, $anchor) {
		console.log('[EVENT]:', event, $anchor)
	}
}

customElements.define(tagName, SelectField)

export default customElements.get(tagName)
