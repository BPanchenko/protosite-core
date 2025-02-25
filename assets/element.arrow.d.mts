export declare class ArrowElement extends HTMLElement {
	static readonly observedAttributes: string[]
	static readonly role = 'img'
	static readonly tagName = 'e-arrow'
	static readonly directions: Readonly<Direction[]>
	static readonly figures: Readonly<Figure[]>
	static readonly styles: Readonly<Style[]>
	static readonly weights: Readonly<Weight[]>
	constructor()
	attributeChangedCallback(name_: any, previous: any, current: any): void
	connectedCallback(): void
}
export type Direction =
	| 'bottom'
	| 'bottom-left'
	| 'bottom-right'
	| 'left'
	| 'right'
	| 'top'
	| 'top-left'
	| 'top-right'
export type Figure =
	| 'angle-left-top'
	| 'angle-right-bottom'
	| 'angle-right-bottom-fill'
	| 'angle-right-top'
	| 'angle-thick-bottom-left'
	| 'angle-thick-bottom-right-fill'
	| 'angle-thick-left-bottom-line'
	| 'angle-thick-top-left'
	| 'angle-thick-top-right'
	| 'fill'
	| 'line'
export type Style =
	| 'acute'
	| 'angled'
	| 'large'
	| 'large-acute'
	| 'large-angled'
	| 'large-oblique'
	| 'oblique'
export type Weight = 'thick'
export declare const isValidDirection: (value: string) => value is Direction
export declare const isValidFigure: (value: string) => value is Figure
export declare const isValidStyle: (value: string) => value is Style
export declare const isValidWeight: (value: string) => value is Weight
declare const _default: ArrowElement
export default _default
