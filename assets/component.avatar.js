function g(t){let{$template:e,template:r,delegatesFocus:a=!1,mode:o="closed",serializable:n=!1}=t,i=this.attachShadow({delegatesFocus:a,
mode:o,serializable:n});return e instanceof DocumentFragment&&i.appendChild(e.cloneNode(!0)),typeof r=="string"&&i.setHTMLUnsafe(
r),i}var c=g;var x=t=>!!t&&typeof t=="object",p=x;function v(t,e,r){return(p(e)?Object.entries(e):[[e,r]]).forEach(([o,n])=>{let i=String(o);if(n===null)t.removeAttribute(
i);else if(n instanceof Attr)t.setAttributeNode(n);else{let d=t.getAttributeNode(i),s=String(n);d!==null?d.value=s:t.setAttribute(
i,s)}}),new Map(t.getAttributeNames().sort().map(o=>[o,t.getAttributeNode(o)]))}var u=v;var b=(s=>(s.Animation="--animating",s.Collapsed="--collapsed",s.Defined="--defined",s.Disabled="--disabled",s.Expanded=
"--expanded",s.Interactive="--interactive",s.Loaded="--loaded",s.Scrolled="--scrolled",s))(b||{}),m=b;var h=`<style title="UIKit Rules" type="text/css">:host{--clr-foreground-rgb:31 21 0}:host{--shadow-key-umbra-opacity:.2\
;--shadow-key-penumbra-opacity:.14;--shadow-ambient-shadow-opacity:.12;--shadow-2dp:0 2px 2px 0 rgb(var(--clr-foreground\
-rgb)/var(--shadow-key-penumbra-opacity)),0 3px 1px -2px rgb(var(--clr-foreground-rgb)/var(--shadow-key-umbra-opacity)),\
0 1px 5px 0 rgb(var(--clr-foreground-rgb)/var(--shadow-ambient-shadow-opacity));--inset-shadow-2dp:inset 0 2px 2px 0 rgb\
(var(--clr-foreground-rgb)/var(--shadow-key-penumbra-opacity)),inset 0 3px 1px -2px rgb(var(--clr-foreground-rgb)/var(--\
shadow-key-umbra-opacity)),inset 0 1px 5px 0 rgb(var(--clr-foreground-rgb)/var(--shadow-ambient-shadow-opacity))}:host{-\
-bkgd-color:transparent;--bord-color:var(--clr-gray-300);--radius:50%;--shadow:var(--shadow-2dp);--size:max(5 * var(--un\
it));--size-xxs:max(1 * var(--unit));--size-xs:max(1.5 * var(--unit));--size-sm:max(2.5 * var(--unit));--size-md:max(6 *\
 var(--unit));--size-lg:max(8 * var(--unit));--size-xl:max(12 * var(--unit));--size-xxl:max(16 * var(--unit));#mask{--sh\
adow:none}}:host(.s-xxs){--size:var(--size-xxs)}:host(.s-xs){--size:var(--size-xs)}:host(.s-sm){--size:var(--size-sm)}:h\
ost(.s-md){--size:var(--size-md)}:host(.s-lg){--size:var(--size-lg)}:host(.s-xl){--size:var(--size-xl)}:host(.s-xxl){--s\
ize:var(--size-xxl)}:host-context(.c-panel:not(.s-clean)){--bkgd-color:var(--clr-gray-200);--shadow:none;#mask{--shadow:\
var(--inset-shadow-2dp)}}:host{background-color:var(--bkgd-color);block-size:var(--size);border-radius:var(--radius);box\
-shadow:var(--shadow);display:inline-block;inline-size:var(--size);overflow:hidden;position:relative;-webkit-user-select\
:none;-moz-user-select:none;user-select:none;vertical-align:middle;:is(#link,#mask,#image){block-size:var(--size);border\
-radius:var(--radius);inline-size:var(--size);left:0;overflow:hidden;pointer-events:none;position:absolute;top:0}:is(#li\
nk,#image){display:none}#link[href]{display:block;pointer-events:auto;z-index:3}#mask{border:max(1 * var(--rpx)) solid v\
ar(--bord-color);box-shadow:var(--shadow);box-sizing:border-box;display:block;opacity:.8;z-index:2}#image[src]{display:b\
lock;-o-object-fit:cover;object-fit:cover;pointer-events:auto;z-index:1}}:host-context(.c-panel:not(.s-clean)) #mask{bor\
der:initial}
 </style><a id="link"></a><div id="mask" part="mask"></div><slot><img id="image"/></slot>`;var l=class extends HTMLElement{#e;#t=this.attachInternals();static observedAttributes=["alt","href","src","tabindex","t\
arget"];static role="img";static tagName="c-avatar";static initAttributes(e){let r={"aria-atomic":!0,exportparts:"mask",
role:this.role};return u(e,r)}constructor(){super(),this.#e=c.call(this,{template:h,delegatesFocus:!0}),this.#r.add(m.Defined)}attributeChangedCallback(e,r,a){
if(this.isConnected===!1||r===a)return;let o=["href","target","tabindex"].includes(e)?this.#o:["alt","src"].includes(e)?
this.#s:null;o!==null&&(a===null?o.removeAttribute(e):e==="tabindex"?o.setAttribute(e,"0"):o.setAttribute(e,a))}get#o(){
return this.#e.getElementById("link")}get#s(){let e=this.#e.getElementById("image");if(e===null)throw new Error("Image e\
lement not found but required!");return e}get#r(){return this.#t.states}},H=l;export{H as default};
//# sourceMappingURL=component.avatar.js.map
