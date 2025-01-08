import type { OptionElement } from '#element/Option'

export interface Option {
	$element: OptionElement | HTMLElement
	label: string | null
	value: string | null
}

export type OptionRef = WeakRef<Option['$element']>

export type OptionCollection = Map<OptionRef, Option>

export type SearchResult = {
	$ref: OptionRef
	option: Option
} | null
