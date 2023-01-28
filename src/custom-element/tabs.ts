import { CustomElementDecorator } from '../lib/CustomElementDecorator';

@CustomElementDecorator({
	tagName: 'c-tabs-container',
	template: ``
})
class TabsContainerElement extends HTMLElement implements CustomElement {
	get activeTab() {
		return this.dataset.activeTab;
	}

	get activeTabpanel() {
		return this.dataset.activeTabpanel;
	}

	connectedCallback() {
		this.classList.add('c-tabs-container');
		this.setAttribute('role', 'tablist');

		if (!this.indicator) {
			this.indicator = createIndicator();
			this.appendChild(this.indicator);
		}

		this.addEventListener('click', this.onSelectTab, false);
		setTimeout(this.activate.bind(this), 0);
	}

	activate() {
		let currentTab = this.querySelector('.c-tab[aria-current=true]');
		if (!currentTab) currentTab = this.children[0];
		currentTab.dispatchEvent(new Event('click', { bubbles: true }));
	}

	onSelectTab(e) {
		let currentTab;

		// unselect don't current tabs
		this.querySelectorAll('.c-tab').forEach((tab) => {
			if (tab.contains(e.target)) currentTab = tab;
			else tab.ariaCurrent = false;
		});

		// dispatch a change event with the data of the current tab
		if (currentTab) {
			this.dataset.activeTab = currentTab.id;
			this.dataset.activeTabpanel = currentTab.ariaControls;
			this.dispatchEvent(new Event('change', { bubbles: true }));
		}

		this.renderIndicator();
	}

	renderIndicator() {
		let currentTab = this.querySelector('.c-tab[aria-current=true]');

		this.indicator.setAttribute('aria-hidden', !currentTab);
		if (currentTab) {
			this.indicator.style.width = currentTab.clientWidth + 'px';
			this.indicator.style.transform = `translateX(${currentTab.offsetLeft}px)`;
		}
	}
}

@CustomElementDecorator({
	tagName: 'c-tab',
	template: ``
})
class TabElement extends HTMLElement implements CustomElement {
	get ariaControls() {
		return this.getAttribute('aria-controls') || '';
	}

	set ariaCurrent(flag) {
		this.setAttribute('aria-current', !!flag && flag != 'false');
	}

	connectedCallback() {
		this.classList.add('c-tab');
		this.setAttribute('role', 'tab');

		if (this.dataset.glyph) {
			this.appendChild(createIcon(this.dataset.glyph));
			delete this.dataset.glyph;
		}

		if (this.dataset.text) {
			this.appendChild(createLabel(this.dataset.text));
			delete this.dataset.text;
		}

		this.addEventListener('click', this.onSelectTab);
	}

	onSelectTab(e) {
		e.preventDefault();
		this.setAttribute('aria-current', true);
		return;
	}
}

// Utils

function createIcon(glyph) {
	let node = document.createElement('span');
	node.classList.add('c-tab__icon');
	node.innerHTML = `<span class="iconic" data-glyph="${glyph}"></span>`;
	return node;
}

function createLabel(text) {
	let node = document.createElement('span');
	node.classList.add('c-tab__label');
	node.innerText = text;
	return node;
}

function createIndicator() {
	let node = document.createElement('span');
	node.classList.add('c-tab-indicator');
	return node;
}
