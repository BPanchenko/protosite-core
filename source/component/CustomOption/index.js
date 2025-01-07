const tagName = 'c-option'

export class CustomOption extends HTMLOptionElement {
	static oberverAttributes = ['value', 'aria-label', 'aria-description']

	constructor() {
		super()
	}
}

customElements.define(tagName, CustomOption)

export default customElements.get(tagName)
