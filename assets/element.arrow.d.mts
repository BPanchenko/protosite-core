export class ArrowElement extends HTMLElement {
    attributeChangedCallback(name: any, previous: any, current: any): void;
    connectedCallback(): void;
}
export namespace ArrowElement {
    export let observedAttributes: string[];
    export let role: string;
    export let tagName: string;
    export { validDirectionValues as directions };
    export { validFigureValues as figures };
    export { validStyleValues as styles };
    export { validWeightValues as weights };
}
declare const index: CustomElementConstructor;
export function isValidDirection(value: any): boolean;
export function isValidFigure(value: any): boolean;
export function isValidStyle(value: any): boolean;
export function isValidWeight(value: any): boolean;
declare const validDirectionValues: string[];
declare const validFigureValues: string[];
declare const validStyleValues: string[];
declare const validWeightValues: string[];
export { index as default };
