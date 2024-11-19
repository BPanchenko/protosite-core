function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
new CSSStyleSheet().replaceSync(':host{--duration:0.16s;--easing:cubic-bezier(0.3,0,0.2,1);--unit:1.6rem;--clr-white:#fff;--font-normal:400;--text-md:max(1.125 * var(--unit));--icon-code:"\\e231";--icon-color:var(--text-color,currentColor);--icon-font:"Iconic";--icon-size:var(--unit,16px);--icon-weight:var(--font-normal,400);--clr-background:hwb(180 98.433% 1.5665%);--clr-foreground:hwb(41.755 0% 88.01%);--clr-violet-700:hwb(280.27 0% 57.037%);--clr-blue-400:hwb(235.71 40.858% 10.42%);--clr-gray-50:hwb(122.77 92.825% 6.2277%);--clr-gray-100:hwb(122.77 86.367% 12.698%);--clr-gray-300:hwb(122.8 61.472% 37.65%);--clr-gray-400:hwb(122.81 49.654% 49.5%);--clr-gray-800:hwb(123.07 8.1825% 91.173%);--space:max(1.5 * var(--unit));--space-sm:max(0.5 * var(--unit))}body{--bg-color:var(--clr-gray-100);--border-color:var(--clr-gray-800);--default-text-color:var(--clr-gray-800);--text-color:var(--default-text-color)}:host{--field-radius:max(4 * var(--pixel));--field-height:max(2.5 * var(--unit));--field-shadow:inset 0 0 max(2 * var(--pixel)) var(--clr-gray-400,#d3d3d3),0 0 0 var(--clr-blue-400,#d3d3d3);--field-space-horz:max(1 * var(--space));--field-space-vert:max(0.125 * var(--unit)) max(0.125 * var(--unit))}:is(.c-select-field,:host){--bg-color:var(--clr-background);--border-color:transparent;--field-shadow:var(--shadow-sharp);--field-space-horz:max(1 * var(--space)) max(0.75 * var(--space));--listbox-space:max(0.1875 * var(--space));--marker-glyph:"\\e18a";--selection-glyph:"\\e035"}:is(.c-select-field,:host) [role=button]{--icon-code:var(--marker-glyph);--icon-size:var(--text-md)}:is(.c-select-field,:host) [role=listbox]{--bg-color:var(--clr-white);--border:none;--text-color:var(--clr-foreground);--space:var(--listbox-space)}:is(.c-select-field,:host) [role=option]{--bg-color:transparent;--icon-code:"";--space-horz:max(2 * var(--unit)) max(0.75 * var(--unit))}:is(.c-select-field,:host) [role=option]:hover{--bg-color:var(--clr-gray-50)}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]){--icon-code:var(--selection-glyph);--text-color:var(--clr-gray-300)}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]):hover{--bg-color:transparent}:is(.c-select-field:has([role=button][aria-expanded=false]),:host(:collapsed)){--marker-glyph:"\\e18a"}:is(.c-select-field:has([role=button][aria-expanded=true]),:host(:expanded)){--marker-glyph:"\\e18d"}:host{outline:max(3 * var(--pixel)) dashed var(--clr-violet-700)}:host>*{pointer-events:none}:host>[role][aria-activedescendant]{pointer-events:auto}:is(.c-select-field,:host){border-color:var(--border-color);border-radius:var(--field-radius);border-style:solid;border-width:max(1 * var(--pixel));box-shadow:var(--field-shadow);display:inline-block;position:relative;vertical-align:middle;width:inherit}:is(.c-select-field,:host):expanded{outline:max(3 * var(--pixel)) dashed var(--clr-violet-700)}:is(.c-select-field,:host) [role=button]{container-name:icon-bearer}:is(.c-select-field,:host) [role=button]:after,:is(.c-select-field,:host) [role=button]:before{box-sizing:content-box;color:var(--icon-color);display:inline-block;font-family:var(--icon-font);font-size:var(--icon-size);font-style:normal;font-weight:var(--icon-weight);height:var(--icon-size);line-height:1;text-align:center;text-rendering:geometricPrecision;vertical-align:baseline;width:var(--icon-size);speak:none}:is(.c-select-field,:host) [role=button]:before{content:var(--icon-code)}:is(.c-select-field,:host) [role=button][data-glyph^="\\\\"]:before{content:attr(data-glyph)}:is(.c-select-field,:host) [role=button]:empty{height:var(--icon-size);width:var(--icon-size)}:is(.c-select-field,:host) [role=button]{align-items:center;background-color:var(--bg-color);border-radius:inherit;box-sizing:border-box;column-gap:max(.625 * var(--space));cursor:pointer;display:inline-flex;min-height:calc(max(1 * var(--field-height)) - max(2 * var(--pixel)));padding-block:var(--field-space-vert);padding-inline:var(--field-space-horz);width:inherit}:is(.c-select-field,:host) [role=button]:after{content:var(--marker-glyph)}:is(.c-select-field,:host) [role=button]:before{all:unset}:is(.c-select-field,:host) [role=button] [aria-label]:before{content:attr(aria-label) " "}:is(.c-select-field,:host) [role=listbox]{position:absolute;right:0;top:calc(max(1 * var(--field-height)) + max(1 * var(--space-xs)));z-index:2;interpolate-size:allow-keywords;background-color:var(--bg-color);border:var(--border);border-radius:max(1 * var(--field-radius));box-shadow:var(--field-shadow);height:100%;min-height:max-content;min-width:max-content;padding:var(--space);text-align:right}:is(.c-select-field,:host) [role=listbox] [role=option]{background-color:var(--bg-color);cursor:pointer;padding-inline:var(--space-horz);transition:background-color .16s ease}:is(.c-select-field,:host) [role=listbox] [role=option]:first-of-type{border-radius:var(--space-sm) var(--space-sm) 0 0}:is(.c-select-field,:host) [role=listbox] [role=option]:last-of-type{border-radius:0 0 var(--space-sm) var(--space-sm)}:is(.c-select-field,:host) [role=listbox] [role=option]:is([aria-checked=true],[aria-selected=true]){container-name:icon-bearer}:is(.c-select-field,:host) [role=listbox] [role=option]:is([aria-checked=true],[aria-selected=true]):after,:is(.c-select-field,:host) [role=listbox] [role=option]:is([aria-checked=true],[aria-selected=true]):before{box-sizing:content-box;color:var(--icon-color);display:inline-block;font-family:var(--icon-font);font-size:var(--icon-size);font-style:normal;font-weight:var(--icon-weight);height:var(--icon-size);line-height:1;text-align:center;text-rendering:geometricPrecision;vertical-align:baseline;width:var(--icon-size);speak:none}:is(.c-select-field,:host) [role=listbox] [role=option]:is([aria-checked=true],[aria-selected=true]):before{content:var(--icon-code)}:is(.c-select-field,:host) [role=listbox] [role=option][data-glyph^="\\\\"]:is([aria-checked=true],[aria-selected=true]):before{content:attr(data-glyph)}:is(.c-select-field,:host) [role=listbox] [role=option]:is([aria-checked=true],[aria-selected=true]):empty{height:var(--icon-size);width:var(--icon-size)}:is(.c-select-field,:host) [role=listbox] [role=option]:is([aria-checked=true],[aria-selected=true]){align-items:center;cursor:default;display:flex;gap:.5em;justify-content:space-between}:is(.c-select-field,:host) [role=listbox] [role=option]:is([aria-checked=true],[aria-selected=true]):before{all:unset}:is(.c-select-field,:host) [role=listbox] [role=option]:is([aria-checked=true],[aria-selected=true]):after{content:var(--icon-code)}');
var e = new Map();
function t(t) {
  if (e.has(t)) return e.get(t);
  var r = t.length;
  var i = 0,
    o = 0,
    a = 0;
  var s = [];
  for (var _e = 0; _e < r; _e += 1) {
    var _r = t[_e],
      _l = t[_e + 1],
      _n = t[_e - 1];
    "{" === _r && "{" === _l && "\\" !== _n ? (a += 1, 1 === a && (o = _e), _e += 1) : "}" === _r && "}" === _l && "\\" !== _n && a && (a -= 1, 0 === a && (o > i && (s.push(Object.freeze({
      type: "string",
      start: i,
      end: o,
      value: t.slice(i, o)
    })), i = o), s.push(Object.freeze({
      type: "part",
      start: o,
      end: _e + 2,
      value: t.slice(i + 2, _e).trim()
    })), _e += 1, i = _e + 1));
  }
  return i < r && s.push(Object.freeze({
    type: "string",
    start: i,
    end: r,
    value: t.slice(i, r)
  })), e.set(t, Object.freeze(s)), e.get(t);
}
var r = new WeakMap(),
  i = new WeakMap();
class AttributeTemplatePart {
  constructor(e, t) {
    this.expression = t, r.set(this, e), e.updateParent("");
  }
  get attributeName() {
    return r.get(this).attr.name;
  }
  get attributeNamespace() {
    return r.get(this).attr.namespaceURI;
  }
  get value() {
    return i.get(this);
  }
  set value(e) {
    i.set(this, e || ""), r.get(this).updateParent(e);
  }
  get element() {
    return r.get(this).element;
  }
  get booleanValue() {
    return r.get(this).booleanValue;
  }
  set booleanValue(e) {
    r.get(this).booleanValue = e;
  }
}
class AttributeValueSetter {
  constructor(e, t) {
    this.element = e, this.attr = t, this.partList = [];
  }
  get booleanValue() {
    return this.element.hasAttributeNS(this.attr.namespaceURI, this.attr.name);
  }
  set booleanValue(e) {
    if (1 !== this.partList.length) throw new DOMException("Operation not supported", "NotSupportedError");
    this.partList[0].value = e ? "" : null;
  }
  append(e) {
    this.partList.push(e);
  }
  updateParent(e) {
    if (1 === this.partList.length && null === e) this.element.removeAttributeNS(this.attr.namespaceURI, this.attr.name);else {
      var _e2 = this.partList.map(e => "string" == typeof e ? e : e.value).join("");
      this.element.setAttributeNS(this.attr.namespaceURI, this.attr.name, _e2);
    }
  }
}
var o = new WeakMap();
class NodeTemplatePart {
  constructor(e, t) {
    this.expression = t, o.set(this, [e]), e.textContent = "";
  }
  get value() {
    return o.get(this).map(e => e.textContent).join("");
  }
  set value(e) {
    this.replace(e);
  }
  get previousSibling() {
    return o.get(this)[0].previousSibling;
  }
  get nextSibling() {
    return o.get(this)[o.get(this).length - 1].nextSibling;
  }
  replace() {
    for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
      e[_key] = arguments[_key];
    }
    var t = e.map(e => "string" == typeof e ? new Text(e) : e);
    t.length || t.push(new Text("")), o.get(this)[0].before(...t);
    for (var _e3 of o.get(this)) _e3.remove();
    o.set(this, t);
  }
}
var a = (s = function s(e, t) {
  e.value = t instanceof Element ? t : String(t);
}, {
  processCallback(e, t, r) {
    var i;
    if ("object" == typeof r && r) for (var _e4 of t) if (_e4.expression in r) {
      var _t = null !== (i = r[_e4.expression]) && void 0 !== i ? i : "";
      s(_e4, _t);
    }
  }
});
var s;
var l = new WeakMap(),
  n = new WeakMap();
class TemplateInstance extends (globalThis.DocumentFragment || EventTarget) {
  constructor(e, r) {
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : a;
    var o, s;
    super(), Object.getPrototypeOf(this) !== TemplateInstance.prototype && Object.setPrototypeOf(this, TemplateInstance.prototype), this.appendChild(e.content.cloneNode(!0)), n.set(this, Array.from(function* (e) {
      var r = e.ownerDocument.createTreeWalker(e, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
      var i;
      for (; i = r.nextNode();) if (i instanceof Element && i.hasAttributes()) for (var _e5 = 0; _e5 < i.attributes.length; _e5 += 1) {
        var _r2 = i.attributes.item(_e5);
        if (_r2 && _r2.value.includes("{{")) {
          var _e6 = new AttributeValueSetter(i, _r2);
          for (var _i of t(_r2.value)) if ("string" === _i.type) _e6.append(_i.value);else {
            var _t2 = new AttributeTemplatePart(_e6, _i.value);
            _e6.append(_t2), yield _t2;
          }
        }
      } else if (i instanceof Text && i.textContent && i.textContent.includes("{{")) {
        var _e7 = t(i.textContent);
        for (var _t3 = 0; _t3 < _e7.length; _t3 += 1) {
          var _r3 = _e7[_t3];
          _r3.end < i.textContent.length && i.splitText(_r3.end), "part" === _r3.type && (yield new NodeTemplatePart(i, _r3.value));
          break;
        }
      }
    }(this))), l.set(this, i), null === (s = (o = l.get(this)).createCallback) || void 0 === s || s.call(o, this, n.get(this), r), l.get(this).processCallback(this, n.get(this), r);
  }
  update(e) {
    l.get(this).processCallback(this, n.get(this), e);
  }
}
var c = new TemplateInstance(document.getElementById("tpl-select-field")),
  d = "c-select-field";
var _e8 = /*#__PURE__*/new WeakMap();
var _t4 = /*#__PURE__*/new WeakMap();
class SelectField extends HTMLElement {
  constructor() {
    super(), _classPrivateFieldInitSpec(this, _e8, void 0), _classPrivateFieldInitSpec(this, _t4, void 0), this, _classPrivateFieldSet(_t4, this, this.attachInternals()), this.ariaActivedescendant = !0, this.ariaExpanded = !0, _classPrivateFieldGet(_t4, this).ariaExpanded = !0, _classPrivateFieldGet(_t4, this).states.add("expanded"), _classPrivateFieldSet(_e8, this, this.attachShadow({
      mode: "closed"
    })), _classPrivateFieldGet(_t4, this).ariaActivedescendant = !0;
  }
  connectedCallback() {
    _classPrivateFieldGet(_e8, this).appendChild(c.cloneNode(!0));
  }
  selectOption(e) {
    this.options[e].ariaSelected = !0, this.options[e].ariaChecked = !0;
  }
  $byID(e) {
    return _classPrivateFieldGet(_e8, this).getElementById(e);
  }
  get listbox() {
    return _classPrivateFieldGet(_e8, this).querySelector("[role=listbox]");
  }
  get button() {
    return _classPrivateFieldGet(_e8, this).querySelector("[role=button]");
  }
  get internals() {
    return _classPrivateFieldGet(_t4, this);
  }
  get options() {
    return _classPrivateFieldGet(_e8, this).querySelectorAll("[role=option]");
  }
  toggle() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classPrivateFieldGet(_t4, this).ariaExpanded = "expanded" === e || !_classPrivateFieldGet(_t4, this).ariaExpanded;
  }
  static OnClick(e, t) {
    console.log("[EVENT]:", e, t);
  }
}
_defineProperty(SelectField, "formAssociated", !0);
customElements.define(d, SelectField);
var h = customElements.get(d);
export { h as default };
