export const isObject = (value: unknown): value is object =>
	Boolean(value) && typeof value === 'object'

export default isObject
