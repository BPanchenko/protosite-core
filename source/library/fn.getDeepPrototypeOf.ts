function getDeepPrototypeOf(instance: object, constructor = null) {
	let obj = instance
	do {
		obj = Object.getPrototypeOf(obj)
		if (obj.constructor === constructor) return obj
	} while (obj)
	return obj
}

export default getDeepPrototypeOf
