import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-placeholder)
 */
export class AriaPlaceholderAttribute extends AriaAttribute {
	static attributeName: string = 'aria-placeholder'
	static categoryName: AriaCategory = AriaCategory.Widget
	static propertyName: string = 'ariaPlaceholder'

	get name() {
		return AriaPlaceholderAttribute.attributeName
	}
	get category() {
		return AriaPlaceholderAttribute.categoryName
	}
	get property() {
		return AriaPlaceholderAttribute.propertyName
	}
}
