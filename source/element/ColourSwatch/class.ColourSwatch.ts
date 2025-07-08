import CustomState from "#library/enum.custom-state.js"
import initShadowRoot from "#library/fn.initShadowRoot.js"

import template from './template.pug'

export class ColourSwatch extends HTMLElement {
	#internals: ElementInternals = this.attachInternals()
	#shadowRoot: ShadowRoot
	#styleSheet: CSSStyleSheet | null

	static readonly observedAttributes: string[] = <const>[
		'title',
		'value',
	]

	static readonly role = 'figure'
	static readonly tagName = 'e-color'

	constructor() {
		super()
		this.#shadowRoot = initShadowRoot.call(this, { mode: 'open', template })
		this.#states.add(CustomState.Defined)
	}

	attributeChangedCallback(_name, previous, current): void {
		if (previous === current) return
	}

	connectedCallback(): void {
		this.setAttribute('role', ColourSwatch.role)
	}

	get #states(): CustomStateSet {
		return this.#internals.states
	}
}