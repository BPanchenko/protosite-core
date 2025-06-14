import CustomState from '#library/enum.custom-state'
import initShadowRoot from '#library/fn.initShadowRoot'

import {
	isExistingGlyph,
	isValidDirection,
	isValidFigure,
	isValidStyle,
	isValidWeight,
	validDirectionValues,
	validFigureValues,
	validStyleValues,
	validWeightValues,
} from './library'

import template from './template.pug'

import type { Direction, Figure, Style, Weight } from './types.d.ts'

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
		this.#shadowRoot = initShadowRoot.call(this, { mode: 'open', template })
		this.#states.add(CustomState.Defined)
	}

	attributeChangedCallback(_name, previous, current): void {
		if (previous === current) return
		this.#applyGlyph()
	}

	connectedCallback(): void {
		// (1)
		this.setAttribute('role', ArrowElement.role)
		this.#states.add(CustomState.Loaded)
	}

	#applyGlyph(): void {
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
			'icon',
		) as HTMLDivElement
	}

	get #states(): CustomStateSet {
		return this.#internals.states
	}
}

export type {
	Direction as ArrowDirection, Figure as ArrowFigure,
	Style as ArrowStyle,
	Weight as ArrowWeight
}

