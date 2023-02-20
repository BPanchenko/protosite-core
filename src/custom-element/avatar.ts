import * as css from '@uikit/component/avatar.css';

import { CustomElementDecorator, Metadata } from '../lib/CustomElementDecorator';

const enum AttributeName {
	Href = 'href',
	Src = 'src'
}

export const AvatarMetadata: Metadata = {
	tagName: css.cAvatar,
	template: `
		<figure class="${css.cAvatar} js-container">
			<a class="${css.cAvatarLink} js-link">
			<slot class="js-slot"></slot>
			</a>
		</figure>
	`
};

@CustomElementDecorator(AvatarMetadata)
class AvatarElement extends HTMLElement implements CustomElement {
	static readonly observedAttributes? = [AttributeName.Href, AttributeName.Src];

	private readonly refs?: Map<string, HTMLElement> = new Map();
	private href?: string | boolean;
	private src?: string | boolean;

	attributeChangedCallback?(name: string, _previous: string, current: string): void {
		switch (name) {
			case AttributeName.Href:
				this.href = current || false;
				break;
			case AttributeName.Src:
				this.src = current || false;
				break;
		}
	}

	constructor() {
		super();
		this.refs.set('container', this.querySelector('.js-container'));
		this.refs.set('link', this.querySelector('.js-link'));
		this.refs.set('slot', this.querySelector('.js-slot'));

		this.href = this.getAttribute('href') || false;
		this.src = this.getAttribute('src') || false;
	}

	connectedCallback(): void {
		this.refs.get('container');
		console.log(this.shadowRoot);
		console.log(this.children);
		console.log(this.refs);
	}
}

export default AvatarElement;
