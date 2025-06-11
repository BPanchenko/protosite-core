var c=t=>!!t&&typeof t=="object",u=c;function p(t,e,i){return(u(e)?Object.entries(e):[[e,i]]).forEach(([r,a])=>{let s=String(r);if(a===null)t.removeAttribute(
s);else if(a instanceof Attr)t.setAttributeNode(a);else{let n=t.getAttributeNode(s),l=String(a);n!==null?n.value=l:t.setAttribute(
s,l)}}),new Map(t.getAttributeNames().sort().map(r=>[r,t.getAttributeNode(r)]))}var d=p;var o=class t extends HTMLElement{static oberverAttributes=["aria-busy","aria-checked","aria-disabled","aria-hidden","ar\
ia-invalid","aria-label","aria-labelledby","aria-posinset","aria-selected","aria-setsize","data-value","value"];static role="\
option";static tagName="e-option";static initAttributes(e){let i={"aria-selected":e.ariaSelected??"false",id:e.id,role:this.
role};return e.isConnected&&!i.id&&(i.id=[this.role,Math.round(performance.now())].join("-")),d(e,i)}constructor(){super(),
t.initAttributes(this)}connectedCallback(){t.initAttributes(this)}get label(){return this.ariaLabel||this.textContent}get value(){
return this.dataset.value||this.getAttribute("value")}},h=o;export{h as default};
