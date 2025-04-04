const copyProperty = (to, from, property, ignoreNonConfigurable) => {
	if (property === 'length' || property === 'prototype') {
		return
	}

	if (property === 'arguments' || property === 'caller') {
		return
	}

	const toDescriptor = Object.getOwnPropertyDescriptor(to, property)
	const fromDescriptor = Object.getOwnPropertyDescriptor(
		from,
		property,
	) as PropertyDescriptor

	if (
		!canCopyProperty(toDescriptor, fromDescriptor) &&
		ignoreNonConfigurable
	) {
		return
	}

	Object.defineProperty(to, property, fromDescriptor)
}

const canCopyProperty = function (toDescriptor, fromDescriptor) {
	return (
		toDescriptor === undefined ||
		toDescriptor.configurable ||
		(toDescriptor.writable === fromDescriptor.writable &&
			toDescriptor.enumerable === fromDescriptor.enumerable &&
			toDescriptor.configurable === fromDescriptor.configurable &&
			(toDescriptor.writable ||
				toDescriptor.value === fromDescriptor.value))
	)
}

const changePrototype = (to, from) => {
	const fromPrototype = Object.getPrototypeOf(from)
	if (fromPrototype === Object.getPrototypeOf(to)) {
		return
	}

	Object.setPrototypeOf(to, fromPrototype)
}

const wrappedToString = (withName, fromBody) =>
	`/* Wrapped ${withName}*/\n${fromBody}`

const toStringDescriptor = Object.getOwnPropertyDescriptor(
	Function.prototype,
	'toString',
) as PropertyDescriptor

const toStringName = Object.getOwnPropertyDescriptor(
	Function.prototype.toString,
	'name',
) as PropertyDescriptor

const changeToString = (to, from, name) => {
	const withName = name === '' ? '' : `with ${name.trim()}() `
	const newToString = wrappedToString.bind(null, withName, from.toString())
	Object.defineProperty(newToString, 'name', toStringName)
	const { writable, enumerable, configurable } = toStringDescriptor
	Object.defineProperty(to, 'toString', {
		value: newToString,
		writable,
		enumerable,
		configurable,
	})
}

export default function mimicFunction(
	to,
	from,
	{ ignoreNonConfigurable = false } = {},
) {
	const { name } = to

	for (const property of Reflect.ownKeys(from)) {
		copyProperty(to, from, property, ignoreNonConfigurable)
	}

	changePrototype(to, from)
	changeToString(to, from, name)

	return to
}
