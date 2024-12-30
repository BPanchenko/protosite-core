import type { Primitive } from '#types/primitive'

export enum AriaCategory {
	Composite = 'composite',
	Landmark = 'landmark',
	Region = 'live-region',
	Relationship = 'relationship',
	Structure = 'document-structure',
	Widget = 'widget',
	Window = 'window',
}

/**
 * [ARIA states and properties](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes)
 */

export abstract class AriaAttribute {
	abstract get category(): AriaCategory | null
	abstract get property(): string
	abstract get name(): string

	protected _value: AttributeValue

	constructor(value: Primitive = null) {
		this.value = value
	}

	get value(): AttributeValue {
		return this._value
	}

	set value(newValue: Primitive) {
		this._value = this._parseValue(newValue)
	}

	protected _parseValue(value: Primitive): AttributeValue | never {
		if (value === null) {
			return null
		} else if (typeof value === 'string') {
			return value.trim()
		} else if (
			['number', 'bigint', 'boolean', 'symbol'].includes(typeof value)
		) {
			return value.toString()
		} else {
			throw new Error(`Wrong attribute value: "${String(value)}"`)
		}
	}
}

export type AttributeValue = string | null
