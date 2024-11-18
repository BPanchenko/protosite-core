/// <reference path="./arrow.d.ts" />

import { cSelectField } from '#uikit/component/select-field'

// const shadowMode = typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

const tagName = cSelectField
const shadowHTML = ``

/**
 * @typedef {object} State
 * @property {Direction | Direction[]} direction
 * @property {Figure | Figure[]} figure
 * @property {Style | Style[]} style
 * */

/** @implements {SelectField.ElementInternals} */

class SelectField extends HTMLElement {
	/** @type {ElementInternals} */
	#internals_

	/** @type {ElementInternals} */
	#state_

	static formAssociated = true

	constructor() {
		super()
		this.#internals_ = this.attachInternals()
		this.#internals_.states.add('expanded')
		// this.#internals_.ariaChecked = true
		// this.#internals_.ariaSelected = true

		console.log(this.#internals_, this.#internals_.states)
	}

	connectedCallback() {

	}

	selectOption(idx) {}

	get internals() {
		return this.#internals_
	}

	get state() {
		return this.#state_
	}
}

customElements.define(tagName, SelectField)

export default customElements.get(tagName)
