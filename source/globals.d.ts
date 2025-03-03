declare module '*.pug' {
	const template: string
	export default template
}

declare type Primitive = undefined | string | number | boolean | symbol | bigint
