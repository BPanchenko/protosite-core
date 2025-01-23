import initShadowRoot from '#library/fn.initShadowRoot'

import * as css from '#uikit/shadow-host/element.arrow.mjs'
import {
	validDirectionValues,
	validFigureValues,
	validStyleValues,
	validWeightValues,
} from './manual'

const isExistingGlyph = (name: string): boolean => {
	for (const rule of css.styleSheet.cssRules)
		if ((rule as CSSStyleRule).selectorText === `[data-glyph="${name}"]`)
			return true
	return false
}

const template = `<div data-glyph=arrow class="${css.icon}"></div><slot></slot>`

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

	attributeChangedCallback(name_, previous, current) {
		if (previous === current) return
		this.#applyGlyph()
	}

	connectedCallback() {
		this.#shadowRoot.adoptedStyleSheets.push(css.styleSheet)
		this.setAttribute('role', ArrowElement.role)
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
			else throw new TypeError(`Invalid Weight: ${weight}`)
		}

		if (direction !== null) {
			if (isValidDirection(direction)) glyphNameParts.push(direction)
			else throw new TypeError(`Invalid Direction: ${direction}`)
		}

		if (figure !== null) {
			if (isValidFigure(figure)) glyphNameParts.push(figure)
			else throw new TypeError(`Invalid Figure: ${figure}`)
		}

		if (style !== null) {
			if (isValidStyle(style)) glyphNameParts.push(style)
			else throw new TypeError(`Invalid Style: ${style}`)
		}

		const glyphName = glyphNameParts.join('-')
		console.assert(
			isExistingGlyph(glyphName),
			`Unsupported Glyph: ${glyphName}`,
		)

		this.#$icon.dataset.glyph = glyphName
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
