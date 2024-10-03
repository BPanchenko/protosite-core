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
var e = new CSSStyleSheet();
e.replaceSync(':host{--clr-gray-100:#f3f3f3;--clr-gray-300:#c6c6c6;--clr-gray-400:#ababab;--unit:1.6rem}html{font-size:62.5%}:host{--muted-color:var(--clr-gray-400);--shadow-key-umbra-opacity:0.2;--shadow-key-penumbra-opacity:0.14;--shadow-ambient-shadow-opacity:0.12;--shadow:var(--shadow-4dp);--shadow-2dp:0 2px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity)),0 1px 5px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity));--shadow-4dp:0 4px 5px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 1px 10px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 2px 4px -1px rgba(0,0,0,var(--shadow-key-umbra-opacity));--inset-shadow-2dp:inset 0 1px 2px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),inset 0 3px 1px -2px rgba(0,0,0,var(--shadow-key-umbra-opacity))}.c-avatar{--bg-color:transparent;--border:max(1 * var(--pixel)) solid var(--muted-color);--shadow:var(--shadow-2dp);--size:max(5 * var(--unit))}.c-avatar:not([style*=background-image]):empty{--bg-color:var(--clr-gray-100);--border:none;--shadow:none}:host{display:contents;pointer-events:none}:host>*{pointer-events:auto}.c-avatar{background-color:var(--bg-color);border:var(--border);border-radius:50%;box-shadow:var(--shadow);display:inline-block;height:var(--size);margin:0;overflow:hidden;text-align:center;user-select:none;vertical-align:middle;width:var(--size)}.c-avatar :where(a,img){display:inline-block;height:inherit;width:inherit}.c-avatar img{object-fit:cover}.c-avatar[style*=background-image]{background-size:cover}.c-avatar:not([style*=background-image]) .c-avatar__link:empty{box-sizing:border-box;position:relative}.c-avatar:not([style*=background-image]) .c-avatar__link:empty:before{background-color:var(--clr-gray-300);border-radius:50%;content:"";display:inline-block;height:40%;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:40%}.c-avatar{--size-xxs:var(--unit);--size-xs:max(1.5 * var(--unit));--size-sm:max(2.5 * var(--unit));--size-md:max(6 * var(--unit));--size-lg:max(8 * var(--unit));--size-xl:max(12 * var(--unit));--size-xxl:max(16 * var(--unit))}.c-avatar.s-xxs{--size:var(--size-xxs)}.c-avatar.s-xs{--size:var(--size-xs)}.c-avatar.s-sm{--size:var(--size-sm)}.c-avatar.s-md{--size:var(--size-md)}.c-avatar.s-lg{--size:var(--size-lg)}.c-avatar.s-xl{--size:var(--size-xl)}.c-avatar.s-xxl{--size:var(--size-xxl)}:host-context(.c-panel:not(.s-clean)) .c-avatar{--shadow:var(--inset-shadow-2dp)}:host-context(.c-panel:not(.s-clean)) .c-avatar img{position:relative;z-index:-1}');
var t = e;
var a = Object.freeze({
  __proto__: null,
  cAvatar: "c-avatar",
  cAvatarLink: "c-avatar__link",
  cPanel: "c-panel",
  cssStyleSheet: t,
  cssText: null,
  default: t,
  sClean: "s-clean",
  sLg: "s-lg",
  sMd: "s-md",
  sSm: "s-sm",
  sXl: "s-xl",
  sXs: "s-xs",
  sXxl: "s-xxl",
  sXxs: "s-xxs"
});
function s(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var a = document.createElement(e);
  return Object.entries(t).forEach(_ref => {
    var [e, t] = _ref;
    return a.setAttribute(e, t);
  }), a;
}
Object.defineProperty(String.prototype, "capitalize", {
  value: function value() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: !1
});
var {
    cAvatar: r
  } = a,
  i = r,
  o = "<figure class=\"".concat(r, "\"><slot></slot></figure>");
var _e = /*#__PURE__*/new WeakMap();
var _t = /*#__PURE__*/new WeakMap();
var _AvatarComponent_brand = /*#__PURE__*/new WeakSet();
class AvatarComponent extends HTMLElement {
  constructor() {
    var _e2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(), _classPrivateMethodInitSpec(this, _AvatarComponent_brand), _classPrivateFieldInitSpec(this, _e, new Map()), _classPrivateFieldInitSpec(this, _t, void 0), this, _assertClassBrand(_AvatarComponent_brand, this, _a).call(this, _e2), _classPrivateFieldSet(_t, this, this.attachShadow({
      mode: "closed"
    })), _classPrivateFieldGet(_t, this).innerHTML = o;
  }
  attributeChangedCallback(e) {
    if (!1 !== this.isConnected) switch (e) {
      case "href":
      case "target":
        _assertClassBrand(_AvatarComponent_brand, this, _s).call(this), _assertClassBrand(_AvatarComponent_brand, this, _r).call(this);
        break;
      case "size":
        _assertClassBrand(_AvatarComponent_brand, this, _i).call(this);
        break;
      case "src":
        _assertClassBrand(_AvatarComponent_brand, this, _r).call(this);
    }
  }
  connectedCallback() {
    _classPrivateFieldGet(_t, this).adoptedStyleSheets.push(t), _assertClassBrand(_AvatarComponent_brand, this, _i).call(this), _assertClassBrand(_AvatarComponent_brand, this, _s).call(this), _assertClassBrand(_AvatarComponent_brand, this, _r).call(this);
  }
}
_AvatarComponent = AvatarComponent;
function _a(e) {
  Object.entries(e).forEach(_ref2 => {
    var [e, t] = _ref2;
    return this.setAttribute(e, t);
  });
}
function _i() {
  var e = this.getAttribute("size");
  e ? (console.assert(_AvatarComponent.sizes.includes(e), "Wrong size: \"".concat(e, "\"")), _classPrivateGetter(_AvatarComponent_brand, this, _get_o).classList.add("s-" + e)) : _AvatarComponent.sizes.forEach(e => _classPrivateGetter(_AvatarComponent_brand, this, _get_o).classList.remove("s-" + e));
}
function _s() {
  var _this$getAttribute;
  var e = this.getAttribute("href"),
    t = (_this$getAttribute = this.getAttribute("target")) !== null && _this$getAttribute !== void 0 ? _this$getAttribute : "_self";
  if (e) {
    if (_classPrivateFieldGet(_e, this).has("link")) {
      var _a2 = _classPrivateFieldGet(_e, this).get("link");
      _a2.setAttribute("href", e), _a2.setAttribute("target", t);
    } else _classPrivateFieldGet(_e, this).set("link", s("a", {
      href: e,
      target: t
    })), this.appendChild(_classPrivateFieldGet(_e, this).get("link"));
  } else _classPrivateFieldGet(_e, this).has("link") && (_classPrivateFieldGet(_e, this).get("link").remove(), _classPrivateFieldGet(_e, this).delete("link"));
}
function _r() {
  var e = this.getAttribute("src");
  e ? _classPrivateGetter(_AvatarComponent_brand, this, _get_n) ? _classPrivateGetter(_AvatarComponent_brand, this, _get_o).style.backgroundImage = "url(".concat(e, ")") : (_classPrivateFieldGet(_e, this).has("image") ? _classPrivateFieldGet(_e, this).get("image").setAttribute("src", e) : _classPrivateFieldGet(_e, this).set("image", s("img", {
    src: e
  })), _classPrivateFieldGet(_e, this).has("link") ? _classPrivateFieldGet(_e, this).get("link").appendChild(_classPrivateFieldGet(_e, this).get("image")) : this.appendChild(_classPrivateFieldGet(_e, this).get("image"))) : _classPrivateFieldGet(_e, this).has("image") ? (_classPrivateFieldGet(_e, this).get("image").remove(), _classPrivateFieldGet(_e, this).delete("image")) : delete _classPrivateGetter(_AvatarComponent_brand, this, _get_o).style.backgroundImage;
}
function _get_n(_this) {
  return null !== _this.closest(".c-panel");
}
function _get_o(_this2) {
  return _classPrivateFieldGet(_t, _this2).firstChild;
}
_defineProperty(AvatarComponent, "observedAttributes", ["src", "size", "href", "target"]);
_defineProperty(AvatarComponent, "sizes", ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"]);
customElements.define(i, AvatarComponent);
var n = customElements.get(i);
export { n as default };
