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

function initShadowRoot(options) {
    const { $template, template, delegatesFocus = false, mode = 'closed', serializable = false, } = options;
    const shadowRoot = this.attachShadow({
        delegatesFocus,
        mode,
        serializable,
    });
    if ($template instanceof DocumentFragment)
        shadowRoot.appendChild($template.cloneNode(true));
    if (typeof template === 'string')
        shadowRoot.setHTMLUnsafe(template);
    return shadowRoot;
}

function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}

function updateAttributes(element, objectOrAttrName, attrValue) {
    const pairs = isObject(objectOrAttrName)
        ? Object.entries(objectOrAttrName)
        : [[objectOrAttrName, attrValue]];
    pairs.forEach(([key, value]) => {
        const attrName = String(key);
        if (value === null)
            element.removeAttribute(attrName);
        else if (value instanceof Attr)
            element.setAttributeNode(value);
        else {
            const attr = element.getAttributeNode(attrName);
            const attrValue = String(value);
            if (attr !== null)
                attr.value = attrValue;
            else
                element.setAttribute(attrName, attrValue);
        }
    });
    return new Map(element
        .getAttributeNames()
        .sort()
        .map((name) => [name, element.getAttributeNode(name)]));
}

var _ListboxElement_instances, _a, _ListboxElement_index, _ListboxElement_internals, _ListboxElement_options, _ListboxElement_focusCont, _ListboxElement_interCont, _ListboxElement_slotChangeCont, _ListboxElement_selectElement, _ListboxElement_listenAssignedNodes, _ListboxElement_listenFocus, _ListboxElement_onBlur, _ListboxElement_onFocus, _ListboxElement_listenInteraction, _ListboxElement_onClick, _ListboxElement_onKeyDown, _ListboxElement_log;
const template = '<slot></slot>';
class ListboxElement extends HTMLElement {
    static initAttributes($element) {
        const data = {
            'aria-orientation': $element.ariaOrientation ?? 'vertical',
            id: $element.id,
            role: this.role,
        };
        if ($element.isConnected && false === Boolean(data.id)) {
            data.id = [this.role, Math.round(performance.now())].join('-');
        }
        return updateAttributes($element, data);
    }
    static initOptionAttributes($element) {
        const data = {
            'aria-selected': $element.ariaSelected ?? 'false',
            id: $element.id,
        };
        if (false === Boolean(data.id)) {
            data.id = [$element.role, Math.round(performance.now())].join('-');
        }
    }
    constructor() {
        super();
        _ListboxElement_instances.add(this);
        _ListboxElement_index.set(this, 0);
        _ListboxElement_internals.set(this, this.attachInternals());
        _ListboxElement_options.set(this, new Map());
        _ListboxElement_focusCont.set(this, undefined);
        _ListboxElement_interCont.set(this, undefined);
        _ListboxElement_slotChangeCont.set(this, undefined);
        initShadowRoot.call(this, {
            template,
        });
        _a.initAttributes(this);
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_listenAssignedNodes).call(this);
    }
    attributeChangedCallback(name, previous, current) {
        if (false === this.isConnected)
            return;
        if (previous === current)
            return;
        checkTruth(current);
    }
    connectedCallback() {
        _a.initAttributes(this);
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_listenFocus).call(this);
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _ListboxElement_interCont, "f")?.abort();
        __classPrivateFieldGet(this, _ListboxElement_focusCont, "f")?.abort();
        __classPrivateFieldGet(this, _ListboxElement_slotChangeCont, "f")?.abort();
    }
    formAssociatedCallback(form_) { }
    formDisabledCallback(state_) { }
    formResetCallback() { }
    formStateRestoreCallback(state_, reason_) { }
    shift(offset) {
        __classPrivateFieldSet(this, _ListboxElement_index, (((__classPrivateFieldGet(this, _ListboxElement_index, "f") + offset) % this.size) + this.size) % this.size, "f");
        this.options[__classPrivateFieldGet(this, _ListboxElement_index, "f")].$ref.deref()?.focus();
        return this;
    }
    findByValue(query) {
        for (const [id_, option] of __classPrivateFieldGet(this, _ListboxElement_options, "f")) {
            if (query === option.value)
                return option;
        }
        return null;
    }
    search(query) {
        const result = new Set();
        for (const [id_, option] of __classPrivateFieldGet(this, _ListboxElement_options, "f"))
            if (0 === option.label?.indexOf(query) ||
                0 === option.value?.indexOf(query))
                result.add(option);
        return result.size > 0 ? result : null;
    }
    select(param) {
        let $element;
        if (param instanceof HTMLElement)
            $element = param;
        else if (param instanceof WeakRef)
            $element = param.deref();
        else if (typeof param === 'string' || typeof param === 'number') {
            const option = __classPrivateFieldGet(this, _ListboxElement_options, "f").get(param);
            if (option !== undefined)
                $element = option.$ref.deref();
        }
        if ($element !== undefined) {
            if (this.multiple === false)
                this.unselect();
            return __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_selectElement).call(this, $element);
        }
        else
            return false;
    }
    unselect($element) {
        if ($element instanceof HTMLElement) {
            $element.setAttribute('aria-selected', 'false');
            return true;
        }
        const $$selected = this.selectedElements;
        if ($$selected && $$selected.length > 0) {
            this.selectedElements.forEach(($element) => $element.setAttribute('aria-selected', 'false'));
            return true;
        }
        return false;
    }
    get activeElement() {
        return __classPrivateFieldGet(this, _ListboxElement_internals, "f").ariaActiveDescendantElement;
    }
    set activeElement($element) {
        __classPrivateFieldGet(this, _ListboxElement_internals, "f").ariaActiveDescendant = $element?.id;
        __classPrivateFieldGet(this, _ListboxElement_internals, "f").ariaActiveDescendantElement = $element;
    }
    get multiple() {
        return checkTruth(this.ariaMultiSelectable);
    }
    get options() {
        return Array.from(__classPrivateFieldGet(this, _ListboxElement_options, "f").values());
    }
    get selectedElements() {
        const $$elements = [];
        for (const { $ref } of __classPrivateFieldGet(this, _ListboxElement_options, "f").values()) {
            const $element = $ref.deref();
            if ($element && checkTruth($element.ariaSelected))
                $$elements.push($element);
        }
        return $$elements.length > 0 ? $$elements : null;
    }
    get size() {
        return __classPrivateFieldGet(this, _ListboxElement_options, "f").size;
    }
}
_a = ListboxElement, _ListboxElement_index = new WeakMap(), _ListboxElement_internals = new WeakMap(), _ListboxElement_options = new WeakMap(), _ListboxElement_focusCont = new WeakMap(), _ListboxElement_interCont = new WeakMap(), _ListboxElement_slotChangeCont = new WeakMap(), _ListboxElement_instances = new WeakSet(), _ListboxElement_selectElement = function _ListboxElement_selectElement($element) {
    if ($element !== undefined) {
        const attr = $element.getAttributeNode('aria-selected');
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, 'Select Element', $element, attr);
        return attr !== null && checkFalsy(attr.value)
            ? ((attr.value = 'true'), true)
            : false;
    }
    else
        return false;
}, _ListboxElement_listenAssignedNodes = function _ListboxElement_listenAssignedNodes() {
    __classPrivateFieldGet(this, _ListboxElement_slotChangeCont, "f")?.abort();
    __classPrivateFieldSet(this, _ListboxElement_slotChangeCont, new AbortController(), "f");
    this.addEventListener('slotchange', (event) => {
        __classPrivateFieldGet(this, _ListboxElement_options, "f").clear();
        const $$elements = event.target.assignedElements({ flatten: true });
        $$elements.forEach(($element, idx) => {
            if ($element.role === 'option') {
                _a.initOptionAttributes($element);
                const option = {
                    $ref: new WeakRef($element),
                    label: $element.ariaLabel || $element.textContent,
                    value: $element.dataset.value ??
                        $element.getAttribute('value'),
                };
                __classPrivateFieldGet(this, _ListboxElement_options, "f").set($element.id, option);
                __classPrivateFieldGet(this, _ListboxElement_options, "f").set(idx, option);
            }
        });
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, 'SlotChange Event');
    }, {
        signal: __classPrivateFieldGet(this, _ListboxElement_slotChangeCont, "f").signal,
    });
    return __classPrivateFieldGet(this, _ListboxElement_slotChangeCont, "f");
}, _ListboxElement_listenFocus = function _ListboxElement_listenFocus() {
    __classPrivateFieldGet(this, _ListboxElement_focusCont, "f")?.abort();
    __classPrivateFieldSet(this, _ListboxElement_focusCont, new AbortController(), "f");
    const options = {
        signal: __classPrivateFieldGet(this, _ListboxElement_focusCont, "f").signal,
    };
    this.addEventListener('focus', (e) => __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_onFocus).call(this, e), options);
    this.addEventListener('blur', (e) => __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_onBlur).call(this, e), options);
    return __classPrivateFieldGet(this, _ListboxElement_focusCont, "f");
}, _ListboxElement_onBlur = function _ListboxElement_onBlur(event) {
    __classPrivateFieldGet(this, _ListboxElement_interCont, "f")?.abort();
    __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, `event:${event.type}`);
}, _ListboxElement_onFocus = function _ListboxElement_onFocus(event) {
    __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_listenInteraction).call(this);
    __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, `event:${event.type}`);
}, _ListboxElement_listenInteraction = function _ListboxElement_listenInteraction() {
    __classPrivateFieldGet(this, _ListboxElement_interCont, "f")?.abort();
    __classPrivateFieldSet(this, _ListboxElement_interCont, new AbortController(), "f");
    const options = {
        capture: false,
        passive: false,
        signal: __classPrivateFieldGet(this, _ListboxElement_interCont, "f").signal,
    };
    this.addEventListener('click', (e) => __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_onClick).call(this, e), options);
    this.addEventListener('keydown', (e) => __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_onKeyDown).call(this, e), options);
    return __classPrivateFieldGet(this, _ListboxElement_interCont, "f");
}, _ListboxElement_onClick = function _ListboxElement_onClick(event) {
    __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, `event:${event.type}`);
}, _ListboxElement_onKeyDown = function _ListboxElement_onKeyDown(event) {
    switch (event.key) {
        case 'Enter':
            this.select(this.activeElement);
            event.stopPropagation();
            break;
        case 'End':
            break;
        case 'Home':
            break;
        case 'ArrowUp':
            if (__classPrivateFieldGet(this, _ListboxElement_index, "f")) {
                this.shift(-1);
                event.stopPropagation();
            }
            break;
        case 'ArrowDown':
            break;
        default:
            if (/\w+/.test(event.key)) ;
            return;
    }
    __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, `event:${event.type}`);
}, _ListboxElement_log = function _ListboxElement_log(label, ...args) {
    console.groupCollapsed(`ListboxElement: ${label}`);
    args.length > 0 && console.log('Arguments: ', args);
    console.table(__classPrivateFieldGet(this, _ListboxElement_options, "f"));
    console.debug(__classPrivateFieldGet(this, _ListboxElement_internals, "f"));
    console.dir(this);
    console.groupEnd();
};
ListboxElement.formAssociated = true;
ListboxElement.role = 'listbox';
ListboxElement.tagName = 'e-listbox';
ListboxElement.observedAttributes = [
    'aria-disabled',
    'aria-multiselectable',
    'aria-required',
    'name',
    'value',
];
customElements.define(ListboxElement.tagName, ListboxElement);
const index = customElements.get(ListboxElement.tagName);

export { ListboxElement, index as default };
