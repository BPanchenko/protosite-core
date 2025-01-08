function isObject(value: unknown): boolean {
	var type = typeof value
	return !!value && (type == 'object' || type == 'function')
}

export default isObject
