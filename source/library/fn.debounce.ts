import mimicFunction from './fn.mimicFunction.js'
import isObject from './fn.isObject.js'

var FUNC_ERROR_TEXT = 'Expected a function'
var NAN = 0 / 0
var symbolTag = '[object Symbol]'
var reTrim = /^\s+|\s+$/g
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i
var reIsBinary = /^0b[01]+$/i
var reIsOctal = /^0o[0-7]+$/i
var freeParseInt = parseInt
var freeGlobal =
	typeof global == 'object' && global && global.Object === Object && global
var freeSelf = typeof self == 'object' && self && self.Object === Object && self
var root = freeGlobal || freeSelf || Function('return this')()
var objectProto = Object.prototype

var objectToString = objectProto.toString
var nativeMax = Math.max,
	nativeMin = Math.min

var now = function (): number {
	return root.Date.now()
}

function debounce(
	func: Function,
	wait: number = 0,
	options: { leading?: boolean; trailing?: boolean; maxWait?: number } = {},
): Function {
	var lastArgs,
		lastThis,
		maxWait,
		result,
		timerId,
		lastCallTime,
		lastInvokeTime = 0,
		leading = false,
		maxing = false,
		trailing = true

	if (typeof func != 'function') {
		throw new TypeError(FUNC_ERROR_TEXT)
	}
	wait = toNumber(wait) || 0
	if (isObject(options)) {
		leading = !!options.leading
		maxing = 'maxWait' in options
		maxWait = maxing
			? nativeMax(toNumber(options.maxWait) || 0, wait)
			: maxWait
		trailing = 'trailing' in options ? !!options.trailing : trailing
	}

	function invokeFunc(time) {
		var args = lastArgs,
			thisArg = lastThis

		lastArgs = lastThis = undefined
		lastInvokeTime = time
		result = func.apply(thisArg, args)
		return result
	}

	function leadingEdge(time) {
		lastInvokeTime = time
		timerId = setTimeout(timerExpired, wait)
		return leading ? invokeFunc(time) : result
	}

	function remainingWait(time) {
		var timeSinceLastCall = time - lastCallTime,
			timeSinceLastInvoke = time - lastInvokeTime,
			result = wait - timeSinceLastCall

		return maxing
			? nativeMin(result, maxWait - timeSinceLastInvoke)
			: result
	}

	function shouldInvoke(time) {
		var timeSinceLastCall = time - lastCallTime,
			timeSinceLastInvoke = time - lastInvokeTime

		return (
			lastCallTime === undefined ||
			timeSinceLastCall >= wait ||
			timeSinceLastCall < 0 ||
			(maxing && timeSinceLastInvoke >= maxWait)
		)
	}

	function timerExpired() {
		var time = now()
		if (shouldInvoke(time)) {
			return trailingEdge(time)
		}
		timerId = setTimeout(timerExpired, remainingWait(time))
	}

	function trailingEdge(time) {
		timerId = undefined

		if (trailing && lastArgs) {
			return invokeFunc(time)
		}
		lastArgs = lastThis = undefined
		return result
	}

	function cancel() {
		if (timerId !== undefined) {
			clearTimeout(timerId)
		}
		lastInvokeTime = 0
		lastArgs = lastCallTime = lastThis = timerId = undefined
	}

	function flush() {
		return timerId === undefined ? result : trailingEdge(now())
	}

	function debounced(this: object) {
		var time = now(),
			isInvoking = shouldInvoke(time)

		lastArgs = arguments
		lastThis = this
		lastCallTime = time

		if (isInvoking) {
			if (timerId === undefined) {
				return leadingEdge(lastCallTime)
			}
			if (maxing) {
				timerId = setTimeout(timerExpired, wait)
				return invokeFunc(lastCallTime)
			}
		}
		if (timerId === undefined) {
			timerId = setTimeout(timerExpired, wait)
		}
		return result
	}
	mimicFunction(debounced, func)
	debounced.cancel = cancel
	debounced.flush = flush
	return debounced
}

function isObjectLike(value): boolean {
	return !!value && typeof value == 'object'
}

function isSymbol(value): boolean {
	return (
		typeof value == 'symbol' ||
		(isObjectLike(value) && objectToString.call(value) == symbolTag)
	)
}

function toNumber(value): number {
	if (typeof value == 'number') {
		return value
	}
	if (isSymbol(value)) {
		return NAN
	}
	if (isObject(value)) {
		var other = typeof value.valueOf == 'function' ? value.valueOf() : value
		value = isObject(other) ? other + '' : other
	}
	if (typeof value != 'string') {
		return value === 0 ? value : +value
	}
	value = value.replace(reTrim, '')
	var isBinary = reIsBinary.test(value)
	return isBinary || reIsOctal.test(value)
		? freeParseInt(value.slice(2), isBinary ? 2 : 8)
		: reIsBadHex.test(value)
			? NAN
			: +value
}

export default debounce
