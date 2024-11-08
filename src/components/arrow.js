/// <reference path="../../@types/index.d.ts" />

import cssStyleSheet, { cArrow } from '#uikit/component/arrow'
import { SIZES } from '../constants'

const shadowMode = typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

const tagName = cArrow
const shadowHTML = `<i data-glyph=loop><slot>&nbsp;</slot></i>`

/**
 * @typedef {object} State
 * @property {Direction | Direction[]} direction
 * @property {Figure | Figure[]} figure
 * @property {Style | Style[]} style
 * */

/** @implements {Arrow.WebComponent} */
export class ArrowComponent extends HTMLElement {
	#glyph = 'right-angle-left-top-fill-angled'
	#shadow

	/** @type State */
	#state = {
		direction: null,
		figure: null,
		style: null,
		weight: null,
	}

	/** @type Array<string> */
	static observedAttributes = ['direction', 'figure', 'style', 'weight']
	static sizes = SIZES

	/** @param {Arrow.Attributes} [attributes] */
	constructor(attributes = {}) {
		super()
		this.#applyAttributes(attributes)
		this.#shadow = this.attachShadow({ mode: shadowMode })
		this.#shadow.innerHTML = shadowHTML
	}

	attributeChangedCallback(name, previous, current) {
		if (this.isConnected === false) return

		if (name === 'size') {
			this.#applySize(current)
		} else {
			this.#state[name] = current
			this.#updateGlyph()
		}
	}

	connectedCallback() {
		this.#shadow.adoptedStyleSheets.push(cssStyleSheet)
		this.#applySize()
		this.#updateGlyph()
	}

	#applyAttributes(attrs = {}) {
		const valid = ArrowComponent.observedAttributes
		const pairs = Object.entries(attrs)
		const badly = pairs.filter(([attr]) => valid.includes(attr) === false)
		const goodly = pairs.filter(([attr]) => valid.includes(attr))

		goodly.forEach(([key, value]) => this.setAttribute(key, value))
		if (badly.length > 0)
			console.warn(
				`Unsupported attributes: "${badly.map(([key]) => key).join(', ')}"`,
			)
	}

	#applySize(value) {
		const size = value ?? this.getAttribute('size')

		ArrowComponent.sizes.forEach((size) =>
			this.#root.classList.remove('s-' + size),
		)

		if (size) {
			console.assert(
				ArrowComponent.sizes.includes(size),
				`Wrong size: "${size}"`,
			)
			this.#root.classList.add('s-' + size)
		}

		console.log(size)
	}

	hasParent(sel = '.c-panel') {
		return this.closest(sel) !== null
	}

	get #root() {
		return this.#shadow.firstChild
	}

	#updateGlyph() {
		this.#glyph = [
			'arrow',
			this.#state.weight,
			this.#state.direction,
			this.#state.figure,
			this.#state.style,
		]
			.filter((i) => Boolean(i))
			.join('-')

		this.#root.dataset.glyph = this.#glyph

		return this.#glyph
	}
}

customElements.define(tagName, ArrowComponent)

export default customElements.get(tagName)
