import checkFalsy from '#library/fn.checkFalsy'
import checkTruth from '#library/fn.checkTruth'
import initShadowRoot from '#library/fn.initShadowRoot'
import updateAttributes from '#library/fn.updateAttributes'

import { ComboboxState, ComponentState, FieldState } from '#settings'
import { ListboxElement, type Option } from '#element/Listbox/index'

import template from './template.pug'

type InitAttributesOptions = {
	shadowRoot?: ShadowRoot
	internals?: ElementInternals
}

type InitAccessibilityTreeOptions = {
	$listbox: ListboxElement
	$status: HTMLElement
	internals: ElementInternals
}

class SelectComponent extends HTMLElement {
	#$root: ShadowRoot
	#internals: ElementInternals = this.attachInternals()
	#observer: MutationObserver | undefined

	#focusCont: AbortController
	#interCont: AbortController
	#passingCont: AbortController
	#slotChangeCont: AbortController

	static formAssociated = true
	static role = 'combobox'
	static tagName = 'c-select'

	static observedAttributes = [
		'aria-disabled',
		'aria-expanded',
		'aria-multiselectable',
		'aria-required',
	]

	static initAttributes(
		element: SelectComponent,
		options: InitAttributesOptions,
	) {
		const data = {
			'aria-atomic': true,
			'aria-expanded': false,
			exportparts: element.getAttribute('exportparts'),
			id: element.id,
			role: this.role,
			tabIndex: <number>element.tabIndex,
		}

		const { internals, shadowRoot } = options

		// [exportparts]

		if (checkFalsy(data.exportparts) && shadowRoot instanceof ShadowRoot) {
			const $$parts = shadowRoot.querySelectorAll('[part]')

			if ($$parts.length) {
				data.exportparts = Array.from($$parts)
					.map(($elem) => $elem.part.toString())
					.join(' ')
			}
		}

		// [id]

		if (checkFalsy(data.id) && element.isConnected) {
			data.id = [this.role, Math.round(performance.now())].join('-')
		}

		// [tabindex]

		if (
			element.isConnected &&
			data.tabIndex < 0 &&
			internals instanceof ElementInternals &&
			internals.form instanceof HTMLElement
		) {
			data.tabIndex = 0
		}

		return updateAttributes(element, data)
	}

	static initAccessibilityTree(
		element: SelectComponent,
		options: InitAccessibilityTreeOptions,
	) {
		const { internals, $listbox, $status } = options

		// Properties

		internals.ariaAtomic = 'true'
		internals.ariaHasPopup = 'listbox'
		internals.ariaLive = 'polite'
		internals.role = this.role

		// States

		internals.ariaDisabled = checkTruth(element.ariaDisabled).toString()
		internals.ariaExpanded = checkTruth(element.ariaExpanded).toString()
		internals.ariaRequired = checkTruth(element.ariaRequired).toString()
		internals.ariaMultiSelectable = checkTruth(
			element.ariaMultiSelectable,
		).toString()

		$listbox.ariaMultiSelectable = internals.ariaMultiSelectable
		$status.ariaLabel = element.ariaLabel
		$status.ariaPlaceholder = element.ariaPlaceholder
	}

	constructor() {
		super()
		this.#$root = initShadowRoot.call(this, {
			template,
			delegatesFocus: true,
		})
		SelectComponent.initAttributes(this, {
			shadowRoot: this.#$root,
		})
		this.#states.add(ComponentState.Defined)
	}

	attributeChangedCallback(name, previous, current) {
		if (false === this.isConnected) return
		if (previous === current) return

		const isTruth = checkTruth(current)
		const isFalsy = checkFalsy(current)

		switch (name) {
			case 'aria-disabled':
				if (isTruth) {
					this.#states.add(FieldState.Disabled)
					this.#interCont?.abort()
				} else {
					this.#states.delete(FieldState.Disabled)
				}
				this.#internals.ariaDisabled = isTruth.toString()
				break
			case 'aria-expanded':
				this.#states.delete(
					isFalsy ? ComboboxState.Expanded : ComboboxState.Collapsed,
				)
				this.#states.add(
					isTruth ? ComboboxState.Expanded : ComboboxState.Collapsed,
				)
				this.#internals.ariaExpanded = isTruth.toString()
				break
			case 'aria-multiselectable':
				this.#internals.ariaMultiSelectable = isTruth.toString()
				break
			default:
		}

		this.#log('Attribute Changed', name, previous, current)
	}

	connectedCallback() {
		// (1)
		SelectComponent.initAttributes(this, {
			internals: this.#internals,
		})
		SelectComponent.initAccessibilityTree(this, {
			$listbox: this.#$listbox,
			$status: this.#$status,
			internals: this.#internals,
		})

		// (2)
		this.#listenFocus()
		this.#listenInput()
		this.#listenMutations()
		this.#states.add(ComponentState.Interactive)

		// (3)
		const link = this.#$root.querySelector('link')
		link && (link.onload = () => this.#states.add(ComponentState.Loaded))

		this.#log('Connected Callback')
	}

	disconnectedCallback() {
		this.#focusCont?.abort()
		this.#interCont?.abort()
		this.#observer?.disconnect()
		this.#passingCont?.abort()
		this.#slotChangeCont?.abort()
	}

	hidePicker() {
		if (this.#states.has(ComboboxState.Collapsed)) return this
		updateAttributes(this, 'aria-expanded', false)
		this.#$button.focus()
		return this
	}

	showPicker() {
		if (this.#states.has(ComboboxState.Expanded)) return this
		updateAttributes(this, 'aria-expanded', true)
		this.#$listbox.focus()
		return this
	}

	get disabled(): boolean {
		return (
			this.#states.has(FieldState.Disabled) &&
			checkTruth(this.#internals.ariaDisabled) &&
			checkTruth(this.ariaDisabled)
		)
	}

	get expanded(): boolean {
		return (
			this.#states.has(ComboboxState.Expanded) &&
			checkTruth(this.#internals.ariaExpanded) &&
			checkTruth(this.ariaExpanded)
		)
	}

	get multiple(): boolean {
		return checkTruth(this.#internals.ariaMultiSelectable)
	}

	get name(): string | null {
		return (this.dataset.name || this.getAttribute('name')) ?? null
	}

	get options(): Option[] {
		return this.#$listbox.options
	}

	get readonly(): boolean {
		return checkTruth(this.#internals.ariaReadOnly)
	}

	get required(): boolean {
		return checkTruth(this.#internals.ariaRequired)
	}

	get length(): number {
		return this.#$listbox.length
	}

	get type(): string {
		return 'select' + (this.multiple ? '-multiple' : '-one')
	}

	get value(): string | string[] | null {
		return this.#$listbox.value
	}

	get #$button(): HTMLElement | never {
		const $element = this.#$root.getElementById('button')
		if ($element === null)
			throw new Error('Button element not found but required!')
		return $element
	}

	get #$status(): HTMLElement | never {
		const $element = this.#$root.getElementById('status')
		if ($element === null)
			throw new Error(
				'Element of the selected content not found but required!',
			)
		return $element
	}

	get #$listbox(): ListboxElement | never {
		const $element = this.#$root.getElementById('listbox') as ListboxElement
		if ($element === null)
			throw new Error('Listbox element not found but required!')
		return $element
	}

	get #states(): CustomStateSet {
		return this.#internals.states
	}

	#listenInput(): AbortController {
		this.#passingCont?.abort()
		this.#passingCont = new AbortController()

		const options = {
			capture: false,
			passive: true,
			signal: this.#passingCont.signal,
		}

		this.#$listbox.addEventListener(
			'beforeinput',
			(e) => this.#passEventAlong(e),
			options,
		)

		this.#$listbox.addEventListener(
			'input',
			(e: InputEvent) => {
				this.#onInput(e)
				this.#passEventAlong(e)
			},
			options,
		)

		return this.#passingCont
	}

	#onInput(event_: InputEvent) {
		const { label, value } = this.options[this.#$listbox.selectedIndex]
		this.#internals.setFormValue(value)
		this.#$status.innerText = label ?? ''
		value !== null && this.hidePicker()
	}

	#listenFocus(): AbortController {
		this.#focusCont?.abort()
		this.#focusCont = new AbortController()

		const options = {
			signal: this.#focusCont.signal,
		}

		this.addEventListener('focus', (e) => this.#onFocus(e), options)
		this.addEventListener('blur', (e) => this.#onBlur(e), options)

		return this.#focusCont
	}

	#onBlur(event: FocusEvent) {
		this.hidePicker()
		this.#interCont?.abort()
		this.#log(`event:${event.type}`)
	}

	#onFocus(event: FocusEvent) {
		this.#listenInteraction()
		this.#log(`event:${event.type}`)
	}

	#listenInteraction(): AbortController {
		this.#interCont?.abort()
		this.#interCont = new AbortController()

		const options = {
			capture: false,
			passive: true,
			signal: this.#interCont.signal,
		}

		this.#$listbox.addEventListener(
			'animationend',
			(e) => this.#onAnimationEnd(e),
			options,
		)

		this.addEventListener('click', (e) => this.#onClick(e), options)
		this.addEventListener('keydown', (e) => this.#onKeyDown(e), options)

		return this.#interCont
	}

	#onAnimationEnd(event: AnimationEvent) {
		this.#states.delete(ComponentState.Animation)
		if (this.#states.has(ComboboxState.Expanded)) this.#$listbox.focus()
		else this.#$button.focus()
		this.#log(`event:${event.type}`)
	}

	#onClick(event: MouseEvent) {
		this.expanded ? this.hidePicker() : this.showPicker()
		this.#log(`event:${event.type}`)
	}

	#onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
			case 'Enter':
				this.showPicker()
				break
			case 'ArrowUp':
			case 'Escape':
				this.hidePicker()
				break
			default:
				return
		}

		this.#log(`event:${event.type}`, this.#$root.activeElement)
	}

	#listenMutations(): this {
		this.#observer?.disconnect()

		this.#observer = new MutationObserver((mutationList) =>
			mutationList.forEach((mutation) => {
				if (mutation.type === 'attributes') {
					const { attributeName } = mutation
					const attributeValue = attributeName
						? (mutation.target as HTMLElement).getAttribute(
							attributeName,
						)
						: null

					if (attributeName && attributeValue) {
						this.setAttribute(attributeName, attributeValue)
					} else if (attributeName) {
						this.removeAttribute(attributeName)
					}
				}
			}),
		)

		this.#observer.observe(this.#$listbox, {
			attributes: true,
			attributeFilter: ['aria-activedescendant', 'aria-owns'],
		})

		return this
	}

	#log(label: string, ...args) {
		console.groupCollapsed(`SelectComponent: ${label}`)
		args.length > 0 && console.log('Arguments: ', args)
		console.debug(this.#internals)
		console.dir(this)
		console.groupEnd()
	}

	#passEventAlong(shadowEvent: InputEvent): this {
		const { bubbles, data, type } = shadowEvent
		const EventConstructor = Object.getPrototypeOf(shadowEvent).constructor
		const event = new EventConstructor(type, { bubbles, data })
		this.dispatchEvent(event)
		return this
	}
}

customElements.define(SelectComponent.tagName, SelectComponent)

export { ListboxElement, SelectComponent }
export default customElements.get(SelectComponent.tagName)
