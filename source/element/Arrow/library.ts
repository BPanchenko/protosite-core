import type { Direction, Figure, Style, Weight } from './types.d.ts'

export const validDirectionValues = <const>[
	'bottom',
	'bottom-left',
	'bottom-right',
	'left',
	'right',
	'top',
	'top-left',
	'top-right',
]
export const validFigureValues = <const>[
	'angle-left-top',
	'angle-right-bottom',
	'angle-right-bottom-fill',
	'angle-right-top',
	'angle-thick-bottom-left',
	'angle-thick-bottom-right-fill',
	'angle-thick-left-bottom-line',
	'angle-thick-top-left',
	'angle-thick-top-right',
	'fill',
	'line',
]
export const validStyleValues = <const>[
	'acute',
	'angled',
	'large',
	'large-acute',
	'large-angled',
	'large-oblique',
	'oblique',
]
export const validWeightValues = <const>['thick']

export const isExistingGlyph = (
	name: string,
	styleSheet: CSSStyleSheet | null,
): boolean => {
	if (styleSheet === null || false === Boolean(styleSheet?.cssRules)) {
		return true
	} else
		for (const rule of styleSheet.cssRules)
			if (
				(rule as CSSStyleRule).selectorText === `[data-glyph="${name}"]`
			)
				return true
	return false
}

export const isValidDirection = (value: string): value is Direction => {
	return validDirectionValues.includes(value as Direction)
}

export const isValidFigure = (value: string): value is Figure => {
	return validFigureValues.includes(value as Figure)
}

export const isValidStyle = (value: string): value is Style => {
	return validStyleValues.includes(value as Style)
}

export const isValidWeight = (value: string): value is Weight => {
	return validWeightValues.includes(value as Weight)
}
