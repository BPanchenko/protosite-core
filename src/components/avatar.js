/// <reference path="../../@types/index.d.ts" />

import cssStyleSheet, { cAvatar } from '#uikit/component/avatar'
import { SIZES } from '../constants'
import { createElement } from '../helpers'

const shadowMode = typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

const tagName = cAvatar
const shadowHTML = `<figure class="${cAvatar}"><slot></slot></figure>`

/** @implements {Avatar.WebComponent} */
export class AvatarComponent extends HTMLElement {
	#$ = new Map()
	#shadow

	static observedAttributes = ['src', 'size', 'href', 'target']
	static sizes = SIZES

	/** @param {Avatar.Attributes} [attributes] */
	constructor(attributes = {}) {
		super()
		this.#applyAttributes(attributes)
		this.#shadow = this.attachShadow({ mode: shadowMode })
		this.#shadow.innerHTML = shadowHTML
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
			case 'src':
				this.#renderImage()
				break
		}
	}

	connectedCallback() {
		this.#shadow.adoptedStyleSheets.push(cssStyleSheet)
		this.#applySize()
		this.#renderLink()
		this.#renderImage()
	}

	#applyAttributes(attrs = {}) {
		const valid = AvatarComponent.observedAttributes
		const pairs = Object.entries(attrs)
		const badly = pairs.filter(([attr]) => valid.includes(attr) === false)
		const goodly = pairs.filter(([attr]) => valid.includes(attr))

		goodly.forEach(([key, value]) => this.setAttribute(key, value))
		if (badly.length > 0)
			console.warn(
				`Unsupported attributes: "${badly.map(([key]) => key).join(', ')}"`,
			)
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
		const src = this.getAttribute('src')
		if (src) {
			if (this.#hasParentPanel) {
				this.#root.style.backgroundImage = `url(${src})`
			} else {
				if (this.#$.has('image'))
					this.#$.get('image').setAttribute('src', src)
				else this.#$.set('image', createElement('img', { src }))
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
		return this.#shadow.firstChild
	}
}

customElements.define(tagName, AvatarComponent)

export default customElements.get(tagName)
