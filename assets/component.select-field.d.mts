export class SelectField extends HTMLElement {
    static initAttributes(element: any, options: any): Map<any, any>;
    static initAccessibilityTree(element: any, options: any): void;
    attributeChangedCallback(name: any, previous: any, current: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    closePicker(): this;
    showPicker(): this;
    get disabled(): boolean;
    get expanded(): boolean;
    get multiple(): boolean;
    get name(): string;
    get options(): any;
    get readonly(): boolean;
    get required(): boolean;
    get length(): any;
    get type(): string;
    get value(): any;
}
export namespace SelectField {
    let formAssociated: boolean;
    let role: string;
    let tagName: string;
    let observedAttributes: string[];
}
declare const index: CustomElementConstructor;
export { index as default };
