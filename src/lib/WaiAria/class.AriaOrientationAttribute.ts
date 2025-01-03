import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

import type { Primitive } from '#types/primitive'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation)
 */

export class AriaOrientationAttribute extends AriaAttribute {
	static attributeName: string = 'aria-orientation'
	static categoryName: AriaCategory = AriaCategory.Widget
	static propertyName: string = 'ariaOrientation'
	static validValues: Array<string> = <const>['horizontal', 'vertical']

	isHorz() {
		return this.value === 'horizontal'
	}

	isVert() {
		return this.value === 'vertical'
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
		if (value === null) {
			return null
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
