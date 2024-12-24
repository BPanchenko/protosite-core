import applyAttributes from '#lib/fn.applyAttributes.js'
import '../__mocks__/window.mock'
import SelectComponent from '../SelectField/index.js'

describe('[SelectComponent]', () => {
	const optionsContainer = document.createDocumentFragment()
	;[
		'Amor Asteroid',
		'Apollo Asteroid (Hazard)',
		'Apollo Asteroid',
		'Aten Asteroid',
		'Aten Asteroid (Hazard)',
		'Amor Asteroid (Hazard)',
		'Apohele Asteroid',
		'Apohele Asteroid (Hazard)',
	].forEach((value) => {
		const $element = document.createElement('div')
		applyAttributes($element, {
			role: 'option',
			value,
		})
		optionsContainer.appendChild($element)
	})

	describe('Initialization:', () => {
		const select = new SelectComponent({
			name: 'custom-field-fruit',
			'aria-placeholder': 'Выбрать элемент...',
			label: 'Выбран:',
		})
		select.appendChild(optionsContainer)

		document.body.appendChild(select)

		expect(select.state).toMatchInlineSnapshot()
		expect(select).toMatchInlineSnapshot()
	})

	describe('Verify ARIA properties:', () => {
		it.each`
			attrName
			${'ariaAutocomplete'}
			${'ariaActiveDescendant'}
			${'ariaAutoComplete'}
			${'ariaControls'}
			${'ariaExpanded'}
			${'ariaDisabled'}
			${'ariaLabel'}
			${'ariaHasPopup'}
			${'ariaPlaceholder'}
			${'tabindex'}
		`('[$attrName]', (attrName) => {})

		it('Click Left Button', () => {})

		it('Click Right Button', () => {})

		it('Press [Enter]', () => {})

		it('Press [Escape]', () => {})

		it('Press Backspace', () => {})

		it('Press End', () => {})

		it('Press Home', () => {})
	})
})
