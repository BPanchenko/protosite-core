import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'
import checkFalsy from '../fn.checkFalsy'
import checkTruth from '../fn.checkTruth'

import type { Primitive } from '#types'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked)
 */

export class AriaCheckedAttribute extends AriaAttribute {
	static attributeName: string = 'aria-checked'
	static categoryName: AriaCategory = AriaCategory.Widget
	static default: AriaCheckedValue = 'undefined'
	static propertyName: string = 'ariaChecked'
	static validValues: Array<string> = <const>[
		'false',
		'true',
		'mixed',
		'undefined',
	]

	isFalsy() {
		return checkFalsy(this.value)
	}

	isMixed() {
		return this.value === 'mixed'
	}

	isTruth() {
		return checkTruth(this.value)
	}

	isUndefined() {
		return false === (this.isFalsy() || this.isMixed() || this.isTruth())
	}

	get name() {
		return AriaCheckedAttribute.attributeName
	}
	get category() {
		return AriaCheckedAttribute.categoryName
	}
	get property() {
		return AriaCheckedAttribute.propertyName
	}

	protected _parseValue(value: Primitive): string | never {
		if (
			typeof value === 'string' &&
			AriaCheckedAttribute.validValues.includes(value)
		) {
			return value
		} else {
			throw new Error(`Wrong attribute value: "${String(value)}"`)
		}
	}
}

export type AriaCheckedValue = (typeof AriaCheckedAttribute.validValues)[number]
