const _ = window._

function createGridUtility(step = 10) {
    let grid = document.createElement('u-grid')
    if (_.isNumber(step) && step > 0) grid.dataset.step = step 

    let fragment = document.createDocumentFragment()
    fragment.appendChild(grid)
    
    return fragment
}

export {
    createGridUtility
}
