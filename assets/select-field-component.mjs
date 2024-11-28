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
var t = new Map();
function e(e) {
  if (t.has(e)) return t.get(e);
  var s = e.length;
  var n = 0,
    a = 0,
    i = 0;
  var r = [];
  for (var _t = 0; _t < s; _t += 1) {
    var _s = e[_t],
      _o = e[_t + 1],
      _l = e[_t - 1];
    "{" === _s && "{" === _o && "\\" !== _l ? (i += 1, 1 === i && (a = _t), _t += 1) : "}" === _s && "}" === _o && "\\" !== _l && i && (i -= 1, 0 === i && (a > n && (r.push(Object.freeze({
      type: "string",
      start: n,
      end: a,
      value: e.slice(n, a)
    })), n = a), r.push(Object.freeze({
      type: "part",
      start: a,
      end: _t + 2,
      value: e.slice(n + 2, _t).trim()
    })), _t += 1, n = _t + 1));
  }
  return n < s && r.push(Object.freeze({
    type: "string",
    start: n,
    end: s,
    value: e.slice(n, s)
  })), t.set(e, Object.freeze(r)), t.get(e);
}
var s = new WeakMap(),
  n = new WeakMap();
class AttributeTemplatePart {
  constructor(t, e) {
    this.expression = e, s.set(this, t), t.updateParent("");
  }
  get attributeName() {
    return s.get(this).attr.name;
  }
  get attributeNamespace() {
    return s.get(this).attr.namespaceURI;
  }
  get value() {
    return n.get(this);
  }
  set value(t) {
    n.set(this, t || ""), s.get(this).updateParent(t);
  }
  get element() {
    return s.get(this).element;
  }
  get booleanValue() {
    return s.get(this).booleanValue;
  }
  set booleanValue(t) {
    s.get(this).booleanValue = t;
  }
}
class AttributeValueSetter {
  constructor(t, e) {
    this.element = t, this.attr = e, this.partList = [];
  }
  get booleanValue() {
    return this.element.hasAttributeNS(this.attr.namespaceURI, this.attr.name);
  }
  set booleanValue(t) {
    if (1 !== this.partList.length) throw new DOMException("Operation not supported", "NotSupportedError");
    this.partList[0].value = t ? "" : null;
  }
  append(t) {
    this.partList.push(t);
  }
  updateParent(t) {
    if (1 === this.partList.length && null === t) this.element.removeAttributeNS(this.attr.namespaceURI, this.attr.name);else {
      var _t2 = this.partList.map(t => "string" == typeof t ? t : t.value).join("");
      this.element.setAttributeNS(this.attr.namespaceURI, this.attr.name, _t2);
    }
  }
}
var a = new WeakMap();
class NodeTemplatePart {
  constructor(t, e) {
    this.expression = e, a.set(this, [t]), t.textContent = "";
  }
  get value() {
    return a.get(this).map(t => t.textContent).join("");
  }
  set value(t) {
    this.replace(t);
  }
  get previousSibling() {
    return a.get(this)[0].previousSibling;
  }
  get nextSibling() {
    return a.get(this)[a.get(this).length - 1].nextSibling;
  }
  replace() {
    for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
      t[_key] = arguments[_key];
    }
    var e = t.map(t => "string" == typeof t ? new Text(t) : t);
    e.length || e.push(new Text("")), a.get(this)[0].before(...e);
    for (var _t3 of a.get(this)) _t3.remove();
    a.set(this, e);
  }
}
var i = (r = function r(t, e) {
  t.value = e instanceof Element ? e : String(e);
}, {
  processCallback(t, e, s) {
    var n;
    if ("object" == typeof s && s) for (var _t4 of e) if (_t4.expression in s) {
      var _e = null !== (n = s[_t4.expression]) && void 0 !== n ? n : "";
      r(_t4, _e);
    }
  }
});
var r;
var o = new WeakMap(),
  l = new WeakMap();
class TemplateInstance extends (globalThis.DocumentFragment || EventTarget) {
  constructor(t, s) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : i;
    var a, r;
    super(), Object.getPrototypeOf(this) !== TemplateInstance.prototype && Object.setPrototypeOf(this, TemplateInstance.prototype), this.appendChild(t.content.cloneNode(!0)), l.set(this, Array.from(function* (t) {
      var s = t.ownerDocument.createTreeWalker(t, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
      var n;
      for (; n = s.nextNode();) if (n instanceof Element && n.hasAttributes()) for (var _t5 = 0; _t5 < n.attributes.length; _t5 += 1) {
        var _s2 = n.attributes.item(_t5);
        if (_s2 && _s2.value.includes("{{")) {
          var _t6 = new AttributeValueSetter(n, _s2);
          for (var _n of e(_s2.value)) if ("string" === _n.type) _t6.append(_n.value);else {
            var _e2 = new AttributeTemplatePart(_t6, _n.value);
            _t6.append(_e2), yield _e2;
          }
        }
      } else if (n instanceof Text && n.textContent && n.textContent.includes("{{")) {
        var _t7 = e(n.textContent);
        for (var _e3 = 0; _e3 < _t7.length; _e3 += 1) {
          var _s3 = _t7[_e3];
          _s3.end < n.textContent.length && n.splitText(_s3.end), "part" === _s3.type && (yield new NodeTemplatePart(n, _s3.value));
          break;
        }
      }
    }(this))), o.set(this, n), null === (r = (a = o.get(this)).createCallback) || void 0 === r || r.call(a, this, l.get(this), s), o.get(this).processCallback(this, l.get(this), s);
  }
  update(t) {
    o.get(this).processCallback(this, l.get(this), t);
  }
}
var c = new TemplateInstance(document.getElementById("tpl-select-field")),
  u = "c-select-field";
var _t8 = /*#__PURE__*/new WeakMap();
var _e4 = /*#__PURE__*/new WeakMap();
var _SelectField_brand = /*#__PURE__*/new WeakSet();
class SelectField extends HTMLElement {
  constructor() {
    var _t9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(), _classPrivateMethodInitSpec(this, _SelectField_brand), _classPrivateFieldInitSpec(this, _t8, void 0), _classPrivateFieldInitSpec(this, _e4, void 0), this, this.setAttribute("exportparts", "button, listbox, value"), _assertClassBrand(_SelectField_brand, this, _s4).call(this, _t9), _classPrivateFieldSet(_e4, this, this.attachInternals()), _classPrivateFieldSet(_t8, this, this.attachShadow({
      mode: "closed"
    })), _classPrivateFieldGet(_t8, this).appendChild(c.cloneNode(!0));
  }
  attributeChangedCallback(t, e, s) {
    if (!1 !== this.isConnected) switch (t) {
      case "expanded":
        this.$button.ariaExpanded = s;
        break;
      case "name":
        this.$input.setAttribute("name", s);
        break;
      case "status-label":
        this.$status.ariaLabel = s;
        break;
      default:
        _classPrivateFieldSet(_e4, this, this.attachInternals());
    }
  }
  connectedCallback() {
    this.$button.addEventListener("click", () => this.toggle());
  }
  selectOption(t) {
    this.options[t].ariaSelected = !0, this.options[t].ariaChecked = !0;
  }
  $byID(t) {
    return _classPrivateFieldGet(_t8, this).getElementById(t);
  }
  get $button() {
    return _classPrivateFieldGet(_t8, this).querySelector("[role=button]");
  }
  get $input() {
    return _classPrivateFieldGet(_t8, this).querySelector("input");
  }
  get $listbox() {
    return _classPrivateFieldGet(_t8, this).querySelector("[role=listbox]");
  }
  get $options() {
    return _classPrivateFieldGet(_t8, this).querySelectorAll("[role=option]");
  }
  get $status() {
    return _classPrivateFieldGet(_t8, this).querySelector("[role=status]");
  }
  get value() {
    var t = this.$input.value;
    return this.setAttribute("value", t), t;
  }
  set exportparts(t) {
    throw new Error("Don't Change! ".concat(t.toString()));
  }
  toggle(t) {
    var {
        states: e
      } = _classPrivateFieldGet(_e4, this),
      s = "expanded" === t || !1 === e.has("expanded");
    return s ? (e.add("expanded"), e.delete("collapsed")) : (e.add("collapsed"), e.delete("expanded")), this.$button.ariaExpanded = s, s ? "expanded" : "collapsed";
  }
  static onFocus(t, e) {
    console.log("[EVENT]:", e, t);
  }
  static OnClick(t, e) {
    console.log("[EVENT]:", e, t);
  }
  static onKeyUp(t, e) {
    console.log("[EVENT]:", e, t);
  }
}
_SelectField = SelectField;
function _s4() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var e = _SelectField.observedAttributes,
    s = Object.entries(t),
    n = s.filter(_ref => {
      var [t] = _ref;
      return !1 === e.includes(t);
    }),
    a = s.filter(_ref2 => {
      var [t] = _ref2;
      return e.includes(t);
    });
  n.length > 0 && console.warn("Unsupported attributes: \"".concat(n.map(_ref3 => {
    var [t] = _ref3;
    return t;
  }).join(", "), "\"")), a.forEach(_ref4 => {
    var [t, e] = _ref4;
    return this.setAttribute(t, e);
  });
}
_defineProperty(SelectField, "formAssociated", !1);
_defineProperty(SelectField, "observedAttributes", ["aria-expanded", "status-label", "name", "size"]);
customElements.define(u, SelectField);
var h = customElements.get(u);
export { h as default };
