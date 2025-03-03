import updateAttributes from '#library/fn.updateAttributes'

import type { CustomElement } from '#type/iface.CustomElement'

class OptionElement extends HTMLElement implements CustomElement {
	static readonly oberverAttributes = [
		'aria-busy',
		'aria-checked',
		'aria-disabled',
		'aria-hidden',
		'aria-invalid',
		'aria-label',
		'aria-labelledby',
		'aria-posinset',
		'aria-selected',
		'aria-setsize',
		'data-value',
		'value',
	]

	static readonly role = 'option'
	static readonly tagName = 'e-option'

	static initAttributes($element: OptionElement) {
		const data = {
			'aria-selected': $element.ariaSelected ?? 'false',
			id: $element.id,
			role: this.role,
		}

		// [id]

		if ($element.isConnected && false === Boolean(data.id)) {
			data.id = [this.role, Math.round(performance.now())].join('-')
		}

		return updateAttributes($element, data)
	}

	constructor() {
		super()
		OptionElement.initAttributes(this)
	}

	connectedCallback(): void {
		OptionElement.initAttributes(this)
	}

	get label(): string | null {
		return this.ariaLabel || this.textContent
	}

	get value(): string | null {
		return this.dataset.value || this.getAttribute('value')
	}
}

export type { OptionElement }
export default OptionElement
