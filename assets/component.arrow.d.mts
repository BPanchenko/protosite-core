export type State = {
    direction: Arrow.Direction | Arrow.Direction[];
    figure: Arrow.Figure | Arrow.Figure[];
    style: Arrow.Style | Arrow.Style[];
};
/**
 * @typedef {object} State
 * @property {Arrow.Direction | Arrow.Direction[]} direction
 * @property {Arrow.Figure | Arrow.Figure[]} figure
 * @property {Arrow.Style | Arrow.Style[]} style
 * */
export class ArrowComponent extends HTMLElement {
    /** @type Array<string> */
    static observedAttributes: Array<string>;
    static sizes: string[];
    /** @param {Arrow.Attributes} [attributes] */
    constructor(attributes?: Arrow.Attributes);
    attributeChangedCallback(name: any, previous: any, current: any): void;
    connectedCallback(): void;
    set font(value: any);
    set size(value: any);
    #private;
}
declare const index: CustomElementConstructor;
export { index as default };
