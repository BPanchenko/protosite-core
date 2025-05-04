import type { CustomElement } from './iface.custom-element';
declare class OptionElement extends HTMLElement implements CustomElement {
	static readonly oberverAttributes: string[];
	static readonly role = "option";
	static readonly tagName = "e-option";
	static initAttributes($element: OptionElement): Map<string, Attr | null>;
	constructor();
	connectedCallback(): void;
	get label(): string | null;
	get value(): string | null;
}
export type { OptionElement };
export default OptionElement;
