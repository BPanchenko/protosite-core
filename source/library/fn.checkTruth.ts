import type { Primitive } from './types'

const checkTruth = (value: Primitive): boolean => {
	return typeof value === 'string'
		? ['on', 'true'].includes(value.trim().toLocaleLowerCase())
		: Boolean(value)
}

export default checkTruth
