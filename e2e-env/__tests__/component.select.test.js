/**
import { Browser } from 'happy-dom'

const browser = new Browser()
const page = browser.newPage()

await page.goto('https://github.com/capricorn86')
 */

import path from 'node:path'

const { BASE_DIR, BASE_URL } = global.server
const testURL = new URL(
	path.relative(BASE_DIR, __filename).replace('.js', '.html'),
	BASE_URL,
)

describe('SelectField', () => {
	let page, screenshot

	beforeAll(async () => {
		page = await global.browser.newPage()
		await page.setViewport({ width: 768, height: 1024 })
		await page.goto(testURL)

		screenshot = Buffer.from(
			await page.screenshot({
				fullPage: true,
				encoding: 'base64',
			}),
			'base64',
		)
	}, 30000)

	it('Page Markup', () => expect(page.content()).resolves.toMatchSnapshot())

	describe('Visual Regression', () => {
		it('horizontal', () => {
			expect(screenshot).toMatchImageSnapshot({
				diffDirection: 'horizontal',
			})
		})
		it('vertical', () => {
			expect(screenshot).toMatchImageSnapshot({
				diffDirection: 'vertical',
			})
		})
	})
})
