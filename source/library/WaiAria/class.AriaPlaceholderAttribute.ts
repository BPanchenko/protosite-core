import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-placeholder)
 */

class AriaPlaceholderAttribute extends AriaAttribute {
	static readonly attributeName: string = 'aria-placeholder'
	static readonly categoryName: AriaCategory = AriaCategory.Widget
	static readonly propertyName: string = 'ariaPlaceholder'

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

export default AriaPlaceholderAttribute
