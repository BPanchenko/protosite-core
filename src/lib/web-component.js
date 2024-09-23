import uniqueId from 'lodash/uniqueId'

export default function defineWebComponent(settings, custom) {
	const {
		cssText,
		extendsTag,
		tagName,
		template,
		shadowmode = SHADOW_MODE ?? 'closed',
	} = settings

	console.assert(tagName, 'Tag Name is required!')
	console.assert(custom, 'Custom Methods is missing!')

	const tplID = uniqueId(tagName + '_tpl')
	const cssID = uniqueId(tagName + '_css')

	const $tpl = document.createElement('template')
	$tpl.setAttribute('id', tplID)
	$tpl.innerHTML = template
	document.body.appendChild($tpl)

	const UICoreComponent = (({
		cssID: title,
		cssText,
		tplID,
		custom,
		shadowmode: mode,
	}) =>
		class extends HTMLElement {
			#custom = custom
			#shadow
			#sheet
			#tplID = tplID

			constructor() {
				super()
				this.#sheet = new CSSStyleSheet(cssText, { title })
				this.#shadow = this.attachShadow({ mode })
			}

			connectedCallback() {
				this.#shadow.appendChild(this.$tpl.content.cloneNode(true))
				this.#shadow.adoptedStyleSheets.push(this.#sheet)
				this.#custom.connectedCallback.call(this)
			}

			get $tpl() {
				return document.getElementById(this.#tplID)
			}
		})({ cssID, cssText, tplID, custom, shadowmode })

	customElements.define(tagName, UICoreComponent, {
		extends: extendsTag,
	})

	return customElements.get(tagName)
}
