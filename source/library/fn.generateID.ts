const chars = 'abekmhopctyx123456789'

const generateID = (properties?: Props): string => {
	const { prefix, suffix, length = 6, checklist } = properties ?? {}
	let result: string
	do {
		result = ''
		for (let i = 0; i < length; i++) {
			result += chars.charAt((Math.random() * chars.length) | 0)
		}
		if (prefix) result = prefix + '-' + result
		if (suffix) result += '-' + suffix
	} while (checklist?.includes(result))
	return result
}

type Props = {
	prefix?: string
	suffix?: string
	length?: number
	checklist?: Array<string> | null
}

export default generateID
