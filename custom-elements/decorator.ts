import type {
	ICustomElement,
	ICustomElementConstructor
} from './'

type GClassDecorator<Type> = (target: Type) => Type | void

type Metadata = {
    tagName: string;
    template: string;
}

const validateTagName = (name: string): void | never => {
	if (name.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!')
    }
}

export const CustomElement = <T extends ICustomElementConstructor>({
	tagName,
	template: tplString
}: Metadata): GClassDecorator<T> => {
	
	validateTagName(tagName)

    const template = document.createElement('template') as HTMLTemplateElement
    template.innerHTML = tplString
	template.setAttribute('name', `custom-element-${tagName}`)

    return (target: T): T => {
        const Adapter = class extends target implements ICustomElement {
            constructor(...args: any[]) {
                super(args)
                if (!this.shadowRoot) {
                    this.attachShadow({ mode: 'open' })
                }
            }

            connectedCallback() {
                super.shadowRoot!.appendChild(document.importNode(template.content, true))
                super.connectedCallback && super.connectedCallback()
            }
        }
		
		window.customElements.define(tagName, Adapter)

		return Adapter
    };
}
