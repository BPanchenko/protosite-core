/**
 * @param {HTMLElement} element The element whose attributes will be modified
 * @param {Record<string, string>} hashtable List of key-value pairs that represent HTML attributes of the element
 * @returns {Map<string, string>} Collection of all attributes after modifying
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttribute)
 */
const applyAttributes = (element, hashtable) => {
	const mapAttributes = new Map(Object.entries(hashtable))

	mapAttributes.forEach((value, key) =>
		element.hasOwnProperty(key)
			? (element[key] = value)
			: element.setAttribute(key, value),
	)

	for (const { name, value } of element.attributes)
		mapAttributes.set(name, value)

	return mapAttributes
}

export default applyAttributes
