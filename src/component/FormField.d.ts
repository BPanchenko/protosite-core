declare namespace Field {
	type Attributes = {
		/**
		 * Defines a caption for the form field element in a user interface. Passed to the <label> element.
		 *
		 * [MDN Reference](https://developer.mozilla.org/ru/docs/Web/HTML/Element/label)
		 */
		label: string

		/**
		 * Value of the id attribute of the <datalist> of autocomplete options.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#list)
		 */
		list: string

		/**
		 * Name of the form control. Submitted with the form as part of a name/value pair.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
		 */
		name: string

		/**
		 * Specifies the type of <input> element to display. If the type attribute is not specified, the default type is "text".
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type)
		 */
		type:
			| 'email'
			| 'file'
			| 'month'
			| 'number'
			| 'password'
			| 'search'
			| 'tel'
			| 'text'
			| 'time'
			| 'url'
			| 'week'

		/**
		 * Pattern the value must match to be valid. It must be a valid JavaScript regular expression, as used by the `RegExp` type.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern)
		 */
		pattern: string

		/**
		 * Makes the element not mutable, focusable, or even submitted with the form.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled)
		 */
		disabled: boolean

		/**
		 * Specifies that the user is allowed to enter more than one value in the <input> element.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple)
		 */
		multiple: boolean
	}

	interface WebComponent extends HTMLElement {
		observedAttributes: string[]

		attributeChangedCallback(
			name: string,
			oldVal: string | null,
			newVal: string | null,
		): void
	}
}
