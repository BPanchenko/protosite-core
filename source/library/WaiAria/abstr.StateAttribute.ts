import checkTruth from '../fn.checkTruth'
import checkFalsy from '../fn.checkFalsy'
import { AriaAttribute } from './abstr.AriaAttribute'

export abstract class StateAttribute extends AriaAttribute {
	static readonly default: StateAttributeValue = 'false'
	static readonly validValues = <const>['false', 'true']

	isFalsy() {
		return checkFalsy(this.value)
	}

	isTruth() {
		return checkTruth(this.value)
	}

	protected _parseValue(
		value: AriaAttributeInputValue,
	): StateAttributeValue | never {
		if (typeof value === 'string') {
			return ['on', 'true'].includes(value.trim().toLocaleLowerCase())
				? 'true'
				: 'false'
		} else if (
			['number', 'bigint', 'boolean', 'symbol', 'object'].includes(
				typeof value,
			)
		) {
			return value ? 'true' : 'false'
		} else {
			throw new Error(`Wrong attribute value: "${String(value)}"`)
		}
	}
}

export type StateAttributeValue = (typeof StateAttribute.validValues)[number]
