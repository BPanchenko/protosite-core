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
import { S as e, a as t } from "./constants-BfgzLc0v.js";
var a = new CSSStyleSheet();
a.replaceSync(":host{--shadow-key-umbra-opacity:0.2;--shadow-key-penumbra-opacity:0.14;--shadow-ambient-shadow-opacity:0.12;--shadow:var(--shadow-4dp);--shadow-2dp:0 2px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity)),0 1px 5px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity));--shadow-4dp:0 4px 5px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 1px 10px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 2px 4px -1px rgba(0,0,0,var(--shadow-key-umbra-opacity));--inset-shadow-2dp:inset 0 1px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),inset 0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity))}:is(.c-avatar,:host){--bg-color:transparent;--border:max(1 * var(--pixel)) solid var(--muted-color);--shadow:var(--shadow-2dp);--size:max(5 * var(--unit));--size-xxs:max(1 * var(--unit));--size-xs:max(1.5 * var(--unit));--size-sm:max(2.5 * var(--unit));--size-md:max(6 * var(--unit));--size-lg:max(8 * var(--unit));--size-xl:max(12 * var(--unit));--size-xxl:max(16 * var(--unit))}:is(.c-avatar,:host [role=img]):not([style*=background-image]):empty{--bg-color:var(--clr-gray-100);--border:none;--shadow:none}.c-avatar,.c-avatar__link,:host :is([role=img],a){border-radius:50%;display:inline-block;height:var(--size);overflow:hidden;text-align:center;user-select:none;vertical-align:middle;width:var(--size)}:is(.c-avatar,:host [role=img]){background-color:var(--bg-color);border:var(--border);box-shadow:var(--shadow)}:is(.c-avatar,:host [role=img]) img{height:inherit;object-fit:cover;user-select:auto;width:inherit}:is(.c-avatar,:host [role=img])[style*=background-image]{background-size:cover}:is(.c-avatar,:host [role=img])[style*=background-image] img{display:none}:host{display:contents;pointer-events:none}:host>*{pointer-events:auto}:is(.c-avatar,:host [role=img]).s-xxs{--size:var(--size-xxs)}:is(.c-avatar,:host [role=img]).s-xs{--size:var(--size-xs)}:is(.c-avatar,:host [role=img]).s-sm{--size:var(--size-sm)}:is(.c-avatar,:host [role=img]).s-md{--size:var(--size-md)}:is(.c-avatar,:host [role=img]).s-lg{--size:var(--size-lg)}:is(.c-avatar,:host [role=img]).s-xl{--size:var(--size-xl)}:is(.c-avatar,:host [role=img]).s-xxl{--size:var(--size-xxl)}:is(.c-panel,:host-context(.c-panel)):not(.s-clean) .c-avatar{--shadow:var(--inset-shadow-2dp)}:is(.c-panel,:host-context(.c-panel)):not(.s-clean) .c-avatar img{position:relative;z-index:-1}");
var s = a,
  i = "c-avatar";
var _e = /*#__PURE__*/new WeakMap();
var _t = /*#__PURE__*/new WeakMap();
var _AvatarComponent_brand = /*#__PURE__*/new WeakSet();
class AvatarComponent extends HTMLElement {
  constructor() {
    var _e2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(), _classPrivateMethodInitSpec(this, _AvatarComponent_brand), _classPrivateFieldInitSpec(this, _e, new Map()), _classPrivateFieldInitSpec(this, _t, void 0), this, _assertClassBrand(_AvatarComponent_brand, this, _a).call(this, _e2), _classPrivateFieldSet(_t, this, this.attachShadow({
      mode: "closed"
    })), _classPrivateFieldGet(_t, this).innerHTML = "<div role=img><slot></slot></div>";
  }
  attributeChangedCallback(e) {
    if (!1 !== this.isConnected) switch (e) {
      case "href":
      case "target":
        _assertClassBrand(_AvatarComponent_brand, this, _s).call(this), _assertClassBrand(_AvatarComponent_brand, this, _i).call(this);
        break;
      case "size":
        _assertClassBrand(_AvatarComponent_brand, this, _r).call(this);
        break;
      case "img":
        _assertClassBrand(_AvatarComponent_brand, this, _i).call(this);
    }
  }
  connectedCallback() {
    _classPrivateFieldGet(_t, this).adoptedStyleSheets.push(s), _assertClassBrand(_AvatarComponent_brand, this, _r).call(this), _assertClassBrand(_AvatarComponent_brand, this, _s).call(this), _assertClassBrand(_AvatarComponent_brand, this, _i).call(this);
  }
}
_AvatarComponent = AvatarComponent;
function _a() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var t = _AvatarComponent.observedAttributes,
    a = Object.entries(e),
    s = a.filter(_ref => {
      var [e] = _ref;
      return !1 === t.includes(e);
    });
  a.filter(_ref2 => {
    var [e] = _ref2;
    return t.includes(e);
  }).forEach(_ref3 => {
    var [e, t] = _ref3;
    return this.setAttribute(e, t);
  }), s.length > 0 && console.warn("Unsupported attributes: \"".concat(s.map(_ref4 => {
    var [e] = _ref4;
    return e;
  }).join(", "), "\""));
}
function _r() {
  var e = this.getAttribute("size");
  e ? (console.assert(_AvatarComponent.sizes.includes(e), "Wrong size: \"".concat(e, "\"")), _classPrivateGetter(_AvatarComponent_brand, this, _get_o).classList.add("s-" + e)) : _AvatarComponent.sizes.forEach(e => _classPrivateGetter(_AvatarComponent_brand, this, _get_o).classList.remove("s-" + e));
}
function _s() {
  var _this$getAttribute;
  var e = this.getAttribute("href"),
    a = (_this$getAttribute = this.getAttribute("target")) !== null && _this$getAttribute !== void 0 ? _this$getAttribute : "_self";
  if (e) {
    if (_classPrivateFieldGet(_e, this).has("link")) {
      var _t2 = _classPrivateFieldGet(_e, this).get("link");
      _t2.setAttribute("href", e), _t2.setAttribute("target", a);
    } else _classPrivateFieldGet(_e, this).set("link", t("a", {
      className: "c-avatar__link",
      href: e,
      target: a
    })), this.appendChild(_classPrivateFieldGet(_e, this).get("link"));
  } else _classPrivateFieldGet(_e, this).has("link") && (_classPrivateFieldGet(_e, this).get("link").remove(), _classPrivateFieldGet(_e, this).delete("link"));
}
function _i() {
  var e = this.getAttribute("img");
  e ? _classPrivateGetter(_AvatarComponent_brand, this, _get_n) ? _classPrivateGetter(_AvatarComponent_brand, this, _get_o).style.backgroundImage = "url(".concat(e, ")") : (_classPrivateFieldGet(_e, this).has("image") ? _classPrivateFieldGet(_e, this).get("image").setAttribute("src", e) : _classPrivateFieldGet(_e, this).set("image", t("img", {
    src: e
  })), _classPrivateFieldGet(_e, this).has("link") ? _classPrivateFieldGet(_e, this).get("link").appendChild(_classPrivateFieldGet(_e, this).get("image")) : this.appendChild(_classPrivateFieldGet(_e, this).get("image"))) : _classPrivateFieldGet(_e, this).has("image") ? (_classPrivateFieldGet(_e, this).get("image").remove(), _classPrivateFieldGet(_e, this).delete("image")) : delete _classPrivateGetter(_AvatarComponent_brand, this, _get_o).style.backgroundImage;
}
function _get_n(_this) {
  return null !== _this.closest(".c-panel");
}
function _get_o(_this2) {
  return _classPrivateFieldGet(_t, _this2).firstChild;
}
_defineProperty(AvatarComponent, "observedAttributes", ["img", "size", "href", "target"]);
_defineProperty(AvatarComponent, "sizes", e);
customElements.define(i, AvatarComponent);
var r = customElements.get(i);
export { AvatarComponent, r as default };
