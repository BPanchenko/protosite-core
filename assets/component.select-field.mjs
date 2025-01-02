const template = "<link href=\"http://assets.protosite.rocks/core/select-field.css\" rel=\"stylesheet\" type=\"text/css\"><style type=\"text/css\">:host(:state(--defined)) {\n\tcontent-visibility: hidden;\n}\n:host(:state(--loaded)) {\n\tcontent-visibility: visible;\n}</style><div aria-controls=\"listbox_popover\" id=\"button\" role=\"button\" tabindex=\"0\"><div part=\"selectedcontent\" role=\"status\"></div></div><div aria-labelledby=\"button\" id=\"listbox_popover\" role=\"listbox\" part=\"listbox\" tabindex=\"0\"><slot></slot></div>";

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

const checkTruth = (value) => {
    return typeof value === 'string'
        ? ['on', 'true'].includes(value.trim().toLocaleLowerCase())
        : Boolean(value);
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

const tagName = 'c-select-field';

/** @typedef {'--defined' | '--interactive' | '--loaded' } ComponentReadyState */
/** @typedef {'collapsed' | 'expanded'} ListBoxState */
/** @typedef {ComponentReadyState | ListBoxState } SelectFieldState */

/** @typedef {{ $element: HTMLElement, label: string, value: string }} Option */
/** @typedef {Map<WeakRef<Option['$element']>, Option>} OptionCollection */

class SelectField extends HTMLElement {
	/** @type {AbortController} */
	#focusCont

	/** @type {AbortController} */
	#interCont

	/** @type {ElementInternals} */
	#internals = this.attachInternals()

	/** @type {OptionCollection} */
	#options = new Map()

	/** @type {AbortController} */
	#slotChangeCont

	static formAssociated = true
	static role = 'combobox'

	static observedAttributes = [
		'aria-disabled',
		'aria-expanded',
		'aria-label',
		'aria-multiselectable',
		'aria-placeholder',
		'aria-required',
		'name',
		'value',
	]

	/**
	 * @param {SelectField} element
	 * @param {Object} [options]
	 * @param {ElementInternals} [options.internals]
	 * @param {ShadowRoot} [options.shadowRoot]
	 */
	static initAttributes(element, { internals, shadowRoot }) {
		const data = {
			'aria-atomic': true,
			'aria-expanded': false,
			role: SelectField.role,
		};

		// [exportparts]

		if (
			false === element.hasAttribute('exportparts') &&
			shadowRoot instanceof ShadowRoot
		) {
			const $$parts = shadowRoot.querySelectorAll('[part]').values();

			if ($$parts.length) {
				data.exportparts = Array.from($$parts)
					.map(($elem) => $elem.part.toString())
					.join(', ');
			}
		}

		// [tabindex]

		if (
			element.isConnected &&
			element.tabIndex < 0 &&
			internals instanceof ElementInternals &&
			internals.form instanceof HTMLElement
		) {
			data.tabindex = 0;
		}

		return updateAttributes(element, data)
	}

	/**
	 * @param {SelectField} element
	 * @param {Object} [options]
	 * @param {ElementInternals} [options.internals]
	 * @param {ShadowRoot} [options.shadowRoot_]
	 */
	static initAccessibilityTree(element, { internals, shadowRoot_ }) {
		internals.ariaAtomic = true;
		internals.ariaLive = 'polite';
		internals.role = SelectField.role;

		internals.ariaDisabled = element.ariaDisabled === 'true';
		internals.ariaExpanded = element.ariaExpanded === 'true';
		internals.ariaRequired = element.ariaRequired === 'true';
		internals.ariaHasPopup = 'listbox';
		internals.ariaMultiSelectable = element.ariaMultiSelectable === 'true';
	}

	constructor() {
		super();
		initShadowRoot.call(this, {
			template,
			delegatesFocus: true,
		});
		SelectField.initAttributes(this, {
			shadowRoot: this.#$root,
		});
		this.#listenAssignedNodes();
		this.#states.add('--defined');
	}

	connectedCallback() {
		// (1)
		SelectField.initAttributes(this, {
			internals: this.#internals,
		});
		SelectField.initAccessibilityTree(this, {
			internals: this.#internals,
		});

		// (2)
		this.#listenFocus();
		this.#states.add('--interactive');

		// (3)
		this.#$root.querySelector('link').onload = () =>
			this.#states.add('--loaded');
	}

	disconnectedCallback() {
		this.#interCont?.abort();
		this.#focusCont?.abort();
		this.#slotChangeCont?.abort();
	}

	adoptedCallback() {}

	attributeChangedCallback(name, previous, updated) {
		if (false === this.isConnected) return
		if (previous === updated) return

		const isTruth = checkTruth(updated);

		switch (name) {
			case 'aria-disabled':
				if (isTruth) {
					this.#states.add('disabled');
					this.#interCont?.abort();
				} else {
					this.#states.delete('disabled');
				}
				this.#internals.ariaDisabled = updated;
				break
			case 'aria-expanded':
				this.#states.add(isTruth ? 'expanded' : 'collapsed');
				this.#internals.ariaExpanded = updated;
				break
			case 'aria-label':
				this.#internals.ariaLabel = updated;
				this.#$status.ariaLabel = updated;
				break
			case 'aria-placeholder':
				this.#internals.ariaPlaceholder = updated;
				this.#$status.ariaPlaceholder = updated;
				break
			case 'value':
				this.value = updated;
				break
		}
	}

	formAssociatedCallback(form_) {}
	formDisabledCallback(disabled) {
		this.setAttribute('aria-disabled', disabled);
	}
	formResetCallback() {}
	formStateRestoreCallback(state, reason_) {
		this.value = state;
	}

	collapse() {
		this.#states.delete('expanded');
		updateAttributes(this, 'aria-expanded', false);
	}

	expand() {
		this.#states.delete('collapsed');
		updateAttributes(this, 'aria-expanded', true);
	}

	/**
	 * @param {HTMLElement | string} value
	 * @returns {boolean}
	 */
	select(value) {
		let option;
		if (value instanceof HTMLElement) {
			option = this.#options.get(value);
		} else if (typeof value === 'string') {
			option = this.#findByValue(value);
		}
		return Boolean(option) && this.#selectElement(option.$element)
	}

	/**
	 * @param {HTMLElement} $element
	 */
	#selectElement($element) {
		const attribute = this.multiple ? 'aria-checked' : 'aria-selected';
		$element.setAttribute(attribute, true);
	}

	/** @type {boolean} */
	get disabled() {
		return (
			this.#states.has('disabled') &&
			checkTruth(this.#internals.ariaDisabled) &&
			checkTruth(this.ariaDisabled)
		)
	}

	/** @type {boolean} */
	get expanded() {
		return (
			this.#states.has('expanded') &&
			checkTruth(this.#internals.ariaExpanded) &&
			checkTruth(this.ariaExpanded)
		)
	}

	/** @type {boolean} */
	get multiple() {
		return checkTruth(this.#internals.ariaMultiSelectable)
	}

	/** @type {MapIterator<Option>} */
	get options() {
		return this.#options.values()
	}

	/** @type {boolean} */
	get readonly() {
		return checkTruth(this.#internals.ariaReadOnly)
	}

	/** @type {number} */
	get size() {
		return this.#options.size
	}

	/** @type {string} */
	get value() {
		return this.#internals.ariaValueNow
	}

	/** @param {string} updated */
	set value(updated) {
		this.#internals.ariaValueNow = updated;

		this.dispatchEvent(new Event('change'));
	}

	/** @type {HTMLElement} */
	get #$button() {
		return this.#$root.querySelector('[role=button]')
	}

	/** @type {HTMLElement} */
	get #$status() {
		return this.#$button.querySelector('[role=status]')
	}

	/** @type {HTMLElement} */
	get #$listbox() {
		return this.#$root.querySelector('[role=listbox]')
	}

	/** @type {CustomStateSet} */
	get #$root() {
		return this.#internals.shadowRoot
	}

	/** @type {CustomStateSet} */
	get #states() {
		return this.#internals.states
	}

	/**
	 * Сall will find the first option wich value is fully equal to the query string.
	 *
	 * @param {string} query
	 * @returns {Option | null}
	 */
	#findByValue(query) {
		for (const option of this.options)
			if (query === option.value) return option
		return null
	}

	/** @returns {AbortController} */
	#listenAssignedNodes() {
		this.#slotChangeCont?.abort();
		this.#slotChangeCont = new AbortController();

		/** @type {OptionCollection} */
		const list = this.#options;

		/** @param {OptionCollection} list */
		const cleanup = (list) =>
			list.forEach(
				({ $element }, $ref, map) =>
					($element.isConnected && $element.parentElement === this) ||
					map.delete($ref),
			);

		this.#$listbox.children[0].addEventListener(
			'slotchange',
			(event) => {
				const $$elements = event.target.assignedElements();
				for (const $element of $$elements)
					if (
						$element.hasAttribute('role') &&
						$element.role === 'option'
					) {
						const $ref = new WeakRef($element);
						const label = $element.ariaLabel || $element.textContent;
						list.set($ref, {
							$element,
							label,
							value:
								$element.value ||
								$element.dataset.value ||
								label,
						});
					} else $element.remove();
				cleanup(list);
			},
			{
				signal: this.#slotChangeCont.signal,
			},
		);

		return this.#slotChangeCont
	}

	/** @returns {AbortController} */
	#listenFocus() {
		this.#focusCont?.abort();
		this.#focusCont = new AbortController();

		const options = {
			capture: false,
			passive: true,
			signal: this.#focusCont.signal,
		};

		this.addEventListener('focus', (event) => this.#onFocus(event), options);
		this.addEventListener(
			'focusin',
			(event) => this.#onFocusIn(event),
			options,
		);
		this.addEventListener('blur', (event) => this.#onBlur(event), options);
		this.addEventListener(
			'focusout',
			(event) => this.#onFocusOut(event),
			options,
		);

		return this.#focusCont
	}

	/** @returns {AbortController} */
	#listenInteraction() {
		this.#interCont?.abort();
		this.#interCont = new AbortController();

		const options = {
			capture: true,
			passive: false,
			signal: this.#interCont.signal,
		};

		this.#$button.addEventListener(
			'click',
			(event) => this.#onClickButton(event),
			options,
		);
		this.#$listbox.addEventListener(
			'click',
			(event) => this.#onClickListBox(event),
			options,
		);
		this.addEventListener(
			'keydown',
			(event) => this.#onKeyPress(event),
			options,
		);

		return this.#interCont
	}

	#onFocus(event) {
		this.#listenInteraction();

		this.#internals.ariaActiveDescendantElement = this.#$root.activeElement;

		// console.log('onFocus', this.#internals)
	}

	#onFocusIn(event_) {}

	#onBlur(event_) {}

	#onFocusOut(event_) {
		this.collapse();
		this.#interCont?.abort();
	}

	#onClickButton(event_) {
		this.#toggle();
	}

	#onClickListBox(event_) {}

	#onKeyPress(event) {
		const { key } = event;
		const $focused = this.#internals.ariaActiveDescendantElement;

		switch (key) {
			case 'Enter':
				if ($focused === this.#$button) {
					this.expand();
				}
				break
			case 'Backspace':
			case 'Escape':
				this.collapse();
				break
			case 'End':
				this.options[this.size - 1].focus();
				break
			case 'Home':
				this.options[0].focus();
				break
		}

		console.log('onKeyPress', key);
		console.dir($focused);
		console.dir(this.#internals);
	}

	/**
	 * Toggle the `aria-expanded` state
	 */
	#toggle() {
		this.expanded ? this.collapse() : this.expand();
	}

	/**
	 * Сall returns the first option for wich the query string is started substring of the label or value option.
	 *
	 * @param {string} query
	 * @returns {Option | null}
	 */
	#search(query) {
		for (const option of this.options)
			if (
				0 === option.label.indexOf(query) ||
				0 === option.value.indexOf(query)
			)
				return option
		return null
	}
}

customElements.define(tagName, SelectField);

const index = customElements.get(tagName);

export { SelectField, index as default, tagName };
