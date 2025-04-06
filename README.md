# Библиотека нативных ECMAScript модулей Protosite Core

[![npm](https://img.shields.io/npm/v/@bpanchenko/core.svg)](https://www.npmjs.com/package/@bpanchenko/core)

Пакет предоставляет среду разработки веб-компонентов через автоматизированное тестирование. Реализованы методы модульного и E2E тестирования исходного кода и скомпилированных модулей ECMAScript.

Внешний вид, описание и примеры использования даны на страницах [Протосайта](http://protosite.rocks).

### Активы библиотеки

Компоненты оболочки Протосайта загружаются непосредственно в браузер при помощи `<script type="module">`. Скрипт выполнит инициализацию веб-компоненты, а при монтировании в DOM компонента выполнит загрузку файлов CSS и HTML.

Например структура файлов поля выбора данных на сервере:

```javascript
//assets.protosite.xyz/core/
 ├── component.select.mjs
 ├── component.select.css
 └── ...
```

Скрипт модуля компоненты загружается на веб-странице тегом:

```html
<script src="//assets.protosite.xyz/core/component.select.mjs" type="module">
```

### Исходный код

Веб-компонента библиотеки представлена модулем ES6, файлом декларации типов и Pug-файлом с шаблонами HTML.

Например структура исходных файлов поля выбора данных:

```javascript
.
├── src
│   ├── components
│   │   ├── select-field.d.ts
│   │   ├── select-field.js
│   │   └── select-field.pug
│   └── ...
├── LICENSE
└── README.md
```

Исходный код CSS для веб-компоненты доступен в библиотеке [`@bpanchenko/uikit`](https://github.com/BPanchenko/protosite-uikit).

#### Установка Protosite Core

```bash
npm install @bpanchenko/core --save-dev
```
