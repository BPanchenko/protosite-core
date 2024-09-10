import '#assets/avatar-web-component.js'

import { configureToMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({
	toMatchImageSnapshot: configureToMatchImageSnapshot({
		comparisonMethod: 'ssim',
		failureThreshold: 0.1,
		failureThresholdType: 'percent',
	}),
})

describe('AvatarWebComponent', () => {
	const avatar = document.createElement('c-avatar')

	describe('Visual Regression', () => {
		let containerHandle, image

		beforeAll(async () => {
			const page = await global.browser.newBlankPage()

			containerHandle = await page.$('#container')
			await page.evaluate((container) => {
				container.appendChild(avatar)
			}, containerHandle)

			image = await page.screenshot({ fullPage: true })
		})

		afterAll(async () => {
			await containerHandle.dispose()
		})

		it('horizontal', async () => {
			expect(image).toMatchImageSnapshot({
				diffDirection: 'horizontal',
			})
		})

		it('vertical', async () => {
			expect(image).toMatchImageSnapshot({
				diffDirection: 'vertical',
			})
		})
	})
})
