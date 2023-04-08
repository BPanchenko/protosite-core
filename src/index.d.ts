declare const USE_SHADOW_DOM: boolean;

declare interface CustomElement extends HTMLElement {
	readonly $refs?: Map<string, HTMLElement | null>;
	readonly domMode?: DomAccessMode;
	readonly observedAttributes?: string[];
	readonly state?: Map<string, any>;

	adoptedCallback?(): void;
	attributeChangedCallback(name: string, previous: string, current: string): void;
	connectedCallback(): void;
	constructor: Function;
	disconnectedCallback?(): void;
	render?(): void;
}

declare enum DomAccessMode {
	Light = 'light',
	ShadowClosed = 'closed',
	ShadowOpen = 'open'
}

declare enum StateKey {
	StashedChildren = 'stashed-children'
}
