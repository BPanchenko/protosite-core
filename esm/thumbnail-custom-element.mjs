/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/trunk/custom-element-decorator.ts":
/*!***********************************************!*\
  !*** ./src/trunk/custom-element-decorator.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomElementDecorator": () => (/* binding */ CustomElementDecorator)
/* harmony export */ });
const validateTagName = (name) => {
    if (name.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};
console.log('[DEBUG] USE_SHADOW_DOM = ' + false);
const CustomElementDecorator = ({ tagName, template: tplString, stylesheet, useShadowDom = false }) => {
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
                if (useShadowDom) {
                    this.attachShadow({ mode: 'closed' });
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
  !*** ./src/component/thumbnail.ts ***!
  \************************************/
/* harmony import */ var _trunk_custom_element_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../trunk/custom-element-decorator */ "./src/trunk/custom-element-decorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Component: `c-thumbnail`
 *
 * Markup: <c-thumbnail
 *			data-src="..."
 *			data-href="..."
 *			data-size="xsmall|small|medium|large|xlarge"
 *			data-shadow="inset|2dp|3dp|4dp|6dp|8dp|16dp|24dp"
 * />
 */
{
    /* Constants
     ========================================================================== */
    const CLS = Object.create(null, {
        main: { value: 'c-thumbnail' },
        caption: { value: 'c-thumbnail__caption' },
        link: { value: 'c-thumbnail__link' },
        img: { value: 'c-thumbnail__image' },
        shutter: { value: 'c-thumbnail__shutter' },
        xs: { value: 'c-thumbnail--xs' },
        sm: { value: 'c-thumbnail--sm' },
        md: { value: 'c-thumbnail--md' },
        lg: { value: 'c-thumbnail--lg' },
        xl: { value: 'c-thumbnail--xl' }
    });
    let ThumbnailElement = class ThumbnailElement extends HTMLElement {
        connectedCallback() {
            this.render().cleanup();
        }
        render() {
            let { src, href, size, target } = this.dataset;
            let text = this.innerText;
            this.innerHTML = '';
            this.classList.add(CLS.main);
            if (~['xs', 'sm', 'md', 'lg', 'xl'].indexOf(size)) {
                this.classList.add(CLS[size]);
            }
            else if (size) {
                console.warn('Size must have one of the values "xs", "sm", "md", "lg" or "xl"');
            }
            let container = this;
            if (href) {
                this._link = document.createElement('a');
                this._link.classList.add(CLS.link);
                this._link.href = href;
                this._link.target = target || '_self';
                container.appendChild(this._link);
                container = this._link;
            }
            if (src) {
                this._img = document.createElement('img');
                this._img.classList.add(CLS.img);
                this._img.src = src;
                container.appendChild(this._img);
            }
            if (text) {
                if (href) {
                    this._text = document.createElement('span');
                    this._text.classList.add(CLS.shutter);
                }
                else {
                    this._text = document.createElement('figcaption');
                    this._text.classList.add(CLS.caption);
                }
                this._text.innerText = text;
                container.appendChild(this._text);
            }
            return this;
        }
        cleanup() {
            this.removeAttribute('data-src');
            this.removeAttribute('data-href');
            this.removeAttribute('data-size');
            this.removeAttribute('data-shadow');
            this.removeAttribute('data-target');
            return this;
        }
    };
    ThumbnailElement = __decorate([
        (0,_trunk_custom_element_decorator__WEBPACK_IMPORTED_MODULE_0__.CustomElementDecorator)({
            tagName: 'c-thumbnail',
            template: ``
        })
    ], ThumbnailElement);
}

})();

/******/ })()
;