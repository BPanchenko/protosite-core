/// <reference path="./types.d.ts" />

import cssStyleSheet, { cAvatar, cAvatarLink } from '#uikit/component/avatar'

import applyAttributes from '#lib/fn.applyAttributes.js'
import createElement from '#lib/fn.createElement.js'
import initShadowRoot from '#lib/fn.initShadowRoot.js'

export const tagName = cAvatar
const template = `<div role=img><slot></slot></div>`

/** @implements {Avatar.WebComponent} */
export class AvatarComponent extends HTMLElement {
	#$ = new Map()

	/** @type {ShadowRoot} */
	#shadow_

	static observedAttributes = ['img', 'size', 'href', 'target']
	static sizes = ['sm', 'md', 'lg', 'xl', 'xxs', 'xs', 'xxl']

	/** @param {Avatar.Attributes} [attributes] */
	constructor(attributes = {}) {
		super()

		applyAttributes(this, attributes)

		this.#shadow_ = initShadowRoot.call(this, {
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
			case 'size':
				this.#applySize()
				break
			case 'img':
				this.#renderImage()
				break
		}
	}

	connectedCallback() {
		this.#shadow_.adoptedStyleSheets.push(cssStyleSheet)

		this.#applySize()
		this.#renderLink()
		this.#renderImage()
	}

	#applySize() {
		const size = this.getAttribute('size')
		if (size) {
			console.assert(
				AvatarComponent.sizes.includes(size),
				`Wrong size: "${size}"`,
			)
			this.#root.classList.add('s-' + size)
		} else {
			AvatarComponent.sizes.forEach((size) =>
				this.#root.classList.remove('s-' + size),
			)
		}
	}

	#renderLink() {
		const className = cAvatarLink
		const href = this.getAttribute('href')
		const target = this.getAttribute('target') ?? '_self'
		if (href) {
			if (this.#$.has('link')) {
				const $link = this.#$.get('link')
				$link.setAttribute('href', href)
				$link.setAttribute('target', target)
			} else {
				this.#$.set(
					'link',
					createElement('a', { className, href, target }),
				)
				this.appendChild(this.#$.get('link'))
			}
		} else if (this.#$.has('link')) {
			this.#$.get('link').remove()
			this.#$.delete('link')
		}
	}

	#renderImage() {
		const source = this.getAttribute('img')
		if (source) {
			if (this.#hasParentPanel) {
				this.#root.style.backgroundImage = `url(${source})`
			} else {
				if (this.#$.has('image'))
					this.#$.get('image').setAttribute('src', source)
				else this.#$.set('image', createElement('img', { src: source }))
				if (this.#$.has('link'))
					this.#$.get('link').appendChild(this.#$.get('image'))
				else this.appendChild(this.#$.get('image'))
			}
		} else if (this.#$.has('image')) {
			this.#$.get('image').remove()
			this.#$.delete('image')
		} else {
			delete this.#root.style.backgroundImage
		}
	}

	get #hasParentPanel() {
		return this.closest('.c-panel') !== null
	}

	get #root() {
		return this.#shadow_.firstChild
	}
}

customElements.define(tagName, AvatarComponent)

export default customElements.get(tagName)
