declare namespace Avatar {
	export type Attributes = {
		/**
		 * Resizes the component. The default size is defined in UIKit.
		 * 
		 * [UIKit Reference](http://protosite.rocks/components/avatar.html)
		 */
		size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

		/**
		 * The image URL. Mandatory for the <img> element.
		 * 
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src)
		 */
		src: string

		/**
		 * The URL that the hyperlink points to.
		 * 
		 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/href)
		 */
		href: string

		/**
		 * The target attribute specifies where to open the linked document.
		 * 
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/target)
		 */
		target: '_blank' | '_self' | '_parent' | '_top'
	}

	export class WebComponent extends HTMLElement {
		static observedAttributes: string[]
		constructor(attributes: Attributes): WebComponent
		attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void
	}
}

declare namespace Field {
	export type Attributes = {
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
		type: 'email' | 'file' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'

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

	export class WebComponent extends HTMLElement {
		static observedAttributes: string[]
		constructor(attributes: Attributes): WebComponent
		attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void
	}
}

declare namespace SelectField {
	type Attributes = Partial<{
		expanded: 'true' | 'on' | 'false' | 'off'
		label: string

		/**
		 * Resizes the component. The default size is defined in UIKit.
		 * 
		 * [UIKit Reference](http://protosite.rocks/components/select-field.html)
		 */
		size: 'sm' | 'md' | 'lg'
	}>
}