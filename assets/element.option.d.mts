import type { CustomElement } from './iface.CustomElement'
export declare class OptionElement
	extends HTMLElement
	implements CustomElement {
	static readonly oberverAttributes: string[]
	static readonly role = 'option'
	static readonly tagName = 'e-option'
	static initAttributes($element: OptionElement): any
	constructor()
	connectedCallback(): void
	get label(): string | null
	get value(): string | null
}
declare const _default: OptionElement
export default _default
