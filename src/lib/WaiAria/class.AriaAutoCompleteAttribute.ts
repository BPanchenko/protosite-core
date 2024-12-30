import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

import type { Primitive } from '#types/primitive'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete)
 */

export class AriaAutoCompleteAttribute extends AriaAttribute {
	static attributeName: string = 'aria-autocomplete'
	static categoryName: AriaCategory = AriaCategory.Widget
	static propertyName: string = 'ariaAutoComplete'
	static validValues: Array<string> = <const>[
		'none',
		'inline',
		'list',
		'both',
	]

	constructor(value: AriaAutoCompleteValue = 'none') {
		super(value)
	}

	get name() {
		return AriaAutoCompleteAttribute.attributeName
	}
	get category() {
		return AriaAutoCompleteAttribute.categoryName
	}
	get property() {
		return AriaAutoCompleteAttribute.propertyName
	}

	protected _parseValue(value: Primitive): AriaAutoCompleteValue | never {
		if (
			typeof value === 'string' &&
			AriaAutoCompleteAttribute.validValues.includes(value)
		) {
			return value
		} else {
			throw new Error(`Wrong attribute value: "${String(value)}"`)
		}
	}
}

export type AriaAutoCompleteValue =
	(typeof AriaAutoCompleteAttribute.validValues)[number]
