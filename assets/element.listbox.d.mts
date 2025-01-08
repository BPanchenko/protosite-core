export class ListboxElement extends HTMLElement {
    static initAttributes($element: any): Map<any, any>;
    static initAttributesForOption($element: any): void;
    attributeChangedCallback(name: any, previous: any, current: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    formAssociatedCallback(form_: any): void;
    formDisabledCallback(state_: any): void;
    formResetCallback(): void;
    formStateRestoreCallback(state_: any, reason_: any): void;
    shift(offset: any): any;
    set activeElement($element: any);
    get activeElement(): any;
    getByID(query: any): {
        $ref: any;
        option: any;
    };
    findByValue(query: any): {
        $ref: any;
        option: any;
    };
    search(query: any): {
        $ref: any;
        option: any;
    };
    select(value: any): any;
    unselect($element: any): boolean;
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
