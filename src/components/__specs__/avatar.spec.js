import AvatarElement, { settings } from '../avatar.js'

const AvatarWebComponent = customElements.get(settings.tagName)

describe('AvatarComponent', () => {
	it('settings', () => {
		expect(settings).toMatchSnapshot()
	})
})
