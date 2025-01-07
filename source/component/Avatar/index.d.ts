declare namespace Avatar {
	type Attributes = {
		/**
		 * Resizes the component. The default size is defined in UIKit.
		 *
		 * [UIKit Reference](http://protosite.rocks/components/avatar.html)
		 */
		size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

		/**
		 * The image URL. Mandatory for the <img> element.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src)
		 */
		src: string

		/**
		 * The URL that the hyperlink points to.
		 *
		 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement/href)
		 */
		href: string

		/**
		 * The target attribute specifies where to open the linked document.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/target)
		 */
		target: '_blank' | '_self' | '_parent' | '_top'
	}
}

export = Avatar
