var x=o=>typeof o=="string"?["off","false"].includes(o.trim().toLocaleLowerCase()):!o,p=x;var f=o=>typeof o=="string"?["on","true"].includes(o.trim().toLocaleLowerCase()):!!o,s=f;function y(o){let{$template:t,template:a,delegatesFocus:e=!1,mode:r="closed",serializable:n=!1}=o,l=this.attachShadow({delegatesFocus:e,
mode:r,serializable:n});return t instanceof DocumentFragment&&l.appendChild(t.cloneNode(!0)),typeof a=="string"&&l.setHTMLUnsafe(
a),l}var h=y;var k=o=>!!o&&typeof o=="object",m=k;function w(o,t,a){return(m(t)?Object.entries(t):[[t,a]]).forEach(([r,n])=>{let l=String(r);if(n===null)o.removeAttribute(
l);else if(n instanceof Attr)o.setAttributeNode(n);else{let d=o.getAttributeNode(l),c=String(n);d!==null?d.value=c:o.setAttribute(
l,c)}}),new Map(o.getAttributeNames().sort().map(r=>[r,o.getAttributeNode(r)]))}var u=w;var v=(c=>(c.Animation="--animating",c.Collapsed="--collapsed",c.Defined="--defined",c.Disabled="--disabled",c.Expanded=
"--expanded",c.Interactive="--interactive",c.Loaded="--loaded",c.Scrolled="--scrolled",c))(v||{}),i=v;var g=`<style title="UIKit Rules" type="text/css">:host{--base-duration:.16s;--base-easing:cubic-bezier(.3,0,.2,1)}:host\
{--unit:1.6rem;
--rpx:max(.0625 * var(--unit));--space:max(1.5 * var(--unit));--space-xxs:max(.125
* var(--unit));--space-xs:max(.25 * var(--unit));--space-sm:max(.5 * var(--unit));
--space-md:max(2.5 * var(--unit));--space-xl:max(8 * var(--unit))}:host{--clr-purple-800:hwb(309.75
0% 81.024%);--clr-gray-50:hwb(122.77 92.825% 6.2277%);--clr-gray-100:hwb(122.77 86.367%
12.698%);--clr-gray-400:hwb(122.81 49.654% 49.5%);--clr-gray-500:hwb(122.84 38.325%
60.867%)}:host{--clr-white:hwb(120 100% 0%);--clr-foreground:hwb(41.755 0% 88.01%);
--clr-foreground-rgb:31 21 0}:host{--shadow-key-umbra-opacity:.2;--shadow-key-penumbra-opacity:.14;
--shadow-ambient-shadow-opacity:.12;--shadow-2dp:0 2px 2px 0 rgb(var(--clr-foreground-rgb)/var(--shadow-key-penumbra-opa\
city)),0
3px 1px -2px rgb(var(--clr-foreground-rgb)/var(--shadow-key-umbra-opacity)),0 1px
5px 0 rgb(var(--clr-foreground-rgb)/var(--shadow-ambient-shadow-opacity));--shadow-3dp:0
3px 4px 0 rgb(var(--clr-foreground-rgb)/var(--shadow-key-penumbra-opacity)),0 3px
3px -2px rgb(var(--clr-foreground-rgb)/var(--shadow-key-umbra-opacity)),0 1px 8px
0 rgb(var(--clr-foreground-rgb)/var(--shadow-ambient-shadow-opacity));--shadow-4dp:0
4px 5px 0 rgb(var(--clr-foreground-rgb)/var(--shadow-key-penumbra-opacity)),0 1px
10px 0 rgb(var(--clr-foreground-rgb)/var(--shadow-ambient-shadow-opacity)),0 2px
4px -1px rgb(var(--clr-foreground-rgb)/var(--shadow-key-umbra-opacity))}:host{--base-interligne:1.5;
--base-text-size:var(--unit);--text-md:max(1.125 * var(--unit))}:host{--font-normal:400;
--font-medium:500;--font-extra-bold:800;--icon-font:"Iconic";--ui-font:"PT Root \\
UI",system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif}
:host{--height:max(2.5 * var(--unit));--radius:max(4 * var(--rpx))}:host{--bkgd-color:var(--clr-white);
--width:max-content;--marker-glyph:"\\e18a";--option-glyph:"\\e153";--text-boldness:var(--font-normal);
--text-font:var(--ui-font);--text-interligne:var(--base-interligne);--text-size:var(--base-text-size);
--bottom-space:max(.125 * var(--unit));--left-space:max(.75 * var(--space));--right-space:var(--space);
--top-space:max(.125 * var(--unit));--marker-color:currentColor;--option-bg-color:var(--clr-gray-50);
--option-end-space:max(2 * var(--unit));--option-start-space:max(.75 * var(--unit));
--picker-space:max(.1875 * var(--space))}#button{--icon-code:"\\e231";--icon-color:var(--text-color);
--icon-font:"Iconic";--icon-size:var(--unit);--icon-weight:var(--font-normal);--icon-code:var(--marker-glyph);
--icon-color:var(--marker-color);--icon-size:var(--text-md)}#picker{--bkgd-color:var(--clr-white);
--bord-color:var(--clr-gray-100);--text-color:var(--clr-foreground);--shadow:var(--shadow-4dp);
--size:25svmax}#status{--text-boldness:var(--font-medium);&:before{--text-boldness:var(--font-normal)}}
:host{--bord-color:transparent;--marker-color:var(--clr-gray-400);--shadow:var(--shadow-2dp)}
:host(:focus),:host(:hover),:host(:state(--expanded)){--marker-color:currentColor}
:host(:focus),:host(:hover){--shadow:var(--shadow-3dp)}:host(:state(--expanded)){
--marker-glyph:"\\e18d"}:host-context(.c-panel:not(.s-clean)){--bord-color:var(--clr-gray-400);
--shadow:none;&:host(:focus){--bord-color:var(--clr-gray-100)}&:host(:state(--expanded)){
--shadow:var(--shadow-2dp)}}:host{background-color:var(--bkgd-color);border-color:var(--bord-color);
border-radius:var(--radius);border-style:solid;border-width:var(--rpx);box-sizing:border-box;
content-visibility:auto;cursor:pointer;display:inline-block;inline-size:inherit;
min-block-size:var(--height);outline:none;padding-block:max(.125 * var(--unit));
padding-inline:var(--space);position:relative;text-align:left;transition-duration:var(--base-duration);
transition-property:background-color,border-color,box-shadow;transition-timing-function:var(--base-easing);
vertical-align:middle}:host{block-size:-moz-max-content;block-size:max-content;box-shadow:var(--shadow);
box-sizing:content-box;inline-size:var(--width);padding-block:unset;padding-inline:var(--picker-space);
-webkit-user-select:none;-moz-user-select:none;user-select:none}:host(:focus){outline-color:var(--clr-purple-800);
outline-offset:max(-.8 * var(--picker-space));outline-style:dashed;outline-width:var(--rpx)}
:host(:state(--disabled)){opacity:.5;pointer-events:none}:where(#button,#picker,
#status,::slotted([role=option])){color:var(--text-color);font-family:var(--text-font);
font-size:var(--text-size);font-weight:var(--text-boldness);line-height:var(--text-interligne)}
#button{anchor-name:--anchor;align-items:center;block-size:calc(var(--height) - max(2
* var(--rpx)));border-radius:inherit;box-sizing:border-box;-moz-column-gap:var(--left-space);
column-gap:var(--left-space);cursor:pointer;display:flex;inline-size:100%;padding-block:var(--top-space)
var(--bottom-space);padding-inline-end:calc(var(--right-space) - var(--picker-space));
padding-inline-start:calc(var(--left-space) - var(--picker-space))}#button:after{
all:unset}#button:before{color:var(--icon-color);content:var(--icon-code);display:inline;
font-family:var(--icon-font);font-size:var(--icon-size);font-style:normal;font-weight:var(--icon-weight);
line-height:1;text-align:center;text-rendering:geometricPrecision;vertical-align:baseline;
speak:none;content:var(--marker-glyph);transition:color var(--base-easing) .16s}
#button:focus{outline:medium none currentcolor;outline:initial}#picker{position:absolute;
position-anchor:--anchor;position-area:inline-start block-end;box-sizing:content-box;
justify-self:end;z-index:2;interpolate-size:allow-keywords;animation-fill-mode:forwards;
animation-name:none;animation-timing-function:var(--base-easing);background-color:var(--bkgd-color);
block-size:-moz-max-content;block-size:max-content;border-radius:max(.5 * var(--unit));
box-shadow:var(--shadow);content-visibility:hidden;inline-size:var(--width);margin-block-start:var(--space-sm);
outline-color:var(--bord-color);outline-offset:max(-.75 * var(--picker-space));outline-style:solid;
outline-width:var(--rpx);padding:var(--picker-space);transform-origin:top;&[role=listbox]{
&::part(container){display:flex;gap:var(--rpx);transition:opacity var(--base-easing)
.24s}&[aria-orientation=horizontal]::part(container){flex-direction:row;inline-size:-moz-max-content;
inline-size:max-content;max-inline-size:var(--size)}&[aria-orientation=vertical]::part(container){
block-size:-moz-max-content;block-size:max-content;flex-direction:column;max-block-size:var(--size)}}}
:host(:state(--collapsed)) #picker,:host(:state(--expanded)) #picker{content-visibility:auto}
:host(:state(--collapsed)) #picker{animation-duration:.24s;animation-name:collapse-picker}
:host(:state(--expanded)) #picker{animation-duration:.32s;animation-name:expand-picker}
@keyframes collapse-picker{0%{block-size:-moz-max-content;block-size:max-content;
display:block;opacity:1;transform:translateY(0)}70%{opacity:1;transform:translateY(0)}to{
block-size:0;display:none;opacity:0;transform:translateY(max(-1 * var(--space-xs)))}}
@keyframes expand-picker{0%{block-size:0;display:none;transform:translateY(max(-1
* var(--space-sm)))}40%{transform:translateY(0)}to{block-size:-moz-max-content;block-size:max-content;
display:block;transform:none}}#status{font-weight:var(--text-boldness);&:before{
all:unset;color:var(--marker-color);font-weight:var(--text-boldness);transition:color
var(--base-easing) .68s}&:empty[aria-placeholder]:before{content:attr(aria-placeholder)}
&:not(:empty)[aria-label]:before{content:attr(aria-label) " "}}:host(:state(--expanded))
#status:not(:empty)[aria-label]:before{color:var(--clr-gray-400)}[role=option]{::slotted(&){
--bkgd-color:transparent;--icon-code:"";--text-interligne:2.5em;--space-start:var(--option-start-space);
--space-end:var(--option-end-space)}::slotted(&:hover){--bkgd-color:var(--option-bg-color)}}
[role=option]{::slotted(&[aria-current=true]),::slotted(&[aria-selected=true]){--icon-code:"\\
\\e231";--icon-color:var(--text-color);--icon-font:"Iconic";--icon-size:var(--unit);
--icon-weight:var(--font-normal)}::slotted(&[aria-current=true]){--space-end:calc(var(--option-end-space)
- var(--space-xs));--space-start:calc(var(--option-start-space) + var(--space-xs));
--text-boldness:var(--font-medium)}}[role=option][aria-selected=true]{--space-end:calc(var(--option-end-space)
- var(--space-xxs));--space-start:calc(var(--option-start-space) + var(--space-xxs));
::slotted(&){--icon-code:var(--option-glyph);--icon-color:var(--clr-gray-400);--icon-size:var(--unit);
--text-color:var(--clr-gray-500)}::slotted(&:hover){--bkgd-color:transparent}}[role=option]{
::slotted(&[aria-current=true][aria-selected=true]){--space-end:calc(var(--option-end-space)
- var(--space-xs) - var(--space-xxs));--space-start:calc(var(--option-start-space)
+ var(--space-xxs) + var(--space-xs))}}[role=option]{::slotted(&){background-color:var(--bkgd-color);
cursor:pointer;padding-inline-end:var(--space-end);padding-inline-start:var(--space-start);
transition-duration:.16s;transition-property:background-color,padding-inline;transition-timing-function:var(--base-easin\
g)}
::slotted(&:first-of-type){border-radius:var(--space-sm) var(--space-sm) 0 0}::slotted(&:last-of-type){
border-radius:0 0 var(--space-sm) var(--space-sm);margin-block-end:unset}::slotted(&[aria-selected=true]){
align-items:center;-moz-column-gap:var(--space-sm);column-gap:var(--space-sm);cursor:default;
display:flex;flex-flow:row nowrap;padding-inline-end:calc(var(--option-end-space)
- max(.1 * var(--option-start-space)));padding-inline-start:max(1.1 * var(--option-start-space))}
::slotted(&[aria-selected=true]):before{color:var(--icon-color);display:inline;font-family:var(--icon-font);
font-size:var(--icon-size);font-style:normal;font-weight:var(--icon-weight);line-height:1;
text-align:center;text-rendering:geometricPrecision;vertical-align:baseline;speak:none}
::slotted(&[aria-selected=true]):before{content:var(--icon-code)}::slotted(&[aria-selected=true][aria-current=true]){
padding-inline-end:calc(var(--option-end-space) - max(.6 * var(--option-start-space)));
padding-inline-start:max(1.6 * var(--option-start-space))}}#picker[role=listbox]:state(--scrolled){
::slotted([role=option]:first-of-type){border-top-right-radius:0}::slotted([role=option]:first-of-type){
border-bottom-right-radius:0}}
 </style><style type="text/css">:host(:state(--defined)) {
	content-visibility: hidden;
}
:host(:state(--loaded)) {
	content-visibility: visible;
}</style><div id="button" aria-controls="listbox" role="button" tabindex="0"><div id="status" aria-placeholder="\u0412\u044B\u0431\u0440\u0430\u0442\u044C.\
.." part="selectedcontent" role="status"></div></div><e-listbox id="picker" aria-labelledby="button" part="listbox" tabi\
ndex="0"><slot></slot></e-listbox>`;var b=class o extends HTMLElement{#r;#a=this.attachInternals();#s;#i;#o;#n;#u;static formAssociated=!0;static role="comb\
obox";static tagName="c-select";static observedAttributes=["aria-disabled","aria-expanded","aria-multiselectable","aria-\
required"];static initAttributes(t,a){let e={"aria-atomic":!0,"aria-expanded":!1,exportparts:t.getAttribute("exportparts"),
id:t.id,role:this.role,tabIndex:t.tabIndex},{internals:r,shadowRoot:n}=a;if(p(e.exportparts)&&n instanceof ShadowRoot){let l=n.
querySelectorAll("[part]");l.length&&(e.exportparts=Array.from(l).map(d=>d.part.toString()).join(" "))}return p(e.id)&&t.
isConnected&&(e.id=[this.role,Math.round(performance.now())].join("-")),t.isConnected&&e.tabIndex<0&&r instanceof ElementInternals&&
r.form instanceof HTMLElement&&(e.tabIndex=0),u(t,e)}static initAccessibilityTree(t,a){let{internals:e,$listbox:r,$status:n}=a;
e.ariaAtomic="true",e.ariaHasPopup="listbox",e.ariaLive="polite",e.role=this.role,e.ariaDisabled=s(t.ariaDisabled).toString(),
e.ariaExpanded=s(t.ariaExpanded).toString(),e.ariaRequired=s(t.ariaRequired).toString(),e.ariaMultiSelectable=s(t.ariaMultiSelectable).
toString(),r.ariaMultiSelectable=e.ariaMultiSelectable,n.ariaLabel=t.ariaLabel,n.ariaPlaceholder=t.ariaPlaceholder}constructor(){
super(),this.#r=h.call(this,{template:g,delegatesFocus:!0}),o.initAttributes(this,{shadowRoot:this.#r}),this.#t.add(i.Defined)}attributeChangedCallback(t,a,e){
if(this.isConnected===!1||a===e)return;let r=s(e),n=p(e);switch(t){case"aria-disabled":r?(this.#t.add(i.Disabled),this.#o?.
abort()):this.#t.delete(i.Disabled),this.#a.ariaDisabled=r.toString();break;case"aria-expanded":this.#t.delete(n?i.Expanded:
i.Collapsed),this.#t.add(r?i.Expanded:i.Collapsed),this.#a.ariaExpanded=r.toString(),this.#p();break;case"aria-multisele\
ctable":this.#a.ariaMultiSelectable=r.toString();break;default:}}connectedCallback(){o.initAttributes(this,{internals:this.#a}),
o.initAccessibilityTree(this,{$listbox:this.#e,$status:this.#c,internals:this.#a}),this.#b(),this.#v(),this.#k(),this.#t.
add(i.Interactive);let t=this.#r.querySelector("link");t&&(t.onload=()=>this.#t.add(i.Loaded))}disconnectedCallback(){this.#i?.
abort(),this.#o?.abort(),this.#s?.disconnect(),this.#n?.abort(),this.#u?.abort()}formResetCallback(){this.#e.formResetCallback()}hidePicker(){
this.#t.has(i.Collapsed)||u(this,"aria-expanded",!1)}showPicker(){this.#t.has(i.Expanded)||u(this,"aria-expanded",!0)}get disabled(){
return this.#t.has(i.Disabled)&&s(this.#a.ariaDisabled)&&s(this.ariaDisabled)}get expanded(){return this.#t.has(i.Expanded)&&
s(this.#a.ariaExpanded)&&s(this.ariaExpanded)}get multiple(){return s(this.#a.ariaMultiSelectable)}get name(){return(this.
dataset.name||this.getAttribute("name"))??""}get options(){return this.#e.options}get readonly(){return s(this.#a.ariaReadOnly)}get required(){
return s(this.#a.ariaRequired)}get length(){return this.#e.length}get type(){return"select"+(this.multiple?"-multiple":"\
-one")}get value(){return this.#e.value}get#l(){let t=this.#r.getElementById("button");if(t===null)throw new Error("Butt\
on element not found but required!");return t}get#c(){let t=this.#r.getElementById("status");if(t===null)throw new Error(
"Element of the selected content not found but required!");return t}get#e(){let t=this.#r.getElementById("picker");if(t===
null)throw new Error("Listbox element not found but required!");return t}get#t(){return this.#a.states}#b(){this.#i?.abort(),
this.#i=new AbortController;let t={signal:this.#i.signal};return this.addEventListener("focus",a=>this.#m(a),t),this.addEventListener(
"blur",a=>this.#h(a),t),this.#i}#h(t){this.hidePicker(),this.#o?.abort()}#m(t){this.#x()}#v(){this.#n?.abort(),this.#n=new AbortController;
let t={capture:!1,passive:!0,signal:this.#n.signal};return this.#e.addEventListener("beforeinput",a=>this.#d(a),t),this.#e.
addEventListener("input",a=>{this.#g(a),this.#d(a)},t),this.#n}#g(t){let{label:a=null,value:e=null}=this.options[this.#e.
selectedIndex]??{};this.#a.setFormValue(e),this.#c.innerText=a??"",e!==null&&this.hidePicker()}#x(){this.#o?.abort(),this.#o=
new AbortController;let t={capture:!1,passive:!0,signal:this.#o.signal};return this.addEventListener("click",a=>this.#f(
a),t),this.addEventListener("keydown",a=>this.#y(a),t),this.#w(this.#o.signal),this.#o}#f(t){this.expanded?this.hidePicker():
this.showPicker()}#y(t){switch(t.key){case"ArrowDown":case"Enter":this.showPicker();break;case"ArrowUp":case"Escape":this.#l.
focus(),this.hidePicker();break;default:return}}#k(){return this.#s?.disconnect(),this.#s=new MutationObserver(t=>t.forEach(
a=>{if(a.type==="attributes"){let{attributeName:e}=a,r=e?a.target.getAttribute(e):null;e&&r?this.setAttribute(e,r):e&&this.
removeAttribute(e)}})),this.#s.observe(this.#e,{attributes:!0,attributeFilter:["aria-activedescendant","aria-owns"]}),this}#w(t){
this.#e.addEventListener("animationend",a=>this.#E(a),{signal:t})}#E(t){this.#t.delete(i.Animation),this.#p()}#d(t){let{
bubbles:a,data:e,type:r}=t,n=Object.getPrototypeOf(t).constructor,l=new n(r,{bubbles:a,data:e});return this.dispatchEvent(
l),this}#p(){let t=this.#t.has(i.Expanded),a=this.#t.has(i.Collapsed);t?(this.#e.focus(),this.#e.updateScrollbar()):this.#l.
focus(),this.#e.ariaHidden=a.toString()}},H=b;export{H as default};
