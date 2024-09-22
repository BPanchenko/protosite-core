import stylesheet, { cAvatar, cssText } from '#uikit/component/avatar'

export const AvatarMetadata = {
	tagName: 'c-avatar',
	template: `
		<figure class="${cAvatar}">
			<slot name="child"></slot>
		</figure>
	`,
	stylesheet,
	cssText,
}

class AvatarElement extends HTMLElement {
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' })
		shadow.innerHTML = AvatarMetadata.template
	}
}

export default AvatarElement
