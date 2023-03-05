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
console.log('[DEBUG] USE_SHADOW_DOM = ' + true);
const CustomElementDecorator = ({ tagName, template: tplString, stylesheet, useShadowDom = true }) => {
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
/*!*******************************!*\
  !*** ./src/component/tabs.ts ***!
  \*******************************/
/* harmony import */ var _trunk_custom_element_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../trunk/custom-element-decorator */ "./src/trunk/custom-element-decorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let TabsContainerElement = class TabsContainerElement extends HTMLElement {
    get activeTab() {
        return this.dataset.activeTab;
    }
    get activeTabpanel() {
        return this.dataset.activeTabpanel;
    }
    connectedCallback() {
        this.classList.add('c-tabs-container');
        this.setAttribute('role', 'tablist');
        if (!this.indicator) {
            this.indicator = createIndicator();
            this.appendChild(this.indicator);
        }
        this.addEventListener('click', this.onSelectTab, false);
        setTimeout(this.activate.bind(this), 0);
    }
    activate() {
        let currentTab = this.querySelector('.c-tab[aria-current=true]');
        if (!currentTab)
            currentTab = this.children[0];
        currentTab.dispatchEvent(new Event('click', { bubbles: true }));
    }
    onSelectTab(e) {
        let currentTab;
        // unselect don't current tabs
        this.querySelectorAll('.c-tab').forEach((tab) => {
            if (tab.contains(e.target))
                currentTab = tab;
            else
                tab.ariaCurrent = false;
        });
        // dispatch a change event with the data of the current tab
        if (currentTab) {
            this.dataset.activeTab = currentTab.id;
            this.dataset.activeTabpanel = currentTab.ariaControls;
            this.dispatchEvent(new Event('change', { bubbles: true }));
        }
        this.renderIndicator();
    }
    renderIndicator() {
        let currentTab = this.querySelector('.c-tab[aria-current=true]');
        this.indicator.setAttribute('aria-hidden', !currentTab);
        if (currentTab) {
            this.indicator.style.width = currentTab.clientWidth + 'px';
            this.indicator.style.transform = `translateX(${currentTab.offsetLeft}px)`;
        }
    }
};
TabsContainerElement = __decorate([
    (0,_trunk_custom_element_decorator__WEBPACK_IMPORTED_MODULE_0__.CustomElementDecorator)({
        tagName: 'c-tabs-container',
        template: ``
    })
], TabsContainerElement);
let TabElement = class TabElement extends HTMLElement {
    get ariaControls() {
        return this.getAttribute('aria-controls') || '';
    }
    set ariaCurrent(flag) {
        this.setAttribute('aria-current', !!flag && flag != 'false');
    }
    connectedCallback() {
        this.classList.add('c-tab');
        this.setAttribute('role', 'tab');
        if (this.dataset.glyph) {
            this.appendChild(createIcon(this.dataset.glyph));
            delete this.dataset.glyph;
        }
        if (this.dataset.text) {
            this.appendChild(createLabel(this.dataset.text));
            delete this.dataset.text;
        }
        this.addEventListener('click', this.onSelectTab);
    }
    onSelectTab(e) {
        e.preventDefault();
        this.setAttribute('aria-current', true);
        return;
    }
};
TabElement = __decorate([
    (0,_trunk_custom_element_decorator__WEBPACK_IMPORTED_MODULE_0__.CustomElementDecorator)({
        tagName: 'c-tab',
        template: ``
    })
], TabElement);
// Utils
function createIcon(glyph) {
    let node = document.createElement('span');
    node.classList.add('c-tab__icon');
    node.innerHTML = `<span class="iconic" data-glyph="${glyph}"></span>`;
    return node;
}
function createLabel(text) {
    let node = document.createElement('span');
    node.classList.add('c-tab__label');
    node.innerText = text;
    return node;
}
function createIndicator() {
    let node = document.createElement('span');
    node.classList.add('c-tab-indicator');
    return node;
}

})();

/******/ })()
;