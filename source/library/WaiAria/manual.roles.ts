/**
 * [WAI-ARIA Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)
 */

export const compositeRoles = <const>[
	'combobox',
	'grid',
	'listbox',
	'menu',
	'menubar',
	'radiogroup',
	'tablist',
	'tree',
	'treegrid',
]
export const landmarkRoles = <const>[
	'banner',
	'complementary',
	'contentinfo',
	'form',
	'main',
	'navigation',
	'region',
	'search',
]
export const regionRoles = <const>['alert', 'log', 'marquee', 'status', 'timer']
export const structureRoles = <const>[
	'application',
	'article',
	'cell',
	'columnheader',
	'definition',
	'directory',
	'document',
	'feed',
	'figure',
	'group',
	'heading',
	'img',
	'list',
	'listitem',
	'math',
	'none',
	'note',
	'presentation',
	'row',
	'rowgroup',
	'rowheader',
	'separator',
	'table',
	'term',
	'toolbar',
	'tooltip',
]
export const widgetRoles = <const>[
	'button',
	'checkbox',
	'gridcell',
	'link',
	'menuitem',
	'menuitemcheckbox',
	'menuitemradio',
	'option',
	'progressbar',
	'radio',
	'scrollbar',
	'searchbox',
	'separator',
	'slider',
	'spinbutton',
	'switch',
	'tab',
	'tabpanel',
	'textbox',
	'treeitem',
]
export const windowRoles = <const>['alertdialog', 'dialog']

export const roles = <const>[
	...compositeRoles,
	...landmarkRoles,
	...regionRoles,
	...structureRoles,
	...widgetRoles,
	...windowRoles,
]
