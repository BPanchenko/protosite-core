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
/*!***************************************!*\
  !*** ./src/custom-element/popover.ts ***!
  \***************************************/
/* harmony import */ var _lib_CustomElementDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/CustomElementDecorator */ "./src/lib/CustomElementDecorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Component: 'c-popover'
 *
 * Example:
    <a href="#" aria-controls="poID">...</a>
    <c-popover id="poID">...</c-popover>
 */
/* Constants
    ========================================================================== */
const CLS = Object.create(null, {
    main: { value: 'c-popover' },
    body: { value: 'c-popover__body' },
    show: { value: 'is-visible' },
    hide: { value: 'is-hidden' }
});
const DEFAULT_FLOATING = true;
const DEFAULT_POSITION = 'top';
const DEFAULT_TRIGGER = 'hover';
const SIDE_RATION = 1.1;
let PopoverElement = class PopoverElement extends HTMLElement {
    connectedCallback() {
        this._control = document.body.querySelector(`*[aria-controls=${this.id}]`);
        this.render();
        addEventListeners.call(this);
    }
    disconnectedCallback() {
        removeEventListeners.call(this);
    }
    render() {
        this._innerHTML = this.innerHTML;
        this.innerHTML = '';
        this.classList.add(CLS.main);
        this._body = createBody.call(this);
        this.hide();
        this.placement();
        return this;
    }
    placement({ mouseX, mouseY } = {}) {
        this.style.transform = getTransformStyle.call(this);
        let correctedPosition;
        correctedPosition = correctPositionOfBrowser.call(this);
        if (this.position != correctedPosition) {
            this.position = correctedPosition;
            this.style.transform = getTransformStyle.call(this);
        }
        if (this.floating && mouseX && mouseY) {
            correctedPosition = correctPositionOfMouse.call(this, mouseX, mouseY);
            if (this.position != correctedPosition) {
                this.position = correctedPosition;
                this.style.transform = getTransformStyle.call(this);
            }
        }
        return this;
    }
    show() {
        this.classList.add(CLS.show);
        this.classList.remove(CLS.hide);
        return this;
    }
    hide() {
        this.classList.add(CLS.hide);
        this.classList.remove(CLS.show);
        if (this.__position)
            this.position = this.__position; // reset the position to original state
        return this;
    }
    toggle() {
        if (this.classList.contains(CLS.show)) {
            this.hide();
        }
        else {
            this.show();
            this.placement();
        }
        return this;
    }
    get floating() {
        let floating = this.dataset.floating;
        if (!~['true', 'false'].indexOf(floating)) {
            floating = this.dataset.floating = DEFAULT_FLOATING;
        }
        return floating;
    }
    get position() {
        let pos = this.dataset.position;
        if (isInvalidPosition(pos)) {
            pos = this.position = DEFAULT_POSITION;
        }
        if (!this.__position)
            this.__position = pos; // starting value
        return pos;
    }
    set position(v) {
        if (!isInvalidPosition(v))
            this.dataset.position = v;
    }
    get trigger() {
        return (this.dataset.trigger || DEFAULT_TRIGGER).split(/[\s,]/g);
    }
    set trigger(v) {
        this.dataset.trigger = v.toString();
    }
};
PopoverElement = __decorate([
    (0,_lib_CustomElementDecorator__WEBPACK_IMPORTED_MODULE_0__.CustomElementDecorator)({
        tagName: 'c-popover',
        template: ``
    })
], PopoverElement);
/* Private
    ========================================================================== */
function addEventListeners() {
    this.__onShow = (e) => {
        e.preventDefault();
        this.show().placement();
    };
    this.__onHide = (e) => {
        e.preventDefault();
        this.hide();
    };
    this.__onMove = (e) => {
        e.preventDefault();
        this.placement({
            mouseX: e.clientX,
            mouseY: e.clientY
        });
    };
    this.__onToggle = (e) => {
        e.preventDefault();
        this.toggle();
    };
    if (~this.trigger.indexOf('hover')) {
        this._control.addEventListener('mouseenter', this.__onShow);
        this._control.addEventListener('mouseleave', this.__onHide);
        if (this.floating) {
            this._control.addEventListener('mousemove', this.__onMove);
        }
    }
    if (~this.trigger.indexOf('focus')) {
        this._control.addEventListener('focus', this.__onShow);
        this._control.addEventListener('blur', this.__onHide);
    }
    if (~this.trigger.indexOf('click')) {
        this._control.addEventListener('click', this.__onToggle);
    }
    return this;
}
function correctPositionOfBrowser() {
    let poss = this.position.split('-');
    let rect = this.getBoundingClientRect();
    let bodyRect = document.body.getBoundingClientRect();
    if (poss[0] == 'bottom' && bodyRect.height <= rect.bottom)
        poss[0] = 'top';
    if (poss[0] == 'top' && rect.top < 0)
        poss[0] = 'bottom';
    if (poss[0] == 'right' && bodyRect.right <= rect.right)
        poss[0] = 'left';
    if (poss[0] == 'left' && rect.left < 0)
        poss[0] = 'right';
    return poss.join('-');
}
function correctPositionOfMouse(mouseX, mouseY) {
    let poss = this.position.split('-');
    let rect = this.getBoundingClientRect();
    let ctrlRect = this._control.getBoundingClientRect();
    if (!rect.width || !rect.height)
        return this.position;
    if (~['top', 'bottom'].indexOf(poss[0]) && ctrlRect.width > rect.width * SIDE_RATION) {
        let third = ctrlRect.width / 3;
        if (mouseX <= ctrlRect.left + third)
            poss[1] = 'left';
        else if (mouseX <= ctrlRect.left + 2 * third)
            poss.splice(1, 1);
        else if (mouseX <= ctrlRect.right)
            poss[1] = 'right';
        return poss.join('-');
    }
    if (~['left', 'right'].indexOf(poss[0]) && ctrlRect.height > rect.height * SIDE_RATION) {
        let third = ctrlRect.height / 3;
        if (mouseY <= ctrlRect.top + third)
            poss[1] = 'top';
        else if (mouseY <= ctrlRect.top + 2 * third)
            poss.splice(1, 1);
        else if (mouseY <= ctrlRect.bottom)
            poss[1] = 'bottom';
        return poss.join('-');
    }
    return poss;
}
function createBody() {
    let elem = document.createElement('div');
    elem.classList.add(CLS.body);
    elem.innerHTML = this._innerHTML;
    this.appendChild(elem);
    return elem;
}
function getTransformStyle() {
    let x, y;
    let ctrlRect = this._control.getBoundingClientRect();
    let rect = this.getBoundingClientRect();
    let style = window.getComputedStyle(this);
    let offset = {
        top: parseInt(style.marginTop),
        right: parseInt(style.marginRight),
        bottom: parseInt(style.marginBottom),
        left: parseInt(style.marginLeft)
    };
    offset.vertical = offset.top + offset.bottom;
    offset.horizontal = offset.left + offset.right;
    switch (this.position) {
        case 'top':
            x = ctrlRect.left + ctrlRect.width / 2 - (rect.width + offset.horizontal) / 2;
            y = ctrlRect.top - rect.height - offset.vertical;
            break;
        case 'top-left':
            x = ctrlRect.left - offset.left;
            y = ctrlRect.top - rect.height - offset.vertical;
            break;
        case 'top-right':
            x = ctrlRect.right - rect.width - offset.right;
            y = ctrlRect.top - rect.height - offset.vertical;
            break;
        case 'right':
            x = ctrlRect.right + offset.left;
            y = ctrlRect.top + ctrlRect.height / 2 - (rect.height + offset.horizontal) / 2;
            break;
        case 'right-top':
            x = ctrlRect.right + offset.left;
            y = ctrlRect.top - offset.top;
            break;
        case 'right-bottom':
            x = ctrlRect.right + offset.left;
            y = ctrlRect.bottom - rect.height - offset.bottom;
            break;
        case 'bottom':
            x = ctrlRect.left + ctrlRect.width / 2 - (rect.width + offset.horizontal) / 2;
            y = ctrlRect.bottom;
            break;
        case 'bottom-left':
            x = ctrlRect.left - offset.left;
            y = ctrlRect.bottom;
            break;
        case 'bottom-right':
            x = ctrlRect.right - rect.width - offset.right;
            y = ctrlRect.bottom;
            break;
        case 'left':
            x = ctrlRect.left - rect.width - offset.horizontal;
            y = ctrlRect.top + ctrlRect.height / 2 - (rect.height + offset.horizontal) / 2;
            break;
        case 'left-top':
            x = ctrlRect.left - rect.width - offset.horizontal;
            y = ctrlRect.top - offset.top;
            break;
        case 'left-bottom':
            x = ctrlRect.left - rect.width - offset.horizontal;
            y = ctrlRect.bottom - rect.height - offset.bottom;
            break;
    }
    return `translate(${Math.round(x)}px,${Math.round(y)}px)`;
}
function isInvalidPosition(value) {
    return !~[
        'top',
        'top-left',
        'top-right',
        'right',
        'right-top',
        'right-bottom',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'left-top',
        'left-bottom'
    ].indexOf(value);
}
function removeEventListeners() {
    this._control.removeEventListener('blur', this.__onHide);
    this._control.removeEventListener('click', this.__onToggle);
    this._control.removeEventListener('focus', this.__onShow);
    this._control.removeEventListener('mouseenter', this.__onShow);
    this._control.removeEventListener('mouseleave', this.__onHide);
    this._control.removeEventListener('mousemove', this.__onMove);
    return;
}
/* Hide all popovers when scrolling a window
    ========================================================================== */
function hideAllPopovers() {
    Array.from(document.querySelectorAll('c-popover.is-visible')).forEach((elem) => {
        elem.classList.add('is-hidden');
        elem.classList.remove('is-visible');
    });
}

})();

/******/ })()
;