export class ListboxElement extends HTMLElement {
    static initAttributes($element: any): Map<any, any>;
    static initOptionAttributes($element: any): void;
    attributeChangedCallback(name: any, previous: any, current: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    formAssociatedCallback(form_: any): void;
    formDisabledCallback(state_: any): void;
    formResetCallback(): void;
    formStateRestoreCallback(state_: any, reason_: any): void;
    shift(offset: any): this;
    findByValue(query: any): any;
    search(query: any): Set<any>;
    select(param: any): any;
    unselect($element: any): boolean;
    set activeElement($element: any);
    get activeElement(): any;
    get multiple(): boolean;
    get options(): any[];
    get selectedElements(): any[];
    get size(): any;
}
export namespace ListboxElement {
    let formAssociated: boolean;
    let role: string;
    let tagName: string;
    let observedAttributes: string[];
}
declare const index: CustomElementConstructor;
export { index as default };
