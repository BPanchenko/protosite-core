var p=(n=>(n.Animation="--animating",n.Collapsed="--collapsed",n.Defined="--defined",n.Disabled="--disabled",n.Expanded=
"--expanded",n.Interactive="--interactive",n.Loaded="--loaded",n.Scrolled="--scrolled",n))(p||{}),a=p;function S(t){let{$template:e,template:i,delegatesFocus:o=!1,mode:l="closed",serializable:r=!1}=t,s=this.attachShadow({delegatesFocus:o,
mode:l,serializable:r});return e instanceof DocumentFragment&&s.appendChild(e.cloneNode(!0)),typeof i=="string"&&s.setHTMLUnsafe(
i),s}var y=S;var c=["bottom","bottom-left","bottom-right","left","right","top","top-left","top-right"],d=["angle-left-top","angle-rig\
ht-bottom","angle-right-bottom-fill","angle-right-top","angle-thick-bottom-left","angle-thick-bottom-right-fill","angle-\
thick-left-bottom-line","angle-thick-top-left","angle-thick-top-right","fill","line"],h=["acute","angled","large","large\
-acute","large-angled","large-oblique","oblique"],g=["thick"],m=(t,e)=>{if(e===null||!e?.cssRules)return!0;for(let i of e.
cssRules)if(i.selectorText===`[data-glyph="${t}"]`)return!0;return!1},f=t=>c.includes(t),x=t=>d.includes(t),v=t=>h.includes(
t),b=t=>g.includes(t);var w=`<link id="link-glyph-collection" fetchpriority="low" href="//assets.protosite.xyz/core/stylesheet.arrow-glyphs.cs\
s" media="screen" rel="stylesheet" type="text/css" title="Visual Symbol defines by the glyph name that passed to the dat\
a attribute"/><style type="text/css">:host{--unit:1.6rem;--space-md:max(2.5 * var(--unit));--space-xl:max(8 * var(--unit\
))}
:host{--base-interligne:1.5;--base-text-size:var(--unit)}:host{--font-normal:400;
--font-medium:500;--font-extra-bold:800;--icon-font:"Iconic";--ui-font:"PT Root \\
UI",system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif}
@layer settings,modifiers,rules;@layer rules{:host{display:contents}.icon{block-size:var(--icon-size);
container-name:icon-container;container-type:inline-size;display:inline-block;inline-size:var(--icon-size)}
.icon,.icon:before{vertical-align:baseline}.icon:before{color:var(--icon-color);
content:var(--icon-code);display:inline;font-family:var(--icon-font);font-size:var(--icon-size);
font-style:normal;font-weight:var(--icon-weight);line-height:1;text-align:center;
text-rendering:geometricPrecision;speak:none}:where(.icon,::slotted(*)){color:var(--text-color);
font-family:var(--text-font);font-size:var(--text-size);font-weight:var(--text-boldness);
line-height:var(--text-interligne);pointer-events:none}}@layer modifiers{.icon:before{
@container icon-container (min-width: 4rem){--icon-weight:var(--font-medium)}@container icon-container
(min-width: 12.8rem){--icon-weight:var(--font-extra-bold)}}:host(.s-xxs){--icon-size:var(--size-xxs)}
:host(.s-xs){--icon-size:var(--size-xs)}:host(.s-sm){--icon-size:var(--size-sm)}
:host(.s-md){--icon-size:var(--size-md)}:host(.s-lg){--icon-size:var(--size-lg)}
:host(.s-xl){--icon-size:var(--size-xl)}:host(.s-xxl){--icon-size:var(--size-xxl)}}
@layer settings{:host{--icon-code:"\\e231";--icon-color:var(--text-color);--icon-font:"\\
Iconic";--icon-size:var(--unit);--icon-weight:var(--font-normal)}:host{--size-xxs:max(.75
* var(--unit));--size-xs:max(1.75 * var(--unit));--size-sm:max(2.5 * var(--unit));
--size-md:max(5 * var(--unit));--size-lg:max(10 * var(--unit));--size-xl:max(16 *
var(--unit));--size-xxl:max(20 * var(--unit));--text-font:var(--ui-font);--text-boldness:var(--font-normal);
--text-color:currentColor;--text-interligne:var(--base-interligne);--text-size:var(--base-text-size);
.icon{--text-font:var(--icon-font);--text-boldness:var(--icon-weight);--text-color:currentColor;
--text-interligne:1;--text-size:var(--icon-size)}}}
 </style><style type="text/css">:host(:state(--defined)) {
	content-visibility: hidden;
}
:host(:state(--loaded)) {
	content-visibility: visible;
}</style><div class="icon" id="icon-container" data-glyph="arrow" role="presentation"></div><slot></slot>`;var u=class t extends HTMLElement{#o=this.attachInternals();#e;#t;static observedAttributes=["glyph-direction","glyph-fi\
gure","glyph-style","glyph-weight"];static role="img";static tagName="e-arrow";static directions=c;static figures=d;static styles=h;static weights=g;constructor(){
super(),this.#e=y.call(this,{template:w}),this.#i.add(a.Defined)}attributeChangedCallback(e,i,o){i!==o&&this.#n()}connectedCallback(){
this.setAttribute("role",t.role),this.#l.onload=({currentTarget:e})=>{this.#t=e.sheet,this.#i.add(a.Loaded)}}#n(){let e=[
"arrow"],[i,o,l,r]=["glyph-direction","glyph-figure","glyph-style","glyph-weight"].map(z=>this.getAttribute(z));if(r!==null)
if(b(r))e.push(r);else throw new TypeError(`Invalid Weight: ${r}`);if(i!==null)if(f(i))e.push(i);else throw new TypeError(
`Invalid Direction: ${i}`);if(o!==null)if(x(o))e.push(o);else throw new TypeError(`Invalid Figure: ${o}`);if(l!==null)if(v(
l))e.push(l);else throw new TypeError(`Invalid Style: ${l}`);let s=e.join("-");console.assert(m(s,this.#t),`Unsupported \
Glyph: ${s}`),this.#s.dataset.glyph=s}get#s(){return this.#e.getElementById("icon-container")}get#l(){return this.#e.getElementById(
"link-styling")}get#i(){return this.#o.states}},W=u;export{W as default};
