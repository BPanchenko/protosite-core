/// <reference path="../../@types/index.d.ts" />

import cssStyleSheet, * as css from '#uikit/component/field'

import createElement from '../lib/cb.createElement'

const shadowMode = typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

const tagName = css.cField
const shadowHTML = `<div class="${css.cFieldContainer}">
	<label class="${css.cFieldLabel}" slot="label"></label>
	<div class="${css.cFieldDescription}" slot="description"></div>
	<input class="${css.cField}">
	<div class="${css.cFieldError}" slot="error"></div>
	<slot></slot>
</div>`

export class FieldComponent extends HTMLElement {
	#$ = new Map()
	#shadow

	static observedAttributes = ['type', 'max', 'min', 'value']

	/** @param {Field.Attributes} [attrs] */
	constructor(attrs = {}) {
		super()
		this.#applyAttributes(attrs)
		this.#shadow = this.attachShadow({ mode: shadowMode })
		this.#shadow.innerHTML = shadowHTML
	}

	connectedCallback() {
		this.#shadow.adoptedStyleSheets.push(cssStyleSheet)
		this.#$.set('field', this.#shadow.querySelector(`input.${css.cField}`))
		this.#on()
	}

	// States

	isFilled() {
		const flag =
			Boolean(this.value) ||
			['0', 'null', 'undefined'].includes(this.value) === false
		this.classList[flag ? 'add' : 'remove'](css.isFilled)
		return flag
	}

	isValid(pattern = null) {
		let val = this.value
		let ptr = pattern || this.pattern

		// is exists value and pattern

		if (!val || !ptr) {
			this.classList.remove(css.isInvalid, css.isValid)
			return null
		}

		// check pattern

		let reg = new RegExp(ptr)
		let is = reg.test(val)

		if (is) {
			this.classList.add(css.isValid)
			this.classList.remove(css.isInvalid)
		} else {
			this.classList.add(css.isInvalid)
			this.classList.remove(css.isValid)
		}

		return is
	}

	isCheckable() {
		return ~['radio', 'checkbox'].indexOf(this.type)
	}

	#applyAttributes(attrs = {}) {
		const valid = [
			'label',
			'list',
			'name',
			'type',
			'pattern',
			'disabled',
			'multiple',
		]
		const pairs = Object.entries(attrs)
		const badly = pairs.filter(([attr]) => valid.includes(attr) === false)
		const goodly = pairs.filter(([attr]) => valid.includes(attr))

		goodly.forEach(([key, value]) => this.setAttribute(key, value))
		if (badly.length > 0)
			console.warn(
				`Unsupported attributes: "${badly.map(([key]) => key).join(', ')}"`,
			)
	}

	// Event Listeners

	#on() {
		this._field.addEventListener('blur', this.#onBlur)
		this._field.addEventListener('change', this.#onChange)
		this._field.addEventListener('focus', this.#onFocus)
		this._field.addEventListener('input', this.#onInput)
		if (this._button)
			this._button.addEventListener('click', this.#onClickButton)
	}

	#onBlur() {
		this.isFilled()
		this.classList.remove()
		return this
	}

	#onChange() {
		return this.isFilled()
	}

	#onClickButton(e) {
		switch (this.type) {
			case 'password':
			case 'text':
				if (this.buttonGlyph === 'eye-closed') {
					e.preventDefault()
					this.buttonGlyph = 'eye-open'
					this.type = 'text'
				} else if (this.buttonGlyph === 'eye-open') {
					e.preventDefault()
					this.buttonGlyph = 'eye-closed'
					this.type = 'password'
				}
				break
			case 'search':
				if (!this.value) {
					e.preventDefault()
					this.classList.add(css.isInvalid)
				} else {
					this.classList.remove(css.isInvalid)
				}
				break
		}
		return this
	}
	#onFocus() {
		if (this.disabled) return false
		this.classList.add(css.isFocused)

		this._field.focus()

		// TODO: fix errors when the type is checkbox or radiobutton
		if (this.isCheckable()) this._field.click()

		return this
	}
	#onInput() {
		if (this.pattern && !~['email', 'password'].indexOf(this.type))
			this.isValid()
		return this
	}

	// Rendering

	#render() {
		return this
	}

	#renderButton() {
		return this
	}

	#renderError() {
		return this
	}

	#renderIcon(glyph) {
		let elem = createElement('i')
		elem.dataset.glyph = glyph
		return elem
	}

	get disabled() {
		return this._field.hasAttribute('disabled')
	}
	set disabled(flag) {
		if (flag !== false) {
			this.setAttribute('aria-disabled', true)
			this._field.setAttribute('disabled', 'disabled')
		} else {
			this.setAttribute('aria-disabled', false)
			this._field.removeAttribute('disabled')
		}
	}

	get button() {
		return this.dataset.button || this.getAttribute('button')
	}
	get buttonGlyph() {
		let glyph =
			this.dataset.buttonGlyph || this.getAttribute('button-glyph')
		if (!glyph && this._button)
			glyph = this._button.children[0].dataset.glyph
		return glyph
	}
	set buttonGlyph(val) {
		if (this._button) this._button.children[0].dataset.glyph = val
		else this.dataset.buttonGlyph = val
	}
	get buttonType() {
		return this.dataset.buttonType || this.getAttribute('button-type')
	}

	get error() {
		return this.dataset.error
	}

	get glyph() {
		return this.dataset.glyph || this.getAttribute('glyph')
	}
	set glyph(val) {
		this.dataset.glyph = val
		this.renderIcon(val)
	}

	get glyphAtRight() {
		return this.dataset.glyphAtRight || this.getAttribute('glyph-at-right')
	}

	get label() {
		return this.dataset.label || this.getAttribute('label')
	}
	set label(val) {
		this.dataset.glyph = val
		this.renderLabel(val)
	}

	get info() {
		return this.dataset.info || this.getAttribute('info')
	}
	get name() {
		return this.dataset.name || this.getAttribute('name')
	}
	get pattern() {
		return this.dataset.pattern || this.getAttribute('pattern')
	}
	get placeholder() {
		return this.dataset.placeholder || this.getAttribute('placeholder')
	}
	get type() {
		let type = this.dataset.type || this.getAttribute('type')
		if (!type && this._field) type = this._field.getAttribute('type')
		return type || 'text'
	}
	set type(val) {
		// TODO: reRender this._field
		if (this._field) this._field.setAttribute('type', val)
		else this.dataset.type = val
	}
	get value() {
		let val = this._field.value.trim()
		return val
	}
}

// Private function's

/**
 *
 * @param options
 */
function createField(options = {}) {
	let { children, name, pattern, placeholder, type = 'text', value } = options
	let node
	switch (type) {
		case 'select':
			node = document.createElement('select')
			if (children.length) {
				Array.from(children).forEach((child) => {
					if (child instanceof HTMLOptionElement)
						node.appendChild(child)
				})
			}
			break
		case 'textarea':
			node = document.createElement('textarea')
			break
		default:
			node = document.createElement('input')
			node.setAttribute('role', type === 'text' ? 'textbox' : type)
			node.setAttribute('type', type)
			pattern && node.setAttribute('name', pattern)
			placeholder && node.setAttribute('placeholder', placeholder)
			value && node.setAttribute('value', value)
	}
	node.classList.add('c-field')
	name && node.setAttribute('name', name)
	return node
}

customElements.define(tagName, FieldComponent)

export default customElements.get(tagName)
