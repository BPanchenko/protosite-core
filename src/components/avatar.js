import stylesheet, { cAvatar } from '#uikit/component/avatar.js'

export const AvatarMetadata = {
	tagName: 'c-avatar',
	template: `
		<figure class="${cAvatar}">
			<slot name="child"></slot>
		</figure>
	`,
	stylesheet,
}

export class AvatarElement extends HTMLElement {
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' })
		shadow.innerHTML = AvatarMetadata.template
	}
}
