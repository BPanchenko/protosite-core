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