import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly)
 */

class AriaReadOnlyAttribute extends StateAttribute {
	static readonly attributeName: string = 'aria-readonly'
	static readonly categoryName: AriaCategory = AriaCategory.Widget
	static readonly propertyName: string = 'ariaReadOnly'

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

export default AriaReadOnlyAttribute
