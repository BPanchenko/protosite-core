export class SelectField extends HTMLElement {
    static initAttributes(element: any, options: any): Map<any, any>;
    static initAccessibilityTree(element: any, options: any): void;
    attributeChangedCallback(name: any, previous: any, current: any): void;
    set value(updated: any);
    get value(): any;
    connectedCallback(): void;
    disconnectedCallback(): void;
    formAssociatedCallback(form_: any): void;
    formDisabledCallback(disabled: any): void;
    formResetCallback(): void;
    formStateRestoreCallback(state: any, reason_: any): void;
    collapse(): this;
    expand(): this;
    toggle(): void;
    get disabled(): boolean;
    get expanded(): boolean;
    get multiple(): boolean;
    get options(): any;
    get readonly(): boolean;
    get size(): any;
}
export namespace SelectField {
    let formAssociated: boolean;
    let role: string;
    let tagName: string;
    let observedAttributes: string[];
}
declare const index: CustomElementConstructor;
export { index as default };
