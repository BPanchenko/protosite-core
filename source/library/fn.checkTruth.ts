const checkTruth = (value: Primitive | null): boolean => {
	return typeof value === 'string'
		? ['on', 'true'].includes(value.trim().toLocaleLowerCase())
		: Boolean(value)
}

export default checkTruth
