{
	const CLS = Object.create(null, {
		component: { value: 'c-field' },
		container: { value: 'c-field-box' },
		label: { value: 'c-field-label' },
		error: { value: 'c-field-error' },
		focused: { value: 'is-focused' },
		invalid: { value: 'is-invalid' },
		valid: { value: 'is-valid' },
	})

	const DEFAULT_MIN = 2
	const DEFAULT_MAX = 64

	function _init() {
		this.__container = _createContainer.call(this)
		this.__component = _createComponent.call(this)
		this.__label = _createLabel.call(this)

		this.__container.appendChild(this.__label)
		this.__container.appendChild(this.__component)

		this._shadow = this.attachShadow({ mode: 'open' })
		this._shadow.appendChild(this.__style)
		this._shadow.appendChild(this.__container)
	}

	class RangeElement extends HTMLElement {
		constructor(...args) {
			super(...args)
			_init.call(this)
		}

		static get observedAttributes() {
			return ['class', 'value', 'data-value']
		}

		attributeChangedCallback(name, _oldValue, newValue) {
			if (~['data-value', 'value'].indexOf(name)) {
				this.__component.value = String(newValue)
			}
		}
	}

	function _createTag(tagName, cls, text) {
		let node = document.createElement(tagName)
		node.classList.add(cls)
		if (text) node.innerText = text
		return node
	}

	function _createComponent() {
		let elem = _createTag('input', CLS.component)
		elem.setAttribute('type', 'range')
		elem.setAttribute('min', Number(this.dataset.min || DEFAULT_MIN))
		elem.setAttribute('max', Number(this.dataset.max || DEFAULT_MAX))
		Object.hasOwn(this.dataset, 'name') &&
			elem.setAttribute('name', String(this.dataset.name))
		Object.hasOwn(this.dataset, 'value') &&
			elem.setAttribute('value', String(this.dataset.value))
		return elem
	}

	function _createContainer() {
		let elem = _createTag('label', CLS.container)
		return elem
	}

	function _createLabel() {
		let elem = _createTag('span', CLS.label)
		Object.hasOwn(this.dataset, 'label') &&
			(elem.innerText = String(this.dataset.label))
		return elem
	}

	customElements.define('c-range', RangeElement)
}
