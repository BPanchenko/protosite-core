import { cAvatar, cssText } from '#uikit/component/avatar'
import defineWebComponent from '../lib/web-component'

export const settings = {
	tagName: cAvatar,
	template: `<figure class="${cAvatar}"></figure>`,
	cssText,
}

export const custom = {
	connectedCallback() {},
}

const AvatarComponent = defineWebComponent(settings, custom)

export default AvatarComponent
