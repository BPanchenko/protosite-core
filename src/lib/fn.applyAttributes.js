/**
 * @param {Record<string, string>} list
 * @returns {HTMLElement}
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttribute)
 */
export default function applyAttributes(list) {
	const mapAttributes = new Map(Object.entries(list))

	mapAttributes.forEach((value, key) =>
		this.hasOwnProperty(key)
			? (this[key] = value)
			: this.setAttribute(key, value),
	)

	for (const { name, value } of this.attributes)
		mapAttributes.set(name, value)

	return mapAttributes
}
