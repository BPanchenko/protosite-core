import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)
 */

export class AriaDisabledAttribute extends StateAttribute {
	static attributeName = 'aria-disabled'
	static categoryName = AriaCategory.Widget
	static propertyName = 'ariaDisabled'

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
