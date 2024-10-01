import '../avatar-component'

import { configureToMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({
	toMatchImageSnapshot: configureToMatchImageSnapshot({
		comparisonMethod: 'ssim',
		failureThreshold: 0.1,
		failureThresholdType: 'percent',
	}),
})

describe('AvatarComponent', () => {
	const avatar = document.createElement('c-avatar')

	describe('Visual Regression', () => {
		let image, containerHandle

		beforeAll(async (done) => {
			const page = await global.browser.newBlankPage()
			await page.setViewport({width: 1080, height: 1024})

			containerHandle = await page.$('#container')
			const container = await page.evaluate((container) => container, containerHandle)
			debug(container)
			container.appendChild(avatar)

			image = await page.screenshot({ fullPage: true })
			done()
		})

		afterAll(() => {
			containerHandle.dispose()
		})

		it('horizontal', () => {
			expect(image).toMatchImageSnapshot({
				diffDirection: 'horizontal',
			})
		})

		it('vertical', () => {
			expect(image).toMatchImageSnapshot({
				diffDirection: 'vertical',
			})
		})
	})
})
