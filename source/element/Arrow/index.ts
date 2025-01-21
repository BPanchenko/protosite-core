import initShadowRoot from '#library/fn.initShadowRoot'

import cssStyleSheet from '#uikit/shadow-host/element.arrow.mjs'
import {
	validDirectionValues,
	validFigureValues,
	validStyleValues,
	validWeightValues,
} from './manual'

const template = `<div data-glyph=arrow part=icon></div><slot></slot>`

export class ArrowElement extends HTMLElement {
	#shadowRoot: ShadowRoot

	static readonly observedAttributes: string[] = [
		'glyph-direction',
		'glyph-figure',
		'glyph-style',
		'glyph-weight',
	]

	static readonly role = 'img'
	static readonly tagName = 'e-arrow'

	static readonly directions: Readonly<Direction[]> = validDirectionValues
	static readonly figures: Readonly<Figure[]> = validFigureValues
	static readonly styles: Readonly<Style[]> = validStyleValues
	static readonly weights: Readonly<Weight[]> = validWeightValues

	constructor() {
		super()
		this.#shadowRoot = initShadowRoot.call(this, {
			template,
			delegatesFocus: true,
			serializable: true,
		})
	}

	attributeChangedCallback(name, previous, current) {
		if (this.isConnected === false) return
		if (previous === current) return

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
		this.#shadowRoot.adoptedStyleSheets.push(cssStyleSheet)
		this.setAttribute('role', ArrowElement.role)
		this.#applyGlyph()
	}

	#applyGlyph() {
		const glyphNameParts: string[] = ['arrow']

		const [direction, figure, style, weight] = [
			'glyph-direction',
			'glyph-figure',
			'glyph-style',
			'glyph-weight',
		].map((attr) => this.getAttribute(attr))

		if (weight !== null) {
			if (isValidWeight(weight)) glyphNameParts.push(weight)
			else throw new TypeError(`Unsupported Weight "${weight}"`)
		}

		if (direction !== null) {
			if (isValidDirection(direction)) glyphNameParts.push(direction)
			else throw new TypeError(`Unsupported Direction "${direction}"`)
		}

		if (figure !== null) {
			if (isValidFigure(figure)) glyphNameParts.push(figure)
			else throw new TypeError(`Unsupported Figure "${figure}"`)
		}

		if (style !== null) {
			if (isValidStyle(style)) glyphNameParts.push(style)
			else throw new TypeError(`Unsupported Style "${style}"`)
		}

		this.#$icon.dataset.glyph = glyphNameParts.join('-')
	}

	get #$icon(): HTMLDivElement {
		return this.#shadowRoot.firstChild as HTMLDivElement
	}
}

export type Direction = (typeof validDirectionValues)[number]
export type Figure = (typeof validFigureValues)[number]
export type Style = (typeof validStyleValues)[number]
export type Weight = (typeof validWeightValues)[number]

export const isValidDirection = (value: string): value is Direction => {
	return ArrowElement.directions.includes(value as Direction)
}

export const isValidFigure = (value: string): value is Figure => {
	return ArrowElement.figures.includes(value as Figure)
}

export const isValidStyle = (value: string): value is Style => {
	return ArrowElement.styles.includes(value as Style)
}

export const isValidWeight = (value: string): value is Weight => {
	return ArrowElement.weights.includes(value as Weight)
}

customElements.define(ArrowElement.tagName, ArrowElement)
export default customElements.get(ArrowElement.tagName)
