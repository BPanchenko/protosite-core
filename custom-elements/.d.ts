export interface CustomElementInterface extends HTMLElement {
    readonly observedAttributes?: string[];
    attributeChangedCallback?(name: string, previous: string, current: string): void;
    connectedCallback?(): void;
    disconnectedCallback?(): void;
}

export type CustomElementConstructor = new (...args: any[]) => CustomElementInterface;
