/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../protosite-uikit/Package/assets/component/avatar.css":
/*!**************************************************************!*\
  !*** ../protosite-uikit/Package/assets/component/avatar.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cAvatar": () => (/* binding */ cAvatar),
/* harmony export */   "cAvatarLink": () => (/* binding */ cAvatarLink),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports cPanel, sClean */
/* harmony import */ var _protosite_core_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../protosite-core/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _protosite_core_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_protosite_core_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _protosite_core_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../protosite-core/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _protosite_core_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_protosite_core_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _protosite_core_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_protosite_core_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{--clr-red:#f44336;--clr-red-50:#fdf9f8;--clr-red-50-tp:hsla(4,22%,50%,.1);--clr-red-100:#fad5d3;--clr-red-100-tp:rgba(178,94,88,.3);--clr-red-200:#ffaea9;--clr-red-200-tp:rgba(200,85,77,.5);--clr-red-300:#ff867d;--clr-red-300-tp:rgba(222,76,65,.7);--clr-red-400:#ff5f52;--clr-red-400-tp:rgba(244,67,54,.9);--clr-red-500:#ea3c2f;--clr-red-600:#c0251a;--clr-red-700:#99170e;--clr-red-800:#780f07;--clr-red-900:#5c0a04;--clr-red-A100:#ffd5ab;--clr-red-A200:#ff8371;--clr-red-A400:#ff2f4d;--clr-red-A700:#ec0020;--clr-pink:#e91e63;--clr-pink-50:#fdf8fa;--clr-pink-50-tp:rgba(139,78,99,.1);--clr-pink-100:#fcccdc;--clr-pink-100-tp:rgba(162,66,99,.3);--clr-pink-200:#ff9abe;--clr-pink-200-tp:rgba(186,54,99,.5);--clr-pink-300:#ff68a0;--clr-pink-300-tp:rgba(209,42,99,.7);--clr-pink-400:#ff3a82;--clr-pink-400-tp:rgba(233,30,99,.9);--clr-pink-500:#de195c;--clr-pink-600:#b40c45;--clr-pink-700:#8e0533;--clr-pink-800:#6e0126;--clr-pink-900:#54001c;--clr-pink-A100:#ffd0e4;--clr-pink-A200:#ff7ca5;--clr-pink-A400:#ff207d;--clr-pink-A700:#dd0047;--clr-purple:#9c27b0;--clr-purple-50:#fcf9fc;--clr-purple-50-tp:rgba(109,74,115,.1);--clr-purple-100:#ebcdf1;--clr-purple-100-tp:rgba(121,65,130,.3);--clr-purple-200:#e09eeb;--clr-purple-200-tp:rgba(133,57,146,.5);--clr-purple-300:#d46fe6;--clr-purple-300-tp:rgba(144,48,161,.7);--clr-purple-400:#c443da;--clr-purple-400-tp:rgba(156,39,176,.9);--clr-purple-500:#9423a7;--clr-purple-600:#741584;--clr-purple-700:#5a0d67;--clr-purple-800:#45094f;--clr-purple-900:#34063c;--clr-purple-A100:#ffc7ff;--clr-purple-A200:#e982ff;--clr-purple-A400:#c251dc;--clr-purple-A700:#860084;--clr-violet:#673ab7;--clr-violet-50:#faf9fc;--clr-violet-50-tp:rgba(91,77,115,.1);--clr-violet-100:#ded2f4;--clr-violet-100-tp:rgba(94,72,132,.3);--clr-violet-200:#c3a9f2;--clr-violet-200-tp:rgba(97,68,149,.5);--clr-violet-300:#a880ef;--clr-violet-300-tp:rgba(100,63,166,.7);--clr-violet-400:#8b59e5;--clr-violet-400-tp:rgba(103,58,183,.9);--clr-violet-500:#6035ae;--clr-violet-600:#492589;--clr-violet-700:#371b6b;--clr-violet-800:#2a1352;--clr-violet-900:#1f0e3f;--clr-violet-A100:#e4d4ff;--clr-violet-A200:#ac8fff;--clr-violet-A400:#8c61ec;--clr-violet-A700:#582291;--clr-indigo:#3f51b5;--clr-indigo-50:#f9fafc;--clr-indigo-50-tp:rgba(80,85,115,.1);--clr-indigo-100:#d3d8f3;--clr-indigo-100-tp:rgba(75,84,131,.3);--clr-indigo-200:#abb6f0;--clr-indigo-200-tp:rgba(71,83,148,.5);--clr-indigo-300:#8494ec;--clr-indigo-300-tp:rgba(67,82,164,.7);--clr-indigo-400:#5e72e1;--clr-indigo-400-tp:rgba(63,81,181,.9);--clr-indigo-500:#3a4bac;--clr-indigo-600:#293888;--clr-indigo-700:#1e296a;--clr-indigo-800:#151f51;--clr-indigo-900:#10173e;--clr-indigo-A100:#afe7ff;--clr-indigo-A200:#7ca3ff;--clr-indigo-A400:#6376e7;--clr-indigo-A700:#353b8d;--clr-blue:#2196f3;--clr-blue-50:#f8fafd;--clr-blue-50-tp:rgba(97,133,160,.1);--clr-blue-100:#cfe6f8;--clr-blue-100-tp:rgba(81,137,181,.3);--clr-blue-200:#a0d3fc;--clr-blue-200-tp:rgba(65,141,202,.5);--clr-blue-300:#6fc1ff;--clr-blue-300-tp:rgba(49,146,222,.7);--clr-blue-400:#3eafff;--clr-blue-400-tp:rgba(33,150,243,.9);--clr-blue-500:#198dea;--clr-blue-600:#046dc1;--clr-blue-700:#00549a;--clr-blue-800:#003f78;--clr-blue-900:#00305d;--clr-blue-A100:#70ffff;--clr-blue-A200:#3dd6ff;--clr-blue-A400:#3af;--clr-blue-A700:#006fb9;--clr-light-blue:#03a9f4;--clr-light-blue-50:#f7fbfd;--clr-light-blue-50-tp:rgba(90,140,162,.1);--clr-light-blue-100:#caeaf8;--clr-light-blue-100-tp:rgba(68,147,183,.3);--clr-light-blue-200:#94dbfc;--clr-light-blue-200-tp:rgba(47,154,203,.5);--clr-light-blue-300:#5aceff;--clr-light-blue-300-tp:rgba(25,162,224,.7);--clr-light-blue-400:#21c1ff;--clr-light-blue-400-tp:rgba(3,169,244,.9);--clr-light-blue-500:#00a0eb;--clr-light-blue-600:#007ec2;--clr-light-blue-700:#00629b;--clr-light-blue-800:#004b7a;--clr-light-blue-900:#00395e;--clr-light-blue-A100:#30ffff;--clr-light-blue-A200:#2de8ff;--clr-light-blue-A400:#48b6ff;--clr-light-blue-A700:#3676c6;--clr-cyan:#00bcd4;--clr-cyan-50:#f7fbfc;--clr-cyan-50-tp:rgba(94,150,158,.1);--clr-cyan-100:#caedf1;--clr-cyan-100-tp:rgba(70,160,171,.3);--clr-cyan-200:#94e3ed;--clr-cyan-200-tp:rgba(47,169,185,.5);--clr-cyan-300:#5adaea;--clr-cyan-300-tp:rgba(23,179,198,.7);--clr-cyan-400:#20d1e8;--clr-cyan-400-tp:rgba(0,188,212,.9);--clr-cyan-500:#00b3cb;--clr-cyan-600:#008fa5;--clr-cyan-700:#007083;--clr-cyan-800:#005766;--clr-cyan-900:#00424f;--clr-cyan-A100:#0ff;--clr-cyan-A200:#00f8ff;--clr-cyan-A400:#27c7df;--clr-cyan-A700:#2488a5;--clr-teal:#009688;--clr-teal-50:#f7fbfb;--clr-teal-50-tp:rgba(72,117,113,.1);--clr-teal-100:#c5e7e4;--clr-teal-100-tp:rgba(54,126,119,.3);--clr-teal-200:#8cd7d0;--clr-teal-200-tp:rgba(36,134,125,.5);--clr-teal-300:#51c8bd;--clr-teal-300-tp:rgba(18,142,130,.7);--clr-teal-400:#1bb6a7;--clr-teal-400-tp:rgba(0,150,136,.9);--clr-teal-500:#008e80;--clr-teal-600:#006f63;--clr-teal-700:#00554c;--clr-teal-800:#00413a;--clr-teal-900:#00322c;--clr-teal-A100:#0ff;--clr-teal-A200:#00e0c9;--clr-teal-A400:#2fae9f;--clr-teal-A700:#246d66;--clr-green:#4caf50;--clr-green-50:#f9fbf9;--clr-green-50-tp:rgba(117,147,118,.1);--clr-green-100:#d8ebd9;--clr-green-100-tp:rgba(107,154,109,.3);--clr-green-200:#b4ddb6;--clr-green-200-tp:rgba(97,161,99,.5);--clr-green-300:#8ed190;--clr-green-300-tp:rgba(86,168,90,.7);--clr-green-400:#67c56b;--clr-green-400-tp:rgba(76,175,80,.9);--clr-green-500:#43a647;--clr-green-600:#27832a;--clr-green-700:#17661a;--clr-green-800:#0e4e10;--clr-green-900:#083b0a;--clr-green-A100:#5bffc1;--clr-green-A200:#4ff186;--clr-green-A400:#56c05f;--clr-green-A700:#418029;--clr-light-green:#8bc34a;--clr-light-green-50:#f9fbf8;--clr-light-green-50-tp:hsla(88,18%,61%,.1);--clr-light-green-100:#e5eeda;--clr-light-green-100-tp:hsla(87,27%,59%,.3);--clr-light-green-200:#cfe3b7;--clr-light-green-200-tp:hsla(88,35%,57%,.5);--clr-light-green-300:#b8da90;--clr-light-green-300-tp:rgba(144,190,90,.7);--clr-light-green-400:#a0d266;--clr-light-green-400-tp:rgba(139,195,74,.9);--clr-light-green-500:#7eb93a;--clr-light-green-600:#569310;--clr-light-green-700:#3c7300;--clr-light-green-800:#2a5800;--clr-light-green-900:#1e4300;--clr-light-green-A100:#b4ffb0;--clr-light-green-A200:#9bfb78;--clr-light-green-A400:#93cb51;--clr-light-green-A700:#758c18;--clr-lime:#cddc39;--clr-lime-50:#fafbf5;--clr-lime-50-tp:hsla(65,32%,70%,.1);--clr-lime-100:#f1f3da;--clr-lime-100-tp:hsla(65,45%,66%,.3);--clr-lime-200:#e8edb6;--clr-lime-200-tp:hsla(66,55%,62%,.5);--clr-lime-300:#dfe88b;--clr-lime-300-tp:rgba(204,216,82,.7);--clr-lime-400:#d7e45a;--clr-lime-400-tp:rgba(205,220,57,.9);--clr-lime-500:#c1d216;--clr-lime-600:#94a900;--clr-lime-700:#708500;--clr-lime-800:#556700;--clr-lime-900:#404f00;--clr-lime-A100:#ffffb4;--clr-lime-A200:#f3ff5d;--clr-lime-A400:#ccd800;--clr-lime-A700:#93a200;--clr-yellow:#ffeb3b;--clr-yellow-50:#fcfbf1;--clr-yellow-50-tp:hsla(54,56%,79%,.1);--clr-yellow-100:#faf7da;--clr-yellow-100-tp:hsla(54,72%,75%,.3);--clr-yellow-200:#faf4b9;--clr-yellow-200-tp:hsla(54,84%,70%,.5);--clr-yellow-300:#fcf18f;--clr-yellow-300-tp:rgba(249,233,87,.7);--clr-yellow-400:#ffef5e;--clr-yellow-400-tp:rgba(255,235,59,.9);--clr-yellow-500:#fce100;--clr-yellow-600:#e0b600;--clr-yellow-700:#bb9000;--clr-yellow-800:#977000;--clr-yellow-900:#775600;--clr-yellow-A100:#ffffc1;--clr-yellow-A200:#ffff6d;--clr-yellow-A400:#f4e000;--clr-yellow-A700:#bcab00;--clr-amber:#ffc107;--clr-amber-50:#fcfaf4;--clr-amber-50-tp:hsla(45,45%,68%,.1);--clr-amber-100:#f8efd2;--clr-amber-100-tp:hsla(45,63%,64%,.3);--clr-amber-200:#f9e4a4;--clr-amber-200-tp:rgba(233,192,71,.5);--clr-amber-300:#fcd86d;--clr-amber-300-tp:rgba(244,193,39,.7);--clr-amber-400:#ffcd2f;--clr-amber-400-tp:rgba(255,193,7,.9);--clr-amber-500:#fab400;--clr-amber-600:#da8700;--clr-amber-700:#b46500;--clr-amber-800:#8f4c00;--clr-amber-900:#703900;--clr-amber-A100:#ffffb4;--clr-amber-A200:#ffe85e;--clr-amber-A400:#fec000;--clr-amber-A700:#c18a00;--clr-orange:#ff9800;--clr-orange-50:#fcfaf6;--clr-orange-50-tp:hsla(36,38%,61%,.1);--clr-orange-100:#f8e7ce;--clr-orange-100-tp:rgba(208,159,87,.3);--clr-orange-200:#f9d49c;--clr-orange-200-tp:rgba(224,157,58,.5);--clr-orange-300:#ffc063;--clr-orange-300-tp:rgba(239,154,29,.7);--clr-orange-400:#ffab25;--clr-orange-400-tp:rgba(255,152,0,.9);--clr-orange-500:#f88c00;--clr-orange-600:#d46400;--clr-orange-700:#ad4800;--clr-orange-800:#8a3400;--clr-orange-900:#6b2600;--clr-orange-A100:#ffff80;--clr-orange-A200:#ffc846;--clr-orange-A400:#ff931b;--clr-orange-A700:#e84800;--clr-deep-orange:#ff5722;--clr-deep-orange-50:#fdf9f8;--clr-deep-orange-50-tp:hsla(14,28%,53%,.1);--clr-deep-orange-100:#fadad0;--clr-deep-orange-100-tp:rgba(190,110,85,.3);--clr-deep-orange-200:#ffb8a2;--clr-deep-orange-200-tp:rgba(212,103,68,.5);--clr-deep-orange-300:#ff9571;--clr-deep-orange-300-tp:rgba(233,95,51,.7);--clr-deep-orange-400:#ff7240;--clr-deep-orange-400-tp:rgba(255,87,34,.9);--clr-deep-orange-500:#f64e19;--clr-deep-orange-600:#cd3201;--clr-deep-orange-700:#a52100;--clr-deep-orange-800:#811600;--clr-deep-orange-900:#640f00;--clr-deep-orange-A100:#ffe095;--clr-deep-orange-A200:#ff905c;--clr-deep-orange-A400:#ff4739;--clr-deep-orange-A700:#f3000c;--clr-brown:#795548;--clr-brown-50:#fbfaf9;--clr-brown-50-tp:rgba(102,92,88,.1);--clr-brown-100:#e2d9d6;--clr-brown-100-tp:rgba(107,90,84,.3);--clr-brown-200:#cbb7b0;--clr-brown-200-tp:rgba(112,88,80,.5);--clr-brown-300:#b4968b;--clr-brown-300-tp:rgba(116,87,76,.7);--clr-brown-400:#9b7467;--clr-brown-400-tp:rgba(121,85,72,.9);--clr-brown-500:#724f42;--clr-brown-600:#573a2f;--clr-brown-700:#422b22;--clr-brown-800:#321f19;--clr-brown-900:#261712;--clr-brown-A100:#f3f2d5;--clr-brown-A200:#c6a795;--clr-brown-A400:#ad716a;--clr-brown-A700:#7b2933;--clr-grey:#9e9e9e;--clr-grey-50:#fafafa;--clr-grey-50-tp:hsla(0,0%,62%,.1);--clr-grey-100:#e8e8e8;--clr-grey-100-tp:hsla(0,0%,62%,.3);--clr-grey-200:#d6d6d6;--clr-grey-200-tp:hsla(0,0%,62%,.5);--clr-grey-300:#c4c4c4;--clr-grey-300-tp:hsla(0,0%,62%,.7);--clr-grey-400:#b1b1b1;--clr-grey-400-tp:hsla(0,0%,62%,.9);--clr-grey-500:#939393;--clr-grey-600:#6e6e6e;--clr-grey-700:#525252;--clr-grey-800:#3d3d3d;--clr-grey-900:#2d2d2d;--clr-grey-A100:#e9ffff;--clr-grey-A200:#c8dbd6;--clr-grey-A400:#b9a8ad;--clr-grey-A700:#946775;--clr-blue-grey:#607d8b;--clr-blue-grey-50:#f9fafa;--clr-blue-grey-50-tp:hsla(198,6%,46%,.1);--clr-blue-grey-100:#dbe1e4;--clr-blue-grey-100-tp:hsla(200,9%,46%,.3);--clr-blue-grey-200:#bcc9cf;--clr-blue-grey-200-tp:rgba(104,122,132,.5);--clr-blue-grey-300:#9bb1bb;--clr-blue-grey-300-tp:rgba(100,124,135,.7);--clr-blue-grey-400:#7c98a6;--clr-blue-grey-400-tp:rgba(96,125,139,.9);--clr-blue-grey-500:#587583;--clr-blue-grey-600:#3f5864;--clr-blue-grey-700:#2d424c;--clr-blue-grey-800:#21323a;--clr-blue-grey-900:#18252c;--clr-blue-grey-A100:#aeffff;--clr-blue-grey-A200:#91c8d3;--clr-blue-grey-A400:#8695a7;--clr-blue-grey-A700:#63546c;--clr-green-grey:#5e7d75;--clr-green-grey-50:#f9fafa;--clr-green-grey-50-tp:hsla(160,4%,45%,.1);--clr-green-grey-100:#dbe1e0;--clr-green-grey-100-tp:hsla(164,7%,44%,.3);--clr-green-grey-200:#bbc9c5;--clr-green-grey-200-tp:hsla(165,9%,44%,.5);--clr-green-grey-300:#9ab1ab;--clr-green-grey-300-tp:rgba(98,123,117,.7);--clr-green-grey-400:#7a9991;--clr-green-grey-400-tp:rgba(94,125,117,.9);--clr-green-grey-500:#56756d;--clr-green-grey-600:#3e5852;--clr-green-grey-700:#2c433d;--clr-green-grey-800:#20322d;--clr-green-grey-900:#172622;--clr-green-grey-A100:#aafffc;--clr-green-grey-A200:#8dcabb;--clr-green-grey-A400:#829791;--clr-green-grey-A700:#605557;--duration:0.16s;--easing:cubic-bezier(0.3,0,0.2,1);--pixel:max(0.0625 * var(--unit));--unit:1.6rem}html{font-size:62.5%}:root{--clr-black:var(--clr-grey-900);--clr-white:#fff;--danger-color:var(--clr-red-800);--muted-color:var(--clr-grey-400-tp);--primary-color:var(--clr-blue-800);--success-color:var(--clr-green-800);--warning-color:var(--clr-orange-800);--shadow-sharp:0 1px 1px rgba(0,0,0,.25),0 2px 2px rgba(0,0,0,.2),0 4px 4px rgba(0,0,0,.15),0 8px 8px rgba(0,0,0,.1),0 16px 16px rgba(0,0,0,.05);--shadow-diffuse:0 1px 1px rgba(0,0,0,.08),0 2px 2px rgba(0,0,0,.12),0 4px 4px rgba(0,0,0,.16),0 8px 8px rgba(0,0,0,.2);--shadow-dreamy:0 1px 2px rgba(0,0,0,.07),0 2px 4px rgba(0,0,0,.07),0 4px 8px rgba(0,0,0,.07),0 8px 16px rgba(0,0,0,.07),0 16px 32px rgba(0,0,0,.07),0 32px 64px rgba(0,0,0,.07);--shadow-shorter:0 1px 1px rgba(0,0,0,.11),0 2px 2px rgba(0,0,0,.11),0 4px 4px rgba(0,0,0,.11),0 6px 8px rgba(0,0,0,.11),0 8px 16px rgba(0,0,0,.11);--shadow-longer:0 2px 1px rgba(0,0,0,.09),0 4px 2px rgba(0,0,0,.09),0 8px 4px rgba(0,0,0,.09),0 16px 8px rgba(0,0,0,.09),0 32px 16px rgba(0,0,0,.09);--shadow-key-umbra-opacity:0.2;--shadow-key-penumbra-opacity:0.14;--shadow-ambient-shadow-opacity:0.12;--shadow:var(--shadow-4dp);--shadow-2dp:0 2px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity)),0 1px 5px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity));--shadow-3dp:0 3px 4px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 3px 3px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity)),0 1px 8px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity));--shadow-4dp:0 4px 5px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 1px 10px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 2px 4px -1px rgba(0,0,0,var(--shadow-key-umbra-opacity));--shadow-6dp:0 6px 10px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 1px 18px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 3px 5px -1px rgba(0,0,0,var(--shadow-key-umbra-opacity));--shadow-8dp:0 8px 10px 1px rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 3px 14px 2px rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 5px 5px -3px rgba(0,0,0,var(--shadow-key-umbra-opacity));--shadow-16dp:0 16px 24px 2px rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 6px 30px 5px rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 8px 10px -5px rgba(0,0,0,var(--shadow-key-umbra-opacity));--shadow-24dp:0 9px 46px 8px rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 11px 15px -7px rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 24px 38px 3px rgba(0,0,0,var(--shadow-key-umbra-opacity));--focus-shadow:0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);--inset-shadow-2dp:inset 0 1px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),inset 0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity));--text-shadow:0 0 1px rgba(0,0,0,.6),0 1px 2px rgba(0,0,0,.6)}.c-avatar{--text-size:0;--size:max(5 * var(--unit));--shadow:var(--shadow-2dp);border-radius:50%;box-shadow:var(--shadow);display:inline-block;height:var(--size);margin:0;overflow:hidden;text-align:center;user-select:none;vertical-align:middle;width:var(--size)}.c-avatar[style*=background]{--shadow:var(--inset-shadow-2dp);background-size:cover}.c-avatar :is(a,img){display:inline-block;height:inherit;width:inherit}.c-avatar img{object-fit:cover}.c-avatar:not([style*=background]) .c-avatar__link:empty,.c-avatar:not([style*=background]):empty{background-color:var(--clr-grey-300);border:.1rem solid var(--clr-grey-400);box-sizing:border-box;position:relative}.c-avatar:not([style*=background]) .c-avatar__link:empty:after,.c-avatar:not([style*=background]) .c-avatar__link:empty:before,.c-avatar:not([style*=background]):empty:after,.c-avatar:not([style*=background]):empty:before{background-color:var(--clr-grey-400-tp);content:\" \";display:inline-block;height:40vh;left:50%;position:absolute;top:50%;width:max(4 * var(--pixel))}.c-avatar:not([style*=background]) .c-avatar__link:empty:before,.c-avatar:not([style*=background]):empty:before{transform:translate(-50%,-50%) rotate(45deg)}.c-avatar:not([style*=background]) .c-avatar__link:empty:after,.c-avatar:not([style*=background]):empty:after{transform:translate(-50%,-50%) rotate(-45deg)}.c-panel:not(.s-clean) .c-avatar:not([style*=background]){--shadow:none}", ""]);
// Exports
var cAvatar = "c-avatar";
var cAvatarLink = "c-avatar__link";
var cPanel = "c-panel";
var sClean = "s-clean";
var ___CSS_LOADER_STYLE_SHEET___ = new CSSStyleSheet();
___CSS_LOADER_STYLE_SHEET___.replaceSync(___CSS_LOADER_EXPORT___.toString());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_STYLE_SHEET___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./src/lib/CustomElementDecorator.ts":
/*!*******************************************!*\
  !*** ./src/lib/CustomElementDecorator.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomElementDecorator": () => (/* binding */ CustomElementDecorator)
/* harmony export */ });
const validateTagName = (name) => {
    if (name.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};
const CustomElementDecorator = ({ tagName, template: tplString, stylesheet }) => {
    validateTagName(tagName);
    const template = document.createElement('template');
    template.innerHTML = tplString;
    template.setAttribute('name', `custom-element-${tagName}`);
    return (target) => {
        const Adapter = class extends target {
            tag;
            constructor(...params) {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/custom-element/avatar.ts ***!
  \**************************************/
/* unused harmony export AvatarMetadata */
/* harmony import */ var _lib_CustomElementDecorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/CustomElementDecorator */ "./src/lib/CustomElementDecorator.ts");
/* harmony import */ var _uikit_component_avatar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @uikit/component/avatar.css */ "../protosite-uikit/Package/assets/component/avatar.css");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// @ts-ignore

const AvatarMetadata = {
    tagName: _uikit_component_avatar_css__WEBPACK_IMPORTED_MODULE_1__.cAvatar.toString(),
    template: `
		<figure class="${_uikit_component_avatar_css__WEBPACK_IMPORTED_MODULE_1__.cAvatar} js-container">
			<a class="${_uikit_component_avatar_css__WEBPACK_IMPORTED_MODULE_1__.cAvatarLink} js-link">
			<slot class="js-slot"></slot>
			</a>
		</figure>
	`,
    stylesheet: _uikit_component_avatar_css__WEBPACK_IMPORTED_MODULE_1__["default"]
};
let AvatarElement = class AvatarElement extends HTMLElement {
    static observedAttributes = ["href" /* AttributeName.Href */, "src" /* AttributeName.Src */];
    refs = new Map();
    href;
    src;
    attributeChangedCallback(name, _previous, current) {
        switch (name) {
            case "href" /* AttributeName.Href */:
                this.href = current || false;
                break;
            case "src" /* AttributeName.Src */:
                this.src = current || false;
                break;
        }
    }
    constructor() {
        super();
        this.refs.set('container', this.querySelector('.js-container'));
        this.refs.set('link', this.querySelector('.js-link'));
        this.refs.set('slot', this.querySelector('.js-slot'));
        this.href = this.getAttribute('href') || false;
        this.src = this.getAttribute('src') || false;
    }
    connectedCallback() {
        this.refs.get('container');
        console.log(this.shadowRoot);
        console.log(this.children);
        console.log(this.refs);
    }
};
AvatarElement = __decorate([
    (0,_lib_CustomElementDecorator__WEBPACK_IMPORTED_MODULE_0__.CustomElementDecorator)(AvatarMetadata)
], AvatarElement);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (AvatarElement);

})();

/******/ })()
;