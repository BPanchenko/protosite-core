import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

import type { Primitive } from '#types'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)
 */

class AriaHasPopupAttribute extends AriaAttribute {
	static readonly attributeName: string = 'aria-haspopup'
	static readonly categoryName: AriaCategory = AriaCategory.Widget
	static readonly default: AriaHasPopupValue = 'false'
	static readonly propertyName: string = 'ariaHasPopup'
	static readonly validValues: Array<string> = <const>[
		'dialog',
		'false',
		'grid',
		'listbox',
		'menu',
		'tree',
		'true',
	]

	isFalsy() {
		return this.value === 'false'
	}

	isTruth() {
		return this.value === 'true'
	}

	get name() {
		return AriaHasPopupAttribute.attributeName
	}
	get category() {
		return AriaHasPopupAttribute.categoryName
	}
	get property() {
		return AriaHasPopupAttribute.propertyName
	}

	protected _parseValue(value: Primitive): AriaHasPopupValue | never {
		if (
			typeof value === 'string' &&
			AriaHasPopupAttribute.validValues.includes(value)
		) {
			return value
		} else {
			throw new Error(`Wrong attribute value: "${String(value)}"`)
		}
	}
}

export type AriaHasPopupValue =
	(typeof AriaHasPopupAttribute.validValues)[number]

export default AriaHasPopupAttribute
