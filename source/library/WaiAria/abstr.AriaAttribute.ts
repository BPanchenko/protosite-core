import getDeepPrototypeOf from '../fn.getDeepPrototypeOf'

import type { Primitive } from '#type/manual.d.ts'

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

	#initial: string

	constructor(value: Primitive) {
		this.value = value
	}

	get initial(): string {
		return this.#initial
	}

	get value(): string {
		return this.value
	}

	set value(source: Primitive) {
		const previous = this.value
		const current = this._parseValue(source)

		if (current !== previous) {
			if (previous === null) this.#initial = current

			const proto = getDeepPrototypeOf(
				this,
				AriaAttribute,
			) as AriaAttribute
			proto.value = current
		}
	}

	protected _parseValue(value: Primitive): string | never {
		if (typeof value === 'string') {
			return value.trim()
		} else if (
			[
				'undefined',
				'string',
				'number',
				'boolean',
				'symbol',
				'bigint',
			].includes(typeof value)
		) {
			return String(value)
		} else {
			throw new Error(`Wrong attribute value: "${String(value)}"`)
		}
	}

	takeAttr(node: Attr) {
		const proto = getDeepPrototypeOf(this, AriaAttribute) as AriaAttribute
		node.value = proto.value
		Object.setPrototypeOf(proto, node)
		return this
	}
}
