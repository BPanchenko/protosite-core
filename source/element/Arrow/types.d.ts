import {
	validDirectionValues,
	validFigureValues,
	validStyleValues,
	validWeightValues,
} from './library'

export type Direction = (typeof validDirectionValues)[number]
export type Figure = (typeof validFigureValues)[number]
export type Style = (typeof validStyleValues)[number]
export type Weight = (typeof validWeightValues)[number]
