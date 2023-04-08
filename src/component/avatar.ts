import { CustomElementDecorator, Metadata } from '../trunk/custom-element-decorator';
// @ts-ignore
import stylesheet, { cAvatar, cAvatarLink } from '@uikit/component/avatar.css';

enum AttributeName {
	Link = 'data-link',
	Image = 'data-image'
}

export const AvatarMetadata: Metadata = {
	tagName: cAvatar,
	template: `
		<figure class="${cAvatar} js-container">
			<a class="${cAvatarLink} js-link">
				<img class="js-image">
			</a>
		</figure>
	`,
	stylesheet
};

@CustomElementDecorator(AvatarMetadata)
class AvatarElement extends HTMLElement implements CustomElement {
	static readonly observedAttributes? = [AttributeName.Link, AttributeName.Image];

	readonly $refs? = new Map([
		['container', null],
		['link', null],
		['image', null]
	]);

	readonly state? = new Map();

	attributeChangedCallback(name: string, _: string, current: string) {
		switch (name) {
			case AttributeName.Link:
				this.state.set('link', current);
				break;
			case AttributeName.Image:
				this.state.set('image', current);
				break;
		}
	}

	connectedCallback() {
		if ('link' in this.dataset) this.state.set('link', this.dataset.link);
		if ('image' in this.dataset) this.state.set('image', this.dataset.image);

		if (this.children.length > 0) {
			this.state.set('children', this.children);
		}

		this.render();
		this.clear();
	}

	render?() {}

	clear?() {
		this.state.get(StateKey.StashedChildren).forEach((e) => e.remove());
		delete this.dataset.link;
		delete this.dataset.image;
	}
}

export default AvatarElement;
