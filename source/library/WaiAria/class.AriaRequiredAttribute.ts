import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-required)
 */

class AriaRequiredAttribute extends StateAttribute {
	static readonly attributeName: string = 'aria-required'
	static readonly categoryName: AriaCategory = AriaCategory.Widget
	static readonly propertyName: string = 'ariaRequired'

	get name() {
		return AriaRequiredAttribute.attributeName
	}
	get category() {
		return AriaRequiredAttribute.categoryName
	}
	get property() {
		return AriaRequiredAttribute.propertyName
	}
}

export default AriaRequiredAttribute
