# Библиотека "Стержень Протосайта"

[![npm](https://img.shields.io/npm/v/@bpanchenko/core.svg)](https://www.npmjs.com/package/@bpanchenko/core)

#### Комплект интерактивных веб-компонент и элементов графического интерфейса

Процесс разработки веб-компонентов реализован через автоматизированное тестирование. Реализованы методы модульного и E2E тестирования исходного кода и скомпилированных модулей ECMAScript.

> [!TIP]
> **Внешний вид, описание и примеры использования представлены на страницах Протосайта: https://protosite.xyz**

## Активы библиотеки

Подключение модулей выполняется загрузкой внешних ресурсов непосредственно на веб-страницу, или через установку NPM-пакетов.

### 1. Загружаемые веб-страницой. Инициализация в браузере

| _Файловая структура каталога на веб-сервере_ |
|:-----------------------:|
```bash
https://assets.protosite.xyz/core
├── ./component.avatar.js 
├── ./component.select.js
├── ./element.arrow.js
├── ./element.listbox.js
├── ./element.option.js
└── ...
```

| _Скрипт инициализации веб-компонент_ |
|:-----------------------:|
```javascript
import ArrowElement from "//assets.protosite.xyz/core/element.arrow.js"
import SelectComponent from "//assets.protosite.xyz/core/component.select.js"

customElements.define(ArrowElement.tagName, ArrowElement)
customElements.define(SelectComponent.tagName, SelectComponent)
```

### 2. Подключаемые из NPM

| _Установка NPM-пакета_ |
|:-----------------------:|
---
```command
npm install @bpanchenko/core --save-dev
```

| _Исходный код инициализации веб-компонент_ |
|:-----------------------:|
```typescript
import ArrowElement from "@bpanchenko/core/arrow-element"
import SelectComponent from "@bpanchenko/core/select-component"

customElements.define(ArrowElement.tagName, ArrowElement)
customElements.define(SelectComponent.tagName, SelectComponent)
```

## Кодовая база библиотеки

Веб-компонента библиотеки представлена модулем ES6, файлом декларации типов и Pug-файлом с шаблонами HTML.

| _Структура каталога модулей исходного кода_ |
|:-----------------------:|
```bash
.
├── source
│   │
⁞   ├── component
c   │   │
o   │   ├── Avatar
r   │   │   ├── index.ts
e   │   │   ├── template.pug
⁞   │   │   └── stylesheet.css
│   │   │
│   │   ├── Select
│   │   ¦   ├── index.ts
⁞   │       ├── template.pug
r   │       └── stylesheet.css
o   │
o   └── element
t       │
⁞       ├── Arrow
│       │   ├── index.ts
│       ¦   ├── template.pug
│           ├── stylesheet.main.css
│           ├── stylesheet.arrow-glyphs.css
│           ├── library.ts
│           └── types.d.ts
│
├── LICENSE    
└── README.md
```