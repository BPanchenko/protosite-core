/**
 * @param {Record<string, string>} list
 * @returns {HTMLElement}
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttribute)
 */
export default function applyAttributes(list) {
	Object.entries(list).forEach(([key, value]) =>
		this.setAttribute(key, value),
	)
	return this
}
