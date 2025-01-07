import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
 */

export class AriaExpandedAttribute extends StateAttribute {
	static attributeName = 'aria-expanded'
	static categoryName = AriaCategory.Widget
	static propertyName = 'ariaExpanded'

	get name() {
		return AriaExpandedAttribute.attributeName
	}
	get category() {
		return AriaExpandedAttribute.categoryName
	}
	get property() {
		return AriaExpandedAttribute.propertyName
	}
}
