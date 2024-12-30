import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked)
 */

export class AriaCheckedAttribute extends StateAttribute {
	static attributeName: string = 'aria-checked'
	static categoryName: AriaCategory = AriaCategory.Widget
	static propertyName: string = 'ariaChecked'

	get name() {
		return AriaCheckedAttribute.attributeName
	}
	get category() {
		return AriaCheckedAttribute.categoryName
	}
	get property() {
		return AriaCheckedAttribute.propertyName
	}
}
