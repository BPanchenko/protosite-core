var _SelectField;
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var e = new CSSStyleSheet();
e.replaceSync(':host{--duration:0.16s;--easing:cubic-bezier(0.3,0,0.2,1);--unit:1.6rem;--clr-white:#fff;--font-normal:400;--text-md:max(1.125 * var(--unit));--icon-code:"\\e231";--icon-color:var(--text-color,currentColor);--icon-font:"Iconic";--icon-size:var(--unit,16px);--icon-weight:var(--font-normal,400);--clr-background:hwb(180 98.433% 1.5665%);--clr-foreground:hwb(41.755 0% 88.01%);--clr-violet-700:hwb(280.27 0% 57.037%);--clr-blue-400:hwb(235.71 40.858% 10.42%);--clr-lime-600:hwb(79.883 0% 67.292%);--clr-gray-50:hwb(122.77 92.825% 6.2277%);--clr-gray-100:hwb(122.77 86.367% 12.698%);--clr-gray-300:hwb(122.8 61.472% 37.65%);--clr-gray-400:hwb(122.81 49.654% 49.5%);--clr-gray-800:hwb(123.07 8.1825% 91.173%);--space:max(1.5 * var(--unit));--space-sm:max(0.5 * var(--unit))}body{--bg-color:var(--clr-gray-100);--border-color:var(--clr-gray-800);--default-text-color:var(--clr-gray-800);--text-color:var(--default-text-color)}:host{--field-radius:max(4 * var(--pixel));--field-height:max(2.5 * var(--unit));--field-shadow:inset 0 0 max(2 * var(--pixel)) var(--clr-gray-400,#d3d3d3),0 0 0 var(--clr-blue-400,#d3d3d3);--field-space-horz:max(1 * var(--space));--field-space-vert:max(0.125 * var(--unit)) max(0.125 * var(--unit));--shadow-sharp:0 1px 1px rgba(0,0,0,.25),0 2px 2px rgba(0,0,0,.2),0 4px 4px rgba(0,0,0,.15),0 8px 8px rgba(0,0,0,.1),0 16px 16px rgba(0,0,0,.05)}:is(.c-select-field,:host){--bg-color:var(--clr-background);--border-color:transparent;--field-shadow:var(--shadow-sharp);--field-space-horz:max(1 * var(--space)) max(0.75 * var(--space));--listbox-space:max(0.1875 * var(--space));--marker-glyph:"\\e18a";--selection-glyph:"\\e035"}:is(.c-select-field,:host) [role=button]{--icon-code:var(--marker-glyph);--icon-size:var(--text-md)}:is(.c-select-field,:host) [role=listbox]{--bg-color:var(--clr-white);--border:none;--text-color:var(--clr-foreground);--space:var(--listbox-space)}:is(.c-select-field,:host) [role=option]{--bg-color:transparent;--icon-code:"";--space-horz:max(2 * var(--unit)) max(0.75 * var(--unit))}:is(.c-select-field,:host) [role=option]:hover{--bg-color:var(--clr-gray-50)}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]){--icon-code:var(--selection-glyph);--text-color:var(--clr-gray-300)}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]):hover{--bg-color:transparent}:is(.c-select-field:has([role=button][aria-expanded=false]),:host(:collapsed)){--marker-glyph:"\\e18a"}:is(.c-select-field:has([role=button][aria-expanded=true]),:host(:expanded)){--marker-glyph:"\\e18d"}:host>[role][aria-activedescendant]{pointer-events:auto}:is(.c-select-field,:host){border-color:var(--border-color);border-radius:var(--field-radius);border-style:solid;border-width:max(1 * var(--pixel));box-shadow:var(--field-shadow);display:inline-block;position:relative;vertical-align:middle;width:inherit}:is(.c-select-field,:host):expanded,:is(.c-select-field,:host):state(expanded){outline:max(3 * var(--pixel)) dashed var(--clr-violet-700)}:is(.c-select-field,:host):collapsed,:is(.c-select-field,:host):state(collapsed){outline:max(3 * var(--pixel)) dashed var(--clr-lime-600)}:is(.c-select-field,:host) [role=button]{container-name:icon-bearer}:is(.c-select-field,:host) [role=button]:after,:is(.c-select-field,:host) [role=button]:before{box-sizing:content-box;color:var(--icon-color);display:inline-block;font-family:var(--icon-font);font-size:var(--icon-size);font-style:normal;font-weight:var(--icon-weight);height:var(--icon-size);line-height:1;text-align:center;text-rendering:geometricPrecision;vertical-align:baseline;width:var(--icon-size);speak:none}:is(.c-select-field,:host) [role=button]:before{content:var(--icon-code)}:is(.c-select-field,:host) [role=button][data-glyph^="\\\\"]:before{content:attr(data-glyph)}:is(.c-select-field,:host) [role=button]:empty{height:var(--icon-size);width:var(--icon-size)}:is(.c-select-field,:host) [role=button]{align-items:center;background-color:var(--bg-color);border-radius:inherit;box-sizing:border-box;column-gap:max(.625 * var(--space));cursor:pointer;display:inline-flex;min-height:calc(max(1 * var(--field-height)) - max(2 * var(--pixel)));padding-block:var(--field-space-vert);padding-inline:var(--field-space-horz);width:inherit}:is(.c-select-field,:host) [role=button]:after{content:var(--marker-glyph)}:is(.c-select-field,:host) [role=button]:before{all:unset}:is(.c-select-field,:host) [role=button] [aria-label]:before{content:attr(aria-label) " "}:is(.c-select-field,:host) [role=listbox]{position:absolute;right:0;top:calc(max(1 * var(--field-height)) + max(1 * var(--space-xs)));z-index:2;interpolate-size:allow-keywords;background-color:var(--bg-color);border:var(--border);border-radius:max(1 * var(--field-radius));box-shadow:var(--field-shadow);height:100%;min-height:max-content;min-width:max-content;padding:var(--space);text-align:right}:is(.c-select-field,:host) [role=option]{background-color:var(--bg-color);cursor:pointer;padding-inline:var(--space-horz);transition:background-color .16s ease}:is(.c-select-field,:host) [role=option]:first-of-type{border-radius:var(--space-sm) var(--space-sm) 0 0}:is(.c-select-field,:host) [role=option]:last-of-type{border-radius:0 0 var(--space-sm) var(--space-sm)}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]){container-name:icon-bearer}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]):after,:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]):before{box-sizing:content-box;color:var(--icon-color);display:inline-block;font-family:var(--icon-font);font-size:var(--icon-size);font-style:normal;font-weight:var(--icon-weight);height:var(--icon-size);line-height:1;text-align:center;text-rendering:geometricPrecision;vertical-align:baseline;width:var(--icon-size);speak:none}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]):before{content:var(--icon-code)}:is(.c-select-field,:host) [role=option][data-glyph^="\\\\"]:is([aria-checked=true],[aria-selected=true]):before{content:attr(data-glyph)}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]):empty{height:var(--icon-size);width:var(--icon-size)}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]){align-items:center;cursor:default;display:flex;gap:.5em;justify-content:space-between}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]):before{all:unset}:is(.c-select-field,:host) [role=option]:is([aria-checked=true],[aria-selected=true]):after{content:var(--icon-code)}');
var t = e,
  r = new Map();
function a(e) {
  if (r.has(e)) return r.get(e);
  var t = e.length;
  var a = 0,
    i = 0,
    s = 0;
  var o = [];
  for (var _r = 0; _r < t; _r += 1) {
    var _t = e[_r],
      _l = e[_r + 1],
      _n = e[_r - 1];
    "{" === _t && "{" === _l && "\\" !== _n ? (s += 1, 1 === s && (i = _r), _r += 1) : "}" === _t && "}" === _l && "\\" !== _n && s && (s -= 1, 0 === s && (i > a && (o.push(Object.freeze({
      type: "string",
      start: a,
      end: i,
      value: e.slice(a, i)
    })), a = i), o.push(Object.freeze({
      type: "part",
      start: i,
      end: _r + 2,
      value: e.slice(a + 2, _r).trim()
    })), _r += 1, a = _r + 1));
  }
  return a < t && o.push(Object.freeze({
    type: "string",
    start: a,
    end: t,
    value: e.slice(a, t)
  })), r.set(e, Object.freeze(o)), r.get(e);
}
var i = new WeakMap(),
  s = new WeakMap();
class AttributeTemplatePart {
  constructor(e, t) {
    this.expression = t, i.set(this, e), e.updateParent("");
  }
  get attributeName() {
    return i.get(this).attr.name;
  }
  get attributeNamespace() {
    return i.get(this).attr.namespaceURI;
  }
  get value() {
    return s.get(this);
  }
  set value(e) {
    s.set(this, e || ""), i.get(this).updateParent(e);
  }
  get element() {
    return i.get(this).element;
  }
  get booleanValue() {
    return i.get(this).booleanValue;
  }
  set booleanValue(e) {
    i.get(this).booleanValue = e;
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
      var _e = this.partList.map(e => "string" == typeof e ? e : e.value).join("");
      this.element.setAttributeNS(this.attr.namespaceURI, this.attr.name, _e);
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
    for (var _e2 of o.get(this)) _e2.remove();
    o.set(this, t);
  }
}
var l = (n = function n(e, t) {
  e.value = t instanceof Element ? t : String(t);
}, {
  processCallback(e, t, r) {
    var a;
    if ("object" == typeof r && r) for (var _e3 of t) if (_e3.expression in r) {
      var _t2 = null !== (a = r[_e3.expression]) && void 0 !== a ? a : "";
      n(_e3, _t2);
    }
  }
});
var n;
var c = new WeakMap(),
  d = new WeakMap();
class TemplateInstance extends (globalThis.DocumentFragment || EventTarget) {
  constructor(e, t) {
    var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : l;
    var i, s;
    super(), Object.getPrototypeOf(this) !== TemplateInstance.prototype && Object.setPrototypeOf(this, TemplateInstance.prototype), this.appendChild(e.content.cloneNode(!0)), d.set(this, Array.from(function* (e) {
      var t = e.ownerDocument.createTreeWalker(e, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
      var r;
      for (; r = t.nextNode();) if (r instanceof Element && r.hasAttributes()) for (var _e4 = 0; _e4 < r.attributes.length; _e4 += 1) {
        var _t3 = r.attributes.item(_e4);
        if (_t3 && _t3.value.includes("{{")) {
          var _e5 = new AttributeValueSetter(r, _t3);
          for (var _r2 of a(_t3.value)) if ("string" === _r2.type) _e5.append(_r2.value);else {
            var _t4 = new AttributeTemplatePart(_e5, _r2.value);
            _e5.append(_t4), yield _t4;
          }
        }
      } else if (r instanceof Text && r.textContent && r.textContent.includes("{{")) {
        var _e6 = a(r.textContent);
        for (var _t5 = 0; _t5 < _e6.length; _t5 += 1) {
          var _a = _e6[_t5];
          _a.end < r.textContent.length && r.splitText(_a.end), "part" === _a.type && (yield new NodeTemplatePart(r, _a.value));
          break;
        }
      }
    }(this))), c.set(this, r), null === (s = (i = c.get(this)).createCallback) || void 0 === s || s.call(i, this, d.get(this), t), c.get(this).processCallback(this, d.get(this), t);
  }
  update(e) {
    c.get(this).processCallback(this, d.get(this), e);
  }
}
var h = new TemplateInstance(document.getElementById("tpl-select-field")),
  p = "c-select-field";
var _e7 = /*#__PURE__*/new WeakMap();
var _t6 = /*#__PURE__*/new WeakMap();
var _SelectField_brand = /*#__PURE__*/new WeakSet();
class SelectField extends HTMLElement {
  constructor() {
    var _e8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(), _classPrivateMethodInitSpec(this, _SelectField_brand), _classPrivateFieldInitSpec(this, _e7, void 0), _classPrivateFieldInitSpec(this, _t6, void 0), this, this.setAttribute("exportparts", "button, listbox, value"), _assertClassBrand(_SelectField_brand, this, _r3).call(this, _e8), _classPrivateFieldSet(_t6, this, this.attachInternals()), _classPrivateFieldSet(_e7, this, this.attachShadow({
      mode: "closed"
    })), _classPrivateFieldGet(_e7, this).appendChild(h.cloneNode(!0));
  }
  attributeChangedCallback(e, t, r) {
    if (!1 !== this.isConnected) switch (e) {
      case "expanded":
        this.$button.ariaExpanded = r;
        break;
      case "name":
        this.$input.setAttribute("name", r);
        break;
      case "label":
        this.$label.ariaLabel = r;
        break;
      default:
        _classPrivateFieldSet(_t6, this, this.attachInternals());
    }
  }
  connectedCallback() {
    _classPrivateFieldGet(_e7, this).adoptedStyleSheets.push(t), this.toggle(!1);
  }
  selectOption(e) {
    this.options[e].ariaSelected = !0, this.options[e].ariaChecked = !0;
  }
  $byID(e) {
    return _classPrivateFieldGet(_e7, this).getElementById(e);
  }
  get $input() {
    return _classPrivateFieldGet(_e7, this).querySelector("[role=value]");
  }
  get $label() {
    return _classPrivateFieldGet(_e7, this).querySelector("[role=label]");
  }
  get $listbox() {
    return _classPrivateFieldGet(_e7, this).querySelector("[role=listbox]");
  }
  get $button() {
    return _classPrivateFieldGet(_e7, this).querySelector("[role=button]");
  }
  get $options() {
    return _classPrivateFieldGet(_e7, this).querySelectorAll("[role=option]");
  }
  get value() {
    var e = this.$input.value;
    return this.setAttribute("value", e), e;
  }
  set exportparts(e) {
    throw new Error("Don't Change! ".concat(e.toString()));
  }
  toggle() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classPrivateFieldGet(_t6, this).ariaExpanded = "expanded" === e || !_classPrivateFieldGet(_t6, this).ariaExpanded, _classPrivateFieldGet(_t6, this).ariaExpanded ? (_classPrivateFieldGet(_t6, this).states.delete("collapsed"), _classPrivateFieldGet(_t6, this).states.add("expanded")) : (_classPrivateFieldGet(_t6, this).states.delete("expanded"), _classPrivateFieldGet(_t6, this).states.add("collapsed"));
  }
  static onFocus(e, t) {
    console.log("[EVENT]:", t, e);
  }
  static OnClick(e, t) {
    console.log("[EVENT]:", t, e);
  }
  static onKeyUp(e, t) {
    console.log("[EVENT]:", t, e);
  }
}
_SelectField = SelectField;
function _r3() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var t = _SelectField.observedAttributes,
    r = Object.entries(e),
    a = r.filter(_ref => {
      var [e] = _ref;
      return !1 === t.includes(e);
    }),
    i = r.filter(_ref2 => {
      var [e] = _ref2;
      return t.includes(e);
    });
  a.length > 0 && console.warn("Unsupported attributes: \"".concat(a.map(_ref3 => {
    var [e] = _ref3;
    return e;
  }).join(", "), "\"")), i.forEach(_ref4 => {
    var [e, t] = _ref4;
    return this.setAttribute(e, t);
  });
}
_defineProperty(SelectField, "formAssociated", !0);
_defineProperty(SelectField, "observedAttributes", ["expanded", "label", "name", "size"]);
customElements.define(p, SelectField);
var u = customElements.get(p);
export { u as default };
