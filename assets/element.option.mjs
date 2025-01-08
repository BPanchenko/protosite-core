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

class OptionElement extends HTMLElement {
    static initAttributes($element) {
        const data = {
            'aria-selected': $element.ariaSelected ?? 'false',
            id: $element.id,
            role: this.role,
        };
        if ($element.isConnected && false === Boolean(data.id)) {
            data.id = [this.role, Math.round(performance.now())].join('-');
        }
        return updateAttributes($element, data);
    }
    constructor() {
        super();
        OptionElement.initAttributes(this);
    }
    connectedCallback() {
        OptionElement.initAttributes(this);
    }
    get label() {
        return this.ariaLabel || this.textContent;
    }
    get value() {
        return this.dataset.value || this.getAttribute('value');
    }
}
OptionElement.oberverAttributes = [
    'aria-busy',
    'aria-checked',
    'aria-disabled',
    'aria-hidden',
    'aria-invalid',
    'aria-label',
    'aria-labelledby',
    'aria-posinset',
    'aria-selected',
    'aria-setsize',
    'data-value',
    'value',
];
OptionElement.role = 'option';
OptionElement.tagName = 'e-option';
customElements.define(OptionElement.tagName, OptionElement);
const Option = customElements.get(OptionElement.tagName);

export { OptionElement, Option as default };
