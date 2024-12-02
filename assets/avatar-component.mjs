var _AvatarComponent;
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateGetter(s, r, a) { return a(_assertClassBrand(s, r)); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
import { a, i as r } from "./fn.initShadowRoot-Cy1A_tkP.js";
var e = new CSSStyleSheet();
e.replaceSync(":host{--clr-background:hwb(180 98.433% 1.5665%);--clr-background-rgb:251,251,251;--clr-foreground:hwb(41.755 0% 88.01%);--clr-foreground-rgb:31,21,0;--clr-red:hwb(2.2621 13.335% 31.062%);--clr-red-rgb:176,39,34;--clr-pink:hwb(337.31 60.871% 5.7094%);--clr-pink-rgb:240,155,187;--clr-purple:hwb(311.02 17.795% 24.837%);--clr-purple-rgb:192,45,165;--clr-violet:hwb(277.93 10.859% 11.012%);--clr-violet-rgb:154,28,227;--clr-indigo:hwb(255.62 7.9752% 55.905%);--clr-indigo-rgb:44,20,112;--clr-blue:hwb(238.15 29.397% 25.247%);--clr-blue-rgb:75,79,191;--clr-light-blue:hwb(201.81 29.416% 0%);--clr-light-blue-rgb:75,190,255;--clr-cyan:hwb(178.67 20.79% 19.143%);--clr-cyan-rgb:53,206,203;--clr-teal:hwb(169.21 13.714% 41.016%);--clr-teal-rgb:35,150,130;--clr-green:hwb(147.91 0% 14.342%);--clr-green-rgb:0,220,78;--clr-light-green:hwb(119.31 43.073% 9.2249%);--clr-light-green-rgb:111,231,110;--clr-lime:hwb(83.61 17.663% 19.009%);--clr-lime-rgb:143,207,45;--clr-yellow:hwb(56.613 0% 8.5678%);--clr-yellow-rgb:233,220,0;--clr-amber:hwb(47.384 0% 3.2777%);--clr-amber-rgb:247,192,0;--clr-orange:hwb(37.23 11.527% 2.7793%);--clr-orange-rgb:248,165,29;--clr-deep-orange:hwb(25.463 7.9565% 2.2452%);--clr-deep-orange-rgb:249,117,20;--clr-brown:hwb(14.024 39.629% 23.31%);--clr-brown-rgb:196,123,101;--clr-gray:hwb(122.82 48.973% 50.184%);--clr-gray-rgb:125,127,125;--duration:0.16s;--easing:cubic-bezier(0.3,0,0.2,1);--pixel:max(0.0625 * var(--unit));--unit:1.6rem;--clr-black:var(--clr-foreground,#000);--clr-white:#fff;--shadow-sharp:0 1px 1px rgba(0,0,0,.25),0 2px 2px rgba(0,0,0,.2),0 4px 4px rgba(0,0,0,.15),0 8px 8px rgba(0,0,0,.1),0 16px 16px rgba(0,0,0,.05);--inset-shadow-sharp:inset 0 -2px 1px rgba(0,0,0,.25),inset 0 -3px 2px rgba(0,0,0,.2),inset 0 -4px 4px rgba(0,0,0,.15),inset 0 -9px 8px rgba(0,0,0,.1),inset 0 -18px 16px rgba(0,0,0,.05);--shadow-diffuse:0 1px 1px rgba(0,0,0,.08),0 2px 2px rgba(0,0,0,.12),0 4px 4px rgba(0,0,0,.16),0 8px 8px rgba(0,0,0,.2);--shadow-dreamy:0 1px 2px rgba(0,0,0,.07),0 2px 4px rgba(0,0,0,.07),0 4px 8px rgba(0,0,0,.07),0 8px 16px rgba(0,0,0,.07),0 16px 32px rgba(0,0,0,.07),0 32px 64px rgba(0,0,0,.07);--shadow-shorter:0 1px 1px rgba(0,0,0,.11),0 2px 2px rgba(0,0,0,.11),0 4px 4px rgba(0,0,0,.11),0 6px 8px rgba(0,0,0,.11),0 8px 16px rgba(0,0,0,.11);--shadow-longer:0 2px 1px rgba(0,0,0,.09),0 4px 2px rgba(0,0,0,.09),0 8px 4px rgba(0,0,0,.09),0 16px 8px rgba(0,0,0,.09),0 32px 16px rgba(0,0,0,.09);--shadow-key-umbra-opacity:0.2;--shadow-key-penumbra-opacity:0.14;--shadow-ambient-shadow-opacity:0.12;--shadow:var(--shadow-4dp);--shadow-2dp:0 2px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity)),0 1px 5px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity));--shadow-3dp:0 3px 4px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 3px 3px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity)),0 1px 8px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity));--shadow-4dp:0 4px 5px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 1px 10px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 2px 4px -1px rgba(0,0,0,var(--shadow-key-umbra-opacity));--shadow-6dp:0 6px 10px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 1px 18px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 3px 5px -1px rgba(0,0,0,var(--shadow-key-umbra-opacity));--shadow-8dp:0 8px 10px 1px rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 3px 14px 2px rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 5px 5px -3px rgba(0,0,0,var(--shadow-key-umbra-opacity));--shadow-16dp:0 16px 24px 2px rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 6px 30px 5px rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 8px 10px -5px rgba(0,0,0,var(--shadow-key-umbra-opacity));--shadow-24dp:0 9px 46px 8px rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 11px 15px -7px rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 24px 38px 3px rgba(0,0,0,var(--shadow-key-umbra-opacity));--focus-shadow:0 0 8px rgba(0,0,0,.18),0 8px 16px rgba(0,0,0,.36);--inset-shadow-2dp:inset 0 1px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),inset 0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity));--text-shadow:0 0 1px rgba(0,0,0,.6),0 1px 2px rgba(0,0,0,.6)}:is(.c-avatar,:host){--bg-color:transparent;--border:max(1 * var(--pixel)) solid var(--muted-color);--shadow:var(--shadow-2dp);--text-size:0;--size:max(5 * var(--unit));--size-xxs:max(1 * var(--unit));--size-xs:max(1.5 * var(--unit));--size-sm:max(2.5 * var(--unit));--size-md:max(6 * var(--unit));--size-lg:max(8 * var(--unit));--size-xl:max(12 * var(--unit));--size-xxl:max(16 * var(--unit))}:is(.c-avatar,:host [role=img]):not([style*=background-image]):empty{--bg-color:var(--clr-gray-100);--border:none;--shadow:none}.c-avatar,.c-avatar__link,:host :is([role=img],a){border-radius:50%;display:inline-block;height:var(--size);overflow:hidden;text-align:center;user-select:none;vertical-align:middle;width:var(--size)}:is(.c-avatar,:host [role=img]){background-color:var(--bg-color);border:var(--border);box-shadow:var(--shadow)}:is(.c-avatar,:host [role=img]) img{height:inherit;object-fit:cover;user-select:auto;width:inherit}:is(.c-avatar,:host [role=img])[style*=background-image]{background-size:cover}:is(.c-avatar,:host [role=img])[style*=background-image] img{display:none}:host{display:contents;pointer-events:none}:host>*{pointer-events:auto}:is(.c-avatar,:host [role=img]).s-xxs{--size:var(--size-xxs)}:is(.c-avatar,:host [role=img]).s-xs{--size:var(--size-xs)}:is(.c-avatar,:host [role=img]).s-sm{--size:var(--size-sm)}:is(.c-avatar,:host [role=img]).s-md{--size:var(--size-md)}:is(.c-avatar,:host [role=img]).s-lg{--size:var(--size-lg)}:is(.c-avatar,:host [role=img]).s-xl{--size:var(--size-xl)}:is(.c-avatar,:host [role=img]).s-xxl{--size:var(--size-xxl)}:is(.c-panel,:host-context(.c-panel)):not(.s-clean) .c-avatar{--shadow:var(--inset-shadow-2dp)}:is(.c-panel,:host-context(.c-panel)):not(.s-clean) .c-avatar img{position:relative;z-index:-1}");
var t = e,
  createElement = function createElement(a) {
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var e = document.createElement(a);
    return Object.entries(r).forEach(_ref => {
      var [a, r] = _ref;
      switch (a) {
        case "className":
          e.classList.add(r);
          break;
        case "classNames":
          r.forEach(a => e.classList.add(a));
          break;
        default:
          e.setAttribute(a, r);
      }
    }), e;
  },
  s = "c-avatar";
var _a = /*#__PURE__*/new WeakMap();
var _r = /*#__PURE__*/new WeakMap();
var _AvatarComponent_brand = /*#__PURE__*/new WeakSet();
class AvatarComponent extends HTMLElement {
  constructor() {
    var _e2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(), _classPrivateMethodInitSpec(this, _AvatarComponent_brand), _classPrivateFieldInitSpec(this, _a, new Map()), _classPrivateFieldInitSpec(this, _r, void 0), this, a.call(this, _e2), _classPrivateFieldSet(_r, this, r.call(this, {
      template: "<div role=img><slot></slot></div>",
      delegatesFocus: !0,
      serializable: !0
    }));
  }
  attributeChangedCallback(a) {
    if (!1 !== this.isConnected) switch (a) {
      case "href":
      case "target":
        _assertClassBrand(_AvatarComponent_brand, this, _e).call(this), _assertClassBrand(_AvatarComponent_brand, this, _t).call(this);
        break;
      case "size":
        _assertClassBrand(_AvatarComponent_brand, this, _s).call(this);
        break;
      case "img":
        _assertClassBrand(_AvatarComponent_brand, this, _t).call(this);
    }
  }
  connectedCallback() {
    _classPrivateFieldGet(_r, this).adoptedStyleSheets.push(t), _assertClassBrand(_AvatarComponent_brand, this, _s).call(this), _assertClassBrand(_AvatarComponent_brand, this, _e).call(this), _assertClassBrand(_AvatarComponent_brand, this, _t).call(this);
  }
}
_AvatarComponent = AvatarComponent;
function _s() {
  var a = this.getAttribute("size");
  a ? (console.assert(_AvatarComponent.sizes.includes(a), "Wrong size: \"".concat(a, "\"")), _classPrivateGetter(_AvatarComponent_brand, this, _get_i).classList.add("s-" + a)) : _AvatarComponent.sizes.forEach(a => _classPrivateGetter(_AvatarComponent_brand, this, _get_i).classList.remove("s-" + a));
}
function _e() {
  var _this$getAttribute;
  var a = this.getAttribute("href"),
    r = (_this$getAttribute = this.getAttribute("target")) !== null && _this$getAttribute !== void 0 ? _this$getAttribute : "_self";
  if (a) {
    if (_classPrivateFieldGet(_a, this).has("link")) {
      var _e3 = _classPrivateFieldGet(_a, this).get("link");
      _e3.setAttribute("href", a), _e3.setAttribute("target", r);
    } else _classPrivateFieldGet(_a, this).set("link", createElement("a", {
      className: "c-avatar__link",
      href: a,
      target: r
    })), this.appendChild(_classPrivateFieldGet(_a, this).get("link"));
  } else _classPrivateFieldGet(_a, this).has("link") && (_classPrivateFieldGet(_a, this).get("link").remove(), _classPrivateFieldGet(_a, this).delete("link"));
}
function _t() {
  var a = this.getAttribute("img");
  a ? _classPrivateGetter(_AvatarComponent_brand, this, _get_o) ? _classPrivateGetter(_AvatarComponent_brand, this, _get_i).style.backgroundImage = "url(".concat(a, ")") : (_classPrivateFieldGet(_a, this).has("image") ? _classPrivateFieldGet(_a, this).get("image").setAttribute("src", a) : _classPrivateFieldGet(_a, this).set("image", createElement("img", {
    src: a
  })), _classPrivateFieldGet(_a, this).has("link") ? _classPrivateFieldGet(_a, this).get("link").appendChild(_classPrivateFieldGet(_a, this).get("image")) : this.appendChild(_classPrivateFieldGet(_a, this).get("image"))) : _classPrivateFieldGet(_a, this).has("image") ? (_classPrivateFieldGet(_a, this).get("image").remove(), _classPrivateFieldGet(_a, this).delete("image")) : delete _classPrivateGetter(_AvatarComponent_brand, this, _get_i).style.backgroundImage;
}
function _get_o(_this) {
  return null !== _this.closest(".c-panel");
}
function _get_i(_this2) {
  return _classPrivateFieldGet(_r, _this2).firstChild;
}
_defineProperty(AvatarComponent, "observedAttributes", ["img", "size", "href", "target"]);
_defineProperty(AvatarComponent, "sizes", ["sm", "md", "lg", "xl", "xxs", "xs", "xxl"]);
customElements.define(s, AvatarComponent);
var i = customElements.get(s);
export { AvatarComponent, i as default };
