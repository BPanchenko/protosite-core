const toString = Object.prototype.toString

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

export function createGridObject(step = 10) {
	const grid = document.createElement('o-grid')
	if (isNumber(step) && step > 0) grid.dataset.step = step

	const fragment = document.createDocumentFragment()
	fragment.appendChild(grid)

	return fragment
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
