var p=(n=>(n.Animation="--animating",n.Collapsed="--collapsed",n.Defined="--defined",n.Disabled="--disabled",n.Expanded=
"--expanded",n.Interactive="--interactive",n.Loaded="--loaded",n.Scrolled="--scrolled",n))(p||{}),c=p;function S(e){let{$template:t,template:i,delegatesFocus:o=!1,mode:r="closed",serializable:s=!1}=e,l=this.attachShadow({delegatesFocus:o,
mode:r,serializable:s});return t instanceof DocumentFragment&&l.appendChild(t.cloneNode(!0)),typeof i=="string"&&l.setHTMLUnsafe(
i),l}var m=S;var d=["bottom","bottom-left","bottom-right","left","right","top","top-left","top-right"],g=["angle-left-top","angle-rig\
ht-bottom","angle-right-bottom-fill","angle-right-top","angle-thick-bottom-left","angle-thick-bottom-right-fill","angle-\
thick-left-bottom-line","angle-thick-top-left","angle-thick-top-right","fill","line"],h=["acute","angled","large","large\
-acute","large-angled","large-oblique","oblique"],u=["thick"],y=(e,t)=>{if(t===null||!t?.cssRules)return!0;for(let i of t.
cssRules)if(i.selectorText===`[data-glyph="${e}"]`)return!0;return!1},f=e=>d.includes(e),v=e=>g.includes(e),x=e=>h.includes(
e),w=e=>u.includes(e);var b=`<style type="text/css">:host{--unit:1.6rem;--space-md:max(2.5 * var(--unit));--space-xl:max(8 * var(--unit))}:hos\
t{--font-normal:400;--font-medium:500;--font-extra-bold:800}:host{--icon-code:"\\e231";--icon-color:var(--text-color);--i\
con-font:"Iconic";--icon-size:var(--unit);--icon-weight:var(--font-normal)}:host{--icon-font:icon-arrow;--size-xxs:max(.\
75 * var(--unit));--size-xs:max(1.75 * var(--unit));--size-sm:max(2.5 * var(--unit));--size-md:max(5 * var(--unit));--si\
ze-lg:max(10 * var(--unit));--size-xl:max(16 * var(--unit));--size-xxl:max(20 * var(--unit));--text-color:currentColor}#\
icon{--text-color:currentColor}#icon:before{color:var(--icon-color);content:var(--icon-code);display:inline;font-family:\
var(--icon-font);font-size:var(--icon-size);font-style:normal;font-weight:var(--icon-weight);line-height:1;text-align:ce\
nter;text-rendering:geometricPrecision;vertical-align:baseline;speak:none}@container icon-container (min-width: 4rem){#i\
con:before{--icon-weight:var(--font-medium)}}@container icon-container (min-width: 12.8rem){#icon:before{--icon-weight:v\
ar(--font-extra-bold)}}:host(.s-xxs){--icon-size:var(--size-xxs)}:host(.s-xs){--icon-size:var(--size-xs)}:host(.s-sm){--\
icon-size:var(--size-sm)}:host(.s-md){--icon-size:var(--size-md)}:host(.s-lg){--icon-size:var(--size-lg)}:host(.s-xl){--\
icon-size:var(--size-xl)}:host(.s-xxl){--icon-size:var(--size-xxl)}:host{display:contents}#icon{block-size:var(--icon-si\
ze);container-name:icon-container;container-type:inline-size;display:inline-block;inline-size:var(--icon-size);vertical-\
align:baseline}
 </style><div id="icon" data-glyph="arrow" role="presentation"></div><slot></slot>`;var a=class e extends HTMLElement{#i=this.attachInternals();#e;#o;static observedAttributes=["glyph-direction","glyph-fi\
gure","glyph-style","glyph-weight"];static role="img";static tagName="e-arrow";static directions=d;static figures=g;static styles=h;static weights=u;constructor(){
super(),this.#e=m.call(this,{mode:"open",template:b}),this.#t.add(c.Defined)}attributeChangedCallback(t,i,o){i!==o&&this.#n()}connectedCallback(){
this.setAttribute("role",e.role),this.#t.add(c.Loaded)}#n(){let t=["arrow"],[i,o,r,s]=["glyph-direction","glyph-figure",
"glyph-style","glyph-weight"].map(z=>this.getAttribute(z));if(s!==null)if(w(s))t.push(s);else throw new TypeError(`Inval\
id Weight: ${s}`);if(i!==null)if(f(i))t.push(i);else throw new TypeError(`Invalid Direction: ${i}`);if(o!==null)if(v(o))
t.push(o);else throw new TypeError(`Invalid Figure: ${o}`);if(r!==null)if(x(r))t.push(r);else throw new TypeError(`Inval\
id Style: ${r}`);let l=t.join("-");console.assert(y(l,this.#o),`Unsupported Glyph: ${l}`),this.#l.dataset.glyph=l}get#l(){
return this.#e.getElementById("icon")}get#t(){return this.#i.states}};customElements.define(a.tagName,a);
//# sourceMappingURL=element.arrow.js.map
