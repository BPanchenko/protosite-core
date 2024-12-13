import '../__mocks__/@github.template-parts.mock'
import '../__mocks__/window.mock'
import SelectComponent from '../select-field.js'

describe('[SelectComponent]', () => {
	describe('Init:', () => {
		const select = new SelectComponent({
			name: 'custom-field-fruit',
			'aria-placeholder': 'Выбрать элемент...',
			label: 'Выбран:',
		})
		document.body.appendChild(select)

		expect(select.state).toMatchInlineSnapshot()
		expect(select).toMatchInlineSnapshot()
	})

	describe('Interactive:', () => {
		describe.each`
			attribute
			${'ariaAutocomplete'}
			${'ariaActiveDescendant'}
			${'ariaAutoComplete'}
			${'ariaControls'}
			${'ariaExpanded'}
			${'ariaLabel'}
			${'ariaHasPopup'}
			${'ariaPlaceholder'}
			${'tabindex'}
		`('[$attribute]', (attribute) => {})

		it('Click Left Button', () => {})

		it('Click Right Button', () => {})

		it('Press [Enter]', () => {})

		it('Press [Escape]', () => {})

		it('Press Backspace', () => {})

		it('Press End', () => {})

		it('Press Home', () => {})
	})
})
