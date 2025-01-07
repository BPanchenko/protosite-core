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
					: undefined,
	);

	return new Map(
		element
			.getAttributeNames()
			.sort()
			.map((name) => [name, element.getAttributeNode(name)]),
	)
};

var _Listbox_instances, _Listbox_focusCont, _Listbox_interCont, _Listbox_listenFocus, _Listbox_onBlur, _Listbox_onFocus;
const tagName$1 = 'e-listbox';
class Listbox extends HTMLElement {
    static initAttributes(element) {
        const data = {
            'aria-orientation': element.ariaOrientation ?? 'vertical',
            id: element.id,
            role: Listbox.role,
        };
        if (element.isConnected && false === Boolean(data.id)) {
            data.id = [Listbox.role, Math.round(performance.now())].join('-');
        }
        return updateAttributes(element, data);
    }
    constructor() {
        super();
        _Listbox_instances.add(this);
        this.internals = this.attachInternals();
        _Listbox_focusCont.set(this, undefined);
        _Listbox_interCont.set(this, undefined);
        Listbox.initAttributes(this);
    }
    connectedCallback() {
        Listbox.initAttributes(this);
        __classPrivateFieldGet(this, _Listbox_instances, "m", _Listbox_listenFocus).call(this);
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _Listbox_interCont, "f")?.abort();
        __classPrivateFieldGet(this, _Listbox_focusCont, "f")?.abort();
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
}, _Listbox_onFocus = function _Listbox_onFocus(event_) { };
Listbox.formAssociated = false;
Listbox.role = 'listbox';
Listbox.observedAttributes = [
    'aria-disabled',
    'aria-multiselectable',
    'aria-required',
    'name',
];
customElements.define(tagName$1, Listbox);
customElements.get(tagName$1);

const shadowModeByDefault =
	typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE;

/**
 * @param {Object} options
 * @param {DocumentFragment} [options.$template]
 * @param {string} [options.template]
 * @param {boolean} [options.delegatesFocus] - If true, when a non-focusable part of the shadow DOM is clicked, or .focus() is called on the host element, the first focusable part is given focus, and the shadow host is given any available :focus styling.
 * @param {"closed" | "open"} [options.mode] - When the mode of a shadow root is "closed", the shadowroot implementation internals are inaccessible and unchangeable.
 * @param {boolean} [options.serializable] - If set, the shadow root may be serialized by calling the Element.getHTML() or ShadowRoot.getHTML() methods with the options.serializableShadowRoots parameter set true.
 * @param {"manual" | "named"} [options.slotAssignment]
 * @returns {ShadowRoot}
 *
 * The function attaches a shadow DOM tree to the specified element and returns a reference to its ShadowRoot.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/attachShadow)
 *
 * [About `ShadowRoot.delegatesFocus` property](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus)
 *
 * [About `ShadowRoot.mode` property](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode)
 *
 * [About `ShadowRoot.serializable` property](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/serializable)
 *
 * [About `ShadowRoot.slotAssignment` property](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/slotAssignment)
 */
function initShadowRoot(options) {
	const {
		$template,
		template,
		delegatesFocus = false,
		mode = shadowModeByDefault,
		serializable = false,
	} = options;

	/** @type {ShadowRoot} */
	const shadowRoot = this.attachShadow({
		delegatesFocus,
		mode,
		serializable,
	});

	// 1.

	if (DocumentFragment.prototype.isPrototypeOf($template))
		shadowRoot.appendChild($template.cloneNode(true));

	// 2.

	if (typeof template === 'string') shadowRoot.setHTMLUnsafe(template);

	return shadowRoot
}

const checkFalsy = (value) => {
    return typeof value === 'string'
        ? ['off', 'false'].includes(value.trim().toLocaleLowerCase())
        : false === Boolean(value);
};

const checkTruth = (value) => {
    return typeof value === 'string'
        ? ['on', 'true'].includes(value.trim().toLocaleLowerCase())
        : Boolean(value);
};

var ComponentReadyState;
(function (ComponentReadyState) {
    ComponentReadyState["Defined"] = "--defined";
    ComponentReadyState["Interactive"] = "--interactive";
    ComponentReadyState["Loaded"] = "--loaded";
})(ComponentReadyState || (ComponentReadyState = {}));
var ComboboxState;
(function (ComboboxState) {
    ComboboxState["Collapsed"] = "collapsed";
    ComboboxState["Expanded"] = "expanded";
})(ComboboxState || (ComboboxState = {}));
var FieldState;
(function (FieldState) {
    FieldState["Disabled"] = "disabled";
})(FieldState || (FieldState = {}));

const template = "<link href=\"http://assets.protosite.rocks/core/select-field.css\" rel=\"stylesheet\" type=\"text/css\"><style type=\"text/css\">:host(:state(--defined)) {\n\tcontent-visibility: hidden;\n}\n:host(:state(--loaded)) {\n\tcontent-visibility: visible;\n}</style><div aria-controls=\"listbox\" id=\"button\" role=\"button\" tabindex=\"0\"><div part=\"selected_content\" id=\"value_text\" role=\"status\"></div></div><e-listbox aria-labelledby=\"button\" id=\"listbox\" part=\"listbox\" tabindex=\"0\"><slot></slot></e-listbox>";

var _SelectField_instances, _SelectField_focusCont, _SelectField_interCont, _SelectField_internals, _SelectField_options, _SelectField_slotChangeCont, _SelectField_selectElement, _SelectField_$button_get, _SelectField_$status_get, _SelectField_$listbox_get, _SelectField_$root_get, _SelectField_states_get, _SelectField_findByValue, _SelectField_listenAssignedNodes, _SelectField_listenFocus, _SelectField_onBlur, _SelectField_onFocus, _SelectField_listenInteraction, _SelectField_onClick, _SelectField_onKeyPress, _SelectField_toggle;
const tagName = 'c-select-field';
class SelectField extends HTMLElement {
    static initAttributes(element, options) {
        const data = {
            'aria-atomic': true,
            'aria-expanded': false,
            exportparts: element.getAttribute('exportparts'),
            id: element.id,
            role: SelectField.role,
            tabIndex: element.tabIndex,
        };
        const { internals, shadowRoot } = options;
        if (checkFalsy(data.exportparts) && shadowRoot instanceof ShadowRoot) {
            const $$parts = shadowRoot.querySelectorAll('[part]');
            if ($$parts.length) {
                data.exportparts = Array.from($$parts)
                    .map(($elem) => $elem.part.toString())
                    .join(', ');
            }
        }
        if (checkFalsy(data.id) && element.isConnected) {
            data.id = [SelectField.role, Math.round(performance.now())].join('-');
        }
        if (element.isConnected &&
            data.tabIndex < 0 &&
            internals instanceof ElementInternals &&
            internals.form instanceof HTMLElement) {
            data.tabIndex = 0;
        }
        return updateAttributes(element, data);
    }
    static initAccessibilityTree(element, options) {
        const { internals, $listbox } = options;
        internals.ariaAtomic = 'true';
        internals.ariaLive = 'polite';
        internals.role = SelectField.role;
        internals.ariaDisabled = String(element.ariaDisabled === 'true');
        internals.ariaExpanded = String(element.ariaExpanded === 'true');
        internals.ariaRequired = String(element.ariaRequired === 'true');
        internals.ariaHasPopup = 'listbox';
        internals.ariaMultiSelectable = String(element.ariaMultiSelectable === 'true');
        $listbox.ariaMultiSelectable = internals.ariaMultiSelectable;
    }
    constructor() {
        super();
        _SelectField_instances.add(this);
        _SelectField_focusCont.set(this, undefined);
        _SelectField_interCont.set(this, undefined);
        _SelectField_internals.set(this, this.attachInternals());
        _SelectField_options.set(this, new Map());
        _SelectField_slotChangeCont.set(this, undefined);
        initShadowRoot.call(this, {
            template,
            delegatesFocus: true,
        });
        SelectField.initAttributes(this, {
            shadowRoot: __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$root_get),
        });
        ElementInternals;
        __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_listenAssignedNodes).call(this);
        __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).add(ComponentReadyState.Defined);
        ElementInternals;
        ElementInternals;
    }
    connectedCallback() {
        SelectField.initAttributes(this, {
            internals: __classPrivateFieldGet(this, _SelectField_internals, "f"),
        });
        SelectField.initAccessibilityTree(this, {
            $listbox: __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$listbox_get),
            internals: __classPrivateFieldGet(this, _SelectField_internals, "f"),
        });
        __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_listenFocus).call(this);
        __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).add(ComponentReadyState.Interactive);
        __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$root_get).querySelector('link').onload = () => __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).add(ComponentReadyState.Loaded);
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _SelectField_interCont, "f")?.abort();
        __classPrivateFieldGet(this, _SelectField_focusCont, "f")?.abort();
        __classPrivateFieldGet(this, _SelectField_slotChangeCont, "f")?.abort();
    }
    adoptedCallback() { }
    attributeChangedCallback(name, previous, current) {
        if (false === this.isConnected)
            return;
        if (previous === current)
            return;
        const isTruth = checkTruth(current);
        switch (name) {
            case 'aria-disabled':
                if (isTruth) {
                    __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).add(FieldState.Disabled);
                    __classPrivateFieldGet(this, _SelectField_interCont, "f")?.abort();
                }
                else {
                    __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).delete(FieldState.Disabled);
                }
                __classPrivateFieldGet(this, _SelectField_internals, "f").ariaDisabled = current;
                break;
            case 'aria-expanded':
                __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).add(isTruth ? ComboboxState.Expanded : ComboboxState.Collapsed);
                __classPrivateFieldGet(this, _SelectField_internals, "f").ariaExpanded = current;
                break;
            case 'aria-label':
                __classPrivateFieldGet(this, _SelectField_internals, "f").ariaLabel = current;
                __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$status_get).ariaLabel = current;
                break;
            case 'aria-placeholder':
                __classPrivateFieldGet(this, _SelectField_internals, "f").ariaPlaceholder = current;
                __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$status_get).ariaPlaceholder = current;
                break;
            case 'value':
                this.value = current;
                break;
        }
    }
    formAssociatedCallback(form_) { }
    formDisabledCallback(disabled) {
        this.setAttribute('aria-disabled', disabled);
    }
    formResetCallback() { }
    formStateRestoreCallback(state, reason_) {
        this.value = state;
    }
    collapse() {
        __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).delete(ComboboxState.Expanded);
        updateAttributes(this, 'aria-expanded', false);
        __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$button_get).focus();
    }
    expand() {
        __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).delete(ComboboxState.Collapsed);
        updateAttributes(this, 'aria-expanded', true);
        __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$listbox_get).focus();
    }
    select(value) {
        let option;
        if (value instanceof HTMLElement) {
            option = __classPrivateFieldGet(this, _SelectField_options, "f").get(value);
        }
        else if (typeof value === 'string') {
            option = __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_findByValue).call(this, value);
        }
        return Boolean(option) && __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_selectElement).call(this, option.$element);
    }
    get disabled() {
        return (__classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).has(FieldState.Disabled) &&
            checkTruth(__classPrivateFieldGet(this, _SelectField_internals, "f").ariaDisabled) &&
            checkTruth(this.ariaDisabled));
    }
    get expanded() {
        return (__classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_states_get).has(ComboboxState.Expanded) &&
            checkTruth(__classPrivateFieldGet(this, _SelectField_internals, "f").ariaExpanded) &&
            checkTruth(this.ariaExpanded));
    }
    get multiple() {
        return checkTruth(__classPrivateFieldGet(this, _SelectField_internals, "f").ariaMultiSelectable);
    }
    get options() {
        return __classPrivateFieldGet(this, _SelectField_options, "f").values();
    }
    get readonly() {
        return checkTruth(__classPrivateFieldGet(this, _SelectField_internals, "f").ariaReadOnly);
    }
    get size() {
        return __classPrivateFieldGet(this, _SelectField_options, "f").size;
    }
    get value() {
        return __classPrivateFieldGet(this, _SelectField_internals, "f").ariaValueNow;
    }
    set value(updated) {
        __classPrivateFieldGet(this, _SelectField_internals, "f").ariaValueNow = updated;
        this.dispatchEvent(new Event('change'));
    }
}
_SelectField_focusCont = new WeakMap(), _SelectField_interCont = new WeakMap(), _SelectField_internals = new WeakMap(), _SelectField_options = new WeakMap(), _SelectField_slotChangeCont = new WeakMap(), _SelectField_instances = new WeakSet(), _SelectField_selectElement = function _SelectField_selectElement($element) {
    const attribute = this.multiple ? 'aria-checked' : 'aria-selected';
    $element.setAttribute(attribute, 'true');
    return true;
}, _SelectField_$button_get = function _SelectField_$button_get() {
    return __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$root_get).getElementById('button');
}, _SelectField_$status_get = function _SelectField_$status_get() {
    return __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$root_get).getElementById('value_text');
}, _SelectField_$listbox_get = function _SelectField_$listbox_get() {
    return __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$root_get).getElementById('listbox');
}, _SelectField_$root_get = function _SelectField_$root_get() {
    return __classPrivateFieldGet(this, _SelectField_internals, "f").shadowRoot;
}, _SelectField_states_get = function _SelectField_states_get() {
    return __classPrivateFieldGet(this, _SelectField_internals, "f").states;
}, _SelectField_findByValue = function _SelectField_findByValue(query) {
    for (const option of __classPrivateFieldGet(this, _SelectField_options, "f")) {
        if (query === option.value)
            return option;
    }
    return null;
}, _SelectField_listenAssignedNodes = function _SelectField_listenAssignedNodes() {
    __classPrivateFieldGet(this, _SelectField_slotChangeCont, "f")?.abort();
    __classPrivateFieldSet(this, _SelectField_slotChangeCont, new AbortController(), "f");
    const list = __classPrivateFieldGet(this, _SelectField_options, "f");
    const cleanup = (list) => list.forEach(({ $element }, $ref, map) => ($element.isConnected && $element.parentElement === this) ||
        map.delete($ref));
    __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$listbox_get).children[0].addEventListener('slotchange', (event) => {
        const $$elements = event.target.assignedElements();
        for (const $element of $$elements)
            if ($element.hasAttribute('role') &&
                $element.role === 'option') {
                const $ref = new WeakRef($element);
                const label = $element.ariaLabel || $element.textContent;
                list.set($ref, {
                    $element,
                    label,
                    value: $element.getAttribute('value') ||
                        $element.dataset.value ||
                        (undefined !== $element['value'] &&
                            $element.value) ||
                        label,
                });
            }
            else
                $element.remove();
        cleanup(list);
    }, {
        signal: __classPrivateFieldGet(this, _SelectField_slotChangeCont, "f").signal,
    });
    return __classPrivateFieldGet(this, _SelectField_slotChangeCont, "f");
}, _SelectField_listenFocus = function _SelectField_listenFocus() {
    __classPrivateFieldGet(this, _SelectField_focusCont, "f")?.abort();
    __classPrivateFieldSet(this, _SelectField_focusCont, new AbortController(), "f");
    const options = {
        signal: __classPrivateFieldGet(this, _SelectField_focusCont, "f").signal,
    };
    this.addEventListener('focus', (event) => __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_onFocus).call(this, event), options);
    this.addEventListener('blur', (event) => __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_onBlur).call(this, event), options);
    return __classPrivateFieldGet(this, _SelectField_focusCont, "f");
}, _SelectField_onBlur = function _SelectField_onBlur(event_) {
    this.collapse();
    __classPrivateFieldGet(this, _SelectField_interCont, "f")?.abort();
}, _SelectField_onFocus = function _SelectField_onFocus(event_) {
    __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_listenInteraction).call(this);
}, _SelectField_listenInteraction = function _SelectField_listenInteraction() {
    __classPrivateFieldGet(this, _SelectField_interCont, "f")?.abort();
    __classPrivateFieldSet(this, _SelectField_interCont, new AbortController(), "f");
    const options = {
        capture: false,
        passive: false,
        signal: __classPrivateFieldGet(this, _SelectField_interCont, "f").signal,
    };
    this.addEventListener('click', (event) => __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_onClick).call(this, event), options);
    this.addEventListener('keydown', (event) => __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_onKeyPress).call(this, event), options);
    this.addEventListener('focusin', (event) => { }, options);
    this.addEventListener('focusout', (event) => { }, options);
    return __classPrivateFieldGet(this, _SelectField_interCont, "f");
}, _SelectField_onClick = function _SelectField_onClick(event_) {
    __classPrivateFieldGet(this, _SelectField_instances, "m", _SelectField_toggle).call(this);
}, _SelectField_onKeyPress = function _SelectField_onKeyPress(event) {
    const { key } = event;
    const $focused = __classPrivateFieldGet(this, _SelectField_internals, "f").ariaActiveDescendantElement;
    switch (key) {
        case 'Enter':
            if ($focused === __classPrivateFieldGet(this, _SelectField_instances, "a", _SelectField_$button_get)) {
                this.expand();
            }
            break;
        case 'Backspace':
        case 'Escape':
            this.collapse();
            break;
        case 'End':
            this.options[this.size - 1].focus();
            break;
        case 'Home':
            this.options[0].focus();
            break;
        case 'ArrowUp':
            this.collapse();
            break;
        case 'ArrowDown':
            this.expand();
            break;
    }
}, _SelectField_toggle = function _SelectField_toggle() {
    this.expanded ? this.collapse() : this.expand();
};
SelectField.formAssociated = true;
SelectField.role = 'combobox';
SelectField.observedAttributes = [
    'aria-disabled',
    'aria-expanded',
    'aria-label',
    'aria-multiselectable',
    'aria-placeholder',
    'aria-required',
    'name',
    'value',
];
customElements.define(tagName, SelectField);
const index = customElements.get(tagName);

export { SelectField, index as default, tagName };
