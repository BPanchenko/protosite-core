import updateAttributes from '#library/fn.updateAttributes.js'
import type { CustomElement } from '#types/iface.CustomElement'

export const tagName = 'e-listbox'

export class Listbox extends HTMLElement implements CustomElement {
	readonly internals = this.attachInternals()

	#focusCont: AbortController
	#interCont: AbortController

	static formAssociated = false
	static role = 'listbox'

	static observedAttributes = [
		'aria-disabled',
		'aria-multiselectable',
		'aria-required',
		'name',
	]

	static initAttributes(element) {
		const data = {
			'aria-orientation': element.ariaOrientation ?? 'vertical',
			id: element.id,
			role: Listbox.role,
		}

		// [id]

		if (element.isConnected && false === Boolean(data.id)) {
			data.id = [Listbox.role, Math.round(performance.now())].join('-')
		}

		return updateAttributes(element, data)
	}

	constructor() {
		super()
		Listbox.initAttributes(this)
	}

	connectedCallback() {
		Listbox.initAttributes(this)
		this.#listenFocus()
	}

	disconnectedCallback() {
		this.#interCont?.abort()
		this.#focusCont?.abort()
	}

	#listenFocus() {
		this.#focusCont?.abort()
		this.#focusCont = new AbortController()

		const options = {
			signal: this.#focusCont.signal,
		}

		this.addEventListener('focus', (event) => this.#onFocus(event), options)
		this.addEventListener('blur', (event) => this.#onBlur(event), options)

		return this.#focusCont
	}

	#onBlur(event_) {
		this.#interCont?.abort()
	}

	#onFocus(event_) { }
}

customElements.define(tagName, Listbox)
export default customElements.get(tagName)
