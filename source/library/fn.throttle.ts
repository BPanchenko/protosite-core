import debounce from './fn.debounce.js'
import isObject from './fn.isObject.js'

const FUNC_ERROR_TEXT = 'Expected a function'

function throttle(
	func: Function,
	wait: number = 0,
	options: { leading?: boolean; trailing?: boolean } = {},
): Function {
	let leading = true
	let trailing = true

	if (typeof func != 'function') {
		throw new TypeError(FUNC_ERROR_TEXT)
	}
	if (isObject(options)) {
		leading = 'leading' in options ? !!options.leading : leading
		trailing = 'trailing' in options ? !!options.trailing : trailing
	}
	return debounce(func, wait, {
		leading: leading,
		maxWait: wait,
		trailing: trailing,
	})
}

export default throttle
