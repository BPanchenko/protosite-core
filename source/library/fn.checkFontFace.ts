const checkFontFace = (query: string): boolean =>
	Array.from(document.fonts.values()).findIndex(
		(fontFace) => fontFace.family === query,
	) > -1

export default checkFontFace
