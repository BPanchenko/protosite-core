import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete)
 */

class AriaAutoCompleteAttribute extends AriaAttribute {
	static readonly attributeName: string = 'aria-autocomplete'
	static readonly categoryName: AriaCategory = AriaCategory.Widget
	static readonly default: AriaAutoCompleteValue = 'none'
	static readonly propertyName: string = 'ariaAutoComplete'
	static readonly validValues: Array<string> = <const>[
		'none',
		'inline',
		'list',
		'both',
	]

	get name() {
		return AriaAutoCompleteAttribute.attributeName
	}
	get category() {
		return AriaAutoCompleteAttribute.categoryName
	}
	get property() {
		return AriaAutoCompleteAttribute.propertyName
	}

	protected _parseValue(
		value: AriaAttributeInputValue,
	): AriaAutoCompleteValue | never {
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

export default AriaAutoCompleteAttribute
