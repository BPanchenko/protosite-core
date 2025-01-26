import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
 */

class AriaSelectedAttribute extends StateAttribute {
	static readonly attributeName: string = 'aria-selected'
	static readonly categoryName: AriaCategory = AriaCategory.Widget
	static readonly propertyName: string = 'ariaSelected'

	get name() {
		return AriaSelectedAttribute.attributeName
	}
	get category() {
		return AriaSelectedAttribute.categoryName
	}
	get property() {
		return AriaSelectedAttribute.propertyName
	}
}

export default AriaSelectedAttribute
