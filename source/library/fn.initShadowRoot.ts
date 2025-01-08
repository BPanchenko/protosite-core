type InitShadowRootOptions = {
	$template?: DocumentFragment
	template?: string
	delegatesFocus?: boolean
	serializable?: boolean
	mode?: ShadowRoot['mode']
	slotAssignment?: ShadowRoot['slotAssignment']
}

function initShadowRoot(this: HTMLElement, options: InitShadowRootOptions) {
	const {
		$template,
		template,
		delegatesFocus = false,
		mode = 'closed',
		serializable = false,
	} = options

	const shadowRoot = this.attachShadow({
		delegatesFocus,
		mode,
		serializable,
	})

	// 1.

	if ($template instanceof DocumentFragment)
		shadowRoot.appendChild($template.cloneNode(true))

	// 2.

	if (typeof template === 'string') shadowRoot.setHTMLUnsafe(template)

	return shadowRoot
}

export default initShadowRoot
