export interface CustomElement {
	adoptedCallback?: () => void
	attributeChangedCallback?: (
		name: string,
		previous: string | null,
		current: string | null,
	) => void
	connectedCallback(): void
	disconnectedCallback(): void
}
