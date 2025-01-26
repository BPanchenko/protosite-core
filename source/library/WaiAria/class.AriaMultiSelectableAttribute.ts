import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiselectable)
 */

class AriaMultiSelectableAttribute extends StateAttribute {
	static readonly attributeName: string = 'aria-multiselectable'
	static readonly categoryName: AriaCategory = AriaCategory.Widget
	static readonly propertyName: string = 'ariaMultiSelectable'

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

export default AriaMultiSelectableAttribute
