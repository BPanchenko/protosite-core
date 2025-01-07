import { CustomElement } from './iface.CustomElement'

export interface FormAssociatedCustomElement extends CustomElement {
	formAssociatedCallback(form: HTMLFormElement): void
	formDisabledCallback(disabled: boolean): void
	formResetCallback(): void
	formStateRestoreCallback(
		state: string | File | FormData | null,
		reason: 'autocomplete' | 'restore',
	): void
}
