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

var ComponentState;
(function (ComponentState) {
    ComponentState["Animation"] = "--animating";
    ComponentState["Defined"] = "--defined";
    ComponentState["Interactive"] = "--interactive";
    ComponentState["Loaded"] = "--loaded";
})(ComponentState || (ComponentState = {}));
var ComboboxState;
(function (ComboboxState) {
    ComboboxState["Collapsed"] = "--collapsed";
    ComboboxState["Expanded"] = "--expanded";
})(ComboboxState || (ComboboxState = {}));
var FieldState;
(function (FieldState) {
    FieldState["Disabled"] = "--disabled";
})(FieldState || (FieldState = {}));

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

var _ListboxElement_instances, _ListboxElement_activeIndex, _ListboxElement_selectedIndex, _ListboxElement_internals, _ListboxElement_hashmap, _ListboxElement_ownsIDs, _ListboxElement_focusCont, _ListboxElement_interCont, _ListboxElement_slotChangeCont, _ListboxElement_initOptionAttributes, _ListboxElement_selectElement, _ListboxElement_unselect, _ListboxElement_states_get, _ListboxElement_listenAssignedNodes, _ListboxElement_listenFocus, _ListboxElement_onBlur, _ListboxElement_onFocus, _ListboxElement_listenInteraction, _ListboxElement_onClick, _ListboxElement_onKeyDown, _ListboxElement_log;
const template$1 = '<slot part="container"></slot>';
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
        internals.ariaRequired = checkTruth(element.ariaRequired).toString();
        internals.ariaMultiSelectable = checkTruth(element.ariaMultiSelectable).toString();
    }
    constructor() {
        super();
        _ListboxElement_instances.add(this);
        _ListboxElement_activeIndex.set(this, -1);
        _ListboxElement_selectedIndex.set(this, -1);
        _ListboxElement_internals.set(this, this.attachInternals());
        _ListboxElement_hashmap.set(this, new Map());
        _ListboxElement_ownsIDs.set(this, null);
        _ListboxElement_focusCont.set(this, undefined);
        _ListboxElement_interCont.set(this, undefined);
        _ListboxElement_slotChangeCont.set(this, undefined);
        this.ariaActiveDescendantElement = null;
        initShadowRoot.call(this, {
            template: template$1,
        });
        ListboxElement.initAttributes(this);
        __classPrivateFieldGet(this, _ListboxElement_instances, "m", _ListboxElement_listenAssignedNodes).call(this);
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
                    __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_states_get).add(FieldState.Disabled);
                    __classPrivateFieldGet(this, _ListboxElement_interCont, "f")?.abort();
                }
                else {
                    __classPrivateFieldGet(this, _ListboxElement_instances, "a", _ListboxElement_states_get).delete(FieldState.Disabled);
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
    formResetCallback() { }
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
            $current.setAttribute('aria-current', 'true');
            __classPrivateFieldSet(this, _ListboxElement_activeIndex, current, "f");
            this.setAttribute('aria-activedescendant', $current.id);
        }
        else {
            __classPrivateFieldSet(this, _ListboxElement_activeIndex, -1, "f");
            this.removeAttribute('aria-activedescendant');
            throw new Error(`The option element by index ${current} is lost and cannot be activated!`);
        }
    }
    get disabled() {
        return (__classPrivateFieldGet(this, _ListboxElement_internals, "f").states.has(FieldState.Disabled) &&
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
_ListboxElement_activeIndex = new WeakMap(), _ListboxElement_selectedIndex = new WeakMap(), _ListboxElement_internals = new WeakMap(), _ListboxElement_hashmap = new WeakMap(), _ListboxElement_ownsIDs = new WeakMap(), _ListboxElement_focusCont = new WeakMap(), _ListboxElement_interCont = new WeakMap(), _ListboxElement_slotChangeCont = new WeakMap(), _ListboxElement_instances = new WeakSet(), _ListboxElement_initOptionAttributes = function _ListboxElement_initOptionAttributes($element) {
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
    if (__classPrivateFieldGet(this, _ListboxElement_activeIndex, "f") < 0)
        __classPrivateFieldSet(this, _ListboxElement_activeIndex, 0, "f");
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
customElements.get(ListboxElement.tagName);

const template = "<link href=\"http://assets.protosite.rocks/core/select-field.css\" rel=\"stylesheet\" type=\"text/css\"><style type=\"text/css\">:host(:state(--defined)) {\n\tcontent-visibility: hidden;\n}\n:host(:state(--loaded)) {\n\tcontent-visibility: visible;\n}</style><div aria-controls=\"listbox\" id=\"button\" role=\"button\" tabindex=\"0\"><div aria-placeholder=\"Выбрать...\" part=\"selectedcontent\" id=\"status\" role=\"status\"></div></div><e-listbox aria-labelledby=\"button\" id=\"listbox\" part=\"listbox\" tabindex=\"1\"><slot></slot></e-listbox>";

var _SelectComponent_instances, _SelectComponent_$root, _SelectComponent_internals, _SelectComponent_observer, _SelectComponent_focusCont, _SelectComponent_interCont, _SelectComponent_passingCont, _SelectComponent_slotChangeCont, _SelectComponent_$button_get, _SelectComponent_$status_get, _SelectComponent_$listbox_get, _SelectComponent_states_get, _SelectComponent_listenInput, _SelectComponent_onInput, _SelectComponent_listenFocus, _SelectComponent_onBlur, _SelectComponent_onFocus, _SelectComponent_listenInteraction, _SelectComponent_onAnimationEnd, _SelectComponent_onClick, _SelectComponent_onKeyDown, _SelectComponent_listenMutations, _SelectComponent_log, _SelectComponent_passEventAlong;
class SelectComponent extends HTMLElement {
    static initAttributes(element, options) {
        const data = {
            'aria-atomic': true,
            'aria-expanded': false,
            exportparts: element.getAttribute('exportparts'),
            id: element.id,
            role: this.role,
            tabIndex: element.tabIndex,
        };
        const { internals, shadowRoot } = options;
        if (checkFalsy(data.exportparts) && shadowRoot instanceof ShadowRoot) {
            const $$parts = shadowRoot.querySelectorAll('[part]');
            if ($$parts.length) {
                data.exportparts = Array.from($$parts)
                    .map(($elem) => $elem.part.toString())
                    .join(' ');
            }
        }
        if (checkFalsy(data.id) && element.isConnected) {
            data.id = [this.role, Math.round(performance.now())].join('-');
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
        const { internals, $listbox, $status } = options;
        internals.ariaAtomic = 'true';
        internals.ariaHasPopup = 'listbox';
        internals.ariaLive = 'polite';
        internals.role = this.role;
        internals.ariaDisabled = checkTruth(element.ariaDisabled).toString();
        internals.ariaExpanded = checkTruth(element.ariaExpanded).toString();
        internals.ariaRequired = checkTruth(element.ariaRequired).toString();
        internals.ariaMultiSelectable = checkTruth(element.ariaMultiSelectable).toString();
        $listbox.ariaMultiSelectable = internals.ariaMultiSelectable;
        $status.ariaLabel = element.ariaLabel;
        $status.ariaPlaceholder = element.ariaPlaceholder;
    }
    constructor() {
        super();
        _SelectComponent_instances.add(this);
        _SelectComponent_$root.set(this, undefined);
        _SelectComponent_internals.set(this, this.attachInternals());
        _SelectComponent_observer.set(this, undefined);
        _SelectComponent_focusCont.set(this, undefined);
        _SelectComponent_interCont.set(this, undefined);
        _SelectComponent_passingCont.set(this, undefined);
        _SelectComponent_slotChangeCont.set(this, undefined);
        __classPrivateFieldSet(this, _SelectComponent_$root, initShadowRoot.call(this, {
            template,
            delegatesFocus: true,
        }), "f");
        SelectComponent.initAttributes(this, {
            shadowRoot: __classPrivateFieldGet(this, _SelectComponent_$root, "f"),
        });
        __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).add(ComponentState.Defined);
    }
    attributeChangedCallback(name, previous, current) {
        if (false === this.isConnected)
            return;
        if (previous === current)
            return;
        const isTruth = checkTruth(current);
        const isFalsy = checkFalsy(current);
        switch (name) {
            case 'aria-disabled':
                if (isTruth) {
                    __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).add(FieldState.Disabled);
                    __classPrivateFieldGet(this, _SelectComponent_interCont, "f")?.abort();
                }
                else {
                    __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).delete(FieldState.Disabled);
                }
                __classPrivateFieldGet(this, _SelectComponent_internals, "f").ariaDisabled = isTruth.toString();
                break;
            case 'aria-expanded':
                __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).delete(isFalsy ? ComboboxState.Expanded : ComboboxState.Collapsed);
                __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).add(isTruth ? ComboboxState.Expanded : ComboboxState.Collapsed);
                __classPrivateFieldGet(this, _SelectComponent_internals, "f").ariaExpanded = isTruth.toString();
                break;
            case 'aria-multiselectable':
                __classPrivateFieldGet(this, _SelectComponent_internals, "f").ariaMultiSelectable = isTruth.toString();
                break;
        }
        __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_log).call(this, 'Attribute Changed', name, previous, current);
    }
    connectedCallback() {
        SelectComponent.initAttributes(this, {
            internals: __classPrivateFieldGet(this, _SelectComponent_internals, "f"),
        });
        SelectComponent.initAccessibilityTree(this, {
            $listbox: __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get),
            $status: __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$status_get),
            internals: __classPrivateFieldGet(this, _SelectComponent_internals, "f"),
        });
        __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_listenFocus).call(this);
        __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_listenInput).call(this);
        __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_listenMutations).call(this);
        __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).add(ComponentState.Interactive);
        const link = __classPrivateFieldGet(this, _SelectComponent_$root, "f").querySelector('link');
        link && (link.onload = () => __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).add(ComponentState.Loaded));
        __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_log).call(this, 'Connected Callback');
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _SelectComponent_focusCont, "f")?.abort();
        __classPrivateFieldGet(this, _SelectComponent_interCont, "f")?.abort();
        __classPrivateFieldGet(this, _SelectComponent_observer, "f")?.disconnect();
        __classPrivateFieldGet(this, _SelectComponent_passingCont, "f")?.abort();
        __classPrivateFieldGet(this, _SelectComponent_slotChangeCont, "f")?.abort();
    }
    hidePicker() {
        if (__classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).has(ComboboxState.Collapsed))
            return this;
        updateAttributes(this, 'aria-expanded', false);
        __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$button_get).focus();
        return this;
    }
    showPicker() {
        if (__classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).has(ComboboxState.Expanded))
            return this;
        updateAttributes(this, 'aria-expanded', true);
        __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get).focus();
        return this;
    }
    get disabled() {
        return (__classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).has(FieldState.Disabled) &&
            checkTruth(__classPrivateFieldGet(this, _SelectComponent_internals, "f").ariaDisabled) &&
            checkTruth(this.ariaDisabled));
    }
    get expanded() {
        return (__classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).has(ComboboxState.Expanded) &&
            checkTruth(__classPrivateFieldGet(this, _SelectComponent_internals, "f").ariaExpanded) &&
            checkTruth(this.ariaExpanded));
    }
    get multiple() {
        return checkTruth(__classPrivateFieldGet(this, _SelectComponent_internals, "f").ariaMultiSelectable);
    }
    get name() {
        return (this.dataset.name || this.getAttribute('name')) ?? null;
    }
    get options() {
        return __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get).options;
    }
    get readonly() {
        return checkTruth(__classPrivateFieldGet(this, _SelectComponent_internals, "f").ariaReadOnly);
    }
    get required() {
        return checkTruth(__classPrivateFieldGet(this, _SelectComponent_internals, "f").ariaRequired);
    }
    get length() {
        return __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get).length;
    }
    get type() {
        return 'select' + (this.multiple ? '-multiple' : '-one');
    }
    get value() {
        return __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get).value;
    }
}
_SelectComponent_$root = new WeakMap(), _SelectComponent_internals = new WeakMap(), _SelectComponent_observer = new WeakMap(), _SelectComponent_focusCont = new WeakMap(), _SelectComponent_interCont = new WeakMap(), _SelectComponent_passingCont = new WeakMap(), _SelectComponent_slotChangeCont = new WeakMap(), _SelectComponent_instances = new WeakSet(), _SelectComponent_$button_get = function _SelectComponent_$button_get() {
    const $element = __classPrivateFieldGet(this, _SelectComponent_$root, "f").getElementById('button');
    if ($element === null)
        throw new Error('Button element not found but required!');
    return $element;
}, _SelectComponent_$status_get = function _SelectComponent_$status_get() {
    const $element = __classPrivateFieldGet(this, _SelectComponent_$root, "f").getElementById('status');
    if ($element === null)
        throw new Error('Element of the selected content not found but required!');
    return $element;
}, _SelectComponent_$listbox_get = function _SelectComponent_$listbox_get() {
    const $element = __classPrivateFieldGet(this, _SelectComponent_$root, "f").getElementById('listbox');
    if ($element === null)
        throw new Error('Listbox element not found but required!');
    return $element;
}, _SelectComponent_states_get = function _SelectComponent_states_get() {
    return __classPrivateFieldGet(this, _SelectComponent_internals, "f").states;
}, _SelectComponent_listenInput = function _SelectComponent_listenInput() {
    __classPrivateFieldGet(this, _SelectComponent_passingCont, "f")?.abort();
    __classPrivateFieldSet(this, _SelectComponent_passingCont, new AbortController(), "f");
    const options = {
        capture: false,
        passive: true,
        signal: __classPrivateFieldGet(this, _SelectComponent_passingCont, "f").signal,
    };
    __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get).addEventListener('beforeinput', (e) => __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_passEventAlong).call(this, e), options);
    __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get).addEventListener('input', (e) => {
        __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_onInput).call(this, e);
        __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_passEventAlong).call(this, e);
    }, options);
    return __classPrivateFieldGet(this, _SelectComponent_passingCont, "f");
}, _SelectComponent_onInput = function _SelectComponent_onInput(event_) {
    const { label, value } = this.options[__classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get).selectedIndex];
    __classPrivateFieldGet(this, _SelectComponent_internals, "f").setFormValue(value);
    __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$status_get).innerText = label ?? '';
    value !== null && this.hidePicker();
}, _SelectComponent_listenFocus = function _SelectComponent_listenFocus() {
    __classPrivateFieldGet(this, _SelectComponent_focusCont, "f")?.abort();
    __classPrivateFieldSet(this, _SelectComponent_focusCont, new AbortController(), "f");
    const options = {
        signal: __classPrivateFieldGet(this, _SelectComponent_focusCont, "f").signal,
    };
    this.addEventListener('focus', (e) => __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_onFocus).call(this, e), options);
    this.addEventListener('blur', (e) => __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_onBlur).call(this, e), options);
    return __classPrivateFieldGet(this, _SelectComponent_focusCont, "f");
}, _SelectComponent_onBlur = function _SelectComponent_onBlur(event) {
    this.hidePicker();
    __classPrivateFieldGet(this, _SelectComponent_interCont, "f")?.abort();
    __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_log).call(this, `event:${event.type}`);
}, _SelectComponent_onFocus = function _SelectComponent_onFocus(event) {
    __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_listenInteraction).call(this);
    __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_log).call(this, `event:${event.type}`);
}, _SelectComponent_listenInteraction = function _SelectComponent_listenInteraction() {
    __classPrivateFieldGet(this, _SelectComponent_interCont, "f")?.abort();
    __classPrivateFieldSet(this, _SelectComponent_interCont, new AbortController(), "f");
    const options = {
        capture: false,
        passive: true,
        signal: __classPrivateFieldGet(this, _SelectComponent_interCont, "f").signal,
    };
    __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get).addEventListener('animationend', (e) => __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_onAnimationEnd).call(this, e), options);
    this.addEventListener('click', (e) => __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_onClick).call(this, e), options);
    this.addEventListener('keydown', (e) => __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_onKeyDown).call(this, e), options);
    return __classPrivateFieldGet(this, _SelectComponent_interCont, "f");
}, _SelectComponent_onAnimationEnd = function _SelectComponent_onAnimationEnd(event) {
    __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).delete(ComponentState.Animation);
    if (__classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_states_get).has(ComboboxState.Expanded))
        __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get).focus();
    else
        __classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$button_get).focus();
    __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_log).call(this, `event:${event.type}`);
}, _SelectComponent_onClick = function _SelectComponent_onClick(event) {
    this.expanded ? this.hidePicker() : this.showPicker();
    __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_log).call(this, `event:${event.type}`);
}, _SelectComponent_onKeyDown = function _SelectComponent_onKeyDown(event) {
    switch (event.key) {
        case 'ArrowDown':
        case 'Enter':
            this.showPicker();
            break;
        case 'ArrowUp':
        case 'Escape':
            this.hidePicker();
            break;
        default:
            return;
    }
    __classPrivateFieldGet(this, _SelectComponent_instances, "m", _SelectComponent_log).call(this, `event:${event.type}`, __classPrivateFieldGet(this, _SelectComponent_$root, "f").activeElement);
}, _SelectComponent_listenMutations = function _SelectComponent_listenMutations() {
    __classPrivateFieldGet(this, _SelectComponent_observer, "f")?.disconnect();
    __classPrivateFieldSet(this, _SelectComponent_observer, new MutationObserver((mutationList) => mutationList.forEach((mutation) => {
        if (mutation.type === 'attributes') {
            const { attributeName } = mutation;
            const attributeValue = attributeName
                ? mutation.target.getAttribute(attributeName)
                : null;
            if (attributeName && attributeValue) {
                this.setAttribute(attributeName, attributeValue);
            }
            else if (attributeName) {
                this.removeAttribute(attributeName);
            }
        }
    })), "f");
    __classPrivateFieldGet(this, _SelectComponent_observer, "f").observe(__classPrivateFieldGet(this, _SelectComponent_instances, "a", _SelectComponent_$listbox_get), {
        attributes: true,
        attributeFilter: ['aria-activedescendant', 'aria-owns'],
    });
    return this;
}, _SelectComponent_log = function _SelectComponent_log(label, ...args) {
    console.groupCollapsed(`SelectComponent: ${label}`);
    args.length > 0 && console.log('Arguments: ', args);
    console.debug(__classPrivateFieldGet(this, _SelectComponent_internals, "f"));
    console.dir(this);
    console.groupEnd();
}, _SelectComponent_passEventAlong = function _SelectComponent_passEventAlong(shadowEvent) {
    const { bubbles, data, type } = shadowEvent;
    const EventConstructor = Object.getPrototypeOf(shadowEvent).constructor;
    const event = new EventConstructor(type, { bubbles, data });
    this.dispatchEvent(event);
    return this;
};
SelectComponent.formAssociated = true;
SelectComponent.role = 'combobox';
SelectComponent.tagName = 'c-select';
SelectComponent.observedAttributes = [
    'aria-disabled',
    'aria-expanded',
    'aria-multiselectable',
    'aria-required',
];
customElements.define(SelectComponent.tagName, SelectComponent);
const index = customElements.get(SelectComponent.tagName);

export { ListboxElement, SelectComponent, index as default };
