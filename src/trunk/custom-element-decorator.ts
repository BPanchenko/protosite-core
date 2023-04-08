import { uDisplayContents } from '@uikit/utilities.css';

type CustomElementConstructor = new (...params: any[]) => CustomElement;
type ClassDecorator<Type> = (target: Type) => Type;

export type Metadata = {
	tagName: string;
	template: string;
	stylesheet?: CSSStyleSheet;
	useShadowDom?: boolean;
};

const createElementDOM = ({
	element,
	template,
	stylesheet
}: {
	element: CustomElement;
} & Pick<Metadata, 'template' | 'stylesheet'>): void => {
	const $template = document.createElement('template') as HTMLTemplateElement;
	$template.innerHTML = template;
	$template.setAttribute('name', `custom-element-${element.tagName}`);

	const tree = document.importNode($template.content, true);

	if (isShadowRootMode(element.domMode)) {
		element.attachShadow({ mode: element.domMode });
		element.shadowRoot.appendChild(tree);
		if (stylesheet) {
			element.shadowRoot.adoptedStyleSheets = [stylesheet];
		}
	} else {
		element.appendChild(tree);
	}
};

const initRefs = (element: CustomElement): void => {
	if (element.$refs) {
		const root = element.shadowRoot || element;
		element.$refs.forEach((_, key, map) => {
			map.set(key, root.querySelector('js-' + key));
		});
	}
};

const isShadowRootMode = (a: any): a is ShadowRootMode =>
	[DomAccessMode.ShadowClosed, DomAccessMode.ShadowOpen].includes(a);

const shadowRootModeByDefault = DomAccessMode.ShadowClosed;

const validateTagName = (name: string): void | never => {
	if (name.indexOf('-') <= 0) {
		throw new Error('You need at least 1 dash in the custom element name!');
	}
};

export const CustomElementDecorator = <T extends CustomElementConstructor>({
	tagName,
	template,
	stylesheet,
	useShadowDom = USE_SHADOW_DOM
}: Metadata): ClassDecorator<T> => {
	validateTagName(tagName);

	return (target: T): T => {
		const Adapter = class extends target {
			readonly tagName = tagName;

			constructor(...params: any[]) {
				super(params);
			}

			adoptedCallback() {
				super.adoptedCallback && super.adoptedCallback();
			}

			attributeChangedCallback(name, previous, current) {
				super.attributeChangedCallback(name, previous, current);
				if (previous !== current && super.render) {
					super.render();
				}
			}

			connectedCallback() {
				createElementDOM({
					element: this,
					template,
					stylesheet
				});
				initRefs(this);
				this.classList.add(uDisplayContents);
				super.connectedCallback();
			}

			disconnectedCallback() {
				super.disconnectedCallback && super.disconnectedCallback();
			}

			get domMode() {
				return super.domMode || (useShadowDom ? shadowRootModeByDefault : DomAccessMode.Light);
			}

			static get observedAttributes() {
				return super.prototype.observedAttributes || [];
			}

			private stashChildren(): void {
				const isNeeded =
					this.domMode === DomAccessMode.Light &&
					this.children.length > 0 &&
					super.state instanceof Map;

				const children = Array.from(this.children);
				const stashed = super.state.has(StateKey.StashedChildren)
					? super.state.get(StateKey.StashedChildren)
					: [];

				stashed.push(...children);
				super.state.set(StateKey.StashedChildren, stashed);
			}
		};

		window.customElements.define(tagName, Adapter);

		return Adapter;
	};
};
