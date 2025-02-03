export interface CustomElement extends HTMLElement {
	adoptedCallback?: () => void
	attributeChangedCallback?: (
		name: string,
		previous: string | null,
		current: string | null,
	) => void
	connectedCallback(): void
	disconnectedCallback?: () => void
}
