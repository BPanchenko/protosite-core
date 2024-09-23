import AvatarComponent, { custom, settings } from '../avatar.js'

describe('AvatarComponent', () => {
	it('Custom Methods and Properties', () => {
		expect(custom).toMatchSnapshot()
	})
	it('Settings', () => {
		expect(settings).toMatchSnapshot()
	})

	describe.each`
		link                   | image
		${undefined}           | ${undefined}
		${'http://yandex.ru'}  | ${'http://protosite.rocks/pictures/ava.gif'}
		${undefined}           | ${'http://protosite.rocks/pictures/ava-1.gif'}
		${'http://google.com'} | ${undefined}
	`('Link = "$link"; Image = "$image"', ({ link = '', image = '' }) => {
		let avatar, container

		beforeEach(() => {
			container = document.body
			avatar = new AvatarComponent()

			link && avatar.setAttribute('data-link', link)
			image && avatar.setAttribute('data-image', image)
			container.appendChild(avatar)
		})

		afterEach(() => {
			avatar.remove()
		})

		it('markup', () => {
			expect(avatar.shadowRoot).toMatchSnapshot()
			expect(container).toMatchSnapshot()
		})
	})
})
