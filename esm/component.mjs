/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!******************************!*\
  !*** ./src/lib/component.ts ***!
  \******************************/
/* unused harmony export default */
Object(function webpackMissingModule() { var e = new Error("Cannot find module './store.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
// We're importing the store Class here so we can test against it in the constructor

class Component {
    constructor(props = {}) {
        // If there's a store passed in, subscribe to the state change
        if (props.store instanceof Object(function webpackMissingModule() { var e = new Error("Cannot find module './store.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())) {
            this.store = props.store;
            this.store.events.subscribe('stateChange', () => this.render());
        }
        // Store the HTML element to attach the render to if set
        if (props.hasOwnProperty('element')) {
            this.element = props.element;
        }
        else {
            this.element = document.createElement(this.tagName);
            if (Array.isArray(this.className))
                this.element.classList.add(...this.className);
            else if (this.className)
                this.element.classList.add('' + this.className);
        }
    }
    render() {
        return this;
    }
    get tagName() {
        return 'div';
    }
    get className() {
        return null;
    }
}

/******/ })()
;