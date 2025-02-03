import type { ListboxElement, Option } from './element.listbox'
type InitAttributesOptions = {
	shadowRoot?: ShadowRoot
	internals?: ElementInternals
}
type InitAccessibilityTreeOptions = {
	$listbox: ListboxElement
	$status: HTMLElement
	internals: ElementInternals
}
declare class SelectComponent extends HTMLElement {
	static readonly formAssociated = true
	static readonly role = 'combobox'
	static readonly tagName = 'c-select'
	static readonly observedAttributes: readonly [
		'aria-disabled',
		'aria-expanded',
		'aria-multiselectable',
		'aria-required',
	]
	static initAttributes(
		element: SelectComponent,
		options: InitAttributesOptions,
	): any
	static initAccessibilityTree(
		element: SelectComponent,
		options: InitAccessibilityTreeOptions,
	): void
	constructor()
	attributeChangedCallback(
		name: string,
		previous: string | null,
		current: string | null,
	): void
	connectedCallback(): void
	disconnectedCallback(): void
	formResetCallback(): void
	hidePicker(): this
	showPicker(): this
	get disabled(): boolean
	get expanded(): boolean
	get multiple(): boolean
	get name(): string | null
	get options(): Option[]
	get readonly(): boolean
	get required(): boolean
	get length(): number
	get type(): string
	get value(): string | string[] | null
}
export { SelectComponent }
declare const _default: SelectComponent
export default _default
