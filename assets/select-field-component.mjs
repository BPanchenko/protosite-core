function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
import { a as t, i as e } from "./fn.initShadowRoot-CxTVWNKg.js";
var s = new Map();
function parse(t) {
  if (s.has(t)) return s.get(t);
  var e = t.length;
  var i = 0,
    a = 0,
    n = 0;
  var r = [];
  for (var _s = 0; _s < e; _s += 1) {
    var _e = t[_s],
      _l = t[_s + 1],
      _o = t[_s - 1];
    "{" === _e && "{" === _l && "\\" !== _o ? (n += 1, 1 === n && (a = _s), _s += 1) : "}" === _e && "}" === _l && "\\" !== _o && n && (n -= 1, 0 === n && (a > i && (r.push(Object.freeze({
      type: "string",
      start: i,
      end: a,
      value: t.slice(i, a)
    })), i = a), r.push(Object.freeze({
      type: "part",
      start: a,
      end: _s + 2,
      value: t.slice(i + 2, _s).trim()
    })), _s += 1, i = _s + 1));
  }
  return i < e && r.push(Object.freeze({
    type: "string",
    start: i,
    end: e,
    value: t.slice(i, e)
  })), s.set(t, Object.freeze(r)), s.get(t);
}
var i = new WeakMap(),
  a = new WeakMap();
class AttributeTemplatePart {
  constructor(t, e) {
    this.expression = e, i.set(this, t), t.updateParent("");
  }
  get attributeName() {
    return i.get(this).attr.name;
  }
  get attributeNamespace() {
    return i.get(this).attr.namespaceURI;
  }
  get value() {
    return a.get(this);
  }
  set value(t) {
    a.set(this, t || ""), i.get(this).updateParent(t);
  }
  get element() {
    return i.get(this).element;
  }
  get booleanValue() {
    return i.get(this).booleanValue;
  }
  set booleanValue(t) {
    i.get(this).booleanValue = t;
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
var n = new WeakMap();
class NodeTemplatePart {
  constructor(t, e) {
    this.expression = e, n.set(this, [t]), t.textContent = "";
  }
  get value() {
    return n.get(this).map(t => t.textContent).join("");
  }
  set value(t) {
    this.replace(t);
  }
  get previousSibling() {
    return n.get(this)[0].previousSibling;
  }
  get nextSibling() {
    return n.get(this)[n.get(this).length - 1].nextSibling;
  }
  replace() {
    for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
      t[_key] = arguments[_key];
    }
    var e = t.map(t => "string" == typeof t ? new Text(t) : t);
    e.length || e.push(new Text("")), n.get(this)[0].before(...e);
    for (var _t2 of n.get(this)) _t2.remove();
    n.set(this, e);
  }
}
var r = function createProcessor(t) {
  return {
    processCallback(e, s, i) {
      var a;
      if ("object" == typeof i && i) for (var _e2 of s) if (_e2.expression in i) {
        var _s2 = null !== (a = i[_e2.expression]) && void 0 !== a ? a : "";
        t(_e2, _s2);
      }
    }
  };
}(function processPropertyIdentity(t, e) {
  t.value = e instanceof Element ? e : String(e);
});
var l = new WeakMap(),
  o = new WeakMap();
class TemplateInstance extends (globalThis.DocumentFragment || EventTarget) {
  constructor(t, e) {
    var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : r;
    var i, a;
    super(), Object.getPrototypeOf(this) !== TemplateInstance.prototype && Object.setPrototypeOf(this, TemplateInstance.prototype), this.appendChild(t.content.cloneNode(!0)), o.set(this, Array.from(function* collectParts(t) {
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
          var _i = _t5[_e5];
          _i.end < s.textContent.length && s.splitText(_i.end), "part" === _i.type && (yield new NodeTemplatePart(s, _i.value));
          break;
        }
      }
    }(this))), l.set(this, s), null === (a = (i = l.get(this)).createCallback) || void 0 === a || a.call(i, this, o.get(this), e), l.get(this).processCallback(this, o.get(this), e);
  }
  update(t) {
    l.get(this).processCallback(this, o.get(this), t);
  }
}
var h = new TemplateInstance(document.getElementById("tpl-select-field")),
  c = "c-select-field";
var _t6 = /*#__PURE__*/new WeakMap();
var _e6 = /*#__PURE__*/new WeakMap();
var _s4 = /*#__PURE__*/new WeakMap();
var _i2 = /*#__PURE__*/new WeakMap();
var _a = /*#__PURE__*/new WeakMap();
var _n = /*#__PURE__*/new WeakMap();
var _SelectField_brand = /*#__PURE__*/new WeakSet();
class SelectField extends HTMLElement {
  constructor() {
    var _s5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(), _classPrivateMethodInitSpec(this, _SelectField_brand), _classPrivateFieldInitSpec(this, _t6, new AbortController()), _classPrivateFieldInitSpec(this, _e6, new Map()), _classPrivateFieldInitSpec(this, _s4, !1), _classPrivateFieldInitSpec(this, _i2, void 0), _classPrivateFieldInitSpec(this, _a, void 0), _classPrivateFieldInitSpec(this, _n, void 0), this, _classPrivateFieldSet(_a, this, t.call(this, _objectSpread({
      "aria-autocomplete": "list",
      "aria-haspopup": "listbox",
      "aria-expanded": !1,
      exportparts: "button, choice, listbox",
      role: "combobox",
      tabindex: 0
    }, _s5))), _classPrivateFieldSet(_n, this, e.call(this, {
      $template: h,
      delegatesFocus: !0
    })), _classPrivateFieldSet(_e6, this, _assertClassBrand(_SelectField_brand, this, _r).call(this)), _classPrivateFieldSet(_i2, this, _assertClassBrand(_SelectField_brand, this, _l2).call(this));
  }
  connectedCallback() {
    _assertClassBrand(_SelectField_brand, this, _o2).call(this), _assertClassBrand(_SelectField_brand, this, _h).call(this), _assertClassBrand(_SelectField_brand, this, _c).call(this, "interactive"), _assertClassBrand(_SelectField_brand, this, _d).call(this, "link").onload = () => _assertClassBrand(_SelectField_brand, this, _c).call(this, "loaded");
  }
  disconnectedCallback() {
    _classPrivateFieldGet(_t6, this).abort(), _classPrivateFieldSet(_s4, this, !1);
  }
  adoptedCallback() {}
  attributeChangedCallback(t, e, s) {
    if (!1 !== this.isConnected && e !== s) switch (t) {
      case "aria-disabled":
        this.disabled = "true" === (_classPrivateFieldGet(_i2, this).ariaDisabled = s);
        break;
      case "aria-expanded":
        this.expanded = "true" === (_classPrivateFieldGet(_i2, this).ariaExpanded = s);
        break;
      case "aria-label":
        _classPrivateGetter(_SelectField_brand, this, _get_u).ariaLabel = s;
        break;
      case "value":
        this.value = s;
        break;
      default:
        _assertClassBrand(_SelectField_brand, this, _o2).call(this);
    }
  }
  formAssociatedCallback(t) {}
  formDisabledCallback(t) {
    this.setAttribute("aria-disabled", t);
  }
  formResetCallback() {
    t.call(this, _classPrivateFieldGet(_a, this));
  }
  formStateRestoreCallback(t, e) {
    this.value = t;
  }
  updateValidity(t) {
    t.length >= 2 ? _classPrivateFieldGet(_i2, this).setValidity({}) : (_classPrivateFieldGet(_i2, this).setValidity({
      tooShort: !0
    }, "value is too short", _classPrivateFieldGet(_n, this).firstChild), _classPrivateFieldGet(_i2, this).reportValidity());
  }
  search(t) {
    for (var [_e7, _s6] of _classPrivateFieldGet(_e6, this)) if (0 === _s6.label.indexOf(t) || 0 === _s6.value.indexOf(t)) return _objectSpread({
      $element: _e7.deref()
    }, _s6);
    return null;
  }
  findByValue(t) {
    for (var [_e8, _s7] of _classPrivateFieldGet(_e6, this)) if (t === _s7.value) return _objectSpread({
      $element: _e8.deref()
    }, _s7);
    return null;
  }
  toggle() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var e = t !== null && t !== void 0 ? t : this.expanded ? "collapsed" : "expanded";
    return this[e] = !0, e;
  }
  get form() {
    return _classPrivateFieldGet(_i2, this).form;
  }
  get name() {
    var _this$getAttribute;
    return (_this$getAttribute = this.getAttribute("name")) !== null && _this$getAttribute !== void 0 ? _this$getAttribute : "unknown";
  }
  get type() {
    var _this$getAttribute2;
    return (_this$getAttribute2 = this.getAttribute("type")) !== null && _this$getAttribute2 !== void 0 ? _this$getAttribute2 : "text";
  }
  get value() {
    return _classPrivateFieldGet(_i2, this).ariaValueNow;
  }
  set value(t) {
    _classPrivateFieldGet(_i2, this).ariaValueNow = t, this.setAttribute("value", t), this.dispatchEvent(new Event("change"));
  }
  get interactive() {
    return _classPrivateFieldGet(_s4, this);
  }
  get disabled() {
    return _classPrivateFieldGet(_i2, this).ariaDisabled;
  }
  set disabled(t) {
    t ? (_classPrivateGetter(_SelectField_brand, this, _get_p).add("disabled"), this.disconnectedCallback()) : _classPrivateGetter(_SelectField_brand, this, _get_p).has("disabled") && (_classPrivateGetter(_SelectField_brand, this, _get_p).delete("disabled"), _assertClassBrand(_SelectField_brand, this, _h).call(this)), this.setAttribute("aria-disabled", t), this.setAttribute("tabindex", this.disabled ? "-1" : _classPrivateFieldGet(_a, this).get("tabindex"));
  }
  get expanded() {
    return "true" === _classPrivateFieldGet(_i2, this).ariaExpanded;
  }
  set expanded(t) {
    this.setAttribute("aria-expanded", t), _classPrivateGetter(_SelectField_brand, this, _get_p)[t ? "add" : "delete"]("expanded"), _classPrivateGetter(_SelectField_brand, this, _get_p)[t ? "delete" : "add"]("collapsed");
  }
  set collapsed(t) {
    this.expanded = !1 === t;
  }
}
function _get_p(_this) {
  return _classPrivateFieldGet(_i2, _this).states;
}
function _c(t) {
  return _classPrivateGetter(_SelectField_brand, this, _get_p).add(t), this;
}
function _h() {
  this.addEventListener("click", _assertClassBrand(_SelectField_brand, this, _b), {
    signal: _classPrivateFieldGet(_t6, this).signal
  }), this.addEventListener("focus", _assertClassBrand(_SelectField_brand, this, _g), {
    signal: _classPrivateFieldGet(_t6, this).signal
  }), this.addEventListener("blur", _assertClassBrand(_SelectField_brand, this, _f), {
    signal: _classPrivateFieldGet(_t6, this).signal
  });
}
function _v() {
  return !1 === _classPrivateFieldGet(_s4, this) && (this.addEventListener("click", _assertClassBrand(_SelectField_brand, this, _b), {
    signal: _classPrivateFieldGet(_t6, this).signal
  }), this.addEventListener("keypress", _assertClassBrand(_SelectField_brand, this, _m), {
    signal: _classPrivateFieldGet(_t6, this).signal
  }), _classPrivateFieldSet(_s4, this, !0)), this;
}
function _x() {
  return _classPrivateFieldGet(_s4, this) && (this.removeEventListener("click", _assertClassBrand(_SelectField_brand, this, _b)), this.removeEventListener("keypress", _assertClassBrand(_SelectField_brand, this, _m)), _classPrivateFieldSet(_s4, this, !1)), this;
}
function _g() {
  _assertClassBrand(_SelectField_brand, this, _v).call(this);
}
function _f() {
  _assertClassBrand(_SelectField_brand, this, _x).call(this), this.toggle("collapsed");
}
function _b() {
  this.toggle();
}
function _m(_ref) {
  var {
    key: t
  } = _ref;
  switch (t) {
    case "Backspace":
    case "Enter":
      this.focused === _classPrivateGetter(_SelectField_brand, this, _get_y) && this.toggle("expanded");
      break;
    case "Escape":
      this.focused !== _classPrivateGetter(_SelectField_brand, this, _get_y) && this.toggle("collapsed");
      break;
    case "End":
      this.focus(_classPrivateGetter(_SelectField_brand, this, _get_k));
      break;
    case "Home":
      this.focus(_classPrivateGetter(_SelectField_brand, this, _get_E));
  }
}
function _l2() {
  var t = this.attachInternals();
  return t.ariaActiveDescendantElement = _assertClassBrand(_SelectField_brand, this, _d).call(this, "[aria-activedescendant=true]"), console.assert(t.ariaActiveDescendantElement, "Attribute `[aria-activedescendant]` requires specifying for some child element"), t;
}
function _r() {
  var t = _classPrivateFieldGet(_e6, this);
  return _classPrivateGetter(_SelectField_brand, this, _get_C).addEventListener("slotchange", () => {
    var e = _classPrivateGetter(_SelectField_brand, this, _get_$).assignedElements();
    for (var _s8 of e) _s8.hasAttribute("role") && "option" === _s8.role ? t.set(new WeakRef(_s8), {
      label: _s8.textContent || _s8.dataset.value,
      value: _s8.dataset.value || _s8.textContent
    }) : _s8.remove();
    (t => {
      t.forEach((t, e, s) => {
        var _e$deref;
        return Boolean((_e$deref = e.deref()) === null || _e$deref === void 0 ? void 0 : _e$deref.isConnected) || s.delete(e);
      });
    })(t);
  }, {
    signal: _classPrivateFieldGet(_t6, this).signal
  }), t;
}
function _o2() {
  _classPrivateFieldGet(_i2, this).ariaAutoComplete = this.ariaAutoComplete, _classPrivateFieldGet(_i2, this).ariaDisabled = this.ariaDisabled, _classPrivateFieldGet(_i2, this).ariaHasPopup = this.ariaHasPopup, _classPrivateFieldGet(_i2, this).ariaExpanded = this.ariaExpanded, _classPrivateFieldGet(_i2, this).ariaMultiSelectable = this.ariaMultiSelectable, _classPrivateFieldGet(_i2, this).ariaPlaceholder = this.ariaPlaceholder, _classPrivateFieldGet(_i2, this).role = this.role;
}
function _d(t, e) {
  return (e !== null && e !== void 0 ? e : _classPrivateFieldGet(_n, this)).querySelector(t);
}
function _get_A(_this2) {
  var _classPrivateFieldGet2;
  return (_classPrivateFieldGet2 = _classPrivateFieldGet(_n, _this2).activeElement) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : _classPrivateFieldGet(_i2, _this2).ariaActiveDescendantElement;
}
function _set_A(_this3, t) {
  null !== _classPrivateGetter(_SelectField_brand, _this3, _get_A) && (_classPrivateGetter(_SelectField_brand, _this3, _get_A).ariaActiveDescendant = null), t.ariaActiveDescendant = !0, _classPrivateFieldGet(_i2, _this3).ariaActiveDescendantElement = t;
}
function _get_y(_this4) {
  return _assertClassBrand(_SelectField_brand, _this4, _d).call(_this4, "[role=button]");
}
function _get_u(_this5) {
  return _assertClassBrand(_SelectField_brand, _this5, _d).call(_this5, "[role=status]", _classPrivateGetter(_SelectField_brand, _this5, _get_y));
}
function _get_w(_this6) {
  return _assertClassBrand(_SelectField_brand, _this6, _d).call(_this6, "[role=listbox]");
}
function _get_$(_this7) {
  return _classPrivateGetter(_SelectField_brand, _this7, _get_w).children[0];
}
function _get_C(_this8) {
  return _assertClassBrand(_SelectField_brand, _this8, _d).call(_this8, "slot[name=listbox]");
}
function _get_k(_this9) {
  return _assertClassBrand(_SelectField_brand, _this9, _d).call(_this9, "[role=option]:last-of-type", _classPrivateGetter(_SelectField_brand, _this9, _get_w));
}
function _get_E(_this10) {
  return _assertClassBrand(_SelectField_brand, _this10, _d).call(_this10, "[role=option]:first-of-type", _classPrivateGetter(_SelectField_brand, _this10, _get_w));
}
_defineProperty(SelectField, "formAssociated", !0);
_defineProperty(SelectField, "observedAttributes", ["aria-label", "aria-expanded", "aria-disabled", "aria-readonly", "onchange", "value"]);
customElements.define(c, SelectField);
var d = customElements.get(c);
export { d as default };
