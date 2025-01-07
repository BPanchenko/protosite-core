export class AvatarComponent extends HTMLElement {
    static observedAttributes: string[];
    static sizes: string[];
    /** @param {Avatar.Attributes} [attributes] */
    constructor(attributes?: Avatar.Attributes);
    attributeChangedCallback(name: any): void;
    connectedCallback(): void;
    #private;
}
declare const index: CustomElementConstructor;
export { index as default };
