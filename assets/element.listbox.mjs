/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

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
	return !!value && (type == 'object' || type == 'function')
}

/**
 * @param {HTMLElement} element The element whose attributes will be modified
 * @param {Record<string, string> | string} objectOrAttrName List of key-value pairs that represent HTML attributes of the element
 * @param {boolean | number | string} [attrValue] List of key-value pairs that represent HTML attributes of the element
 * @returns {Map<string, Attr>} Collection of element attributes after modification. Attributes are sorted by name.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttribute)
 */
const updateAttributes = (element, objectOrAttrName, attrValue = null) => {
	const pairs = isObject(objectOrAttrName)
		? Object.entries(objectOrAttrName)
		: [[objectOrAttrName, attrValue]];

	pairs.forEach(([key, value]) =>
		value === null
			? element.removeAttribute(key)
			: value instanceof Attr
				? element.setAttributeNode(value)
				: typeof key === 'string'
					? element.hasAttribute(key)
						? (element.getAttributeNode(key).value = value)
						: element.setAttribute(key, value)
					: void 0,
	);

	return new Map(
		element
			.getAttributeNames()
			.sort()
			.map((name) => [name, element.getAttributeNode(name)]),
	)
};

var _Listbox_instances, _Listbox_focusCont, _Listbox_interCont, _Listbox_listenFocus, _Listbox_onBlur, _Listbox_onFocus;
const tagName = 'e-listbox';
class Listbox extends HTMLElement {
    static initAttributes(element) {
        const data = {
            'aria-orientation': element.ariaOrientation ?? 'vertical',
            id: element.id,
            role: Listbox.role,
        };
        // [id]
        if (element.isConnected && false === Boolean(data.id)) {
            data.id = [Listbox.role, Math.round(performance.now())].join('-');
        }
        return updateAttributes(element, data);
    }
    constructor() {
        super();
        _Listbox_instances.add(this);
        this.internals = this.attachInternals();
        _Listbox_focusCont.set(this, void 0);
        _Listbox_interCont.set(this, void 0);
        Listbox.initAttributes(this);
        console.log('Listbox.internals', this.internals);
    }
    connectedCallback() {
        Listbox.initAttributes(this);
        __classPrivateFieldGet(this, _Listbox_instances, "m", _Listbox_listenFocus).call(this);
    }
}
_Listbox_focusCont = new WeakMap(), _Listbox_interCont = new WeakMap(), _Listbox_instances = new WeakSet(), _Listbox_listenFocus = function _Listbox_listenFocus() {
    __classPrivateFieldGet(this, _Listbox_focusCont, "f")?.abort();
    __classPrivateFieldSet(this, _Listbox_focusCont, new AbortController(), "f");
    const options = {
        signal: __classPrivateFieldGet(this, _Listbox_focusCont, "f").signal,
    };
    this.addEventListener('focus', (event) => __classPrivateFieldGet(this, _Listbox_instances, "m", _Listbox_onFocus).call(this, event), options);
    this.addEventListener('blur', (event) => __classPrivateFieldGet(this, _Listbox_instances, "m", _Listbox_onBlur).call(this, event), options);
    return __classPrivateFieldGet(this, _Listbox_focusCont, "f");
}, _Listbox_onBlur = function _Listbox_onBlur(event_) {
    __classPrivateFieldGet(this, _Listbox_interCont, "f")?.abort();
    // this.#internals.ariaActiveDescendantElement = this.#$root.activeElement
    console.log('onBlur', this);
}, _Listbox_onFocus = function _Listbox_onFocus(event_) {
    // this.#listenInteraction()
    // this.#internals.ariaActiveDescendantElement = this.#$root.activeElement
    console.log('onFocus', this);
};
Listbox.formAssociated = false;
Listbox.role = 'listbox';
customElements.define(tagName, Listbox);
const Listbox$1 = customElements.get(tagName);

export { Listbox, Listbox$1 as default, tagName };
