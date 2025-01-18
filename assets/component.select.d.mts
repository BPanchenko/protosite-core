export class ListboxElement extends HTMLElement {
    static initAttributes($element: any): Map<any, any>;
    static initAccessibilityTree(element: any, internals: any): void;
    ariaActiveDescendantElement: any;
    attributeChangedCallback(name: any, previous: any, current: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    formAssociatedCallback(form_: any): void;
    formDisabledCallback(state_: any): void;
    formResetCallback(): void;
    formStateRestoreCallback(state_: any, reason_: any): void;
    findByValue(query: any): any;
    search(query: any): Set<any>;
    select(param: any): any;
    shift(offset: any): this;
    set activeIndex(value: any);
    get activeIndex(): any;
    get disabled(): boolean;
    get length(): any;
    get multiple(): boolean;
    get options(): any[];
    set selectedIndex(value: any);
    get selectedIndex(): any;
    get selectedOptions(): any[];
    get value(): string | string[];
}
export namespace ListboxElement {
    let formAssociated: boolean;
    let role: string;
    let tagName: string;
    let observedAttributes: string[];
}
export class SelectComponent extends HTMLElement {
    static initAttributes(element: any, options: any): Map<any, any>;
    static initAccessibilityTree(element: any, options: any): void;
    attributeChangedCallback(name: any, previous: any, current: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    hidePicker(): this;
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
export namespace SelectComponent {
    let formAssociated_1: boolean;
    export { formAssociated_1 as formAssociated };
    let role_1: string;
    export { role_1 as role };
    let tagName_1: string;
    export { tagName_1 as tagName };
    let observedAttributes_1: string[];
    export { observedAttributes_1 as observedAttributes };
}
declare const index: CustomElementConstructor;
export { index as default };
