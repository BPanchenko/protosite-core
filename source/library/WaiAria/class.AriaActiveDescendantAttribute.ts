import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant)
 */

class AriaActiveDescendantAttribute extends AriaAttribute {
	static readonly attributeName = 'aria-activedescendant'
	static readonly categoryName = AriaCategory.Relationship
	static readonly propertyName = 'ariaActiveDescendant'

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

export default AriaActiveDescendantAttribute
