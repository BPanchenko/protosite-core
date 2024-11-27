declare module "@bpanchenko/core/select-field"

declare namespace SelectField {
	type Attributes = Partial<{
		expanded: 'true' | 'on' | 'false' | 'off'
		label: string

		/**
		 * Resizes the component. The default size is defined in UIKit.
		 * 
		 * [UIKit Reference](http://protosite.rocks/components/select-field.html)
		 */
		size: 'sm' | 'md' | 'lg'
	}>
}