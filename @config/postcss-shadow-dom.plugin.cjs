/**
 * Check if specified selector is a :root
 * @param  {String} selector
 * @returns {Boolean}
 */
function isRootSelector(selector) {
	return selector.startsWith(':root')
}

module.exports = () => {
	return {
		postcssPlugin: 'postcss-shadow-dom',
		Rule(rule) {
			if (isRootSelector(rule.selector)) {
				rule.selector = rule.selector.replace(':root', ':host')
			}
		},
	}
}

module.exports.postcss = true
