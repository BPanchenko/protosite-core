# ПО "Комплемент Протосайта"

#### Комплект интерактивных элементов графического интерфейса пользователя

При отладке программного решения применяется автоматизированное тестирование.
<br>Реализованы методы модульного тестирования исходного кода и E2E тестирования готового ПО.
<br>Внешний вид, описание и примеры использования веб-компонентов представлены на [страницах Протосайта](https://protosite.xyz); там-же доступен [отчет о степени покрытия кода тестами](https://protosite.xyz/code-coverage/protosite-core/).

[![npm](https://img.shields.io/npm/v/@bpanchenko/core.svg)](https://www.npmjs.com/package/@bpanchenko/core)

## Использование ПО

Подключение публичных модулей выполняется через [загрузку внешних ресурсов](#1-загрузка-модулей-непосредственно-на-веб-страницу) непосредственно на веб-страницу или через [установку NPM-пакетов](#2-установка-из-npm).

### 1: Загрузка модулей непосредственно на веб-страницу

```javascript
/**
 * @module core/setup-custom-elements
 * @overview Регистрация пользовательских элементов
 */

import ArrowElement from "//assets.protosite.xyz/core/element.arrow.js"
import SelectComponent from "//assets.protosite.xyz/core/component.select.js"

customElements.define(ArrowElement.tagName, ArrowElement)
customElements.define(SelectComponent.tagName, SelectComponent)
```

```yaml
# Файловая структура каталога на веб-сервере активов Протосайта
―――
https://assets.protosite.xyz/core/
┯
├── component.avatar.js 
├── component.select.js
├── element.arrow.js
├── element.listbox.js
├── element.option.js
└── ...
```

### 2: Установка из NPM

```powershell
npm install @bpanchenko/core --save-dev
```

```javascript
/**
 * @module core/setup-custom-elements
 * @overview Регистрация пользовательских элементов
 */

import ArrowElement from "@bpanchenko/core/arrow-element"
import SelectComponent from "@bpanchenko/core/select-component"

customElements.define(ArrowElement.tagName, ArrowElement)
customElements.define(SelectComponent.tagName, SelectComponent)
```

## Кодовая база ПО

Веб-компонента в исходном коде представлена модулем TypeScript, pug-шаблоном HTML и таблицами стилей CSS. Таблицы стилей либо вставляются в шаблон, либо подгружаются готовой компонентой при инициализации в браузере.

```yaml
# Структура каталога модулей исходного кода
―――
.
├── /source
│   │
⁞   ├── /component
c   │   ¦
o   │   ├── Avatar
r   │   │   ├── index.ts
e   │   │   ├── template.pug
⁞   │   │   └── stylesheet.css
│   │   │
│   │   ├── Select
│   │   ¦   ├── index.ts
⁞   │   ¦   ├── template.pug
r   │       └── stylesheet.css
o   │
o   └── /element
t       ¦
⁞       ├── Arrow
│       ¦   ├── index.ts
│       ¦   ├── template.pug
│           ├── stylesheet.main.css
│           ├── stylesheet.arrow-glyphs.css
│           ├── library.ts
│           └── types.d.ts
│
├── LICENSE    
└── README.md
```