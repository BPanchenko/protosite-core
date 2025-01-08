import isObject from './fn.isObject'

import type { Primitive } from '#types/primitive'

function updateAttributes(
	element: HTMLElement,
	hashtable: Record<string, Primitive>,
): Map<string, Attr>
function updateAttributes(
	element: HTMLElement,
	attrName: string,
	attrValue: Primitive,
): Map<string, Attr>
function updateAttributes(
	element: HTMLElement,
	objectOrAttrName,
	attrValue = null,
) {
	const pairs = isObject(objectOrAttrName)
		? Object.entries(objectOrAttrName)
		: [[objectOrAttrName, attrValue]]

	pairs.forEach(([key, value]) =>
		value === null
			? element.removeAttribute(String(key))
			: value instanceof Attr
				? element.setAttributeNode(value)
				: typeof key === 'string'
					? element.hasAttribute(key)
						? (element.getAttributeNode(key).value = String(value))
						: element.setAttribute(key, String(value))
					: void 0,
	)

	return new Map(
		element
			.getAttributeNames()
			.sort()
			.map((name) => [name, element.getAttributeNode(name)]),
	)
}

export default updateAttributes
