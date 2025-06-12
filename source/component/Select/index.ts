import checkFalsy from '#library/fn.checkFalsy'
import checkTruth from '#library/fn.checkTruth'
import initShadowRoot from '#library/fn.initShadowRoot'
import updateAttributes from '#library/fn.updateAttributes'
import CustomState from '#library/enum.custom-state'

import template from './template.pug'

import type { ListboxElement, Option } from '#element/Listbox/index'
import type { CustomElement } from '#types'

type InitAttributesOptions = {
	shadowRoot?: ShadowRoot
	internals?: ElementInternals
}

type InitAccessibilityTreeOptions = {
	$listbox: ListboxElement
	$status: HTMLElement
	internals: ElementInternals
}

class SelectComponent extends HTMLElement implements CustomElement {
	#$root: ShadowRoot
	#internals: ElementInternals = this.attachInternals()
	#observer: MutationObserver | undefined

	#focusCont: AbortController
	#interCont: AbortController
	#passingCont: AbortController
	#slotChangeCont: AbortController

	static readonly formAssociated = true
	static readonly role = 'combobox'
	static readonly tagName = 'c-select'

	static readonly observedAttributes = <const>[
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
		this.#states.add(CustomState.Defined)
	}

	attributeChangedCallback(
		name: string,
		previous: string | null,
		current: string | null,
	) {
		if (false === this.isConnected) return
		if (previous === current) return

		const isTruth = checkTruth(current)
		const isFalsy = checkFalsy(current)

		switch (name) {
			case 'aria-disabled':
				if (isTruth) {
					this.#states.add(CustomState.Disabled)
					this.#interCont?.abort()
				} else {
					this.#states.delete(CustomState.Disabled)
				}
				this.#internals.ariaDisabled = isTruth.toString()
				break
			case 'aria-expanded':
				this.#states.delete(
					isFalsy ? CustomState.Expanded : CustomState.Collapsed,
				)
				this.#states.add(
					isTruth ? CustomState.Expanded : CustomState.Collapsed,
				)
				this.#internals.ariaExpanded = isTruth.toString()
				this.#updateChildNodes()
				break
			case 'aria-multiselectable':
				this.#internals.ariaMultiSelectable = isTruth.toString()
				break
			default:
		}
	}

	connectedCallback() {
		// (1)
		SelectComponent.initAttributes(this, {
			internals: this.#internals,
		})
		SelectComponent.initAccessibilityTree(this, {
			$listbox: this.#$picker,
			$status: this.#$status,
			internals: this.#internals,
		})

		// (2)
		this.#listenFocus()
		this.#listenInput()
		this.#listenMutations()
		this.#states.add(CustomState.Interactive)

		// (3)
		const link = this.#$root.querySelector('link')
		link && (link.onload = () => this.#states.add(CustomState.Loaded))
	}

	disconnectedCallback() {
		this.#focusCont?.abort()
		this.#interCont?.abort()
		this.#observer?.disconnect()
		this.#passingCont?.abort()
		this.#slotChangeCont?.abort()
	}

	formResetCallback() {
		this.#$picker.formResetCallback()
	}

	hidePicker() {
		if (this.#states.has(CustomState.Collapsed)) return
		updateAttributes(this, 'aria-expanded', false)
	}

	showPicker() {
		if (this.#states.has(CustomState.Expanded)) return
		updateAttributes(this, 'aria-expanded', true)
	}

	get disabled(): boolean {
		return (
			this.#states.has(CustomState.Disabled) &&
			checkTruth(this.#internals.ariaDisabled) &&
			checkTruth(this.ariaDisabled)
		)
	}

	get expanded(): boolean {
		return (
			this.#states.has(CustomState.Expanded) &&
			checkTruth(this.#internals.ariaExpanded) &&
			checkTruth(this.ariaExpanded)
		)
	}

	get multiple(): boolean {
		return checkTruth(this.#internals.ariaMultiSelectable)
	}

	get name(): string {
		return (this.dataset.name || this.getAttribute('name')) ?? ''
	}

	get options(): Option[] {
		return this.#$picker.options
	}

	get readonly(): boolean {
		return checkTruth(this.#internals.ariaReadOnly)
	}

	get required(): boolean {
		return checkTruth(this.#internals.ariaRequired)
	}

	get length(): number {
		return this.#$picker.length
	}

	get type(): string {
		return 'select' + (this.multiple ? '-multiple' : '-one')
	}

	get value(): string | string[] | null {
		return this.#$picker.value
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

	get #$picker(): ListboxElement | never {
		const $element = this.#$root.getElementById('picker') as ListboxElement
		if ($element === null)
			throw new Error('Listbox element not found but required!')
		return $element
	}

	get #states(): CustomStateSet {
		return this.#internals.states
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

	#onBlur(_event: FocusEvent) {
		this.hidePicker()
		this.#interCont?.abort()
	}

	#onFocus(_event: FocusEvent) {
		this.#listenInteraction()
	}

	#listenInput(): AbortController {
		this.#passingCont?.abort()
		this.#passingCont = new AbortController()

		const options = {
			capture: false,
			passive: true,
			signal: this.#passingCont.signal,
		}

		this.#$picker.addEventListener(
			'beforeinput',
			(e) => this.#passEventAlong(e),
			options,
		)

		this.#$picker.addEventListener(
			'input',
			(e: InputEvent) => {
				this.#onInput(e)
				this.#passEventAlong(e)
			},
			options,
		)

		return this.#passingCont
	}

	#onInput(_event: InputEvent) {
		const { label = null, value = null } =
			this.options[this.#$picker.selectedIndex] ?? {}
		this.#internals.setFormValue(value)
		this.#$status.innerText = label ?? ''
		value !== null && this.hidePicker()
	}

	#listenInteraction(): AbortController {
		this.#interCont?.abort()
		this.#interCont = new AbortController()

		const options = {
			capture: false,
			passive: true,
			signal: this.#interCont.signal,
		}

		this.addEventListener('click', (e) => this.#onClick(e), options)
		this.addEventListener('keydown', (e) => this.#onKeyDown(e), options)
		this.#listenPickerAnimation(this.#interCont.signal)

		return this.#interCont
	}

	#onClick(_event: MouseEvent) {
		this.expanded ? this.hidePicker() : this.showPicker()
	}

	#onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
			case 'Enter':
				this.showPicker()
				break
			case 'ArrowUp':
			case 'Escape':
				this.#$button.focus()
				this.hidePicker()
				break
			default:
				return
		}
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

		this.#observer.observe(this.#$picker, {
			attributes: true,
			attributeFilter: ['aria-activedescendant', 'aria-owns'],
		})

		return this
	}

	#listenPickerAnimation(signal?: AbortSignal): void {
		this.#$picker.addEventListener(
			'animationend',
			(e) => this.#onAnimationEnd(e),
			{
				signal,
			},
		)
	}

	#onAnimationEnd(_event: AnimationEvent) {
		this.#states.delete(CustomState.Animation)
		this.#updateChildNodes()
	}

	#passEventAlong(shadowEvent: InputEvent): this {
		const { bubbles, data, type } = shadowEvent
		const EventConstructor = Object.getPrototypeOf(shadowEvent).constructor
		const event = new EventConstructor(type, { bubbles, data })
		this.dispatchEvent(event)
		return this
	}

	#updateChildNodes(): void {
		const expanded = this.#states.has(CustomState.Expanded)
		const collapsed = this.#states.has(CustomState.Collapsed)

		if (expanded) {
			this.#$picker.focus()
			this.#$picker.updateScrollbar()
		} else {
			this.#$button.focus()
		}

		this.#$picker.ariaHidden = collapsed.toString()
	}
}

export type { Option, SelectComponent }
export default SelectComponent
