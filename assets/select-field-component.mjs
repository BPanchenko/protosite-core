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
var s = "c-select-field";
var _t = /*#__PURE__*/new WeakMap();
var _e = /*#__PURE__*/new WeakMap();
var _s = /*#__PURE__*/new WeakMap();
var _i = /*#__PURE__*/new WeakMap();
var _a = /*#__PURE__*/new WeakMap();
var _n = /*#__PURE__*/new WeakMap();
var _SelectField_brand = /*#__PURE__*/new WeakSet();
class SelectField extends HTMLElement {
  constructor() {
    var _s2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(), _classPrivateMethodInitSpec(this, _SelectField_brand), _classPrivateFieldInitSpec(this, _t, new AbortController()), _classPrivateFieldInitSpec(this, _e, new Map()), _classPrivateFieldInitSpec(this, _s, !1), _classPrivateFieldInitSpec(this, _i, void 0), _classPrivateFieldInitSpec(this, _a, void 0), _classPrivateFieldInitSpec(this, _n, void 0), this, _classPrivateFieldSet(_a, this, t.call(this, _objectSpread({
      "aria-autocomplete": "list",
      "aria-haspopup": "listbox",
      "aria-expanded": !1,
      exportparts: "button, choice, listbox",
      role: "combobox",
      tabindex: 0
    }, _s2))), _classPrivateFieldSet(_n, this, e.call(this, {
      template: '<link href="http://assets.protosite.rocks/core/select-field.css" rel="stylesheet" type="text/css"><style type="text/css">:host(:defined) {\n\tcontent-visibility: hidden;\n}\n:host(:state(loaded)) {\n\tcontent-visibility: visible;\n}</style><div aria-activedescendant="true" aria-controls="listbox_popover" id="button" role="button"><div part="active_option" role="status"></div></div><slot name="listbox"><div aria-labelledby="button" id="listbox_popover" role="listbox" part="listbox"><slot></slot></div></slot>',
      delegatesFocus: !0
    })), _classPrivateFieldSet(_e, this, _assertClassBrand(_SelectField_brand, this, _l).call(this)), _classPrivateFieldSet(_i, this, _assertClassBrand(_SelectField_brand, this, _r).call(this)), _assertClassBrand(_SelectField_brand, this, _o).call(this, "defined");
  }
  connectedCallback() {
    _assertClassBrand(_SelectField_brand, this, _d).call(this), _assertClassBrand(_SelectField_brand, this, _h).call(this), _assertClassBrand(_SelectField_brand, this, _o).call(this, "interactive"), _assertClassBrand(_SelectField_brand, this, _c).call(this, "link").onload = () => _assertClassBrand(_SelectField_brand, this, _o).call(this, "loaded");
  }
  disconnectedCallback() {
    _classPrivateFieldGet(_t, this).abort(), _classPrivateFieldSet(_s, this, !1);
  }
  adoptedCallback() {}
  attributeChangedCallback(t, e, s) {
    if (!1 !== this.isConnected && e !== s) switch (t) {
      case "aria-disabled":
        this.disabled = "true" === (_classPrivateFieldGet(_i, this).ariaDisabled = s);
        break;
      case "aria-expanded":
        this.expanded = "true" === (_classPrivateFieldGet(_i, this).ariaExpanded = s);
        break;
      case "aria-label":
        _classPrivateGetter(_SelectField_brand, this, _get_u).ariaLabel = s;
        break;
      case "value":
        this.value = s;
        break;
      default:
        _assertClassBrand(_SelectField_brand, this, _d).call(this);
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
    t.length >= 2 ? _classPrivateFieldGet(_i, this).setValidity({}) : (_classPrivateFieldGet(_i, this).setValidity({
      tooShort: !0
    }, "value is too short", _classPrivateFieldGet(_n, this).firstChild), _classPrivateFieldGet(_i, this).reportValidity());
  }
  search(t) {
    for (var [_e2, _s3] of _classPrivateFieldGet(_e, this)) if (0 === _s3.label.indexOf(t) || 0 === _s3.value.indexOf(t)) return _objectSpread({
      $element: _e2.deref()
    }, _s3);
    return null;
  }
  findByValue(t) {
    for (var [_e3, _s4] of _classPrivateFieldGet(_e, this)) if (t === _s4.value) return _objectSpread({
      $element: _e3.deref()
    }, _s4);
    return null;
  }
  toggle() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var e = t !== null && t !== void 0 ? t : this.expanded ? "collapsed" : "expanded";
    return this[e] = !0, e;
  }
  get form() {
    return _classPrivateFieldGet(_i, this).form;
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
    return _classPrivateFieldGet(_i, this).ariaValueNow;
  }
  set value(t) {
    _classPrivateFieldGet(_i, this).ariaValueNow = t, this.setAttribute("value", t), this.dispatchEvent(new Event("change"));
  }
  get interactive() {
    return _classPrivateFieldGet(_s, this);
  }
  get disabled() {
    return _classPrivateFieldGet(_i, this).ariaDisabled;
  }
  set disabled(t) {
    t ? (_classPrivateGetter(_SelectField_brand, this, _get_b).add("disabled"), this.disconnectedCallback()) : _classPrivateGetter(_SelectField_brand, this, _get_b).has("disabled") && (_classPrivateGetter(_SelectField_brand, this, _get_b).delete("disabled"), _assertClassBrand(_SelectField_brand, this, _h).call(this)), this.setAttribute("aria-disabled", t), this.setAttribute("tabindex", this.disabled ? "-1" : _classPrivateFieldGet(_a, this).get("tabindex"));
  }
  get expanded() {
    return "true" === _classPrivateFieldGet(_i, this).ariaExpanded;
  }
  set expanded(t) {
    this.setAttribute("aria-expanded", t), _classPrivateGetter(_SelectField_brand, this, _get_b)[t ? "add" : "delete"]("expanded"), _classPrivateGetter(_SelectField_brand, this, _get_b)[t ? "delete" : "add"]("collapsed");
  }
  set collapsed(t) {
    this.expanded = !1 === t;
  }
}
function _get_b(_this) {
  return _classPrivateFieldGet(_i, _this).states;
}
function _o(t) {
  return _classPrivateGetter(_SelectField_brand, this, _get_b).add(t), this;
}
function _h() {
  this.addEventListener("click", _assertClassBrand(_SelectField_brand, this, _p), {
    signal: _classPrivateFieldGet(_t, this).signal
  }), this.addEventListener("focus", _assertClassBrand(_SelectField_brand, this, _v), {
    signal: _classPrivateFieldGet(_t, this).signal
  }), this.addEventListener("blur", _assertClassBrand(_SelectField_brand, this, _g), {
    signal: _classPrivateFieldGet(_t, this).signal
  });
}
function _f() {
  return !1 === _classPrivateFieldGet(_s, this) && (this.addEventListener("click", _assertClassBrand(_SelectField_brand, this, _p), {
    signal: _classPrivateFieldGet(_t, this).signal
  }), this.addEventListener("keypress", _assertClassBrand(_SelectField_brand, this, _x), {
    signal: _classPrivateFieldGet(_t, this).signal
  }), _classPrivateFieldSet(_s, this, !0)), this;
}
function _m() {
  return _classPrivateFieldGet(_s, this) && (this.removeEventListener("click", _assertClassBrand(_SelectField_brand, this, _p)), this.removeEventListener("keypress", _assertClassBrand(_SelectField_brand, this, _x)), _classPrivateFieldSet(_s, this, !1)), this;
}
function _v() {
  _assertClassBrand(_SelectField_brand, this, _f).call(this);
}
function _g() {
  _assertClassBrand(_SelectField_brand, this, _m).call(this), this.toggle("collapsed");
}
function _p() {
  this.toggle();
}
function _x(_ref) {
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
      this.focus(_classPrivateGetter(_SelectField_brand, this, _get_$));
      break;
    case "Home":
      this.focus(_classPrivateGetter(_SelectField_brand, this, _get_k));
  }
}
function _r() {
  var t = this.attachInternals();
  return t.ariaActiveDescendantElement = _assertClassBrand(_SelectField_brand, this, _c).call(this, "[aria-activedescendant=true]"), console.assert(t.ariaActiveDescendantElement, "Attribute `[aria-activedescendant]` requires specifying for some child element"), t;
}
function _l() {
  var t = _classPrivateFieldGet(_e, this);
  return _classPrivateGetter(_SelectField_brand, this, _get_E).addEventListener("slotchange", () => {
    var e = _classPrivateGetter(_SelectField_brand, this, _get_C).assignedElements();
    for (var _s5 of e) _s5.hasAttribute("role") && "option" === _s5.role ? t.set(new WeakRef(_s5), {
      label: _s5.textContent || _s5.dataset.value,
      value: _s5.dataset.value || _s5.textContent
    }) : _s5.remove();
    (t => {
      t.forEach((t, e, s) => {
        var _e$deref;
        return Boolean((_e$deref = e.deref()) === null || _e$deref === void 0 ? void 0 : _e$deref.isConnected) || s.delete(e);
      });
    })(t);
  }, {
    signal: _classPrivateFieldGet(_t, this).signal
  }), t;
}
function _d() {
  _classPrivateFieldGet(_i, this).ariaAutoComplete = this.ariaAutoComplete, _classPrivateFieldGet(_i, this).ariaDisabled = this.ariaDisabled, _classPrivateFieldGet(_i, this).ariaHasPopup = this.ariaHasPopup, _classPrivateFieldGet(_i, this).ariaExpanded = this.ariaExpanded, _classPrivateFieldGet(_i, this).ariaMultiSelectable = this.ariaMultiSelectable, _classPrivateFieldGet(_i, this).ariaPlaceholder = this.ariaPlaceholder, _classPrivateFieldGet(_i, this).role = this.role;
}
function _c(t, e) {
  return (e !== null && e !== void 0 ? e : _classPrivateFieldGet(_n, this)).querySelector(t);
}
function _get_A(_this2) {
  var _classPrivateFieldGet2;
  return (_classPrivateFieldGet2 = _classPrivateFieldGet(_n, _this2).activeElement) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : _classPrivateFieldGet(_i, _this2).ariaActiveDescendantElement;
}
function _set_A(_this3, t) {
  null !== _classPrivateGetter(_SelectField_brand, _this3, _get_A) && (_classPrivateGetter(_SelectField_brand, _this3, _get_A).ariaActiveDescendant = null), t.ariaActiveDescendant = !0, _classPrivateFieldGet(_i, _this3).ariaActiveDescendantElement = t;
}
function _get_y(_this4) {
  return _assertClassBrand(_SelectField_brand, _this4, _c).call(_this4, "[role=button]");
}
function _get_u(_this5) {
  return _assertClassBrand(_SelectField_brand, _this5, _c).call(_this5, "[role=status]", _classPrivateGetter(_SelectField_brand, _this5, _get_y));
}
function _get_w(_this6) {
  return _assertClassBrand(_SelectField_brand, _this6, _c).call(_this6, "[role=listbox]");
}
function _get_C(_this7) {
  return _classPrivateGetter(_SelectField_brand, _this7, _get_w).children[0];
}
function _get_E(_this8) {
  return _assertClassBrand(_SelectField_brand, _this8, _c).call(_this8, "slot[name=listbox]");
}
function _get_$(_this9) {
  return _assertClassBrand(_SelectField_brand, _this9, _c).call(_this9, "[role=option]:last-of-type", _classPrivateGetter(_SelectField_brand, _this9, _get_w));
}
function _get_k(_this10) {
  return _assertClassBrand(_SelectField_brand, _this10, _c).call(_this10, "[role=option]:first-of-type", _classPrivateGetter(_SelectField_brand, _this10, _get_w));
}
_defineProperty(SelectField, "formAssociated", !0);
_defineProperty(SelectField, "observedAttributes", ["aria-label", "aria-expanded", "aria-disabled", "aria-readonly", "onchange", "value"]);
customElements.define(s, SelectField);
var i = customElements.get(s);
export { i as default };
