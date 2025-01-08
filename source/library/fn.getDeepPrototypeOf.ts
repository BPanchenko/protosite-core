function getDeepPrototypeOf(instance: object, constructor: object = {}) {
	let obj = instance
	do {
		obj = Object.getPrototypeOf(obj)
		if (obj.constructor === constructor) return obj
	} while (obj)
	return obj
}

export default getDeepPrototypeOf
