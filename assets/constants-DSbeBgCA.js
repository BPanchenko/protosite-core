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
  var s = document.createElement(e);
  return Object.entries(t).forEach(_ref2 => {
    var [e, t] = _ref2;
    switch (e) {
      case "className":
        s.classList.add(t);
        break;
      case "classNames":
        t.forEach(e => s.classList.add(e));
        break;
      default:
        s.setAttribute(e, t);
    }
  }), s;
}
var s = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"];
export { s as S, t as a, e as c };
