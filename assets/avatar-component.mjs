function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var a = "c-avatar",
  t = new CSSStyleSheet(':root{--clr-gray-100:#f3f3f3;--clr-gray-300:#c6c6c6;--clr-gray-400:#ababab}html{font-size:62.5%}:root{--muted-color:var(--clr-gray-400);--shadow-key-umbra-opacity:0.2;--shadow-key-penumbra-opacity:0.14;--shadow-ambient-shadow-opacity:0.12;--shadow:var(--shadow-4dp);--shadow-4dp:0 4px 5px 0 rgba(0,0,0,var(--shadow-key-penumbra-opacity)),0 1px 10px 0 rgba(0,0,0,var(--shadow-ambient-shadow-opacity)),0 2px 4px -1px rgba(0,0,0,var(--shadow-key-umbra-opacity))}.c-avatar{--bg-color:transparent;--border:max(1 * var(--pixel)) solid var(--muted-color);--shadow:none;--size:max(5 * var(--unit));background-color:var(--bg-color);border:var(--border);border-radius:50%;box-shadow:var(--shadow);display:inline-block;height:var(--size);margin:0;overflow:hidden;text-align:center;user-select:none;vertical-align:middle;width:var(--size)}.c-avatar :where(a,img){display:inline-block;height:inherit;width:inherit}.c-avatar img{object-fit:cover}:is(.c-avatar[style*=background-image]){background-size:cover}:is(.c-avatar:not([style*=background-image])):empty{--bg-color:var(--clr-gray-100);--border:none;--shadow:none}:is(.c-avatar:not([style*=background-image])) .c-avatar__link:empty{box-sizing:border-box;position:relative}:is(.c-avatar:not([style*=background-image])) .c-avatar__link:empty:before{background-color:var(--clr-gray-300);border-radius:50%;content:"";display:inline-block;height:40%;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:40%}'),
  e = a,
  r = "\n\t<figure class=\"".concat(a, "\">\n\t\t<slot name=\"image\"></slot>\n\t</figure>\n");
var _a = /*#__PURE__*/new WeakMap();
var _t = /*#__PURE__*/new WeakMap();
class AvatarComponent extends HTMLElement {
  constructor(a) {
    super(), _classPrivateFieldInitSpec(this, _a, new Map()), _classPrivateFieldInitSpec(this, _t, void 0), this, Object.assign(this.dataset, a), _classPrivateFieldSet(_t, this, this.attachShadow({
      mode: "closed"
    })), _classPrivateFieldGet(_t, this).innerHTML = r;
  }
  attributeChangedCallback(a, t, e) {
    if (!1 === this.isConnected) return;
    var r = _classPrivateFieldGet(_a, this).get("image");
    if ("data-image" === a) e ? r.setAttribute("src", e) : r.removeAttribute("src"), !t && e && this.appendChild(r), e || r.remove();
  }
  connectedCallback() {
    _classPrivateFieldGet(_t, this).adoptedStyleSheets.push(t), this.insertAdjacentHTML("afterbegin", '<img slot="image">'), _classPrivateFieldGet(_a, this).set("image", this.querySelector("img[slot=image]")), this.dataset.image ? _classPrivateFieldGet(_a, this).get("image").setAttribute("src", this.dataset.image) : _classPrivateFieldGet(_a, this).get("image").remove();
  }
}
_defineProperty(AvatarComponent, "observedAttributes", ["data-image", "data-link"]);
customElements.define(e, AvatarComponent);
var o = customElements.get(e);
export { o as default };
