type CustomElementConstructor = new (...params: any[]) => CustomElement;
type ClassDecorator<Type> = (target: Type) => Type;

export type Metadata = {
	tagName: string;
	template: string;
	stylesheet?: CSSStyleSheet;
};

const validateTagName = (name: string): void | never => {
	if (name.indexOf('-') <= 0) {
		throw new Error('You need at least 1 dash in the custom element name!');
	}
};

export const CustomElementDecorator = <T extends CustomElementConstructor>({
	tagName,
	template: tplString,
	stylesheet
}: Metadata): ClassDecorator<T> => {
	validateTagName(tagName);

	const template = document.createElement('template') as HTMLTemplateElement;
	template.innerHTML = tplString;
	template.setAttribute('name', `custom-element-${tagName}`);

	return (target: T): T => {
		const Adapter = class extends target {
			readonly tag;
			constructor(...params: any[]) {
				super(params);
				this.classList.add('u-display-contents');
				if (!this.shadowRoot) {
					this.attachShadow({ mode: 'open' });
					this.shadowRoot.adoptedStyleSheets = [stylesheet];
				}
			}

			connectedCallback() {
				this.shadowRoot.appendChild(document.importNode(template.content, true));
				super.connectedCallback && super.connectedCallback();
			}
		};

		window.customElements.define(tagName, Adapter);

		return Adapter;
	};
};