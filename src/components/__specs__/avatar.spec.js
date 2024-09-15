import AvatarElement, { AvatarMetadata } from '../avatar.js'

const runTests = (document, element) => {
	it('markup', () => {
		expect(document.body).toMatchSnapshot()
	})

	it('data state of component', () => {
		expect(element.state).toMatchSnapshot()
	})

	it('references to inner elements', () => {
		expect(element.$refs).toMatchSnapshot()
	})
}

describe('AvatarElement', () => {
	it('metadata', () => {
		expect(AvatarMetadata).toMatchSnapshot()
	})

	describe('creating new component with different attributes', () => {
		describe.each`
			link                   | image
			${undefined}           | ${undefined}
			${'http://yandex.ru'}  | ${'http://protosite.rocks/pictures/ava.gif'}
			${undefined}           | ${'http://protosite.rocks/pictures/ava-1.gif'}
			${'http://google.com'} | ${undefined}
		`('link is "$link", image is "$image"', ({ link, image }) => {
			let avatar

			beforeEach(() => {
				avatar = new AvatarElement()

				if (link !== undefined) {
					avatar.setAttribute('data-link', link)
				}

				if (image !== undefined) {
					avatar.setAttribute('data-image', image)
				}

				avatar.setAttribute('data-image', image)
				document.body.appendChild(avatar)
			})

			afterEach(() => {
				avatar.remove()
			})

			runTests(document, avatar)
		})
	})
})
