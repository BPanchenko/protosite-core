import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'
import { checkFalsy, checkTruth } from '#library'
import type { AriaAttributeInputValue } from '#types'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked)
 */

class AriaCheckedAttribute extends AriaAttribute {
	static readonly attributeName: string = 'aria-checked'
	static readonly categoryName: AriaCategory = AriaCategory.Widget
	static readonly default: AriaCheckedValue = 'undefined'
	static readonly propertyName: string = 'ariaChecked'
	static readonly validValues: Array<string> = <const>[
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

	protected _parseValue(value: AriaAttributeInputValue): string | never {
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

export default AriaCheckedAttribute
