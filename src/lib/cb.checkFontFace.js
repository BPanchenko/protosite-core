const checkFontFace = (search) =>
	document.fonts
		.values()
		.findIndex(({ fontFace }) => fontFace.family === search) > -1

export default checkFontFace
