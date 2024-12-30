import { Primitive } from '#types/primitive'

export const checkFalsy = (value: Primitive): boolean => {
	return typeof value === 'string'
		? ['off', 'false'].includes(value.trim().toLocaleLowerCase())
		: false === Boolean(value)
}

export default checkFalsy
