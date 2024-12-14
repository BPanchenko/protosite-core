/// <reference path="./arrow.d.ts" />

import cssStyleSheet, { cArrow } from '#uikit/component/arrow'

import applyAttributes from '../lib/fn.applyAttributes'
import checkFontFace from '../lib/fn.checkFontFace'
import initShadowRoot from '../lib/fn.initShadowRoot'

const tagName = cArrow
const template = `<i data-glyph=arrow><slot>&nbsp;</slot></i>`

/**
 * @typedef {object} State
 * @property {Direction | Direction[]} direction
 * @property {Figure | Figure[]} figure
 * @property {Style | Style[]} style
 * */

/** @implements {Arrow.WebComponent} */
export class ArrowComponent extends HTMLElement {
	/** @type {ShadowRoot} */
	#shadow_

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
	static sizes = ['sm', 'md', 'lg', 'xl', 'xxs', 'xs', 'xxl']

	/** @param {Arrow.Attributes} [attributes] */
	constructor(attributes = {}) {
		super()

		applyAttributes(this, attributes)

		this.#shadow_ = initShadowRoot.call(this, {
			template,
			delegatesFocus: true,
			serializable: true,
		})
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
		this.#shadow_.adoptedStyleSheets.push(cssStyleSheet)
		this.#applyGlyph()
		;['font', 'size']
			.filter((attr) => this.hasAttribute(attr))
			.forEach((attr) => (this[attr] = this.getAttribute(attr)))
	}

	#applyGlyph() {
		const [direction, figure, glyph, style, weight] = [
			'direction',
			'figure',
			'glyph',
			'style',
			'weight',
		].map((attr) => this.hasAttribute(attr) && this.getAttribute(attr))

		const value =
			glyph ||
			['arrow', weight, direction, figure, style]
				.filter((i) => Boolean(i))
				.join('-')

		this.#root.dataset.glyph = value
	}

	get #root() {
		return this.#shadow_.firstChild
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
