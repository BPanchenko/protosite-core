import type { CustomElement } from '#types'

export interface Option {
	$element: CustomElement | HTMLElement
	label: string
	value: string
	index: number
}

export type OptionRef = WeakRef<Option['$element']>

export type OptionCollection = Map<OptionRef, Option>

export type SearchResult = {
	$ref: OptionRef
	option: Option
} | null
