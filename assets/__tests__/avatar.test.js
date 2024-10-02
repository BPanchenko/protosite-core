import '../avatar-component'

import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
import { readFileSync } from 'node:fs'
import path from 'node:path'

expect.extend({
	toMatchImageSnapshot: configureToMatchImageSnapshot({
		comparisonMethod: 'ssim',
		failureThreshold: 0.1,
		failureThresholdType: 'percent',
	}),
})

const PAGE_HTML = readFileSync(
	path.resolve(__dirname, './avatar.test.html'),
	'utf8',
)

describe('AvatarComponent', () => {
	describe('Visual Regression', () => {
		let image

		beforeAll(async () => {
			const page = await global.browser.newPage()
			await page.setContent(PAGE_HTML)
			await page.setViewport({ width: 768, height: 1024 })

			image = Buffer.from(
				await page.screenshot({
					fullPage: true,
					encoding: 'base64',
				}),
				'base64',
			)
		}, 15000)

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
