import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-atomic)
 */

class AriaAtomicAttribute extends StateAttribute {
	static readonly attributeName = 'aria-atomic'
	static readonly categoryName = AriaCategory.Region
	static readonly propertyName = 'ariaAtomic'

	get name() {
		return AriaAtomicAttribute.attributeName
	}
	get category() {
		return AriaAtomicAttribute.categoryName
	}
	get property() {
		return AriaAtomicAttribute.propertyName
	}
}

export default AriaAtomicAttribute
