const toString = Object.prototype.toString

Object.defineProperty(String.prototype, 'capitalize', {
	value: function () {
		return this.charAt(0).toUpperCase() + this.slice(1)
	},
	enumerable: false,
})

/**
 * @type {($element: HTMLElement, hash: Record<string, string>) => void}
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttribute)
 */
export const initAttributes = ($element, hash) =>
	Object.entries(hash).forEach(([key, value]) =>
		$element.setAttribute(key, value),
	)

/**
 * The function attaches a shadow DOM tree to the specified element and returns a reference to its ShadowRoot.
 *
 * @param {HTMLElement} $element
 * @param {Object} options
 * @param {HTMLTemplateElement} options.$template
 * @param {boolean} options.delegatesFocus - If true, when a non-focusable part of the shadow DOM is clicked, or .focus() is called on the host element, the first focusable part is given focus, and the shadow host is given any available :focus styling.
 * @param {"closed" | "open"} options.mode - When the mode of a shadow root is "closed", the shadowroot implementation internals are inaccessible and unchangeable.
 * @param {boolean} options.serializable - If set, the shadow root may be serialized by calling the Element.getHTML() or ShadowRoot.getHTML() methods with the options.serializableShadowRoots parameter set true.
 * @param {"manual" | "named"} options.slotAssignment
 * @returns {ShadowRoot} ShadowRoot of the specified element
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/attachShadow)
 *
 * [About `ShadowRoot.delegatesFocus` property](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus)
 *
 * [About `ShadowRoot.mode` property](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode)
 *
 * [About `ShadowRoot.serializable` property](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/serializable)
 *
 * [About `ShadowRoot.slotAssignment` property](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/slotAssignment)
 */
export const initShadowRoot = ($element, options) => {
	const {
		$template,
		delegatesFocus = false,
		mode = 'closed',
		serializable = false,
	} = options

	const node = $element.attachShadow({
		delegatesFocus,
		mode,
		serializable,
	})

	node.appendChild($template.cloneNode(true))
	return node
}

export const checkFontFace = (search) =>
	document.fonts
		.values()
		.findIndex(({ fontFace }) => fontFace.family === search) > -1

export const compactObject = (obj) => {
	const result = Array.from(Object.entries(obj)).reduce(
		(acc, [key, value]) => (value ? (acc[key] = value) && acc : acc),
		{},
	)
	return result
}

export function createElement(tagName, attrs = {}) {
	const element = document.createElement(tagName)
	Object.entries(attrs).forEach(([key, value]) => {
		switch (key) {
			case 'className':
				element.classList.add(value)
				break
			case 'classNames':
				value.forEach((item) => element.classList.add(item))
				break
			default:
				element.setAttribute(key, value)
		}
	})
	return element
}

export function createGridObject(step = 10) {
	const grid = document.createElement('o-grid')
	if (isNumber(step) && step > 0) grid.dataset.step = step

	const fragment = document.createDocumentFragment()
	fragment.appendChild(grid)

	return fragment
}

export function getTag(value) {
	if (value == null) {
		return value === undefined ? '[object Undefined]' : '[object Null]'
	}
	return toString.call(value)
}

export function isNumber(value) {
	return (
		typeof value === 'number' ||
		(isObjectLike(value) && getTag(value) === '[object Number]')
	)
}

export function isObjectLike(value) {
	return typeof value === 'object' && value !== null
}

export function selectNode(node) {
	if (document.body.createTextRange) {
		const range = document.body.createTextRange()
		range.moveToElementText(node)
		range.select()
	} else if (window.getSelection) {
		const selection = window.getSelection()
		const range = document.createRange()
		range.selectNodeContents(node)
		selection.removeAllRanges()
		selection.addRange(range)
	} else {
		console.warn('Could not select text in node: Unsupported browser.')
	}
}
