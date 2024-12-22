declare namespace Arrow {
	type Direction =
		| 'top-left'
		| 'top'
		| 'top-right'
		| 'right'
		| 'bottom-right'
		| 'bottom'
		| 'bottom-left'
		| 'left'

	type Figure =
		| 'angle-left-top'
		| 'angle-right-bottom-fill'
		| 'angle-right-bottom'
		| 'angle-right-top'
		| 'angle-thick-bottom-left'
		| 'angle-thick-bottom-right-fill'
		| 'angle-thick-left-bottom-line'
		| 'angle-thick-top-left'
		| 'angle-thick-top-right'
		| 'fill'
		| 'line'

	type Style =
		| 'acute'
		| 'angled'
		| 'large-acute'
		| 'large-angled'
		| 'large-oblique'
		| 'large'
		| 'oblique'

	type Weight = 'thick'

	type Attributes = {
		direction: Direction
		figure: Figure
		font: string
		glyph: string

		/**
		 * Resizes the component. The default size is defined in UIKit.
		 * 
		 * [UIKit Reference](http://protosite.rocks/components/avatar.html)
		 */
		size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

		style: Style
		weight: Weight
	}

	interface WebComponent extends HTMLElement {
		observedAttributes: string[]

		attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void
	}
}