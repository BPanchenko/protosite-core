import { CustomElement } from "./.decorator"

@CustomElement({
	tagName: 'c-avatar',
    template: `
		<figure>
		<a></a>
		</figure>
	`
})
export default class AvatarElement extends HTMLElement implements ICustomElement {
	static readonly observedAttributes? = ['href', 'src'];
	
	constructor(...args) {
		super()
	}

	connectedCallback() {
		
	}

	attributeChangedCallback?(name: string, previous: string, current: string) {
		
	}
}
