export const isObject = (value: unknown): value is Object =>
	Boolean(value) && typeof value === 'object'

export default isObject
