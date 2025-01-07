import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiselectable)
 */

export class AriaMultiSelectableAttribute extends StateAttribute {
	static attributeName: string = 'aria-multiselectable'
	static categoryName: AriaCategory = AriaCategory.Widget
	static propertyName: string = 'ariaMultiSelectable'

	get name() {
		return AriaMultiSelectableAttribute.attributeName
	}
	get category() {
		return AriaMultiSelectableAttribute.categoryName
	}
	get property() {
		return AriaMultiSelectableAttribute.propertyName
	}
}
