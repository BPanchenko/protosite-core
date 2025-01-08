const createElement = (
	tagName: string,
	attrs: Record<string, string | string[]> = {},
) => {
	const element = document.createElement(tagName)
	Object.entries(attrs).forEach(([key, value]) => {
		switch (key) {
			case 'className':
				element.classList.add(value as string)
				break
			case 'classNames':
				; (value as Array<string>).forEach((item) =>
					element.classList.add(item),
				)
				break
			default:
				element.setAttribute(key, value as string)
		}
	})
	return element
}

export default createElement
