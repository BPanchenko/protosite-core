import '../__mocks__/@github.template-parts.mock'
import '../__mocks__/window.mock'
import SelectComponent from '../select-field.js'

import pug from 'pug'
import fs from 'node:fs'
import path from 'node:path'

const sourcePugCode = fs.readFileSync(
	path.resolve('src/component/select-field.pug'),
	{
		encoding: 'utf-8',
	},
)
const sourceHtmlCode = pug.compile(sourcePugCode)()

describe('[SelectComponent]', () => {
	describe('Init:', () => {
		const select = new SelectComponent({
			name: 'custom-field-fruit',
			'aria-placeholder': 'Выберите фрукт...',
			label: 'Выбранный фрукт:',
		})
		document.body.appendChild(select)

		expect(select.state).toMatchInlineSnapshot()
		expect(select).toMatchInlineSnapshot()
	})

	describe('Interactive:', () => {
		it('Click Left Button', () => {})

		it('Click Right Button', () => {})

		it('Press [Enter]', () => {})

		it('Press [Escape]', () => {})

		it('Press Backspace', () => {})

		it('Press End', () => {})

		it('Press Home', () => {})
	})
})
