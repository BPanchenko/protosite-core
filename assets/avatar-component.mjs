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
import { S as t } from "./constants-CPDwL6lB.js";
var e = new CSSStyleSheet();
e.replaceSync(':host{--clr-gray-100:#f3f3f3;--clr-gray-300:#c6c6c6;--unit:1.6rem;--clr-white:#fff;--bg-color:var(--clr-white);--shadow-key-umbra-opacity:0.2;--shadow-key-penumbra-opacity:0.14;--shadow-ambient-shadow-opacity:0.12;--shadow:var(--shadow-4dp);--shadow-2dp:0 2px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity)),0 1px 5px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity));--shadow-4dp:0 4px 5px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 1px 10px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 2px 4px -1px rgba(0,0,0,var(--shadow-key-umbra-opacity));--inset-shadow-2dp:inset 0 1px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),inset 0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity))}:host{--bg-color:transparent;--border:max(1 * var(--pixel)) solid var(--muted-color);--shadow:var(--shadow-2dp);--size:max(5 * var(--unit))}:host:not([style*=background-image]):empty{--bg-color:var(--clr-gray-100);--border:none;--shadow:none}:host{display:contents;pointer-events:none}:host>*{pointer-events:auto}:host{background-color:var(--bg-color);border:var(--border);border-radius:50%;box-shadow:var(--shadow);display:inline-block;height:var(--size);margin:0;overflow:hidden;text-align:center;user-select:none;vertical-align:middle;width:var(--size)}:host :where(a,img){display:inline-block;height:inherit;width:inherit}:host img{object-fit:cover}:host[style*=background-image]{background-size:cover}:host:not([style*=background-image]) :host__link:empty{box-sizing:border-box;position:relative}:host:not([style*=background-image]) :host__link:empty:before{background-color:var(--clr-gray-300);border-radius:50%;content:"";display:inline-block;height:40%;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:40%}:host{--size-xxs:var(--unit);--size-xs:max(1.5 * var(--unit));--size-sm:max(2.5 * var(--unit));--size-md:max(6 * var(--unit));--size-lg:max(8 * var(--unit));--size-xl:max(12 * var(--unit));--size-xxl:max(16 * var(--unit))}:host.s-xxs{--size:var(--size-xxs)}:host.s-xs{--size:var(--size-xs)}:host.s-sm{--size:var(--size-sm)}:host.s-md{--size:var(--size-md)}:host.s-lg{--size:var(--size-lg)}:host.s-xl{--size:var(--size-xl)}:host.s-xxl{--size:var(--size-xxl)}:host-context(.c-panel:not(.s-clean)) :host{--shadow:var(--inset-shadow-2dp)}:host-context(.c-panel:not(.s-clean)) :host img{position:relative;z-index:-1}');
var s = "c-avatar",
  a = e;
function i(t) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var s = document.createElement(t);
  return Object.entries(e).forEach(_ref => {
    var [t, e] = _ref;
    return s.setAttribute(t, e);
  }), s;
}
Object.defineProperty(String.prototype, "capitalize", {
  value: function value() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: !1
});
var r = s,
  o = "<figure class=\"".concat(s, "\"><slot></slot></figure>");
var _t = /*#__PURE__*/new WeakMap();
var _e = /*#__PURE__*/new WeakMap();
var _AvatarComponent_brand = /*#__PURE__*/new WeakSet();
class AvatarComponent extends HTMLElement {
  constructor() {
    var _t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(), _classPrivateMethodInitSpec(this, _AvatarComponent_brand), _classPrivateFieldInitSpec(this, _t, new Map()), _classPrivateFieldInitSpec(this, _e, void 0), this, _assertClassBrand(_AvatarComponent_brand, this, _s).call(this, _t2), _classPrivateFieldSet(_e, this, this.attachShadow({
      mode: "closed"
    })), _classPrivateFieldGet(_e, this).innerHTML = o;
  }
  attributeChangedCallback(t) {
    if (!1 !== this.isConnected) switch (t) {
      case "href":
      case "target":
        _assertClassBrand(_AvatarComponent_brand, this, _a).call(this), _assertClassBrand(_AvatarComponent_brand, this, _i).call(this);
        break;
      case "size":
        _assertClassBrand(_AvatarComponent_brand, this, _r).call(this);
        break;
      case "img":
        _assertClassBrand(_AvatarComponent_brand, this, _i).call(this);
    }
  }
  connectedCallback() {
    _classPrivateFieldGet(_e, this).adoptedStyleSheets.push(a), _assertClassBrand(_AvatarComponent_brand, this, _r).call(this), _assertClassBrand(_AvatarComponent_brand, this, _a).call(this), _assertClassBrand(_AvatarComponent_brand, this, _i).call(this);
  }
}
_AvatarComponent = AvatarComponent;
function _s() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var e = _AvatarComponent.observedAttributes,
    s = Object.entries(t),
    a = s.filter(_ref2 => {
      var [t] = _ref2;
      return !1 === e.includes(t);
    });
  s.filter(_ref3 => {
    var [t] = _ref3;
    return e.includes(t);
  }).forEach(_ref4 => {
    var [t, e] = _ref4;
    return this.setAttribute(t, e);
  }), a.length > 0 && console.warn("Unsupported attributes: \"".concat(a.map(_ref5 => {
    var [t] = _ref5;
    return t;
  }).join(", "), "\""));
}
function _r() {
  var t = this.getAttribute("size");
  t ? (console.assert(_AvatarComponent.sizes.includes(t), "Wrong size: \"".concat(t, "\"")), _classPrivateGetter(_AvatarComponent_brand, this, _get_o).classList.add("s-" + t)) : _AvatarComponent.sizes.forEach(t => _classPrivateGetter(_AvatarComponent_brand, this, _get_o).classList.remove("s-" + t));
}
function _a() {
  var _this$getAttribute;
  var t = this.getAttribute("href"),
    e = (_this$getAttribute = this.getAttribute("target")) !== null && _this$getAttribute !== void 0 ? _this$getAttribute : "_self";
  if (t) {
    if (_classPrivateFieldGet(_t, this).has("link")) {
      var _s2 = _classPrivateFieldGet(_t, this).get("link");
      _s2.setAttribute("href", t), _s2.setAttribute("target", e);
    } else _classPrivateFieldGet(_t, this).set("link", i("a", {
      href: t,
      target: e
    })), this.appendChild(_classPrivateFieldGet(_t, this).get("link"));
  } else _classPrivateFieldGet(_t, this).has("link") && (_classPrivateFieldGet(_t, this).get("link").remove(), _classPrivateFieldGet(_t, this).delete("link"));
}
function _i() {
  var t = this.getAttribute("img");
  t ? _classPrivateGetter(_AvatarComponent_brand, this, _get_n) ? _classPrivateGetter(_AvatarComponent_brand, this, _get_o).style.backgroundImage = "url(".concat(t, ")") : (_classPrivateFieldGet(_t, this).has("image") ? _classPrivateFieldGet(_t, this).get("image").setAttribute("src", t) : _classPrivateFieldGet(_t, this).set("image", i("img", {
    src: t
  })), _classPrivateFieldGet(_t, this).has("link") ? _classPrivateFieldGet(_t, this).get("link").appendChild(_classPrivateFieldGet(_t, this).get("image")) : this.appendChild(_classPrivateFieldGet(_t, this).get("image"))) : _classPrivateFieldGet(_t, this).has("image") ? (_classPrivateFieldGet(_t, this).get("image").remove(), _classPrivateFieldGet(_t, this).delete("image")) : delete _classPrivateGetter(_AvatarComponent_brand, this, _get_o).style.backgroundImage;
}
function _get_n(_this) {
  return null !== _this.closest(".c-panel");
}
function _get_o(_this2) {
  return _classPrivateFieldGet(_e, _this2).firstChild;
}
_defineProperty(AvatarComponent, "observedAttributes", ["img", "size", "href", "target"]);
_defineProperty(AvatarComponent, "sizes", t);
customElements.define(r, AvatarComponent);
var n = customElements.get(r);
export { AvatarComponent, n as default };
