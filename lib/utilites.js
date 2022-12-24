const _ = window._

function createGridUtility(step = 10) {
    let grid = document.createElement('u-grid')
    if (_.isNumber(step) && step > 0) grid.dataset.step = step 

    let fragment = document.createDocumentFragment()
    fragment.appendChild(grid)
    
    return fragment
}

function selectNode(node) {
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
		console.warn("Could not select text in node: Unsupported browser.")
	}
}

export {
    createGridUtility,
	selectNode
}
