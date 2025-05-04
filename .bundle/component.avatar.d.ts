declare class AvatarComponent extends HTMLElement {
	#private;
	static readonly observedAttributes: string[];
	static readonly role = "img";
	static readonly tagName = "c-avatar";
	static initAttributes(element: AvatarComponent): Map<string, Attr | null>;
	constructor();
	/**
	 * All changes are passed to child nodes
	 */
	attributeChangedCallback(name: string, previous: string | null, current: string | null): void;
}
export type { AvatarComponent };
export default AvatarComponent;
