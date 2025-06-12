interface CSSRuleList {
	[Symbol.iterator](): Iterator<CSSStyleRule>
}

declare module '*.pug' {
	const template: string
	export default template
}
