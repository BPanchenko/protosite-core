interface Option {
    $ref: WeakRef<HTMLElement>;
    label: string | null;
    value: string | null;
}
declare class ListboxElement extends HTMLElement {
    #private;
    ariaActiveDescendantElement: HTMLElement | null;
    static readonly formAssociated = true;
    static readonly role = "listbox";
    static readonly tagName = "e-listbox";
    static readonly observedAttributes: readonly ["aria-activedescendant", "aria-disabled", "aria-multiselectable", "aria-required"];
    static initAttributes($element: ListboxElement): Map<string, Attr | null>;
    static initAccessibilityTree(element: ListboxElement, internals: ElementInternals): void;
    constructor();
    attributeChangedCallback(name: any, previous: any, current: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    formAssociatedCallback(form_: any): void;
    formDisabledCallback(state_: any): void;
    formResetCallback(): void;
    formStateRestoreCallback(state_: any, reason_: any): void;
    /**
     * Returns an first option wich value is fully equal to the query string.
     */
    findByValue(query: string): Option | null;
    /**
     * Сall returns array of options for wich the query string is started substring of the label or value option.
     * @todo Check requirements for returned result
     */
    search(query: string): Set<Option> | null;
    select($element: HTMLElement | null): boolean;
    select(identifier: string): boolean;
    shift(offset: number): this;
    updateScrollbar(): void;
    get activeIndex(): number;
    set activeIndex(value: number);
    get disabled(): boolean;
    get length(): number;
    get multiple(): boolean;
    get options(): Option[];
    get owns(): string[] | null;
    get selectedIndex(): number;
    set selectedIndex(value: number);
    get selectedOptions(): HTMLElement[] | null;
    get value(): string | string[] | null;
}
export type { ListboxElement, Option };
export default ListboxElement;
