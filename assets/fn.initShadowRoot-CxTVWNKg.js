function applyAttributes(t) {
  var e = new Map(Object.entries(t));
  e.forEach((t, e) => this.hasOwnProperty(e) ? this[e] = t : this.setAttribute(e, t));
  for (var {
    name: _t,
    value: o
  } of this.attributes) e.set(_t, o);
  return e;
}
var t = "closed";
function initShadowRoot(e) {
  var {
      $template: o,
      template: s,
      delegatesFocus: a = !1,
      mode: i = t,
      serializable: n = !1
    } = e,
    r = this.attachShadow({
      delegatesFocus: a,
      mode: i,
      serializable: n
    });
  return DocumentFragment.prototype.isPrototypeOf(o) && r.appendChild(o.cloneNode(!0)), "string" == typeof s && r.setHTMLUnsafe(s), r;
}
export { applyAttributes as a, initShadowRoot as i };
