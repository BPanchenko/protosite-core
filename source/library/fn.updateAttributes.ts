import isObject from './fn.isObject'

import type { Primitive } from '#type/manual.d.ts'

function updateAttributes(
	element: HTMLElement,
	objectOrAttrName: string | object,
	attrValue?: Primitive | null,
): Map<string, Attr | null> {
	const pairs = isObject(objectOrAttrName)
		? Object.entries(objectOrAttrName)
		: [[objectOrAttrName, attrValue]]

	pairs.forEach(([key, value]) => {
		const attrName = String(key)
		if (value === null) element.removeAttribute(attrName)
		else if (value instanceof Attr) element.setAttributeNode(value)
		else {
			const attr = element.getAttributeNode(attrName)
			const attrValue = String(value)
			if (attr !== null) attr.value = attrValue
			else element.setAttribute(attrName, attrValue)
		}
	})

	return new Map(
		element
			.getAttributeNames()
			.sort()
			.map((name) => [name, element.getAttributeNode(name)]),
	)
}

export default updateAttributes
