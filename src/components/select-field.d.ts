declare namespace SelectField {
	type Attributes = Partial<{
		expanded: boolean
		font: string
		glyph: string
		code: string

		/**
		 * Resizes the component. The default size is defined in UIKit.
		 * 
		 * [UIKit Reference](http://protosite.rocks/components/select-field.html)
		 */
		size: 'sm' | 'md' | 'lg'
	}>
}