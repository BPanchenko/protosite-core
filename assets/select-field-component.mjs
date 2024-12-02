function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateSetter(s, r, a, t) { return r(_assertClassBrand(s, a), t), t; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateGetter(s, r, a) { return a(_assertClassBrand(s, r)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
import { a as t, i as e } from "./fn.initShadowRoot-Cy1A_tkP.js";
var s = new Map();
function parse(t) {
  if (s.has(t)) return s.get(t);
  var e = t.length;
  var n = 0,
    i = 0,
    a = 0;
  var r = [];
  for (var _s = 0; _s < e; _s += 1) {
    var _e = t[_s],
      _o = t[_s + 1],
      _l = t[_s - 1];
    "{" === _e && "{" === _o && "\\" !== _l ? (a += 1, 1 === a && (i = _s), _s += 1) : "}" === _e && "}" === _o && "\\" !== _l && a && (a -= 1, 0 === a && (i > n && (r.push(Object.freeze({
      type: "string",
      start: n,
      end: i,
      value: t.slice(n, i)
    })), n = i), r.push(Object.freeze({
      type: "part",
      start: i,
      end: _s + 2,
      value: t.slice(n + 2, _s).trim()
    })), _s += 1, n = _s + 1));
  }
  return n < e && r.push(Object.freeze({
    type: "string",
    start: n,
    end: e,
    value: t.slice(n, e)
  })), s.set(t, Object.freeze(r)), s.get(t);
}
var n = new WeakMap(),
  i = new WeakMap();
class AttributeTemplatePart {
  constructor(t, e) {
    this.expression = e, n.set(this, t), t.updateParent("");
  }
  get attributeName() {
    return n.get(this).attr.name;
  }
  get attributeNamespace() {
    return n.get(this).attr.namespaceURI;
  }
  get value() {
    return i.get(this);
  }
  set value(t) {
    i.set(this, t || ""), n.get(this).updateParent(t);
  }
  get element() {
    return n.get(this).element;
  }
  get booleanValue() {
    return n.get(this).booleanValue;
  }
  set booleanValue(t) {
    n.get(this).booleanValue = t;
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
      var _t = this.partList.map(t => "string" == typeof t ? t : t.value).join("");
      this.element.setAttributeNS(this.attr.namespaceURI, this.attr.name, _t);
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
    for (var _t2 of a.get(this)) _t2.remove();
    a.set(this, e);
  }
}
var r = function createProcessor(t) {
  return {
    processCallback(e, s, n) {
      var i;
      if ("object" == typeof n && n) for (var _e2 of s) if (_e2.expression in n) {
        var _s2 = null !== (i = n[_e2.expression]) && void 0 !== i ? i : "";
        t(_e2, _s2);
      }
    }
  };
}(function processPropertyIdentity(t, e) {
  t.value = e instanceof Element ? e : String(e);
});
var o = new WeakMap(),
  l = new WeakMap();
class TemplateInstance extends (globalThis.DocumentFragment || EventTarget) {
  constructor(t, e) {
    var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : r;
    var n, i;
    super(), Object.getPrototypeOf(this) !== TemplateInstance.prototype && Object.setPrototypeOf(this, TemplateInstance.prototype), this.appendChild(t.content.cloneNode(!0)), l.set(this, Array.from(function* collectParts(t) {
      var e = t.ownerDocument.createTreeWalker(t, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
      var s;
      for (; s = e.nextNode();) if (s instanceof Element && s.hasAttributes()) for (var _t3 = 0; _t3 < s.attributes.length; _t3 += 1) {
        var _e3 = s.attributes.item(_t3);
        if (_e3 && _e3.value.includes("{{")) {
          var _t4 = new AttributeValueSetter(s, _e3);
          for (var _s3 of parse(_e3.value)) if ("string" === _s3.type) _t4.append(_s3.value);else {
            var _e4 = new AttributeTemplatePart(_t4, _s3.value);
            _t4.append(_e4), yield _e4;
          }
        }
      } else if (s instanceof Text && s.textContent && s.textContent.includes("{{")) {
        var _t5 = parse(s.textContent);
        for (var _e5 = 0; _e5 < _t5.length; _e5 += 1) {
          var _n = _t5[_e5];
          _n.end < s.textContent.length && s.splitText(_n.end), "part" === _n.type && (yield new NodeTemplatePart(s, _n.value));
          break;
        }
      }
    }(this))), o.set(this, s), null === (i = (n = o.get(this)).createCallback) || void 0 === i || i.call(n, this, l.get(this), e), o.get(this).processCallback(this, l.get(this), e);
  }
  update(t) {
    o.get(this).processCallback(this, l.get(this), t);
  }
}
var c = new TemplateInstance(document.getElementById("tpl-select-field")),
  h = "c-select-field";
var _t6 = /*#__PURE__*/new WeakMap();
var _e6 = /*#__PURE__*/new WeakMap();
var _s4 = /*#__PURE__*/new WeakMap();
var _n2 = /*#__PURE__*/new WeakMap();
var _SelectField_brand = /*#__PURE__*/new WeakSet();
class SelectField extends HTMLElement {
  constructor() {
    var _s5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(), _classPrivateMethodInitSpec(this, _SelectField_brand), _classPrivateFieldInitSpec(this, _t6, new Map()), _classPrivateFieldInitSpec(this, _e6, !1), _classPrivateFieldInitSpec(this, _s4, void 0), _classPrivateFieldInitSpec(this, _n2, void 0), this, t.call(this, _objectSpread({
      exportparts: "button, choice, listbox",
      role: "combobox"
    }, _s5)), _classPrivateFieldSet(_n2, this, e.call(this, {
      $template: c,
      delegatesFocus: !0,
      serializable: !0
    })), _assertClassBrand(_SelectField_brand, this, _i).call(this), _assertClassBrand(_SelectField_brand, this, _a).call(this);
  }
  attributeChangedCallback(t, e, s) {
    if (!1 !== this.isConnected && "label" === t) _classPrivateGetter(_SelectField_brand, this, _get_r).ariaLabel = s;
  }
  connectedCallback() {
    this.addEventListener("click", _assertClassBrand(_SelectField_brand, this, _o2)), this.addEventListener("focus", _assertClassBrand(_SelectField_brand, this, _l2)), this.addEventListener("blur", _assertClassBrand(_SelectField_brand, this, _c));
  }
  selectOption(t) {
    this.options[t].ariaSelected = !0, this.options[t].ariaChecked = !0;
  }
  toggle(t) {
    var {
        states: e
      } = _classPrivateFieldGet(_s4, this),
      s = "expanded" === t || !1 === e.has("expanded");
    return s ? (e.add("expanded"), e.delete("collapsed")) : (e.add("collapsed"), e.delete("expanded"), _assertClassBrand(_SelectField_brand, this, _h).call(this, _classPrivateGetter(_SelectField_brand, this, _get_u))), this.ariaExpanded = s, s ? "expanded" : "collapsed";
  }
  get form() {
    return _classPrivateFieldGet(_s4, this).form;
  }
  get interactive() {
    return _classPrivateFieldGet(_e6, this);
  }
  get value() {
    return this.setAttribute("value", null), null;
  }
}
function _get_p(_this) {
  return _classPrivateFieldGet(_s4, _this).ariaActiveDescendantElement;
}
function _set_p(_this2, t) {
  _classPrivateFieldGet(_s4, _this2).ariaActiveDescendantElement = t;
}
function _get_u(_this3) {
  return _assertClassBrand(_SelectField_brand, _this3, _d).call(_this3, "[role=button]");
}
function _get_r(_this4) {
  return _assertClassBrand(_SelectField_brand, _this4, _d).call(_this4, "[role=status]", _classPrivateGetter(_SelectField_brand, _this4, _get_u));
}
function _get_g(_this5) {
  return _assertClassBrand(_SelectField_brand, _this5, _d).call(_this5, "[role=listbox]");
}
function _get_b(_this6) {
  return _classPrivateGetter(_SelectField_brand, _this6, _get_g).children[0];
}
function _get_f(_this7) {
  return _assertClassBrand(_SelectField_brand, _this7, _d).call(_this7, "slot[name=listbox]");
}
function _get_m(_this8) {
  return _assertClassBrand(_SelectField_brand, _this8, _d).call(_this8, "[role=option]:last-of-type", _classPrivateGetter(_SelectField_brand, _this8, _get_g));
}
function _get_v(_this9) {
  return _assertClassBrand(_SelectField_brand, _this9, _d).call(_this9, "[role=option]:first-of-type", _classPrivateGetter(_SelectField_brand, _this9, _get_g));
}
function _d(t) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (e !== null && e !== void 0 ? e : _classPrivateFieldGet(_n2, this)).querySelector(t);
}
function _h(t) {
  return HTMLElement.prototype.isPrototypeOf(t) && (_classPrivateGetter(_SelectField_brand, this, _get_p).removeAttribute("aria-activedescendant"), _classPrivateSetter(_SelectField_brand, _set_p, this, t), _classPrivateGetter(_SelectField_brand, this, _get_p).setAttribute("aria-activedescendant", "true")), _classPrivateGetter(_SelectField_brand, this, _get_p);
}
function _x() {
  return !1 === _classPrivateFieldGet(_e6, this) && (this.addEventListener("click", _assertClassBrand(_SelectField_brand, this, _o2)), this.addEventListener("keypress", _assertClassBrand(_SelectField_brand, this, _$)), _classPrivateFieldSet(_e6, this, !0)), this;
}
function _E() {
  return _classPrivateFieldGet(_e6, this) && (this.removeEventListener("click", _assertClassBrand(_SelectField_brand, this, _o2)), this.removeEventListener("keypress", _assertClassBrand(_SelectField_brand, this, _$)), _classPrivateFieldSet(_e6, this, !1)), this;
}
function _l2() {
  _assertClassBrand(_SelectField_brand, this, _x).call(this);
}
function _o2() {
  this.toggle();
}
function _$(_ref) {
  var {
    key: t
  } = _ref;
  switch (t) {
    case "Backspace":
    case "Enter":
      this.focused === _classPrivateGetter(_SelectField_brand, this, _get_u) && this.toggle("expanded");
      break;
    case "Escape":
      this.focused !== _classPrivateGetter(_SelectField_brand, this, _get_u) && this.toggle("collapsed");
      break;
    case "End":
      this.focus(_classPrivateGetter(_SelectField_brand, this, _get_m));
      break;
    case "Home":
      this.focus(_classPrivateGetter(_SelectField_brand, this, _get_v));
  }
}
function _c() {
  _assertClassBrand(_SelectField_brand, this, _E).call(this), this.toggle("collapsed");
}
function _i() {
  var t = this.attachInternals();
  t.ariaActiveDescendantElement = _assertClassBrand(_SelectField_brand, this, _d).call(this, "[aria-activedescendant=true]"), console.assert(t.ariaActiveDescendantElement, "Attribute `[aria-activedescendant]` requires specifying for some child node"), _classPrivateFieldSet(_s4, this, t);
}
function _a() {
  _classPrivateGetter(_SelectField_brand, this, _get_f).addEventListener("slotchange", () => {
    var t = _classPrivateGetter(_SelectField_brand, this, _get_b).assignedElements();
    for (var _e7 of t) _e7.hasAttribute("role") && "option" === _e7.role ? _classPrivateFieldGet(_t6, this).set(new WeakRef(_e7), {
      label: _e7.textContent || _e7.dataset.value,
      value: _e7.dataset.value || _e7.textContent
    }) : _e7.remove();
    var e;
    (e = _classPrivateFieldGet(_t6, this)).forEach((t, s) => !1 === s.deref().isConnected && e.delete(s));
  });
}
_defineProperty(SelectField, "formAssociated", !0);
_defineProperty(SelectField, "observedAttributes", ["label", "name"]);
customElements.define(h, SelectField);
var u = customElements.get(h);
export { u as default };
