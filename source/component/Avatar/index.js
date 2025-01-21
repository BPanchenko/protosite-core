import cssStyleSheet from '#uikit/shadow-host/component.avatar.mjs'

import createElement from '#library/fn.createElement.ts'
import initShadowRoot from '#library/fn.initShadowRoot.ts'
import updateAttributes from '#library/fn.updateAttributes.ts'

const template = `<div part=root><slot></slot></div>`

export class AvatarComponent extends HTMLElement {
	#$ = new Map()

	/** @type {ShadowRoot} */
	#shadowRoot

	static observedAttributes = ['src', 'href', 'target']
	static tagName = 'c-avatar'

	/** @param {Avatar.Attributes} [attributes] */
	constructor(attributes = {}) {
		super()

		updateAttributes(this, attributes)

		this.#shadowRoot = initShadowRoot.call(this, {
			template,
			delegatesFocus: true,
			serializable: true,
		})
	}

	attributeChangedCallback(name) {
		if (this.isConnected === false) return
		switch (name) {
			case 'href':
			case 'target':
				this.#renderLink()
				this.#renderImage()
				break
			case 'src':
				this.#renderImage()
				break
		}
	}

	connectedCallback() {
		this.#shadowRoot.adoptedStyleSheets.push(cssStyleSheet)

		this.#renderLink()
		this.#renderImage()
	}

	#renderLink() {
		const href = this.getAttribute('href')
		const target = this.getAttribute('target') ?? '_self'
		if (href) {
			if (this.#$.has('link')) {
				const $link = this.#$.get('link')
				$link.setAttribute('href', href)
				$link.setAttribute('target', target)
			} else {
				this.#$.set('link', createElement('a', { href, target }))
				this.appendChild(this.#$.get('link'))
			}
		} else if (this.#$.has('link')) {
			this.#$.get('link').remove()
			this.#$.delete('link')
		}
	}

	#renderImage() {
		const source = this.getAttribute('src')
		if (source) {
			if (this.#hasParentPanel) {
				this.#$root.style.backgroundImage = `url(${source})`
			} else {
				if (this.#$.has('image'))
					this.#$.get('image').setAttribute('src', source)
				else this.#$.set('image', createElement('src', { src: source }))
				if (this.#$.has('link'))
					this.#$.get('link').appendChild(this.#$.get('image'))
				else this.appendChild(this.#$.get('image'))
			}
		} else if (this.#$.has('image')) {
			this.#$.get('image').remove()
			this.#$.delete('image')
		} else {
			delete this.#$root.style.backgroundImage
		}
	}

	get #hasParentPanel() {
		return this.closest('.c-panel') !== null
	}

	get #$root() {
		return this.#shadowRoot.firstChild
	}
}

customElements.define(AvatarComponent.tagName, AvatarComponent)

export default customElements.get(AvatarComponent.tagName)
