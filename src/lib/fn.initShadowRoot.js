const shadowModeByDefault =
	typeof SHADOW_MODE === 'undefined' ? 'closed' : SHADOW_MODE

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
export default function initShadowRoot(options) {
	const {
		$template,
		template,
		delegatesFocus = false,
		mode = shadowModeByDefault,
		serializable = false,
	} = options

	/** @type {ShadowRoot} */
	const shadowRoot = this.attachShadow({
		delegatesFocus,
		mode,
		serializable,
	})

	// 1.

	if (DocumentFragment.prototype.isPrototypeOf($template))
		shadowRoot.appendChild($template.cloneNode(true))

	// 2.

	if (typeof template === 'string') shadowRoot.innerHTML = template

	return shadowRoot
}
