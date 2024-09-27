import uikitStyleSheet, { cAvatar, cssText } from '#uikit/component/avatar'

const stylesheet = cssText ? new CSSStyleSheet(cssText) : uikitStyleSheet
const tagName = cAvatar
const shadowHTML = `
	<figure class="${cAvatar}">
		<slot name="image"></slot>
	</figure>
`.replace(/([\n\t]+)/g, '')
const lightHTML = '<img slot="image">'

class AvatarComponent extends HTMLElement {
	#$ = new Map()
	#shadow

	static observedAttributes = ['data-image', 'data-link']

	constructor(dataset) {
		super()
		Object.assign(this.dataset, dataset)
		this.#shadow = this.attachShadow({ mode: SHADOW_MODE ?? 'closed' })
		this.#shadow.adoptedStyleSheets.push(stylesheet)
		this.#shadow.innerHTML = shadowHTML
	}

	attributeChangedCallback(name, previos, current) {
		if (this.isConnected === false) return

		const $image = this.#$.get('image')

		switch (name) {
			case 'data-image':
				if (current) {
					$image.setAttribute('src', current)
				} else {
					$image.removeAttribute('src')
				}
				if (!previos && current) this.appendChild($image)
				if (!current) $image.remove()
				break
			case 'data-link':
			default:
		}
	}

	connectedCallback() {
		this.insertAdjacentHTML('afterbegin', lightHTML)
		this.#$.set('image', this.querySelector('img[slot=image]'))

		if (this.dataset.image) {
			this.#$.get('image').setAttribute('src', this.dataset.image)
		} else {
			this.#$.get('image').remove()
		}
	}
}

customElements.define(tagName, AvatarComponent)

export const settings = { cssText, tagName, shadowHTML, lightHTML }
export default customElements.get(tagName)
