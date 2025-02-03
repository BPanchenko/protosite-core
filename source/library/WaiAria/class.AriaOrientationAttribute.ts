import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

import type { Primitive } from '#type/manual'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation)
 */

class AriaOrientationAttribute extends AriaAttribute {
	static readonly attributeName: string = 'aria-orientation'
	static readonly categoryName: AriaCategory = AriaCategory.Widget
	static readonly default: AriaOrientationValue = 'undefined'
	static readonly propertyName: string = 'ariaOrientation'
	static readonly validValues: Array<string> = <const>[
		'horizontal',
		'vertical',
		'undefined',
	]

	isHorz() {
		return this.value === 'horizontal'
	}

	isVert() {
		return this.value === 'vertical'
	}

	isUndefined() {
		return this.value === 'undefined'
	}

	get name() {
		return AriaOrientationAttribute.attributeName
	}
	get category() {
		return AriaOrientationAttribute.categoryName
	}
	get property() {
		return AriaOrientationAttribute.propertyName
	}

	protected _parseValue(value: Primitive): AriaOrientationValue | never {
		if (value === undefined) {
			return 'undefined'
		} else if (
			typeof value === 'string' &&
			AriaOrientationAttribute.validValues.includes(value)
		) {
			return value
		} else {
			throw new Error(`Wrong attribute value: "${String(value)}"`)
		}
	}
}

export type AriaOrientationValue =
	(typeof AriaOrientationAttribute.validValues)[number]

export default AriaOrientationAttribute
