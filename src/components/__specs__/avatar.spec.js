import transform from 'lodash/transform'
import AvatarComponent, { settings } from '../avatar.js'

describe('AvatarComponent', () => {
	it('Settings', () => {
		expect(settings).toMatchSnapshot()
	})

	it('Shadow DOM', () => {
		const avatar = new AvatarComponent()
		expect(avatar.shadowRoot.children).toMatchSnapshot()
	})

	describe.each`
		link                   | image
		${undefined}           | ${undefined}
		${'http://yandex.ru'}  | ${'http://protosite.rocks/pictures/ava.gif'}
		${undefined}           | ${'http://protosite.rocks/pictures/ava-1.gif'}
		${'http://google.com'} | ${undefined}
	`('Link = "$link"; Image = "$image"', (options) => {
		const dataset = transform(
			options,
			(result, value, key) =>
				value !== undefined && (result[key] = value),
			{},
		)
		const avatar = new AvatarComponent(dataset)

		beforeEach(() => document.body.appendChild(avatar))
		afterEach(() => avatar.remove())

		it('Light DOM', () => {
			expect(avatar).toMatchSnapshot()
		})
	})
})
