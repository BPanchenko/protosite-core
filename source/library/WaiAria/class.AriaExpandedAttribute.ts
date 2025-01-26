import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
 */

class AriaExpandedAttribute extends StateAttribute {
	static readonly attributeName = 'aria-expanded'
	static readonly categoryName = AriaCategory.Widget
	static readonly propertyName = 'ariaExpanded'

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

export default AriaExpandedAttribute
