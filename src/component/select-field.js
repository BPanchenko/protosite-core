/// <reference path="./select-field.d.ts" />

import { TemplateInstance } from '@github/template-parts'
import { initAttributes, initShadowRoot } from '../helpers'

const $template = new TemplateInstance(
	document.getElementById('tpl-select-field'),
)
const shadowMode = typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

const tagName = 'c-select-field'

/** @typedef {'collapsed' | 'expanded'} ListBoxState */
/** @typedef {Map<WeakRef<HTMLElement>, { label: string, value: string }>} OptionListCache */

class SelectField extends HTMLElement {
	/** @type {OptionListCache} */
	#cache = new Map()

	/** @type {boolean} */
	#interactive = false

	/** @type {ElementInternals} */
	#internals_

	/** @type {ShadowRoot} */
	#shadow_

	static formAssociated = true

	/** @type Array<SelectField.Attributes> */
	static observedAttributes = ['label', 'name']

	/** @param {SelectField.Attributes} [attributes] */
	constructor(attributes = {}) {
		super()

		initAttributes(this, {
			exportparts: 'button, choice, listbox',
			role: 'combobox',
			...attributes,
		})

		this.#shadow_ = initShadowRoot(this, {
			$template,
			delegatesFocus: true,
			mode: shadowMode,
			serializable: true,
		})

		this.#initInternals()
		this.#initOptionsCache()
	}

	attributeChangedCallback(name, previous, current) {
		if (false === this.isConnected) return

		switch (name) {
			case 'label':
				this.#$status.ariaLabel = current
				break
			default:
		}
	}

	connectedCallback() {
		this.addEventListener('click', this.#onClick)
		this.addEventListener('focus', this.#onFocus)
		this.addEventListener('blur', this.#onBlur)
	}

	selectOption(idx) {
		this.options[idx].ariaSelected = true
		this.options[idx].ariaChecked = true
	}

	/**
	 * @param {ListBoxState} [state] - New value of state
	 * @returns {ListBoxState} Current state after call
	 */
	toggle(state) {
		const { states } = this.#internals_
		const expanded =
			state === 'expanded' || states.has('expanded') === false

		if (expanded) {
			states.add('expanded')
			states.delete('collapsed')
		} else {
			states.add('collapsed')
			states.delete('expanded')
			this.#focus(this.#$button)
		}
		this.ariaExpanded = expanded
		return expanded ? 'expanded' : 'collapsed'
	}

	get form() {
		return this.#internals_.form
	}

	get interactive() {
		return this.#interactive
	}

	get value() {
		const result = null
		this.setAttribute('value', result)
		return result
	}

	/** @type {HTMLDivElement} */
	get #$active() {
		return this.#internals_.ariaActiveDescendantElement
	}

	/** @param {HTMLDivElement} $elem */
	set #$active($elem) {
		this.#internals_.ariaActiveDescendantElement = $elem
	}

	/** @type {HTMLDivElement} */
	get #$button() {
		return this.#$('[role=button]')
	}

	/** @type {HTMLDivElement} */
	get #$status() {
		return this.#$('[role=status]', this.#$button)
	}

	/** @type {HTMLDivElement} */
	get #$listbox() {
		return this.#$('[role=listbox]')
	}

	/** @type {HTMLSlotElement} */
	get #$slot() {
		return this.#$listbox.children[0]
	}

	/** @type {HTMLSlotElement} */
	get #$slotListbox() {
		return this.#$('slot[name=listbox]')
	}

	/** @type {HTMLElement} */
	get #$lastOption() {
		return this.#$('[role=option]:last-of-type', this.#$listbox)
	}

	/** @type {HTMLElement} */
	get #$firstOption() {
		return this.#$('[role=option]:first-of-type', this.#$listbox)
	}

	/**
	 * Returns the first element that is a descendant of node that matches selector.
	 *
	 * @param {string} selector
	 * @param {HTMLElement | ShadowRoot | null} $parent
	 * @returns {HTMLElement | null}
	 */
	#$(selector, $parent = null) {
		return ($parent ?? this.#shadow_).querySelector(selector)
	}

	/**
	 * Set/Get focused element
	 *
	 * @param {HTMLElement} [element]
	 * @returns {HTMSelectFieldLElement}
	 */
	#focus($elem) {
		if (HTMLElement.prototype.isPrototypeOf($elem)) {
			this.#$active.removeAttribute('aria-activedescendant')
			this.#$active = $elem
			this.#$active.setAttribute('aria-activedescendant', 'true')
		}
		return this.#$active
	}

	/** @returns {HTMSelectFieldLElement} */
	#setInteractionHandlers() {
		if (this.#interactive === false) {
			this.addEventListener('click', this.#onClick)
			this.addEventListener('keypress', this.#onKeyPress)
			this.#interactive = true
		}
		return this
	}

	/** @returns {HTMSelectFieldLElement} */
	#deleteInteractionHandlers() {
		if (this.#interactive) {
			this.removeEventListener('click', this.#onClick)
			this.removeEventListener('keypress', this.#onKeyPress)
			this.#interactive = false
		}
		return this
	}

	#onFocus() {
		this.#setInteractionHandlers()
	}

	#onClick() {
		this.toggle()
	}

	#onKeyPress({ key }) {
		switch (key) {
			case 'Backspace':
			case 'Enter':
				if (this.focused === this.#$button) {
					this.toggle('expanded')
				}
				break
			case 'Escape':
				if (this.focused !== this.#$button) {
					this.toggle('collapsed')
				}
				break
			case 'End':
				this.focus(this.#$lastOption)
				break
			case 'Home':
				this.focus(this.#$firstOption)
				break
			case 'ArrowUp':
				break
			case 'ArrowDown':
				break
			default:
				if (/\w+/.test(key)) {
					// TODO
				}
		}
	}

	#onBlur() {
		this.#deleteInteractionHandlers()
		this.toggle('collapsed')
	}

	/**
	 * This method allows a custom element to participate in HTML forms.
	 * The ElementInternals interface provides utilities for working with these elements in the same way you would work with any standard HTML form element, and also exposes the Accessibility Object Model to the element.
	 *
	 * @returns {void | never}
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/attachInternals)
	 */
	#initInternals() {
		const node = this.attachInternals()

		node.ariaActiveDescendantElement = this.#$(
			'[aria-activedescendant=true]',
		)

		console.assert(
			node.ariaActiveDescendantElement,
			'Attribute `[aria-activedescendant]` requires specifying for some child node',
		)

		this.#internals_ = node
	}

	#initOptionsCache() {
		/** @type {(list: OptionListCache) => void} */
		const cleanup = (list) =>
			list.forEach(
				(_, $ref) =>
					false === $ref.deref().isConnected && list.delete($ref),
			)

		this.#$slotListbox.addEventListener('slotchange', () => {
			const $$elements = this.#$slot.assignedElements()
			for (const $elem of $$elements)
				if ($elem.hasAttribute('role') && $elem.role === 'option')
					this.#cache.set(new WeakRef($elem), {
						label: $elem.textContent || $elem.dataset.value,
						value: $elem.dataset.value || $elem.textContent,
					})
				else $elem.remove()
			cleanup(this.#cache)
		})
	}
}

customElements.define(tagName, SelectField)

export default customElements.get(tagName)
