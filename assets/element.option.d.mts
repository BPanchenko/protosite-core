export class OptionElement extends HTMLElement {
    static initAttributes($element: any): Map<any, any>;
    connectedCallback(): void;
    get label(): string;
    get value(): string;
}
export namespace OptionElement {
    let oberverAttributes: string[];
    let role: string;
    let tagName: string;
}
declare const Option: CustomElementConstructor;
export { Option as default };
