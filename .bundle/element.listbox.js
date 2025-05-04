var St=Object.create;var x=Object.defineProperty;var At=Object.getOwnPropertyDescriptor;var It=Object.getOwnPropertyNames;var Tt=Object.getPrototypeOf,Et=Object.prototype.hasOwnProperty;var o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var wt=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of It(t))!Et.call(e,s)&&s!==i&&x(e,s,{get:()=>t[s],
enumerable:!(r=At(t,s))||r.enumerable});return e};var kt=(e,t,i)=>(i=e!=null?St(Tt(e)):{},wt(t||!e||!e.__esModule?x(i,"default",{value:e,enumerable:!0}):i,e));var S=o((Ne,v)=>{"use strict";function Ot(e,t,i){return e===e&&(i!==void 0&&(e=e<=i?e:i),t!==void 0&&(e=e>=t?e:t)),e}v.exports=
Ot});var I=o((Pe,A)=>{"use strict";var Lt=typeof global=="object"&&global&&global.Object===Object&&global;A.exports=Lt});var E=o(($e,T)=>{"use strict";var Mt=I(),qt=typeof self=="object"&&self&&self.Object===Object&&self,jt=Mt||qt||Function(
"return this")();T.exports=jt});var u=o((Fe,w)=>{"use strict";var Dt=E(),Ht=Dt.Symbol;w.exports=Ht});var O=o((Be,k)=>{"use strict";function Ct(e,t){for(var i=-1,r=e==null?0:e.length,s=Array(r);++i<r;)s[i]=t(e[i],i,e);return s}
k.exports=Ct});var M=o((ze,L)=>{"use strict";var Rt=Array.isArray;L.exports=Rt});var H=o((We,D)=>{"use strict";var q=u(),j=Object.prototype,Nt=j.hasOwnProperty,Pt=j.toString,h=q?q.toStringTag:void 0;function $t(e){
var t=Nt.call(e,h),i=e[h];try{e[h]=void 0;var r=!0}catch{}var s=Pt.call(e);return r&&(t?e[h]=i:delete e[h]),s}D.exports=
$t});var R=o((_e,C)=>{"use strict";var Ft=Object.prototype,Bt=Ft.toString;function zt(e){return Bt.call(e)}C.exports=zt});var F=o((Ge,$)=>{"use strict";var N=u(),Wt=H(),_t=R(),Gt="[object Null]",Kt="[object Undefined]",P=N?N.toStringTag:void 0;
function Vt(e){return e==null?e===void 0?Kt:Gt:P&&P in Object(e)?Wt(e):_t(e)}$.exports=Vt});var z=o((Ke,B)=>{"use strict";function Ut(e){return e!=null&&typeof e=="object"}B.exports=Ut});var f=o((Ve,W)=>{"use strict";var Yt=F(),Xt=z(),Jt="[object Symbol]";function Qt(e){return typeof e=="symbol"||Xt(e)&&Yt(
e)==Jt}W.exports=Qt});var b=o((Ue,U)=>{"use strict";var _=u(),Zt=O(),te=M(),ee=f(),ie=1/0,G=_?_.prototype:void 0,K=G?G.toString:void 0;function V(e){
if(typeof e=="string")return e;if(te(e))return Zt(e,V)+"";if(ee(e))return K?K.call(e):"";var t=e+"";return t=="0"&&1/e==
-ie?"-0":t}U.exports=V});var X=o((Ye,Y)=>{"use strict";var re=/\s/;function se(e){for(var t=e.length;t--&&re.test(e.charAt(t)););return t}Y.exports=
se});var Q=o((Xe,J)=>{"use strict";var ne=X(),oe=/^\s+/;function ae(e){return e&&e.slice(0,ne(e)+1).replace(oe,"")}J.exports=
ae});var tt=o((Je,Z)=>{"use strict";function le(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}Z.exports=le});var st=o((Qe,rt)=>{"use strict";var ce=Q(),et=tt(),de=f(),it=NaN,he=/^[-+]0x[0-9a-f]+$/i,ue=/^0b[01]+$/i,fe=/^0o[0-7]+$/i,
be=parseInt;function pe(e){if(typeof e=="number")return e;if(de(e))return it;if(et(e)){var t=typeof e.valueOf=="function"?
e.valueOf():e;e=et(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=ce(e);var i=ue.test(e);return i||fe.test(e)?be(e.
slice(2),i?2:8):he.test(e)?it:+e}rt.exports=pe});var at=o((Ze,ot)=>{"use strict";var ge=st(),nt=1/0,me=17976931348623157e292;function ye(e){if(!e)return e===0?e:0;if(e=ge(
e),e===nt||e===-nt){var t=e<0?-1:1;return t*me}return e===e?e:0}ot.exports=ye});var ct=o((ti,lt)=>{"use strict";var xe=at();function ve(e){var t=xe(e),i=t%1;return t===t?i?t-i:t:0}lt.exports=ve});var ht=o((ei,dt)=>{"use strict";var Se=b();function Ae(e){return e==null?"":Se(e)}dt.exports=Ae});var ft=o((ii,ut)=>{"use strict";var Ie=S(),Te=b(),Ee=ct(),we=ht();function ke(e,t,i){return e=we(e),i=i==null?0:Ie(Ee(i),
0,e.length),t=Te(t),e.slice(i,i+t.length)==t}ut.exports=ke});var g=kt(ft(),1);var Oe=e=>typeof e=="string"?["off","false"].includes(e.trim().toLocaleLowerCase()):!e,bt=Oe;var Le=e=>typeof e=="string"?["on","true"].includes(e.trim().toLocaleLowerCase()):!!e,c=Le;var pt="abekmhopctyx123456789",Me=e=>{let{prefix:t,suffix:i,length:r=6,checklist:s}=e??{},n;do{n="";for(let l=0;l<r;l++)
n+=pt.charAt(Math.random()*pt.length|0);t&&(n=t+"-"+n),i&&(n+="-"+i)}while(s?.includes(n));return n},gt=Me;function qe(e){let{$template:t,template:i,delegatesFocus:r=!1,mode:s="closed",serializable:n=!1}=e,l=this.attachShadow({
delegatesFocus:r,mode:s,serializable:n});return t instanceof DocumentFragment&&l.appendChild(t.cloneNode(!0)),typeof i==
"string"&&l.setHTMLUnsafe(i),l}var mt=qe;function je(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}var yt=je;function De(e,t,i){return(yt(t)?Object.entries(t):[[t,i]]).forEach(([s,n])=>{let l=String(s);if(n===null)e.removeAttribute(
l);else if(n instanceof Attr)e.setAttributeNode(n);else{let y=e.getAttributeNode(l),a=String(n);y!==null?y.value=a:e.setAttribute(
l,a)}}),new Map(e.getAttributeNames().sort().map(s=>[s,e.getAttributeNode(s)]))}var p=De;var xt=(a=>(a.Animation="--animating",a.Collapsed="--collapsed",a.Defined="--defined",a.Disabled="--disabled",a.Expanded=
"--expanded",a.Interactive="--interactive",a.Loaded="--loaded",a.Scrolled="--scrolled",a))(xt||{}),d=xt;var vt=`<style title="Shadow Dom Layout" type="text/css">:host(:state(--defined)),
:host::part(container) {
	display: block;
}

:host([aria-hidden='true'])::part(container) {
	visibility: hidden;
}
</style><style title="Scrollbars" type="text/css">:host(:state(--scrolled))::part(container) {
	overflow: auto;
	scroll-behavior: smooth;
	scroll-snap-stop: always;
}

:host([aria-orientation='vertical']:state(--scrolled))::part(container) {
	overflow: hidden scroll;
}

:host([aria-orientation='horizontal']:state(--scrolled))::part(container) {
	overflow: scroll hidden;
}

:host([aria-hidden='true'])::part(container) {
	overflow: hidden;
}
</style><slot part="container"></slot>`;var Ce=({label:e,value:t},i)=>typeof e=="string"&&(0,g.default)(e,i)||typeof t=="string"&&(0,g.default)(t,i),m=class e extends HTMLElement{#r=-1;#c=-1;#d=-1;#e=this.
attachInternals();#t=new Map;#n=null;#o;#i;#a;ariaActiveDescendantElement=null;static formAssociated=!0;static role="lis\
tbox";static tagName="e-listbox";static observedAttributes=["aria-activedescendant","aria-disabled","aria-multiselectabl\
e","aria-required"];static initAttributes(t){let i={"aria-orientation":t.ariaOrientation??"vertical",exportparts:"contai\
ner",role:this.role};return p(t,i)}static initAccessibilityTree(t,i){i.ariaAtomic="true",i.ariaLive="polite",i.role=this.
role,i.ariaDisabled=c(t.ariaDisabled).toString(),i.ariaOrientation=t.ariaOrientation,i.ariaMultiSelectable=c(t.ariaMultiSelectable).
toString(),i.ariaRequired=c(t.ariaRequired).toString()}constructor(){super(),mt.call(this,{template:vt}),e.initAttributes(
this),this.#g(),this.#s.add(d.Defined)}attributeChangedCallback(t,i,r){if(this.isConnected===!1||i===r)return;let s=this.#t.
has(r)&&this.#t.get(r)?.$ref.deref()||null,n=c(r);switch(t){case"aria-activedescendant":this.#e.ariaActiveDescendantElement=
s;break;case"aria-disabled":n?(this.#s.add(d.Disabled),this.#i?.abort()):this.#s.delete(d.Disabled),this.#e.ariaDisabled=
r;break;case"aria-multiselectable":this.#e.ariaMultiSelectable=n.toString();break;case"aria-required":this.#e.ariaRequired=
n.toString();break;default:}}connectedCallback(){e.initAttributes(this),e.initAccessibilityTree(this,this.#e),this.#m()}disconnectedCallback(){
this.#i?.abort(),this.#o?.abort(),this.#a?.abort()}formAssociatedCallback(t){}formDisabledCallback(t){}formResetCallback(){
this.selectedIndex=this.#d}formStateRestoreCallback(t,i){}findByValue(t){for(let[i,r]of this.#t)if(t===r.value)return r;
return null}search(t){let i=new Set;for(let[r,s]of this.#t)Ce(s,t)&&i.add(s);return i.size>0?i:null}select(t){let i;if(t instanceof
HTMLElement)i=t;else if(typeof t=="string"){let r=this.#t.get(t);r!==void 0&&(i=r.$ref.deref())}return i!==void 0?this.#h(
i):!1}shift(t){return this.activeIndex=((this.#r+t)%this.length+this.length)%this.length,this}updateScrollbar(){let t=this.#e.
ariaOrientation==="vertical",i=t?this.#l.clientHeight:this.#l.clientWidth;(t?this.#l.scrollHeight:this.#l.scrollWidth)>i?
this.#s.add(d.Scrolled):this.#s.delete(d.Scrolled)}#b(t){let i={"aria-selected":t.ariaSelected??"false",id:t.id};return i.
id||(i.id=gt({prefix:"option",checklist:this.#n})),t.onclick=r=>this.#f(r),p(t,i)}#p(){return this.selectedIndex=this.#d=
this.options.findIndex(t=>c(t.$ref.deref()?.getAttribute("aria-selected"))),this}#h(t){if(t!==void 0){let i=t.getAttributeNode(
"aria-selected");return i!==null&&bt(i.value)?(i.value="true",!0):!1}else return!1}#u(t){if(t instanceof HTMLElement)return t.
setAttribute("aria-selected","false"),!0;let i=this.selectedOptions;return i&&i.length>0?(this.selectedOptions.forEach(r=>r.
setAttribute("aria-selected","false")),!0):!1}get activeIndex(){return this.#r}set activeIndex(t){let i=(t%this.length+this.
length)%this.length,r=this.options,s=this.#r;s>=0&&r[s].$ref.deref()?.setAttribute("aria-current","false");let n=r[i].$ref.
deref();if(n!==void 0)this.#r=i,this.setAttribute("aria-activedescendant",n.id),n.setAttribute("aria-current","true"),this.#s.
has(d.Scrolled)&&n.scrollIntoView({behavior:"smooth",block:"center",inline:"center"});else throw this.#r=-1,this.removeAttribute(
"aria-activedescendant"),new Error(`The option element by index ${i} is lost and cannot be activated!`)}get disabled(){return this.#e.
states.has(d.Disabled)&&c(this.#e.ariaDisabled)&&c(this.ariaDisabled)}get length(){return this.#t.size}get multiple(){return c(
this.ariaMultiSelectable)}get options(){return Array.from(this.#t.values())}get owns(){return this.#n}get selectedIndex(){
return this.#c}set selectedIndex(t){let i=this.selectedIndex===-1?null:this.options[this.selectedIndex].value;this.dispatchEvent(
new InputEvent("beforeinput",{bubbles:!0,data:i}));let r;if(t===-1)r=t,this.#u();else{r=(t%this.length+this.length)%this.
length,this.multiple===!1&&this.#u();let n=this.options[r].$ref.deref();this.#h(n)}this.#c=r;let s=r===-1?null:this.options[r].
value;this.dispatchEvent(new InputEvent("input",{bubbles:!0,data:s}))}get selectedOptions(){let t=[];for(let{$ref:i}of this.#t.
values()){let r=i.deref();if(r&&c(r.ariaSelected)&&(t.push(r),this.multiple===!1))return t}return t.length>0?t:null}get value(){
let t=this.selectedOptions?.map(i=>this.#t.get(i.id)?.value).filter(i=>typeof i=="string");return t?this.multiple?t:t[0]:
null}get#s(){return this.#e.states}get#l(){return this.#e.shadowRoot?.querySelector("[part=container]")}#g(){return this.#a?.
abort(),this.#a=new AbortController,this.addEventListener("slotchange",t=>{let i=t.target.assignedElements({flatten:!0});
this.#t.clear(),i.forEach(r=>{if(r.role==="option"){this.#b(r);let s={$ref:new WeakRef(r),label:r.ariaLabel||r.textContent,
value:r.dataset.value??r.getAttribute("value")};this.#t.set(r.id,s)}}),this.#t.size>0?(this.#n=Array.from(this.#t.keys()),
this.setAttribute("aria-owns",this.#n.join(" "))):(this.#n=null,this.removeAttribute("aria-owns")),this.#p()},{signal:this.#a.
signal}),this.#a}#m(){this.#o?.abort(),this.#o=new AbortController;let t={signal:this.#o.signal};return this.addEventListener(
"focus",i=>this.#x(i),t),this.addEventListener("blur",i=>this.#y(i),t),this.#o}#y(t){this.#i?.abort()}#x(t){this.#v()}#v(){
this.#i?.abort(),this.#i=new AbortController;let t={signal:this.#i.signal};return this.addEventListener("click",i=>this.#f(
i),t),this.addEventListener("keydown",i=>this.#S(i),t),this.#i}#f(t){t.stopPropagation();let i=t.currentTarget;this.selectedIndex=
this.activeIndex=this.owns!==null?this.owns.indexOf(i.id):-1}#S(t){switch(t.key){case"Enter":this.selectedIndex=this.activeIndex,
t.stopPropagation();break;case"Space":this.selectedIndex===this.activeIndex?this.selectedIndex=this.activeIndex:this.selectedIndex=
this.activeIndex;break;case"End":this.activeIndex=this.length-1;break;case"Home":this.activeIndex=0;break;case"ArrowUp":
this.#r&&(t.altKey?this.activeIndex=0:this.shift(-1),t.stopPropagation()),t.preventDefault();break;case"ArrowDown":t.altKey?
this.activeIndex=this.length-1:this.shift(1),t.preventDefault();break;default:/\w+/.test(t.key);return}}},xi=m;export{xi as default};
