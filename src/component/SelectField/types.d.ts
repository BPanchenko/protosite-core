import type { Listbox } from '#element/Listbox'

export type InitAttributesOptions = {
	shadowRoot?: ShadowRoot
	internals?: ElementInternals
}

export type InitAccessibilityTreeOptions = {
	$listbox: Listbox
	internals: ElementInternals
}

export type Option = {
	$element: HTMLElement
	label: string
	value: string
}

export type OptionCollection = Map<WeakRef<Option['$element']>, Option>
