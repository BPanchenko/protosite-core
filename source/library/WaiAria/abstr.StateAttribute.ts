import checkTruth from '../fn.checkTruth'
import checkFalsy from '../fn.checkFalsy'
import { AriaAttribute } from './abstr.AriaAttribute'

import type { Primitive } from '#types/primitive'

export abstract class StateAttribute extends AriaAttribute {
	static default: StateAttributeValue = 'false'
	static validValues = <const>['false', 'true']

	isFalsy() {
		return checkFalsy(this.value)
	}

	isTruth() {
		return checkTruth(this.value)
	}

	protected _parseValue(value: Primitive): StateAttributeValue | never {
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
