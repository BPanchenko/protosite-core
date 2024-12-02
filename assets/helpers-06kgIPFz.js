Object.defineProperty(String.prototype, "capitalize", {
  value: function value() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: !1
});
var e = (e, t) => Object.entries(t).forEach(_ref => {
    var [t, a] = _ref;
    return e.setAttribute(t, a);
  }),
  t = (e, t) => {
    var {
        $template: a,
        delegatesFocus: s = !1,
        mode: c = "closed",
        serializable: r = !1
      } = t,
      o = e.attachShadow({
        delegatesFocus: s,
        mode: c,
        serializable: r
      });
    return o.appendChild(a.cloneNode(!0)), o;
  },
  a = e => document.fonts.values().findIndex(_ref2 => {
    var {
      fontFace: t
    } = _ref2;
    return t.family === e;
  }) > -1;
function s(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var a = document.createElement(e);
  return Object.entries(t).forEach(_ref3 => {
    var [e, t] = _ref3;
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
export { s as a, t as b, a as c, e as i };
