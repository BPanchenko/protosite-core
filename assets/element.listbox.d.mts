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
    set selectedIndex(value: any);
    get selectedIndex(): any;
    formStateRestoreCallback(state_: any, reason_: any): void;
    findByValue(query: any): any;
    search(query: any): Set<any>;
    select(param: any): any;
    shift(offset: any): this;
    set activeIndex(value: any);
    get activeIndex(): any;
    updateScrollbar(): void;
    get disabled(): boolean;
    get length(): any;
    get multiple(): boolean;
    get options(): any[];
    get selectedOptions(): any[];
    get value(): string | string[];
}
export namespace ListboxElement {
    let formAssociated: boolean;
    let role: string;
    let tagName: string;
    let observedAttributes: string[];
}
declare const index: CustomElementConstructor;
export { index as default };
