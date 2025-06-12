import initShadowRoot from '#library/fn.initShadowRoot'
import updateAttributes from '#library/fn.updateAttributes'

import CustomState from '#library/enum.custom-state'

import template from './template.pug'

class AvatarComponent extends HTMLElement {
	#shadowRoot: ShadowRoot
	#internals: ElementInternals = this.attachInternals()

	static readonly observedAttributes: string[] = <const>[
		'alt',
		'href',
		'src',
		'tabindex',
		'target',
	]
	static readonly role = 'img'
	static readonly tagName = 'c-avatar'

	static initAttributes(element: AvatarComponent) {
		const data = {
			'aria-atomic': true,
			exportparts: 'mask',
			role: this.role,
		}

		return updateAttributes(element, data)
	}

	constructor() {
		super()
		this.#shadowRoot = initShadowRoot.call(this, {
			template,
			delegatesFocus: true,
		})
		this.#states.add(CustomState.Defined)
	}

	/**
	 * All changes are passed to child nodes
	 */
	attributeChangedCallback(
		name: string,
		previous: string | null,
		current: string | null,
	) {
		if (this.isConnected === false) return
		if (previous === current) return

		const $child = ['href', 'target', 'tabindex'].includes(name)
			? this.#$link
			: ['alt', 'src'].includes(name)
				? this.#$image
				: null

		if ($child === null) return
		else if (current === null) $child.removeAttribute(name)
		else if (name === 'tabindex') $child.setAttribute(name, '0')
		else $child.setAttribute(name, current)
	}

	get #$link(): HTMLElement {
		return this.#shadowRoot.getElementById('link') as HTMLElement
	}

	get #$image(): HTMLElement | never {
		const $element = this.#shadowRoot.getElementById('image')
		if ($element === null)
			throw new Error('Image element not found but required!')
		return $element
	}

	get #states(): CustomStateSet {
		return this.#internals.states
	}
}

export type { AvatarComponent }
export default AvatarComponent
