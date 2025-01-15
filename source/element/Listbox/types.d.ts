export interface Option {
	$ref: OptionRef
	label: string | null
	value: string | null
}

export type OptionRef = WeakRef<HTMLElement>
