import type { Primitive } from '#type/manual'

export const checkFalsy = (value: Primitive | null): boolean => {
	return typeof value === 'string'
		? ['off', 'false'].includes(value.trim().toLocaleLowerCase())
		: false === Boolean(value)
}

export default checkFalsy
