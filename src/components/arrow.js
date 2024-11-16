/// <reference path="./arrow.d.ts" />

import { checkFontFace } from '../helpers'
import { SIZES } from '../constants'
import cssStyleSheet, { cArrow } from '#uikit/component/arrow'

const shadowMode = typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

const tagName = cArrow
const shadowHTML = `<i data-glyph=arrow><slot>&nbsp;</slot></i>`

/**
 * @typedef {object} State
 * @property {Direction | Direction[]} direction
 * @property {Figure | Figure[]} figure
 * @property {Style | Style[]} style
 * */

/** @implements {Arrow.WebComponent} */
export class ArrowComponent extends HTMLElement {
	#shadow

	/** @type Array<string> */
	static observedAttributes = [
		'direction',
		'figure',
		'font',
		'glyph',
		'size',
		'style',
		'weight',
	]
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

		switch (name) {
			case 'font':
			case 'size':
				this[name] = current
				break
			default:
				this.#applyGlyph()
		}
	}

	connectedCallback() {
		this.#shadow.adoptedStyleSheets.push(cssStyleSheet)
		this.#applyGlyph()
		;['font', 'size']
			.filter((attr) => this.hasAttribute(attr))
			.forEach((attr) => (this[attr] = this.getAttribute(attr)))
	}

	#applyAttributes(attrs = {}) {
		const valid = ArrowComponent.observedAttributes
		const pairs = Object.entries(attrs)
		const badly = pairs.filter(([attr]) => valid.includes(attr) === false)
		const goodly = pairs.filter(([attr]) => valid.includes(attr))

		if (badly.length > 0)
			console.warn(
				`Unsupported attributes: "${badly.map(([key]) => key).join(', ')}"`,
			)

		goodly.forEach(([key, value]) => this.setAttribute(key, value))
	}

	#applyGlyph() {
		const [direction, figure, glyph, style, weight] = [
			'direction',
			'figure',
			'glyph',
			'style',
			'weight',
		].map((attr) => this.hasAttribute(attr) && this.getAttribute(attr))

		const value = ['arrow']
			.concat(glyph || [weight, direction, figure, style])
			.filter((i) => Boolean(i))
			.join('-')

		this.#root.dataset.glyph = value
	}

	get #root() {
		return this.#shadow.firstChild
	}

	set font(value) {
		if (value) {
			console.assert(checkFontFace(value), `Unsupported Font: "${value}"`)
			this.#root.style.setProperty('--icon-font', value)
		} else {
			this.#root.style.removeProperty('--icon-font')
		}
	}

	set size(value) {
		console.assert(
			ArrowComponent.sizes.includes(value),
			`Wrong size: "${value}"`,
		)

		ArrowComponent.sizes.forEach((size) => {
			const className = 's-' + size
			size === value
				? this.#root.classList.add(className)
				: this.#root.classList.remove(className)
		})
	}
}

customElements.define(tagName, ArrowComponent)

export default customElements.get(tagName)
