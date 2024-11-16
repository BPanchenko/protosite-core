const toString = Object.prototype.toString

Object.defineProperty(String.prototype, 'capitalize', {
	value: function () {
		return this.charAt(0).toUpperCase() + this.slice(1)
	},
	enumerable: false,
})

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
