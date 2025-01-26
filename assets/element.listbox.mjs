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

const chars = 'abekmhopctyx123456789';
const generateID = (properties) => {
    const { prefix, suffix, length = 6, checklist } = properties;
    let result;
    do {
        result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt((Math.random() * chars.length) | 0);
        }
        if (prefix)
            result = prefix + '-' + result;
        if (suffix)
            result += '-' + suffix;
    } while (checklist?.includes(result));
    return result;
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

const template = "<style type=\"text/css\">:host::part(container) {\n\tdisplay: block;\n\toverflow: hidden;\n}\n\n:host(:state(--scrolled))::part(container) {\n\tscroll-behavior: smooth;\n\tscroll-snap-stop: always;\n}\n\n:host([aria-orientation='vertical']:state(--scrolled))::part(container) {\n\toverflow-y: scroll;\n}\n\n:host([aria-orientation='horizontal']:state(--scrolled))::part(container) {\n\toverflow-x: scroll;\n}\n</style><slot part=\"container\"></slot>";

var _ListboxElement_instances, _ListboxElement_activeIndex, _ListboxElement_selectedIndex, _ListboxElement_selectedIndexByDefault, _ListboxElement_internals, _ListboxElement_hashmap, _ListboxElement_ownsIDs, _ListboxElement_focusCont, _ListboxElement_interCont, _ListboxElement_slotChangeCont, _ListboxElement_initOptionAttributes, _ListboxElement_initSelectedIndexByDefault, _ListboxElement_selectElement, _ListboxElement_unselect, _ListboxElement_states_get, _ListboxElement_$container_get, _ListboxElement_listenAssignedNodes, _ListboxElement_listenFocus, _ListboxElement_onBlur, _ListboxElement_onFocus, _ListboxElement_listenInteraction, _ListboxElement_onClick, _ListboxElement_onKeyDown, _ListboxElement_log;
class ListboxElement extends HTMLElement {
    static initAttributes($element) {
        const attrs = {
            'aria-orientation': $element.ariaOrientation ?? 'vertical',
            exportparts: 'container',
            role: this.role,
        };
        return updateAttributes($element, attrs);
    }
    static initAccessibilityTree(element, internals) {
        internals.ariaAtomic = 'true';
        internals.ariaLive = 'polite';
        internals.role = this.role;
        internals.ariaDisabled = checkTruth(element.ariaDisabled).toString();
        internals.ariaOrientation = element.ariaOrientation;
        internals.ariaMultiSelectable = checkTruth(element.ariaMultiSelectable).toString();
        internals.ariaRequired = checkTruth(element.ariaRequired).toString();
    }
    constructor() {
        super();
        _ListboxElement_instances.add(this);
        _ListboxElement_activeIndex.set(this, -1);
        _ListboxElement_selectedIndex.set(this, -1);
        _ListboxElement_selectedIndexByDefault.set(this, -1);
        _ListboxElement_internals.set(this, this.attachInternals());
        _ListboxElement_hashmap.set(this, new Map());
        _ListboxElement_ownsIDs.set(this, null);
        _ListboxElement_focusCont.set(this, undefined);
        _ListboxElement_interCont.set(this, undefined);
        _ListboxElement_slotChangeCont.set(this, undefined);
        this.ariaActiveDescendantElement = null;
        initShadowRoot.call(this, {
            template,
        });
        ListboxElement.initAttributes(this);
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_listenAssignedNodes).call(this);
        __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_states_get).add("--defined");
    }
    attributeChangedCallback(name, previous, current) {
        if (false === this.isConnected)
            return;
        if (previous === current)
            return;
        const $element = (__classPrivateFieldGet(this, _ListboxElement_hashmap, "f").has(current) &&
            __classPrivateFieldGet(this, _ListboxElement_hashmap, "f").get(current)?.$ref.deref()) ||
            null;
        const isTruth = checkTruth(current);
        switch (name) {
            case 'aria-activedescendant':
                __classPrivateFieldGet(this, _ListboxElement_internals, "f").ariaActiveDescendantElement = $element;
                break;
            case 'aria-disabled':
                if (isTruth) {
                    __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_states_get).add("--disabled");
                    __classPrivateFieldGet(this, _ListboxElement_interCont, "f")?.abort();
                }
                else {
                    __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_states_get).delete("--disabled");
                }
                __classPrivateFieldGet(this, _ListboxElement_internals, "f").ariaDisabled = current;
                break;
            case 'aria-multiselectable':
                __classPrivateFieldGet(this, _ListboxElement_internals, "f").ariaMultiSelectable = isTruth.toString();
                break;
            case 'aria-required':
                __classPrivateFieldGet(this, _ListboxElement_internals, "f").ariaRequired = isTruth.toString();
                break;
        }
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, 'Attribute Changed', name, previous, current);
    }
    connectedCallback() {
        ListboxElement.initAttributes(this);
        ListboxElement.initAccessibilityTree(this, __classPrivateFieldGet(this, _ListboxElement_internals, "f"));
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_listenFocus).call(this);
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _ListboxElement_interCont, "f")?.abort();
        __classPrivateFieldGet(this, _ListboxElement_focusCont, "f")?.abort();
        __classPrivateFieldGet(this, _ListboxElement_slotChangeCont, "f")?.abort();
    }
    formAssociatedCallback(form_) { }
    formDisabledCallback(state_) { }
    formResetCallback() {
        this.selectedIndex = __classPrivateFieldGet(this, _ListboxElement_selectedIndexByDefault, "f");
    }
    formStateRestoreCallback(state_, reason_) { }
    findByValue(query) {
        for (const [id_, option] of __classPrivateFieldGet(this, _ListboxElement_hashmap, "f")) {
            if (query === option.value)
                return option;
        }
        return null;
    }
    search(query) {
        const result = new Set();
        for (const [id_, option] of __classPrivateFieldGet(this, _ListboxElement_hashmap, "f"))
            if (0 === option.label?.indexOf(query) ||
                0 === option.value?.indexOf(query))
                result.add(option);
        return result.size > 0 ? result : null;
    }
    select(param) {
        let $element;
        if (param instanceof HTMLElement)
            $element = param;
        else if (typeof param === 'string') {
            const option = __classPrivateFieldGet(this, _ListboxElement_hashmap, "f").get(param);
            if (option !== undefined)
                $element = option.$ref.deref();
        }
        if ($element !== undefined) {
            return __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_selectElement).call(this, $element);
        }
        else
            return false;
    }
    shift(offset) {
        this.activeIndex =
            (((__classPrivateFieldGet(this, _ListboxElement_activeIndex, "f") + offset) % this.length) + this.length) %
                this.length;
        return this;
    }
    updateScrollbar() {
        const isVertical = __classPrivateFieldGet(this, _ListboxElement_internals, "f").ariaOrientation === 'vertical';
        const clientSize = isVertical
            ? __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_$container_get).clientHeight
            : __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_$container_get).clientWidth;
        const scrollSize = isVertical
            ? __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_$container_get).scrollHeight
            : __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_$container_get).scrollWidth;
        const hasScrollBar = scrollSize > clientSize;
        if (hasScrollBar)
            __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_states_get).add("--scrolled");
        else
            __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_states_get).delete("--scrolled");
    }
    get activeIndex() {
        return __classPrivateFieldGet(this, _ListboxElement_activeIndex, "f");
    }
    set activeIndex(value) {
        const current = ((value % this.length) + this.length) % this.length;
        const list = this.options;
        const previos = __classPrivateFieldGet(this, _ListboxElement_activeIndex, "f");
        if (previos >= 0)
            list[previos].$ref.deref()?.setAttribute('aria-current', 'false');
        const $current = list[current].$ref.deref();
        if ($current !== undefined) {
            __classPrivateFieldSet(this, _ListboxElement_activeIndex, current, "f");
            this.setAttribute('aria-activedescendant', $current.id);
            $current.setAttribute('aria-current', 'true');
            if (__classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_states_get).has("--scrolled"))
                $current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center',
                });
        }
        else {
            __classPrivateFieldSet(this, _ListboxElement_activeIndex, -1, "f");
            this.removeAttribute('aria-activedescendant');
            throw new Error(`The option element by index ${current} is lost and cannot be activated!`);
        }
    }
    get disabled() {
        return (__classPrivateFieldGet(this, _ListboxElement_internals, "f").states.has("--disabled") &&
            checkTruth(__classPrivateFieldGet(this, _ListboxElement_internals, "f").ariaDisabled) &&
            checkTruth(this.ariaDisabled));
    }
    get length() {
        return __classPrivateFieldGet(this, _ListboxElement_hashmap, "f").size;
    }
    get multiple() {
        return checkTruth(this.ariaMultiSelectable);
    }
    get options() {
        return Array.from(__classPrivateFieldGet(this, _ListboxElement_hashmap, "f").values());
    }
    get selectedIndex() {
        return __classPrivateFieldGet(this, _ListboxElement_selectedIndex, "f");
    }
    set selectedIndex(value) {
        const previos = this.selectedIndex === -1
            ? null
            : this.options[this.selectedIndex].value;
        this.dispatchEvent(new InputEvent('beforeinput', { bubbles: true, data: previos }));
        let index;
        if (value === -1) {
            index = value;
            __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_unselect).call(this);
        }
        else {
            index = ((value % this.length) + this.length) % this.length;
            if (this.multiple === false)
                __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_unselect).call(this);
            const $element = this.options[index].$ref.deref();
            __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_selectElement).call(this, $element);
        }
        __classPrivateFieldSet(this, _ListboxElement_selectedIndex, index, "f");
        const current = index === -1 ? null : this.options[index].value;
        this.dispatchEvent(new InputEvent('input', { bubbles: true, data: current }));
    }
    get selectedOptions() {
        const $$elements = [];
        for (const { $ref } of __classPrivateFieldGet(this, _ListboxElement_hashmap, "f").values()) {
            const $element = $ref.deref();
            if ($element && checkTruth($element.ariaSelected)) {
                $$elements.push($element);
                if (this.multiple === false)
                    return $$elements;
            }
        }
        return $$elements.length > 0 ? $$elements : null;
    }
    get value() {
        const values = this.selectedOptions
            ?.map(($element) => __classPrivateFieldGet(this, _ListboxElement_hashmap, "f").get($element.id)?.value)
            .filter((value) => typeof value === 'string');
        return values ? (this.multiple ? values : values[0]) : null;
    }
}
_ListboxElement_activeIndex = new WeakMap(), _ListboxElement_selectedIndex = new WeakMap(), _ListboxElement_selectedIndexByDefault = new WeakMap(), _ListboxElement_internals = new WeakMap(), _ListboxElement_hashmap = new WeakMap(), _ListboxElement_ownsIDs = new WeakMap(), _ListboxElement_focusCont = new WeakMap(), _ListboxElement_interCont = new WeakMap(), _ListboxElement_slotChangeCont = new WeakMap(), _ListboxElement_instances = new WeakSet(), _ListboxElement_initOptionAttributes = function _ListboxElement_initOptionAttributes($element) {
    const attrs = {
        'aria-selected': $element.ariaSelected ?? 'false',
        id: $element.id,
    };
    if (false === Boolean(attrs.id)) {
        attrs.id = generateID({
            prefix: 'option',
            checklist: __classPrivateFieldGet(this, _ListboxElement_ownsIDs, "f"),
        });
    }
    $element.onclick = (event) => __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_onClick).call(this, event);
    return updateAttributes($element, attrs);
}, _ListboxElement_initSelectedIndexByDefault = function _ListboxElement_initSelectedIndexByDefault() {
    this.selectedIndex = __classPrivateFieldSet(this, _ListboxElement_selectedIndexByDefault, this.options.findIndex((option) => checkTruth(option.$ref.deref()?.getAttribute('aria-selected'))), "f");
    return this;
}, _ListboxElement_selectElement = function _ListboxElement_selectElement($element) {
    if ($element !== undefined) {
        const attr = $element.getAttributeNode('aria-selected');
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, 'select element', $element, attr);
        return attr !== null && checkFalsy(attr.value)
            ? ((attr.value = 'true'), true)
            : false;
    }
    else
        return false;
}, _ListboxElement_unselect = function _ListboxElement_unselect($element) {
    if ($element instanceof HTMLElement) {
        $element.setAttribute('aria-selected', 'false');
        return true;
    }
    const $$selected = this.selectedOptions;
    if ($$selected && $$selected.length > 0) {
        this.selectedOptions.forEach(($element) => $element.setAttribute('aria-selected', 'false'));
        return true;
    }
    return false;
}, _ListboxElement_states_get = function _ListboxElement_states_get() {
    return __classPrivateFieldGet(this, _ListboxElement_internals, "f").states;
}, _ListboxElement_$container_get = function _ListboxElement_$container_get() {
    return __classPrivateFieldGet(this, _ListboxElement_internals, "f").shadowRoot?.querySelector('[part=container]');
}, _ListboxElement_listenAssignedNodes = function _ListboxElement_listenAssignedNodes() {
    __classPrivateFieldGet(this, _ListboxElement_slotChangeCont, "f")?.abort();
    __classPrivateFieldSet(this, _ListboxElement_slotChangeCont, new AbortController(), "f");
    this.addEventListener('slotchange', (event) => {
        const $$elements = event.target.assignedElements({ flatten: true });
        __classPrivateFieldGet(this, _ListboxElement_hashmap, "f").clear();
        $$elements.forEach(($element) => {
            if ($element.role === 'option') {
                __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_initOptionAttributes).call(this, $element);
                const option = {
                    $ref: new WeakRef($element),
                    label: $element.ariaLabel || $element.textContent,
                    value: $element.dataset.value ??
                        $element.getAttribute('value'),
                };
                __classPrivateFieldGet(this, _ListboxElement_hashmap, "f").set($element.id, option);
            }
        });
        if (__classPrivateFieldGet(this, _ListboxElement_hashmap, "f").size > 0) {
            __classPrivateFieldSet(this, _ListboxElement_ownsIDs, Array.from(__classPrivateFieldGet(this, _ListboxElement_hashmap, "f").keys()), "f");
            this.setAttribute('aria-owns', __classPrivateFieldGet(this, _ListboxElement_ownsIDs, "f").join(' '));
        }
        else {
            __classPrivateFieldSet(this, _ListboxElement_ownsIDs, null, "f");
            this.removeAttribute('aria-owns');
        }
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_initSelectedIndexByDefault).call(this);
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
        signal: __classPrivateFieldGet(this, _ListboxElement_interCont, "f").signal,
    };
    this.addEventListener('click', (e) => __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_onClick).call(this, e), options);
    this.addEventListener('keydown', (e) => __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_onKeyDown).call(this, e), options);
    return __classPrivateFieldGet(this, _ListboxElement_interCont, "f");
}, _ListboxElement_onClick = function _ListboxElement_onClick(event) {
    event.stopPropagation();
    const $target = event.currentTarget;
    this.selectedIndex = this.activeIndex =
        __classPrivateFieldGet(this, _ListboxElement_ownsIDs, "f")?.indexOf($target.id) ?? -1;
    __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, `event:${event.type}`);
}, _ListboxElement_onKeyDown = function _ListboxElement_onKeyDown(event) {
    switch (event.key) {
        case 'Enter':
            this.selectedIndex = this.activeIndex;
            event.stopPropagation();
            break;
        case 'Space':
            if (this.selectedIndex === this.activeIndex) {
                this.selectedIndex = this.activeIndex;
            }
            else {
                this.selectedIndex = this.activeIndex;
            }
            break;
        case 'End':
            this.activeIndex = this.length - 1;
            break;
        case 'Home':
            this.activeIndex = 0;
            break;
        case 'ArrowUp':
            if (__classPrivateFieldGet(this, _ListboxElement_activeIndex, "f")) {
                if (event.altKey)
                    this.activeIndex = 0;
                else
                    this.shift(-1);
                event.stopPropagation();
            }
            event.preventDefault();
            break;
        case 'ArrowDown':
            if (event.altKey)
                this.activeIndex = this.length - 1;
            else
                this.shift(1);
            event.preventDefault();
            break;
        default:
            if (/\w+/.test(event.key)) ;
            return;
    }
    __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_log).call(this, `event:${event.type}`, __classPrivateFieldGet(this, _ListboxElement_internals, "f").shadowRoot?.activeElement, __classPrivateFieldGet(this, _ListboxElement_activeIndex, "f"));
}, _ListboxElement_log = function _ListboxElement_log(label, ...args) {
    console.groupCollapsed(`ListboxElement: ${label}`);
    args.length > 0 && console.log('Arguments: ', args);
    console.table(__classPrivateFieldGet(this, _ListboxElement_hashmap, "f"));
    console.debug(__classPrivateFieldGet(this, _ListboxElement_internals, "f"));
    console.dir(this);
    console.groupEnd();
};
ListboxElement.formAssociated = true;
ListboxElement.role = 'listbox';
ListboxElement.tagName = 'e-listbox';
ListboxElement.observedAttributes = [
    'aria-activedescendant',
    'aria-disabled',
    'aria-multiselectable',
    'aria-required',
];
customElements.define(ListboxElement.tagName, ListboxElement);
const index = customElements.get(ListboxElement.tagName);

export { ListboxElement, index as default };
