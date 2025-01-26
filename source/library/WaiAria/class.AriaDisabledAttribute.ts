import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)
 */

class AriaDisabledAttribute extends StateAttribute {
	static readonly attributeName = 'aria-disabled'
	static readonly categoryName = AriaCategory.Widget
	static readonly propertyName = 'ariaDisabled'

	get name() {
		return AriaDisabledAttribute.attributeName
	}
	get category() {
		return AriaDisabledAttribute.categoryName
	}
	get property() {
		return AriaDisabledAttribute.propertyName
	}
}

export default AriaDisabledAttribute
