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
/*!************************************!*\
  !*** ./src/custom-element/grid.ts ***!
  \************************************/
/* harmony import */ var _lib_CustomElementDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/CustomElementDecorator */ "./src/lib/CustomElementDecorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

const CLS = new Map([
    ['horizontal', 'guide--horizontal'],
    ['line', 'line'],
    ['root', 'u-grid'],
    ['vertical', 'guide--vertical'],
    ['sizes', 'sizes'],
]);
const ORIENTATIONS = [
    'top-left',
    'center'
];
const TAGS = new Map([
    ['horizontal', 'div'],
    ['line', 'span'],
    ['root', 'u-grid'],
    ['vertical', 'div'],
    ['sizes', 'span'],
]);
const DEFAULT_STEP = 16;
let UtilityGridElement = class UtilityGridElement extends HTMLElement {
    #horizontal;
    #resizeObserver;
    #vertical;
    #sizes;
    static get observedAttributes() {
        return ['width', 'height'];
    }
    attributeChangedCallback(name, oldValue, value) {
        if (['width', 'height'].includes(name)) {
            this.renderSizes();
        }
    }
    connectedCallback() {
        this.render();
        this.#initResizeObserver();
    }
    disconnectedCallback() {
        this.clean();
    }
    render() {
        this.classList.add(CLS.get('root'));
        this.#horizontal = document.createElement(TAGS.get('horizontal'));
        this.#vertical = document.createElement(TAGS.get('vertical'));
        this.#sizes = document.createElement(TAGS.get('vertical'));
        this.#horizontal.classList.add(CLS.get('horizontal'));
        this.#vertical.classList.add(CLS.get('vertical'));
        this.#sizes.classList.add(CLS.get('sizes'));
        this.appendChild(this.#horizontal);
        this.appendChild(this.#vertical);
        this.appendChild(this.#sizes);
    }
    renderLines(container, size) {
        if (container instanceof HTMLElement && typeof size === 'number') {
            let old_lines_count = container.children.length;
            let new_lines_count = Math.floor(size / this.step);
            let diff_lines_count = new_lines_count - old_lines_count;
            if (this.orientation === 'center') {
                new_lines_count += +!(new_lines_count % 2);
            }
            if (diff_lines_count > 0) {
                for (let i = diff_lines_count; i > 0; i--) {
                    let line = document.createElement(TAGS.get('line'));
                    line.classList.add(CLS.get('line'));
                    container.appendChild(line);
                }
            }
            else if (diff_lines_count < 0) {
                this.removeElems(container.children, old_lines_count + diff_lines_count);
            }
        }
        else {
            this.renderLines(this.#horizontal, this.width);
            this.renderLines(this.#vertical, this.height);
        }
    }
    renderSizes() {
        this.#sizes.innerHTML = `${this.width}px / ${this.height}px`;
    }
    clean() {
        this.removeElems(this);
        this.#resizeObserver = null;
    }
    removeElems(list, start = 0) {
        Array.from(list).slice(start).forEach(elem => elem.remove());
    }
    #initResizeObserver() {
        this.#resizeObserver = new ResizeObserver(_.debounce(this.#onResize.bind(this), 150));
        this.#resizeObserver.observe(this.parentNode);
        this.#onResize();
    }
    #onResize(entries) {
        let { offsetWidth: width, offsetHeight: height } = this.parentNode;
        this.width = width;
        this.height = height;
        this.renderLines();
        this.#positioningLines();
    }
    #positioningLines() {
        switch (this.orientation) {
            case 'top-left':
                Array.from(this.#horizontal.children).forEach((elem, i) => {
                    elem.style.left = i * this.step + 'px';
                });
                Array.from(this.#vertical.children).forEach((elem, i) => {
                    elem.style.top = i * this.step + 'px';
                });
                break;
            default: // center orientation
                const _positioningLines = container => {
                    let countLines = container.children.length;
                    let sizeLines = countLines * (this.step - 1);
                    Array.from(container.children).forEach((elem, i) => {
                        if (container === this.#horizontal) {
                            elem.style.left = i * this.step + (this.width / 2 - sizeLines / 2) + this.step / 2 + 'px';
                        }
                        if (container === this.#vertical) {
                            elem.style.top = i * this.step + (this.height / 2 - sizeLines / 2) + this.step / 2 + 'px';
                        }
                        elem.classList.remove('s-axis');
                    });
                    if (countLines % 2) {
                        container.children.item(Math.floor(countLines / 2)).classList.add('s-axis');
                    }
                };
                _positioningLines(this.#horizontal);
                _positioningLines(this.#vertical);
        }
    }
    get width() {
        return parseInt(this.getAttribute('width'));
    }
    set width(value) {
        this.setAttribute('width', parseInt(value));
    }
    get orientation() {
        return this.dataset.orientation || 'center';
    }
    set orientation(value) {
        console.assert(ORIENTATIONS.includes(value), 'Orientation is not supported');
        this.dataset.orientation = value;
    }
    get height() {
        return parseInt(this.getAttribute('height'));
    }
    set height(value) {
        this.setAttribute('height', parseInt(value));
    }
    get step() {
        return parseInt(this.dataset.step) || DEFAULT_STEP;
    }
    set step(value) {
        this.dataset.step = parseInt(value);
    }
};
UtilityGridElement = __decorate([
    (0,_lib_CustomElementDecorator__WEBPACK_IMPORTED_MODULE_0__.CustomElementDecorator)({
        tagName: 'u-grid',
        template: ``
    })
], UtilityGridElement);

})();

/******/ })()
;