import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant)
 */

export class AriaActiveDescendantAttribute extends AriaAttribute {
	static attributeName = 'aria-activedescendant'
	static categoryName = AriaCategory.Relationship
	static propertyName = 'ariaActiveDescendant'

	get name() {
		return AriaActiveDescendantAttribute.attributeName
	}
	get category() {
		return AriaActiveDescendantAttribute.categoryName
	}
	get property() {
		return AriaActiveDescendantAttribute.propertyName
	}
}
