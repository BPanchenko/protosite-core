import '../__mocks__/window.mock'
import { compactObject } from '../../helpers.js'
import ArrowComponent from '../arrow.js'

describe('[ArrowComponent]', () => {
	describe('Attributes:', () => {
		describe.each`
			glyph           | weight     | direction        | figure    | style
			${'right-line'} | ${null}    | ${null}          | ${null}   | ${null}
			${null}         | ${'thick'} | ${'bottom'}      | ${null}   | ${'fill-angled'}
			${'left-line'}  | ${null}    | ${'right'}       | ${'line'} | ${'oblique'}
			${null}         | ${null}    | ${'bottom-left'} | ${'fill'} | ${'large-acute'}
		`(
			'[Glyph = "$glyph"; Weight = "$weight"; Direction = "$direction"; Figure = "$figure"; Style = "$style"]',
			(options) => {
				const avatar = new ArrowComponent(compactObject(options))
				document.body.appendChild(avatar)

				it('Light DOM:', () => expect(avatar).toMatchSnapshot())
				it('Shadow DOM:', () =>
					expect(avatar.shadowRoot.children).toMatchSnapshot())
			},
		)

		describe.each`
			glyph                                          | size
			${'right-line'}                                | ${null}
			${'right-angle-top-right-fill-acute'}          | ${'xxs'}
			${'right-angle-thick-right-top-fill-acute'}    | ${'xs'}
			${'right-angle-bottom-right-fill-angled'}      | ${'sm'}
			${'right-angle-thick-bottom-left-fill-angled'} | ${'md'}
			${'right-angle-right-bottom-fill'}             | ${'lg'}
			${'right-angle-thick-top-right-fill'}          | ${'xl'}
			${'right-angle-bottom-right-fill'}             | ${'xxl'}
			${'right-angle-right-top-line'}                | ${null}
			${'right-angle-right-bottom-fill-acute'}       | ${'another-size'}
		`('[Glyph = "$glyph"; Size = "$size"]', ({ glyph, size }) => {
			const avatar = new ArrowComponent({ glyph })
			document.body.appendChild(avatar)

			try {
				avatar.size = size

				it('Light DOM:', () => expect(avatar).toMatchSnapshot())
				it('Shadow DOM:', () =>
					expect(avatar.shadowRoot.children).toMatchSnapshot())
			} catch (error) {
				it('Error:', () => expect(error).toMatchSnapshot())
			}
		})

		describe.each`
			font
			${null}
			${'AnyAnotyherFont'}
			${'IconFont'}
			${null}
		`('[Font = "$font"]', ({ font }) => {
			const avatar = new ArrowComponent()
			document.body.appendChild(avatar)

			try {
				avatar.font = font

				it('Light DOM:', () => expect(avatar).toMatchSnapshot())
				it('Shadow DOM:', () =>
					expect(avatar.shadowRoot.children).toMatchSnapshot())
			} catch (error) {
				it('Error:', () => expect(error).toMatchSnapshot())
			}
		})
	})
})
