declare class ArrowElement extends HTMLElement {
	#private;
	static readonly observedAttributes: string[];
	static readonly role = "img";
	static readonly tagName = "e-arrow";
	static readonly directions: Readonly<Direction[]>;
	static readonly figures: Readonly<Figure[]>;
	static readonly styles: Readonly<Style[]>;
	static readonly weights: Readonly<Weight[]>;
	constructor();
	attributeChangedCallback(_name: any, previous: any, current: any): void;
	connectedCallback(): void;
}
export declare const validDirectionValues: readonly ["bottom", "bottom-left", "bottom-right", "left", "right", "top", "top-left", "top-right"];
export declare const validFigureValues: readonly ["angle-left-top", "angle-right-bottom", "angle-right-bottom-fill", "angle-right-top", "angle-thick-bottom-left", "angle-thick-bottom-right-fill", "angle-thick-left-bottom-line", "angle-thick-top-left", "angle-thick-top-right", "fill", "line"];
export declare const validStyleValues: readonly ["acute", "angled", "large", "large-acute", "large-angled", "large-oblique", "oblique"];
export declare const validWeightValues: readonly ["thick"];
export declare const isExistingGlyph: (name: string, styleSheet: CSSStyleSheet | null) => boolean;
export declare const isValidDirection: (value: string) => value is Direction;
export declare const isValidFigure: (value: string) => value is Figure;
export declare const isValidStyle: (value: string) => value is Style;
export declare const isValidWeight: (value: string) => value is Weight;
export type Direction = (typeof validDirectionValues)[number]
export type Figure = (typeof validFigureValues)[number]
export type Style = (typeof validStyleValues)[number]
export type Weight = (typeof validWeightValues)[number]
export type { ArrowElement, Direction as ArrowDirection, Figure as ArrowFigure, Style as ArrowStyle, Weight as ArrowWeight, };
export default ArrowElement;