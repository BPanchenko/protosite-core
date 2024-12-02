function applyAttributes(t) {
  return Object.entries(t).forEach(_ref => {
    var [t, e] = _ref;
    return this.setAttribute(t, e);
  }), this;
}
var t = "closed";
function initShadowRoot(e) {
  var {
      $template: o,
      template: i,
      delegatesFocus: a = !1,
      mode: s = t,
      serializable: n = !1
    } = e,
    r = this.attachShadow({
      delegatesFocus: a,
      mode: s,
      serializable: n
    });
  return HTMLTemplateElement.prototype.isPrototypeOf(o) && r.appendChild(o.cloneNode(!0)), "string" == typeof i && (r.innerHTML = i), r;
}
export { applyAttributes as a, initShadowRoot as i };
