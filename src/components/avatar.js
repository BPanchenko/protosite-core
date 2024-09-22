import { cAvatar, cssText } from '#uikit/component/avatar'
import defineWebComponent from '../lib/web-component'

const tagName = cAvatar

export const settings = {
	tagName,
	tagExtends: 'figure',
	template: `
		<figure class="${cAvatar}">
			<slot name="image"></slot>
			<figcaption slot="image"></figcaption>
		</figure>
	`,
	cssText,
}

export class AvatarElement extends HTMLElement {
	connectedCallback() {
		this.classList.add(cAvatar)
		const shadow = this.attachShadow({ mode: 'open' })
		shadow.innerHTML = settings.template
	}
}

export default defineWebComponent(AvatarElement, settings)
