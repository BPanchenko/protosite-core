export declare class AvatarComponent extends HTMLElement {
	static readonly observedAttributes: string[]
	static readonly role = 'img'
	static readonly tagName = 'c-avatar'
	static initAttributes(element: AvatarComponent): any
	constructor()
	/**
	 * All changes are passed to child nodes
	 */
	attributeChangedCallback(
		name: string,
		previous: string | null,
		current: string | null,
	): void
	connectedCallback(): void
}
declare const _default: AvatarComponent
export default _default
