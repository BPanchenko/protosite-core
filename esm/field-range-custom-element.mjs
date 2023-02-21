/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/CustomElementDecorator.ts":
/*!*******************************************!*\
  !*** ./src/lib/CustomElementDecorator.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomElementDecorator": () => (/* binding */ CustomElementDecorator)
/* harmony export */ });
const validateTagName = (name) => {
    if (name.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};
const CustomElementDecorator = ({ tagName, template: tplString, stylesheet }) => {
    validateTagName(tagName);
    const template = document.createElement('template');
    template.innerHTML = tplString;
    template.setAttribute('name', `custom-element-${tagName}`);
    return (target) => {
        const Adapter = class extends target {
            tag;
            constructor(...params) {
                super(params);
                this.classList.add('u-display-contents');
                if (!this.shadowRoot) {
                    this.attachShadow({ mode: 'open' });
                    this.shadowRoot.adoptedStyleSheets = [stylesheet];
                }
            }
            connectedCallback() {
                this.shadowRoot.appendChild(document.importNode(template.content, true));
                super.connectedCallback && super.connectedCallback();
            }
        };
        window.customElements.define(tagName, Adapter);
        return Adapter;
    };
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************!*\
  !*** ./src/custom-element/field-range.ts ***!
  \*******************************************/
/* harmony import */ var _lib_CustomElementDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/CustomElementDecorator */ "./src/lib/CustomElementDecorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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
let FieldRangeElement = class FieldRangeElement extends HTMLElement {
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
};
FieldRangeElement = __decorate([
    (0,_lib_CustomElementDecorator__WEBPACK_IMPORTED_MODULE_0__.CustomElementDecorator)({
        tagName: 'c-field-container',
        template: ``
    })
], FieldRangeElement);
function _createTag(tagName, cls, text) {
    let node = document.createElement(tagName);
    node.classList.add(cls);
    if (text)
        node.innerText = text;
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

})();

/******/ })()
;