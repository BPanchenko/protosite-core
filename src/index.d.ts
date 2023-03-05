declare const USE_SHADOW_DOM: boolean;

declare interface CustomElement extends HTMLElement {
	readonly observedAttributes?: string[];

	attributeChangedCallback?(name: string, previous: string, current: string): void;
	connectedCallback(): void;
	constructor: Function;
	disconnectedCallback?(): void;
}
