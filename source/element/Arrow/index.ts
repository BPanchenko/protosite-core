import CustomState from '#library/enum.custom-state'
import initShadowRoot from '#library/fn.initShadowRoot'

import {
	validDirectionValues,
	validFigureValues,
	validStyleValues,
	validWeightValues,
} from './manual'

import template from './template.pug'

const isExistingGlyph = (
	name: string,
	styleSheet: CSSStyleSheet | null,
): boolean => {
	if (styleSheet === null || false === Boolean(styleSheet?.cssRules)) {
		return true
	} else
		for (const rule of styleSheet.cssRules)
			if (
				(rule as CSSStyleRule).selectorText === `[data-glyph="${name}"]`
			)
				return true
	return false
}

export class ArrowElement extends HTMLElement {
	#internals: ElementInternals = this.attachInternals()
	#shadowRoot: ShadowRoot
	#styleSheet: CSSStyleSheet | null

	static readonly observedAttributes: string[] = <const>[
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
		this.#shadowRoot = initShadowRoot.call(this, { template })
		this.#states.add(CustomState.Defined)
	}

	attributeChangedCallback(name_, previous, current) {
		if (previous === current) return
		this.#applyGlyph()
	}

	connectedCallback() {
		// (1)
		this.setAttribute('role', ArrowElement.role)

		// (2)
		this.#$linkStyle.onload = ({ currentTarget }) => {
			this.#styleSheet = (currentTarget as HTMLLinkElement).sheet
			this.#states.add(CustomState.Loaded)
		}
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
			isExistingGlyph(glyphName, this.#styleSheet),
			`Unsupported Glyph: ${glyphName}`,
		)

		this.#$icon.dataset.glyph = glyphName
	}

	get #$icon(): HTMLDivElement {
		return this.#shadowRoot.getElementById(
			'icon-container',
		) as HTMLDivElement
	}

	get #$linkStyle(): HTMLLinkElement {
		return this.#shadowRoot.getElementById(
			'link-styling',
		) as HTMLLinkElement
	}

	get #states(): CustomStateSet {
		return this.#internals.states
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
