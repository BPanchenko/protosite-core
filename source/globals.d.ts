interface CustomStateSet {
	has(state: string): boolean
	add(state: string): void
	delete(state: string): void
}

interface CSSRuleList {
	[Symbol.iterator](): Iterator<CSSStyleRule>
}

declare module '*.pug' {
	const template: string
	export default template
}
