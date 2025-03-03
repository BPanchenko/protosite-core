declare module '*.pug' {
	const template: string
	export default template
}

declare type AriaAttributeInputValue = undefined | string | number | boolean

declare type Primitive =
	| null
	| undefined
	| string
	| number
	| boolean
	| symbol
	| bigint
