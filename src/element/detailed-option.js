const tagName = 'c-detailed-option'

class DetailedOptionElement extends HTMLOptionElement {
	static oberverAttributes = ['value', 'aria-label', 'aria-description']

	constructor(...args) {
		super()
		console.log(args)
	}
}

customElements.define(tagName, DetailedOptionElement)

export default customElements.get(tagName)
