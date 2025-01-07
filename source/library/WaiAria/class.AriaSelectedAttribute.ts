import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
 */

export class AriaSelectedAttribute extends StateAttribute {
	static attributeName: string = 'aria-selected'
	static categoryName: AriaCategory = AriaCategory.Widget
	static propertyName: string = 'ariaSelected'

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
