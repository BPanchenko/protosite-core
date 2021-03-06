/**
 * Component: `c-avatar`
 *
 * Markup: <c-avatar
 *			data-src="..."
 *			data-href="..."
 *			data-size="xsmall|small|medium|large|xlarge"
 *			data-shadow="inset|2dp|3dp|4dp|6dp|8dp|16dp|24dp"
 * />
 */

;{
	const CLS = Object.create(null, {
		'main': { value: 'c-avatar' }

		, 'link': { value: 'c-avatar__link' }
		, 'img': { value: 'c-avatar__image' }
		, 'xs': { value: 'c-avatar--xs' }
		, 'sm': { value: 'c-avatar--sm' }
		, 'md': { value: 'c-avatar--md' }
		, 'lg': { value: 'c-avatar--lg' }
		, 'xl': { value: 'c-avatar--xl' }
	})

	class AvatarElement extends HTMLElement {

		static get observedAttributes() {
			return ['data-shadow', 'data-size']
		}
		
		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue === newValue) return null

			switch (name) {
				case 'data-size':
					if (!~['xs','sm','md','lg','xl'].indexOf(newValue)) {
						console.warn("Size can take values 'xs', 'sm', 'md', 'lg' or 'xl'")
						return null
					}
					this._container.classList.remove(oldValue)
					this._container.classList.add(newValue)
					break
				
				case 'data-shadow':
					if (!~['2dp','3dp','4dp','6dp','8dp','16dp','24dp'].indexOf(newValue)) {
						console.warn("Shadow can take values '2dp', '3dp', '4dp', '6dp', '8dp', '16dp' or '24dp'")
						return null
					}
					this._container.classList.remove(`s-shadow-${oldValue}`)
					this._container.classList.add(`s-shadow-${newValue}`)
					break
			}
		}

		connectedCallback() {
			this._children = Array.from(this.children)
			this.render().cleanup()
		}

		render() {
			let { src, href, size, shadow, target } = this.dataset
			
			this._container = document.createElement('figure')
			this._container.classList.add(CLS.main)
			this.appendChild(this._container)
			
			if (~['xs','sm','md','lg','xl'].indexOf(size)) {
				this._container.classList.add(CLS[size])
			} else if (size) {
				console.warn("Size can take values 'xs', 'sm', 'md', 'lg' or 'xl'")
			}

			if (~['2dp','3dp','4dp','6dp','8dp','16dp','24dp'].indexOf(shadow)) {
				this._container.classList.add(`s-shadow-${shadow}`)
			} else if (shadow && shadow != 'inset') {
				console.warn("Shadow can take values '2dp', '3dp', '4dp', '6dp', '8dp', '16dp' or '24dp'")
			}
			
			if (href) {
				this._link = document.createElement('a')
				this._link.classList.add(CLS.link)
				this._link.href = href
				this._link.target = target || '_self'
				this._container.appendChild(this._link)
			}

			if (src) {
				if (shadow == 'inset') {
					this._container.style.backgroundImage = `url(${src})`
				} else {
					this._img = document.createElement('img')
					this._img.classList.add(CLS.img)
					this._img.src = src
					if (this._link) {
						this._link.appendChild(this._img)
					} else {
						this._container.appendChild(this._img)
					}
				}
			}

			if (this._children.length) {
				this._children.forEach(child => this._container.appendChild(child))
			}

			return this
		}

		cleanup() {
			this.removeAttribute('data-src')
			this.removeAttribute('data-href')
			this.removeAttribute('data-target')
			return this
		}
	}

	// Define the new element

	if (customElements) {
		customElements.define('c-avatar', AvatarElement)
	}

	if (typeof exports != 'undefined' && !exports.nodeType) {
		exports.AvatarElement = AvatarElement
	}
}
