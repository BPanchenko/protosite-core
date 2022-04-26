;{
    const CLS = new Map([
        ['horizontal', 'guide--horizontal'],
        ['line', 'line'],
        ['root', 'u-grid'],
        ['vertical', 'guide--vertical'],
    ])

    const TAGS = new Map([
        ['horizontal', 'div'],
        ['line', 'span'],
        ['root', 'u-grid'],
        ['vertical', 'div'],
    ])

    const DEFAULT_STEP = 16
    
    customElements.define(TAGS.get('root'), class extends HTMLElement {
        #horizontal
        #resizeObserver
        #vertical
        
        connectedCallback() {
            this.render()
            this.#initResizeObserver()
        }

        disconnectedCallback() {
            this.clean()
        }

        render() {
            this.classList.add(CLS.get('root'))
            this.#horizontal = document.createElement(TAGS.get('horizontal'))
            this.#vertical = document.createElement(TAGS.get('vertical'))
            this.#horizontal.classList.add(CLS.get('horizontal'))
            this.#vertical.classList.add(CLS.get('vertical'))
            this.appendChild(this.#horizontal)
            this.appendChild(this.#vertical)
        }

        renderLines(container, size) {
            if (container instanceof HTMLElement && typeof size === 'number') {
                let old_lines_count = container.children.length
                let new_lines_count = Math.floor(size/this.step)
                let diff_lines_count = new_lines_count - old_lines_count
                
                if (diff_lines_count > 0) {
                    for (let i = diff_lines_count; i>0; i--) {
                        let line = document.createElement(TAGS.get('line'))
                        line.classList.add(CLS.get('line'))
                        container.appendChild(line)

                        if (container.classList.contains(CLS.get('horizontal'))) {
                            line.style.left += i * this.step + 'px'
                        }

                        if (container.classList.contains(CLS.get('vertical'))) {
                            line.style.top += i * this.step + 'px'
                        }
                    }
                } else if (diff_lines_count < 0) {
                    this.removeElems(container.children, old_lines_count + diff_lines_count)
                }
            } else {
                this.renderLines(this.#horizontal, this.width)
                this.renderLines(this.#vertical, this.height)
            }
        }

        removeElems(list, start = 0) {
            Array.from(list).slice(start).forEach(elem => elem.remove())
        }

        clean() {
            this.removeElems(this)
            this.#resizeObserver = null;
        }

        #initResizeObserver() {
            this.#resizeObserver = new ResizeObserver(entries => this.#onResize())
            this.#resizeObserver.observe(this.parentNode)
            this.#onResize()
        }

        #onResize() {
            let { offsetWidth: width, offsetHeight: height } = this.parentNode
            this.width = width
            this.height = height
            this.renderLines()
        }

        get width() {
            return parseInt(this.getAttribute('width'))
        }
        set width(value) {
            this.setAttribute('width', parseInt(value))
        }

        get height() {
            return parseInt(this.getAttribute('height'))
        }
        set height(value) {
            this.setAttribute('height', parseInt(value))
        }

        get step() {
            return parseInt(this.dataset.step) || DEFAULT_STEP
        }
        set step(value) {
            this.dataset.step = parseInt(value)
        }
    })
}
