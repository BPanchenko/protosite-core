import AvatarComponent from '../avatar.js'
import compactObject from '../../lib/cb.compactObject.js'

describe('[AvatarComponent]', () => {
	describe('Attributes:', () => {
		describe.each`
			img                                            | href                   | target
			${undefined}                                   | ${undefined}           | ${'_top'}
			${'http://protosite.rocks/pictures/ava.gif'}   | ${'http://yandex.ru'}  | ${undefined}
			${'http://protosite.rocks/pictures/ava-1.gif'} | ${undefined}           | ${'_parent'}
			${undefined}                                   | ${'http://google.com'} | ${'_blank'}
		`('[Image = "$img"; Link = "$href"; Target = "$target"]', (options) => {
			const avatar = new AvatarComponent(compactObject(options))

			beforeEach(() => document.body.appendChild(avatar))
			afterEach(() => avatar.remove())

			it('Light DOM:', () => {
				expect(avatar).toMatchSnapshot()
			})
			it('Shadow DOM:', () => {
				expect(avatar.shadowRoot.children).toMatchSnapshot()
			})
		})

		describe.each`
			size
			${undefined}
			${'xxs'}
			${'xs'}
			${'sm'}
			${'md'}
			${'lg'}
			${'xl'}
			${'xxl'}
		`('[Size = "$size"]', (options) => {
			const avatar = new AvatarComponent(compactObject(options))

			beforeEach(() => document.body.appendChild(avatar))
			afterEach(() => avatar.remove())

			it('Light DOM:', () => {
				expect(avatar).toMatchSnapshot()
			})
			it('Shadow DOM:', () => {
				expect(avatar.shadowRoot.children).toMatchSnapshot()
			})
		})
	})
})
