Object.defineProperty(String.prototype, "capitalize", {
  value: function value() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: !1
});
var e = e => document.fonts.values().findIndex(_ref => {
  var {
    fontFace: t
  } = _ref;
  return t.family === e;
}) > -1;
function t(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var a = document.createElement(e);
  return Object.entries(t).forEach(_ref2 => {
    var [e, t] = _ref2;
    switch (e) {
      case "className":
        a.classList.add(t);
        break;
      case "classNames":
        t.forEach(e => a.classList.add(e));
        break;
      default:
        a.setAttribute(e, t);
    }
  }), a;
}
export { t as a, e as c };