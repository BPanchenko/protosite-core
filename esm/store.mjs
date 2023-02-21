/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lodash/isEqual.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEqual.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './_baseIsEqual'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/lib/store.ts ***!
  \**************************/
/* unused harmony export default */
Object(function webpackMissingModule() { var e = new Error("Cannot find module './event-emmiter.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var lodash_isEqual_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEqual.js */ "./node_modules/lodash/isEqual.js");
/* harmony import */ var lodash_isEqual_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isObject.js */ "./node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject_js__WEBPACK_IMPORTED_MODULE_2__);



class Store extends Object(function webpackMissingModule() { var e = new Error("Cannot find module './event-emmiter.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    #actions = {};
    #debug = false;
    #mutations = {};
    state;
    status = 'resting';
    constructor(params) {
        super();
        if (params.hasOwnProperty('actions')) {
            this.#actions = params.actions;
        }
        if (params.hasOwnProperty('debug')) {
            this.#debug = params.debug;
        }
        if (params.hasOwnProperty('mutations')) {
            this.#mutations = params.mutations;
        }
        this.state = new Proxy(params.state || {}, {
            set: (state, key, value) => {
                let previosValue = state[key];
                if (!lodash_isEqual_js__WEBPACK_IMPORTED_MODULE_1___default()(previosValue, value)) {
                    if (lodash_isObject_js__WEBPACK_IMPORTED_MODULE_2___default()(state[key]) && lodash_isObject_js__WEBPACK_IMPORTED_MODULE_2___default()(value)) {
                        previosValue = { ...previosValue };
                        Object.assign(state[key], value);
                    }
                    else {
                        state[key] = value;
                    }
                    if (this.#debug)
                        console.log(`change:state:${key}`, {
                            [key]: value,
                            previos: previosValue,
                            state: this.state
                        });
                    this.trigger(`change:state:${key}`, {
                        [key]: value,
                        previos: previosValue,
                        state: this.state
                    });
                }
                if (this.status !== 'mutation') {
                    console.warn(`You should use a mutation to set ${key}`);
                }
                this.status = 'resting';
                return true;
            }
        });
    }
    /**
     * A dispatcher for actions that looks in the actions
     * collection and runs the action if it can find it
     *
     * @param {string} actionKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    dispatch(actionKey, payload) {
        // Run a quick check to see if the action actually exists
        // before we try to run it
        if (typeof this.#actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} doesn't exist.`);
            return false;
        }
        // Create a console group which will contain the logs from our Proxy etc
        if (this.#debug)
            console.groupCollapsed(`ACTION: ${actionKey}`);
        // Let anything that's watching the status know that we're dispatching an action
        this.status = 'action';
        // Actually call the action and pass it the Store context and whatever payload was passed
        this.#actions[actionKey](this, payload);
        // Close our console group to keep things nice and neat
        if (this.#debug)
            console.groupEnd();
        return true;
    }
    /**
     * Look for a mutation and modify the state object
     * if that mutation exists by calling it
     *
     * @param {string} mutationKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    commit(mutationKey, payload) {
        // Run a quick check to see if this mutation actually exists
        // before trying to run it
        if (typeof this.#mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist mate`);
            return false;
        }
        // Let anything that's watching the status know that we're mutating state
        this.status = 'mutation';
        const previosState = { ...this.state };
        const newState = this.#mutations[mutationKey](this.state, payload);
        Object.assign(this.state, newState);
        if (this.#debug)
            console.log('update:state', {
                state: this.state,
                previos: previosState
            });
        this.trigger('update:state', {
            state: this.state,
            previos: previosState
        });
        return true;
    }
}

})();

/******/ })()
;