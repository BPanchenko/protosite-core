import getDeepPrototypeOf from '../fn.getDeepPrototypeOf'

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

	private _initial: AttributeValue

	constructor(value: Primitive = null) {
		this.value = value
	}

	get initial(): AttributeValue {
		return this._initial ?? null
	}

	get value(): AttributeValue {
		return this.value ?? null
	}

	set value(source: Primitive) {
		const previous = this.value
		const current = this._parseValue(source)

		if (current !== previous) {
			if (previous === null) this._initial = current

			const proto: AriaAttribute = getDeepPrototypeOf(this, AriaAttribute)
			proto.value = current
		}
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

	takeAttr(node: Attr) {
		const proto: AriaAttribute = getDeepPrototypeOf(this, AriaAttribute)
		node.value = proto.value
		Object.setPrototypeOf(proto, node)
		return this
	}
}

export type AttributeValue = string | null
