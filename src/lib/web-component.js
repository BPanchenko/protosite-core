import { uniqueId } from 'lodash'

const tplStack = new Map()

const defineWebComponent = (
	CustomElement,
	{ tagExtends, tagName, template, cssText, shadowrootmode = 'closed' },
) => {
	const uid = uniqueId(tagName + '_')

	const $tpl = document.createElement('template')
	$tpl.setAttribute('shadowrootmode', shadowrootmode)
	$tpl.setAttribute('name', uid)
	tplStack.set(uid, $tpl)

	// Style
	if (cssText !== undefined) {
		const $style = document.createElement('style')
		$style.innerText = `
			:host{ outline: 1px dashed deeppink; }
			${cssText}
		`
		$tpl.appendChild($style)
	}

	// Template Content
	$tpl.appendChild(
		(() => {
			const $elem = document.createDocumentFragment()
			$elem.innerHTML = template
			return $elem
		})(),
	)

	const WebComponent = class extends CustomElement {
		#tagName = tagName
		#uid = uid

		constructor() {
			super()
			this.attachShadow({ mode: shadowrootmode })
			this.shadowRoot.appendChild(this.$tpl.content.cloneNode(true))
		}

		get tagName() {
			return this.#tagName
		}
		get $tpl() {
			return tplStack.get(this.#uid)
		}
	}

	customElements.define(tagName, WebComponent, {
		extends: tagExtends,
	})
	return customElements.get(tagName)
}

export default defineWebComponent
