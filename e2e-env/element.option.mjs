/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./source/element/Option.ts":
/*!**********************************!*\
  !*** ./source/element/Option.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _library_fn_updateAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #library/fn.updateAttributes */ \"./source/library/fn.updateAttributes.ts\");\n\nclass OptionElement extends HTMLElement {\n    static oberverAttributes = [\n        'aria-busy',\n        'aria-checked',\n        'aria-disabled',\n        'aria-hidden',\n        'aria-invalid',\n        'aria-label',\n        'aria-labelledby',\n        'aria-posinset',\n        'aria-selected',\n        'aria-setsize',\n        'data-value',\n        'value',\n    ];\n    static role = 'option';\n    static tagName = 'e-option';\n    static initAttributes($element) {\n        const data = {\n            'aria-selected': $element.ariaSelected ?? 'false',\n            id: $element.id,\n            role: this.role,\n        };\n        // [id]\n        if ($element.isConnected && false === Boolean(data.id)) {\n            data.id = [this.role, Math.round(performance.now())].join('-');\n        }\n        return (0,_library_fn_updateAttributes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])($element, data);\n    }\n    constructor() {\n        super();\n        OptionElement.initAttributes(this);\n    }\n    connectedCallback() {\n        OptionElement.initAttributes(this);\n    }\n    get label() {\n        return this.ariaLabel || this.textContent;\n    }\n    get value() {\n        return this.dataset.value || this.getAttribute('value');\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OptionElement);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zb3VyY2UvZWxlbWVudC9PcHRpb24udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFJQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BicGFuY2hlbmtvL2NvcmUvLi9zb3VyY2UvZWxlbWVudC9PcHRpb24udHM/YWQ0YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXBkYXRlQXR0cmlidXRlcyBmcm9tICcjbGlicmFyeS9mbi51cGRhdGVBdHRyaWJ1dGVzJ1xyXG5cclxuaW1wb3J0IHR5cGUgeyBDdXN0b21FbGVtZW50IH0gZnJvbSAnI3R5cGVzJ1xyXG5cclxuY2xhc3MgT3B0aW9uRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IGltcGxlbWVudHMgQ3VzdG9tRWxlbWVudCB7XHJcblx0c3RhdGljIHJlYWRvbmx5IG9iZXJ2ZXJBdHRyaWJ1dGVzID0gW1xyXG5cdFx0J2FyaWEtYnVzeScsXHJcblx0XHQnYXJpYS1jaGVja2VkJyxcclxuXHRcdCdhcmlhLWRpc2FibGVkJyxcclxuXHRcdCdhcmlhLWhpZGRlbicsXHJcblx0XHQnYXJpYS1pbnZhbGlkJyxcclxuXHRcdCdhcmlhLWxhYmVsJyxcclxuXHRcdCdhcmlhLWxhYmVsbGVkYnknLFxyXG5cdFx0J2FyaWEtcG9zaW5zZXQnLFxyXG5cdFx0J2FyaWEtc2VsZWN0ZWQnLFxyXG5cdFx0J2FyaWEtc2V0c2l6ZScsXHJcblx0XHQnZGF0YS12YWx1ZScsXHJcblx0XHQndmFsdWUnLFxyXG5cdF1cclxuXHJcblx0c3RhdGljIHJlYWRvbmx5IHJvbGUgPSAnb3B0aW9uJ1xyXG5cdHN0YXRpYyByZWFkb25seSB0YWdOYW1lID0gJ2Utb3B0aW9uJ1xyXG5cclxuXHRzdGF0aWMgaW5pdEF0dHJpYnV0ZXMoJGVsZW1lbnQ6IE9wdGlvbkVsZW1lbnQpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSB7XHJcblx0XHRcdCdhcmlhLXNlbGVjdGVkJzogJGVsZW1lbnQuYXJpYVNlbGVjdGVkID8/ICdmYWxzZScsXHJcblx0XHRcdGlkOiAkZWxlbWVudC5pZCxcclxuXHRcdFx0cm9sZTogdGhpcy5yb2xlLFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFtpZF1cclxuXHJcblx0XHRpZiAoJGVsZW1lbnQuaXNDb25uZWN0ZWQgJiYgZmFsc2UgPT09IEJvb2xlYW4oZGF0YS5pZCkpIHtcclxuXHRcdFx0ZGF0YS5pZCA9IFt0aGlzLnJvbGUsIE1hdGgucm91bmQocGVyZm9ybWFuY2Uubm93KCkpXS5qb2luKCctJylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXBkYXRlQXR0cmlidXRlcygkZWxlbWVudCwgZGF0YSlcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0T3B0aW9uRWxlbWVudC5pbml0QXR0cmlidXRlcyh0aGlzKVxyXG5cdH1cclxuXHJcblx0Y29ubmVjdGVkQ2FsbGJhY2soKTogdm9pZCB7XHJcblx0XHRPcHRpb25FbGVtZW50LmluaXRBdHRyaWJ1dGVzKHRoaXMpXHJcblx0fVxyXG5cclxuXHRnZXQgbGFiZWwoKTogc3RyaW5nIHwgbnVsbCB7XHJcblx0XHRyZXR1cm4gdGhpcy5hcmlhTGFiZWwgfHwgdGhpcy50ZXh0Q29udGVudFxyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCk6IHN0cmluZyB8IG51bGwge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGF0YXNldC52YWx1ZSB8fCB0aGlzLmdldEF0dHJpYnV0ZSgndmFsdWUnKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgeyBPcHRpb25FbGVtZW50IH1cclxuZXhwb3J0IGRlZmF1bHQgT3B0aW9uRWxlbWVudFxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./source/element/Option.ts\n");

/***/ }),

/***/ "./source/library/fn.isObject.ts":
/*!***************************************!*\
  !*** ./source/library/fn.isObject.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction isObject(value) {\n    var type = typeof value;\n    return !!value && (type == 'object' || type == 'function');\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObject);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zb3VyY2UvbGlicmFyeS9mbi5pc09iamVjdC50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BicGFuY2hlbmtvL2NvcmUvLi9zb3VyY2UvbGlicmFyeS9mbi5pc09iamVjdC50cz9hYzA1Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB7XHJcblx0dmFyIHR5cGUgPSB0eXBlb2YgdmFsdWVcclxuXHRyZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./source/library/fn.isObject.ts\n");

/***/ }),

/***/ "./source/library/fn.updateAttributes.ts":
/*!***********************************************!*\
  !*** ./source/library/fn.updateAttributes.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _fn_isObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fn.isObject */ \"./source/library/fn.isObject.ts\");\n\nfunction updateAttributes(element, objectOrAttrName, attrValue) {\n    const pairs = (0,_fn_isObject__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(objectOrAttrName)\n        ? Object.entries(objectOrAttrName)\n        : [[objectOrAttrName, attrValue]];\n    pairs.forEach(([key, value]) => {\n        const attrName = String(key);\n        if (value === null)\n            element.removeAttribute(attrName);\n        else if (value instanceof Attr)\n            element.setAttributeNode(value);\n        else {\n            const attr = element.getAttributeNode(attrName);\n            const attrValue = String(value);\n            if (attr !== null)\n                attr.value = attrValue;\n            else\n                element.setAttribute(attrName, attrValue);\n        }\n    });\n    return new Map(element\n        .getAttributeNames()\n        .sort()\n        .map((name) => [name, element.getAttributeNode(name)]));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateAttributes);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zb3VyY2UvbGlicmFyeS9mbi51cGRhdGVBdHRyaWJ1dGVzLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFHQTtBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGJwYW5jaGVua28vY29yZS8uL3NvdXJjZS9saWJyYXJ5L2ZuLnVwZGF0ZUF0dHJpYnV0ZXMudHM/ZjgzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9mbi5pc09iamVjdCdcclxuaW1wb3J0IHR5cGUgeyBQcmltaXRpdmUgfSBmcm9tICcuL3R5cGVzJ1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlcyhcclxuXHRlbGVtZW50OiBIVE1MRWxlbWVudCxcclxuXHRvYmplY3RPckF0dHJOYW1lOiBzdHJpbmcgfCBvYmplY3QsXHJcblx0YXR0clZhbHVlPzogUHJpbWl0aXZlLFxyXG4pOiBNYXA8c3RyaW5nLCBBdHRyIHwgbnVsbD4ge1xyXG5cdGNvbnN0IHBhaXJzID0gaXNPYmplY3Qob2JqZWN0T3JBdHRyTmFtZSlcclxuXHRcdD8gT2JqZWN0LmVudHJpZXMob2JqZWN0T3JBdHRyTmFtZSlcclxuXHRcdDogW1tvYmplY3RPckF0dHJOYW1lLCBhdHRyVmFsdWVdXVxyXG5cclxuXHRwYWlycy5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuXHRcdGNvbnN0IGF0dHJOYW1lID0gU3RyaW5nKGtleSlcclxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpXHJcblx0XHRlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEF0dHIpIGVsZW1lbnQuc2V0QXR0cmlidXRlTm9kZSh2YWx1ZSlcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCBhdHRyID0gZWxlbWVudC5nZXRBdHRyaWJ1dGVOb2RlKGF0dHJOYW1lKVxyXG5cdFx0XHRjb25zdCBhdHRyVmFsdWUgPSBTdHJpbmcodmFsdWUpXHJcblx0XHRcdGlmIChhdHRyICE9PSBudWxsKSBhdHRyLnZhbHVlID0gYXR0clZhbHVlXHJcblx0XHRcdGVsc2UgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSlcclxuXHRcdH1cclxuXHR9KVxyXG5cclxuXHRyZXR1cm4gbmV3IE1hcChcclxuXHRcdGVsZW1lbnRcclxuXHRcdFx0LmdldEF0dHJpYnV0ZU5hbWVzKClcclxuXHRcdFx0LnNvcnQoKVxyXG5cdFx0XHQubWFwKChuYW1lKSA9PiBbbmFtZSwgZWxlbWVudC5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpXSksXHJcblx0KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVBdHRyaWJ1dGVzXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./source/library/fn.updateAttributes.ts\n");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval-source-map devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./source/element/Option.ts");
/******/ 
