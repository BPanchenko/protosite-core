import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-required)
 */

export class AriaRequiredAttribute extends StateAttribute {
	static attributeName: string = 'aria-required'
	static categoryName: AriaCategory = AriaCategory.Widget
	static propertyName: string = 'ariaRequired'

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
