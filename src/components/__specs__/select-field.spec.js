//import '../__mocks__/window.mock'
import SelectComponent from '../select-field.js'

describe('[SelectComponent]', () => {
	describe('State:', () => {
		const select = new SelectComponent()
		document.body.appendChild(select)

		expect(select.state).toMatchInlineSnapshot()
	})
})
