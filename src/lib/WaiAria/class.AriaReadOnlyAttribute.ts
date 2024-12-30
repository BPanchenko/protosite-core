import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly)
 */

export class AriaReadOnlyAttribute extends StateAttribute {
	static attributeName: string = 'aria-readonly'
	static categoryName: AriaCategory = AriaCategory.Widget
	static propertyName: string = 'ariaReadOnly'

	get name() {
		return AriaReadOnlyAttribute.attributeName
	}
	get category() {
		return AriaReadOnlyAttribute.categoryName
	}
	get property() {
		return AriaReadOnlyAttribute.propertyName
	}
}
