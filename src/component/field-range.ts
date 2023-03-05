import { CustomElementDecorator } from '../trunk/custom-element-decorator';

const DEFAULT_MIN = 2;
const DEFAULT_MAX = 64;

function _init() {
	this.__container = _createContainer.call(this);
	this.__component = _createComponent.call(this);
	this.__label = _createLabel.call(this);

	this.__container.appendChild(this.__label);
	this.__container.appendChild(this.__component);

	this._shadow = this.attachShadow({ mode: 'open' });
	this._shadow.appendChild(this.__style);
	this._shadow.appendChild(this.__container);
}

@CustomElementDecorator({
	tagName: 'c-field-container',
	template: ``
})
class FieldRangeElement extends HTMLElement implements CustomElement {
	constructor() {
		super();
		_init.call(this);
		this.id || (window._ && window._.uniqId && (this.id = _.uniqId('c-')));
		return self;
	}

	static get observedAttributes() {
		return ['class', 'value', 'data-value'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (~['data-value', 'value'].indexOf(name)) {
			this.__component.value = String(newValue);
		}
	}

	connectedCallback() {
		console.log(`connectedCallback.${this.id}`);
	}
	disconnectedCallback() {
		console.log(`disconnectedCallback.${this.id}`);
	}
}

function _createTag(tagName, cls, text) {
	let node = document.createElement(tagName);
	node.classList.add(cls);
	if (text) node.innerText = text;
	return node;
}

function _createComponent() {
	let elem = _createTag('input', CLS.component);
	elem.setAttribute('type', 'range');
	elem.setAttribute('min', Number(this.dataset.min || DEFAULT_MIN));
	elem.setAttribute('max', Number(this.dataset.max || DEFAULT_MAX));
	this.dataset.hasOwnProperty('name') && elem.setAttribute('name', String(this.dataset.name));
	this.dataset.hasOwnProperty('value') && elem.setAttribute('value', String(this.dataset.value));
	return elem;
}

function _createContainer() {
	let elem = _createTag('label', CLS.container);
	// TODO: data attributes?
	return elem;
}

function _createLabel() {
	let elem = _createTag('span', CLS.label);
	this.dataset.hasOwnProperty('label') && (elem.innerText = String(this.dataset.label));
	return elem;
}
