const createElement = (tagName, attrs = {}) => {
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

export default createElement
