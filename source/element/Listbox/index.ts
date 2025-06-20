import startsWith from 'lodash/startsWith'
import checkFalsy from '#library/fn.checkFalsy'
import checkTruth from '#library/fn.checkTruth'
import generateID from '#library/fn.generateID'
import initShadowRoot from '#library/fn.initShadowRoot'
import updateAttributes from '#library/fn.updateAttributes'

import CustomState from '#library/enum.custom-state'

import template from './template.pug'

interface Option {
	$ref: WeakRef<HTMLElement>
	label: string | null
	value: string | null
}

const optionStartsWith = ({ label, value }: Option, search: string): boolean =>
	(typeof label === 'string' && startsWith(label, search)) ||
	(typeof value === 'string' && startsWith(value, search))

class ListboxElement extends HTMLElement {
	#activeIndex: number = -1
	#selectedIndex: number = -1
	#selectedIndexByDefault: number = -1

	#internals: ElementInternals = this.attachInternals()
	#hashmap: Map<string, Option> = new Map()
	#ownsIDs: string[] | null = null

	#focusCont: AbortController
	#interCont: AbortController
	#slotChangeCont: AbortController

	ariaActiveDescendantElement: HTMLElement | null = null

	static readonly formAssociated = true
	static readonly role = 'listbox'
	static readonly tagName = 'e-listbox'

	static readonly observedAttributes = <const>[
		'aria-activedescendant',
		'aria-disabled',
		'aria-multiselectable',
		'aria-required',
	]

	static initAttributes($element: ListboxElement) {
		const attrs = {
			'aria-orientation': $element.ariaOrientation ?? 'vertical',
			exportparts: 'container',
			role: this.role,
		}
		return updateAttributes($element, attrs)
	}

	static initAccessibilityTree(
		element: ListboxElement,
		internals: ElementInternals,
	) {
		internals.ariaAtomic = 'true'
		internals.ariaLive = 'polite'
		internals.role = this.role

		internals.ariaDisabled = checkTruth(element.ariaDisabled).toString()
		internals.ariaOrientation = element.ariaOrientation
		internals.ariaMultiSelectable = checkTruth(
			element.ariaMultiSelectable,
		).toString()
		internals.ariaRequired = checkTruth(element.ariaRequired).toString()
	}

	constructor() {
		super()
		initShadowRoot.call(this, {
			template,
		})
		ListboxElement.initAttributes(this)
		this.#listenAssignedNodes()
		this.#states.add(CustomState.Defined)
	}

	attributeChangedCallback(name, previous, current) {
		if (false === this.isConnected) return
		if (previous === current) return

		const $element =
			(this.#hashmap.has(current) &&
				this.#hashmap.get(current)?.$ref.deref()) ||
			null
		const isTruth = checkTruth(current)

		switch (name) {
			case 'aria-activedescendant':
				// @ts-ignore
				this.#internals.ariaActiveDescendantElement = $element
				break
			case 'aria-disabled':
				if (isTruth) {
					this.#states.add(CustomState.Disabled)
					this.#interCont?.abort()
				} else {
					this.#states.delete(CustomState.Disabled)
				}
				this.#internals.ariaDisabled = current
				break
			case 'aria-multiselectable':
				this.#internals.ariaMultiSelectable = isTruth.toString()
				break
			case 'aria-required':
				this.#internals.ariaRequired = isTruth.toString()
				break
			default:
		}
	}

	connectedCallback() {
		ListboxElement.initAttributes(this)
		ListboxElement.initAccessibilityTree(this, this.#internals)
		this.#listenFocus()
	}

	disconnectedCallback() {
		this.#interCont?.abort()
		this.#focusCont?.abort()
		this.#slotChangeCont?.abort()
	}

	formAssociatedCallback(_form) { }
	formDisabledCallback(_state) { }
	formResetCallback() {
		this.selectedIndex = this.#selectedIndexByDefault
	}
	formStateRestoreCallback(_state, _reason) { }

	/**
	 * Returns an first option wich value is fully equal to the query string.
	 */
	findByValue(query: string): Option | null {
		for (const [id_, option] of this.#hashmap) {
			if (query === option.value) return option
		}
		return null
	}

	/**
	 * Сall returns array of options for wich the query string is started substring of the label or value option.
	 * @todo Check requirements for returned result
	 */
	search(query: string) {
		const result = new Set<Option>()
		for (const [id_, option] of this.#hashmap)
			if (optionStartsWith(option, query)) result.add(option)
		return result.size > 0 ? result : null
	}

	select($element: HTMLElement | null): boolean
	select(identifier: string): boolean
	select(param: unknown): boolean {
		let $element: HTMLElement | undefined

		if (param instanceof HTMLElement) $element = param
		else if (typeof param === 'string') {
			const option = this.#hashmap.get(param)
			if (option !== undefined) $element = option.$ref.deref()
		}

		if ($element !== undefined) {
			return this.#selectElement($element)
		} else return false
	}

	shift(offset: number) {
		this.activeIndex =
			(((this.#activeIndex + offset) % this.length) + this.length) %
			this.length
		return this
	}

	updateScrollbar() {
		// 1. Scrollbar exist or not

		const isVertical = this.#internals.ariaOrientation === 'vertical'

		const clientSize = isVertical
			? this.#$container.clientHeight
			: this.#$container.clientWidth

		const scrollSize = isVertical
			? this.#$container.scrollHeight
			: this.#$container.scrollWidth

		const hasScrollBar = scrollSize > clientSize

		if (hasScrollBar) this.#states.add(CustomState.Scrolled)
		else this.#states.delete(CustomState.Scrolled)
	}

	#initOptionAttributes($element: HTMLElement) {
		const attrs = {
			'aria-selected': $element.ariaSelected ?? 'false',
			id: $element.id,
		}

		// [id]

		if (false === Boolean(attrs.id)) {
			attrs.id = generateID({
				prefix: 'option',
				checklist: this.#ownsIDs,
			})
		}

		// [onclick]

		$element.onclick = (event: MouseEvent) => this.#onClick(event)

		return updateAttributes($element, attrs)
	}

	#initSelectedIndexByDefault() {
		this.selectedIndex = this.#selectedIndexByDefault =
			this.options.findIndex((option) =>
				checkTruth(option.$ref.deref()?.getAttribute('aria-selected')),
			)
		return this
	}

	#selectElement($element?: HTMLElement) {
		if ($element !== undefined) {
			const attr = $element.getAttributeNode('aria-selected')
			return attr !== null && checkFalsy(attr.value)
				? ((attr.value = 'true'), true)
				: false
		} else return false
	}

	#unselect($element?: HTMLElement): boolean {
		// 1.
		if ($element instanceof HTMLElement) {
			$element.setAttribute('aria-selected', 'false')
			return true
		}

		// 2.
		const $$selected = this.selectedOptions
		if ($$selected && $$selected.length > 0) {
			this.selectedOptions.forEach(($element) =>
				$element.setAttribute('aria-selected', 'false'),
			)
			return true
		}

		return false
	}

	get activeIndex(): number {
		return this.#activeIndex
	}

	set activeIndex(value: number) {
		const current = ((value % this.length) + this.length) % this.length
		const list = this.options
		const previos = this.#activeIndex

		if (previos >= 0)
			list[previos].$ref.deref()?.setAttribute('aria-current', 'false')

		const $current = list[current].$ref.deref()
		if ($current !== undefined) {
			// 1.
			this.#activeIndex = current
			this.setAttribute('aria-activedescendant', $current.id)
			// 2.
			$current.setAttribute('aria-current', 'true')
			if (this.#states.has(CustomState.Scrolled))
				$current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'center',
				})
		} else {
			this.#activeIndex = -1
			this.removeAttribute('aria-activedescendant')
			throw new Error(
				`The option element by index ${current} is lost and cannot be activated!`,
			)
		}
	}

	get disabled(): boolean {
		return (
			this.#internals.states.has(CustomState.Disabled) &&
			checkTruth(this.#internals.ariaDisabled) &&
			checkTruth(this.ariaDisabled)
		)
	}

	get length(): number {
		return this.#hashmap.size
	}

	get multiple(): boolean {
		return checkTruth(this.ariaMultiSelectable)
	}

	get options(): Option[] {
		return Array.from(this.#hashmap.values())
	}

	get owns() {
		return this.#ownsIDs
	}

	get selectedIndex(): number {
		return this.#selectedIndex
	}

	set selectedIndex(value: number) {
		// 1.
		const previos =
			this.selectedIndex === -1
				? null
				: this.options[this.selectedIndex].value
		this.dispatchEvent(
			new InputEvent('beforeinput', { bubbles: true, data: previos }),
		)

		// 2.
		let index: number
		if (value === -1) {
			index = value
			this.#unselect()
		} else {
			index = ((value % this.length) + this.length) % this.length
			if (this.multiple === false) this.#unselect()
			const $element = this.options[index].$ref.deref()
			this.#selectElement($element)
		}
		this.#selectedIndex = index

		// 3.
		const current = index === -1 ? null : this.options[index].value
		this.dispatchEvent(
			new InputEvent('input', { bubbles: true, data: current }),
		)
	}

	get selectedOptions(): HTMLElement[] | null {
		const $$elements: Array<HTMLElement> = []
		for (const { $ref } of this.#hashmap.values()) {
			const $element = $ref.deref()
			if ($element && checkTruth($element.ariaSelected)) {
				$$elements.push($element)
				if (this.multiple === false) return $$elements
			}
		}
		return $$elements.length > 0 ? $$elements : null
	}

	get value(): string | string[] | null {
		const values = this.selectedOptions
			?.map(($element) => this.#hashmap.get($element.id)?.value)
			.filter((value) => typeof value === 'string')
		return values ? (this.multiple ? values : values[0]) : null
	}

	get #states(): CustomStateSet {
		return this.#internals.states
	}

	get #$container(): HTMLElement {
		return this.#internals.shadowRoot?.querySelector(
			'[part=container]',
		) as HTMLElement
	}

	#listenAssignedNodes(): AbortController {
		this.#slotChangeCont?.abort()
		this.#slotChangeCont = new AbortController()

		this.addEventListener(
			'slotchange',
			(event) => {
				// 1.
				const $$elements = (
					event.target as HTMLSlotElement
				).assignedElements({ flatten: true }) as HTMLElement[]

				// 2.
				this.#hashmap.clear()
				$$elements.forEach(($element) => {
					if ($element.role === 'option') {
						this.#initOptionAttributes($element)

						const option = {
							$ref: new WeakRef($element),
							label: $element.ariaLabel || $element.textContent,
							value:
								$element.dataset.value ??
								$element.getAttribute('value'),
						}

						this.#hashmap.set($element.id, option)
					}
				})

				// 3.
				if (this.#hashmap.size > 0) {
					this.#ownsIDs = Array.from(this.#hashmap.keys())
					this.setAttribute('aria-owns', this.#ownsIDs.join(' '))
				} else {
					this.#ownsIDs = null
					this.removeAttribute('aria-owns')
				}

				// 4.
				this.#initSelectedIndexByDefault()
			},
			{
				signal: this.#slotChangeCont.signal,
			},
		)

		return this.#slotChangeCont
	}

	#listenFocus() {
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
		this.#interCont?.abort()
	}

	#onFocus(_event: FocusEvent) {
		this.#listenInteraction()
	}

	#listenInteraction(): AbortController {
		this.#interCont?.abort()
		this.#interCont = new AbortController()

		const options = {
			signal: this.#interCont.signal,
		}

		this.addEventListener('click', (e) => this.#onClick(e), options)
		this.addEventListener('keydown', (e) => this.#onKeyDown(e), options)

		return this.#interCont
	}

	#onClick(event: MouseEvent) {
		event.stopPropagation()
		const $target = event.currentTarget as HTMLElement
		this.selectedIndex = this.activeIndex =
			this.owns !== null ? this.owns.indexOf($target.id) : -1
	}

	#onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter':
				this.selectedIndex = this.activeIndex
				event.stopPropagation()
				break
			case 'Space':
				if (this.selectedIndex === this.activeIndex) {
					this.selectedIndex = this.activeIndex
				} else {
					this.selectedIndex = this.activeIndex
				}
				break
			case 'End':
				this.activeIndex = this.length - 1
				break
			case 'Home':
				this.activeIndex = 0
				break
			case 'ArrowUp':
				if (this.#activeIndex) {
					if (event.altKey) this.activeIndex = 0
					else this.shift(-1)
					event.stopPropagation()
				}
				event.preventDefault()
				break
			case 'ArrowDown':
				if (event.altKey) this.activeIndex = this.length - 1
				else this.shift(1)
				event.preventDefault()
				break
			default:
				if (/\w+/.test(event.key)) {
					// TODO
				}
				return
		}
	}
}

export type { ListboxElement, Option }
export default ListboxElement
