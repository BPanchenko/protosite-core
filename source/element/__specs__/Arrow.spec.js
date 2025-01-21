import '../__mocks__/window.mock'

import ArrowComponent from '../Arrow/index.ts'
import compactObject from '#library/fn.compactObject.ts'

describe('[ArrowComponent]', () => {
	describe('Attributes:', () => {
		describe.each`
			glyph                 | weight     | direction        | figure    | style
			${'arrow-right-line'} | ${null}    | ${null}          | ${null}   | ${null}
			${null}               | ${'thick'} | ${'bottom'}      | ${null}   | ${'fill-angled'}
			${'arrow-left-line'}  | ${null}    | ${'right'}       | ${'line'} | ${'oblique'}
			${null}               | ${null}    | ${'bottom-left'} | ${'fill'} | ${'large-acute'}
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
			glyph                                                | size
			${'arrow-right-line'}                                | ${null}
			${'arrow-right-angle-top-right-fill-acute'}          | ${'xxs'}
			${'arrow-right-angle-thick-right-top-fill-acute'}    | ${'xs'}
			${'arrow-right-angle-bottom-right-fill-angled'}      | ${'sm'}
			${'arrow-right-angle-thick-bottom-left-fill-angled'} | ${'md'}
			${'arrow-right-angle-right-bottom-fill'}             | ${'lg'}
			${'arrow-right-angle-thick-top-right-fill'}          | ${'xl'}
			${'arrow-right-angle-bottom-right-fill'}             | ${'xxl'}
			${'arrow-right-angle-right-top-line'}                | ${null}
			${'arrow-right-angle-right-bottom-fill-acute'}       | ${'another-size'}
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
