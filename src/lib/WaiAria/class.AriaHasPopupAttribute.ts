import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

import type { Primitive } from '#types/primitive'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)
 */

export class AriaHasPopupAttribute extends AriaAttribute {
	static attributeName: string = 'aria-haspopup'
	static categoryName: AriaCategory = AriaCategory.Widget
	static propertyName: string = 'ariaHasPopup'
	static validValues: Array<string> = <const>[
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
