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
/*!**********************************!*\
  !*** ./src/lib/event-emmiter.ts ***!
  \**********************************/
/* unused harmony export default */
const BUS = new Map();
function decomposeArguments(args) {
    let obj, name, callback;
    if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'function') {
        obj = this;
        name = args[0];
        callback = args[1];
    }
    else if (args.length === 3 &&
        typeof args[0] === 'object' &&
        typeof args[1] === 'string' &&
        typeof args[2] === 'function') {
        obj = args[0];
        name = args[1];
        callback = args[2];
    }
    else
        console.error('Wrong Parameters');
    return { obj, name, callback };
}
class EventEmmiter {
    on(...args) {
        let { obj, name, callback } = decomposeArguments.call(this, args);
        let events = BUS.get(obj);
        if (!events)
            BUS.set(obj, (events = new Map()));
        let handlers = events.get(name);
        if (!handlers)
            events.set(name, (handlers = new Set()));
        handlers.add(callback.bind(obj));
        return this;
    }
    onAndRun(...args) {
        this.on(...args);
        let { obj, callback } = decomposeArguments(args);
        callback.call(obj);
        return this;
    }
    off(event = '', callback = null) {
        if (event === '') {
            BUS.delete(this);
        }
        else if (BUS.has(this)) {
            let events = BUS.get(this);
            if (callback) {
                events.has(event) && events.get(event).delete(callback);
            }
            else {
                events.delete(event);
            }
        }
        return this;
    }
    trigger(event, ...args) {
        if (BUS.has(this)) {
            let events = BUS.get(this);
            events.has(event) &&
                events.get(event).forEach((callback) => {
                    if (window.debug) {
                        console.log(`%cevent %c"${event}"%c: `, 'color: grey;', 'color: black; font-weight: bold', 'color: grey; font-weight: normal', ...args);
                    }
                    callback(...args);
                });
        }
        return this;
    }
    static extend(obj) {
        const { on, onAndRun, off, trigger } = EventEmmiter.prototype;
        Object.assign(obj, { on, onAndRun, off, trigger });
        return obj;
    }
}

/******/ })()
;