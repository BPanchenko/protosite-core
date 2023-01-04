declare interface ICustomElement extends HTMLElement {
    readonly observedAttributes?: string[];
    attributeChangedCallback?(name: string, previous: string, current: string): void;
    connectedCallback(): void;
    constructor: Function;
    disconnectedCallback?(): void;
}

declare type ICustomElementConstructor = new (...args: any[]) => ICustomElement;
