/// <reference path="./select-field.d.ts" />

import { TemplateInstance } from '@github/template-parts'
import applyAttributes from '../lib/fn.applyAttributes'
import initShadowRoot from '../lib/fn.initShadowRoot'

const $template = new TemplateInstance(
	document.getElementById('tpl-select-field'),
)

const tagName = 'c-select-field'

/** @typedef {'collapsed' | 'expanded'} ListBoxState */
/** @typedef {{ label: string, value: string }} ListItem */
/** @typedef {Map<WeakRef<Element>, ListItem>} RefOptionList */

class SelectField extends HTMLElement {
	/** @type {RefOptionList} */
	#list

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

		applyAttributes.call(this, {
			'aria-atomic': true,
			exportparts: 'button, choice, listbox',
			role: 'combobox',
			...attributes,
		})

		this.#shadow_ = initShadowRoot.call(this, { $template })

		this.#list = this.#initRefOptionsList()
		this.#internals_ = this.#initInternals()
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

	select(idx) {
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
			this.#$active = this.#$button
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

	/**
	 * @type {HTMLElement}
	 *
	 * Get focused element
	 */
	get #$active() {
		return this.#internals_.ariaActiveDescendantElement
	}

	/**
	 * @param {HTMLElement} $element
	 *
	 * Set/Get focused element
	 */
	set #$active($element) {
		$element.ariaActiveDescendant = true
		this.#$active.ariaActiveDescendant = null
		this.#internals_.ariaActiveDescendantElement = $element
	}

	/** @type {HTMLElement} */
	get #$button() {
		return this.#$('[role=button]')
	}

	/** @type {HTMLElement} */
	get #$status() {
		return this.#$('[role=status]', this.#$button)
	}

	/** @type {HTMLElement} */
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
	 * Returns the first element that is a descendant of element that matches selector.
	 *
	 * @param {string} selector
	 * @param {HTMLElement | ShadowRoot} [$parent]
	 * @returns {HTMLElement | null}
	 */
	#$(selector, $parent) {
		return ($parent ?? this.#shadow_).querySelector(selector)
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

	#onBlur() {
		this.#deleteInteractionHandlers()
		this.toggle('collapsed')
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

	/**
	 * This method allows a custom element to participate in HTML forms.
	 * The ElementInternals interface provides utilities for working with these elements in the same way you would work with any standard HTML form element, and also exposes the Accessibility Object Model to the element.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/attachInternals)
	 *
	 * @returns {ElementInternals | never}
	 */
	#initInternals() {
		const elem = this.attachInternals()

		elem.ariaActiveDescendantElement = this.#$(
			'[aria-activedescendant=true]',
		)

		console.assert(
			elem.ariaActiveDescendantElement,
			'Attribute `[aria-activedescendant]` requires specifying for some child element',
		)

		return elem
	}

	#initRefOptionsList() {
		/** @type {RefOptionList} */
		const list = new Map()

		const cleanup = (list) =>
			list.forEach(
				(_, ref, map) =>
					Boolean(ref.deref()?.isConnected) || map.delete(ref),
			)

		this.#$slotListbox.addEventListener('slotchange', () => {
			const $$elements = this.#$slot.assignedElements()
			for (const $element of $$elements)
				if ($element.hasAttribute('role') && $element.role === 'option')
					list.set(new WeakRef($element), {
						label: $element.textContent || $element.dataset.value,
						value: $element.dataset.value || $element.textContent,
					})
				else $element.remove()
			cleanup(list)
		})

		return list
	}
}

customElements.define(tagName, SelectField)

export default customElements.get(tagName)
