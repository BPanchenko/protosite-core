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
 * @param {Record<string, boolean | number | string> | string} objectOrAttrName List of key-value pairs that represent HTML attributes of the element
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
			? element.removeAttribute(String(key))
			: value instanceof Attr
				? element.setAttributeNode(value)
				: typeof key === 'string'
					? element.hasAttribute(key)
						? (element.getAttributeNode(key).value = String(value))
						: element.setAttribute(key, String(value))
					: undefined,
	);

	return new Map(
		element
			.getAttributeNames()
			.sort()
			.map((name) => [name, element.getAttributeNode(name)]),
	)
};

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
