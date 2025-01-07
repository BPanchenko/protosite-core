export class Listbox extends HTMLElement {
    static initAttributes(element: any): Map<string, Attr>;
    internals: ElementInternals;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export namespace Listbox {
    let formAssociated: boolean;
    let role: string;
    let observedAttributes: string[];
}
declare const Listbox$1: CustomElementConstructor;
export { Listbox$1 as default };
