export interface Option {
	$ref: OptionRef
	label: string | null
	value: string | null
}

export type OptionRef = WeakRef<HTMLElement>

export type OptionCollection = Map<string | number, Option>

export type SearchResult = {
	$ref: OptionRef
	option: Option
} | null
