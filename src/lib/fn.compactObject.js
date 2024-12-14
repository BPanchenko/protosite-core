const compactObject = (obj) => {
	const result = Array.from(Object.entries(obj)).reduce(
		(acc, [key, value]) => (value ? (acc[key] = value) && acc : acc),
		{},
	)
	return result
}

export default compactObject
