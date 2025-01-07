import { AriaCategory } from './abstr.AriaAttribute'
import { StateAttribute } from './abstr.StateAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-atomic)
 */

export class AriaAtomicAttribute extends StateAttribute {
	static attributeName = 'aria-atomic'
	static categoryName = AriaCategory.Region
	static propertyName = 'ariaAtomic'

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
