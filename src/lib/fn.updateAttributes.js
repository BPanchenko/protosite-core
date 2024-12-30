import isObject from './fn.isObject.js'

/**
 * @param {HTMLElement} element The element whose attributes will be modified
 * @param {Record<string, string> | string} objectOrAttrName List of key-value pairs that represent HTML attributes of the element
 * @param {boolean | number | string} [attrValue] List of key-value pairs that represent HTML attributes of the element
 * @returns {Map<string, Attr>} Collection of element attributes after modification. Attributes are sorted by name.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttribute)
 */
const updateAttributes = (element, objectOrAttrName, attrValue = null) => {
	const pairs = isObject(objectOrAttrName)
		? Object.entries(objectOrAttrName)
		: [[objectOrAttrName, attrValue]]

	pairs.forEach(([key, value]) =>
		value === null
			? element.removeAttribute(key)
			: value instanceof Attr
				? element.setAttributeNode(value)
				: typeof key === 'string'
					? element.hasAttribute(key)
						? (element.getAttributeNode(key).value = value)
						: element.setAttribute(key, value)
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
