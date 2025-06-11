var St=Object.create;var x=Object.defineProperty;var At=Object.getOwnPropertyDescriptor;var It=Object.getOwnPropertyNames;var Tt=Object.getPrototypeOf,Et=Object.prototype.hasOwnProperty;var o=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var wt=(t,e,i,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of It(e))!Et.call(t,s)&&s!==i&&x(t,s,{get:()=>e[s],
enumerable:!(r=At(e,s))||r.enumerable});return t};var kt=(t,e,i)=>(i=t!=null?St(Tt(t)):{},wt(e||!t||!t.__esModule?x(i,"default",{value:t,enumerable:!0}):i,t));var S=o((Ne,v)=>{"use strict";function Ot(t,e,i){return t===t&&(i!==void 0&&(t=t<=i?t:i),e!==void 0&&(t=t>=e?t:e)),t}v.exports=
Ot});var I=o((Pe,A)=>{"use strict";var Lt=typeof global=="object"&&global&&global.Object===Object&&global;A.exports=Lt});var E=o(($e,T)=>{"use strict";var Mt=I(),jt=typeof self=="object"&&self&&self.Object===Object&&self,qt=Mt||jt||Function(
"return this")();T.exports=qt});var u=o((Fe,w)=>{"use strict";var Dt=E(),Ht=Dt.Symbol;w.exports=Ht});var O=o((Be,k)=>{"use strict";function Ct(t,e){for(var i=-1,r=t==null?0:t.length,s=Array(r);++i<r;)s[i]=e(t[i],i,t);return s}
k.exports=Ct});var M=o((ze,L)=>{"use strict";var Rt=Array.isArray;L.exports=Rt});var H=o((We,D)=>{"use strict";var j=u(),q=Object.prototype,Nt=q.hasOwnProperty,Pt=q.toString,h=j?j.toStringTag:void 0;function $t(t){
var e=Nt.call(t,h),i=t[h];try{t[h]=void 0;var r=!0}catch{}var s=Pt.call(t);return r&&(e?t[h]=i:delete t[h]),s}D.exports=
$t});var R=o((_e,C)=>{"use strict";var Ft=Object.prototype,Bt=Ft.toString;function zt(t){return Bt.call(t)}C.exports=zt});var F=o((Ge,$)=>{"use strict";var N=u(),Wt=H(),_t=R(),Gt="[object Null]",Kt="[object Undefined]",P=N?N.toStringTag:void 0;
function Vt(t){return t==null?t===void 0?Kt:Gt:P&&P in Object(t)?Wt(t):_t(t)}$.exports=Vt});var z=o((Ke,B)=>{"use strict";function Ut(t){return t!=null&&typeof t=="object"}B.exports=Ut});var f=o((Ve,W)=>{"use strict";var Yt=F(),Xt=z(),Jt="[object Symbol]";function Qt(t){return typeof t=="symbol"||Xt(t)&&Yt(
t)==Jt}W.exports=Qt});var b=o((Ue,U)=>{"use strict";var _=u(),Zt=O(),te=M(),ee=f(),ie=1/0,G=_?_.prototype:void 0,K=G?G.toString:void 0;function V(t){
if(typeof t=="string")return t;if(te(t))return Zt(t,V)+"";if(ee(t))return K?K.call(t):"";var e=t+"";return e=="0"&&1/t==
-ie?"-0":e}U.exports=V});var X=o((Ye,Y)=>{"use strict";var re=/\s/;function se(t){for(var e=t.length;e--&&re.test(t.charAt(e)););return e}Y.exports=
se});var Q=o((Xe,J)=>{"use strict";var ne=X(),oe=/^\s+/;function ae(t){return t&&t.slice(0,ne(t)+1).replace(oe,"")}J.exports=
ae});var tt=o((Je,Z)=>{"use strict";function le(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}Z.exports=le});var st=o((Qe,rt)=>{"use strict";var ce=Q(),et=tt(),de=f(),it=NaN,he=/^[-+]0x[0-9a-f]+$/i,ue=/^0b[01]+$/i,fe=/^0o[0-7]+$/i,
be=parseInt;function pe(t){if(typeof t=="number")return t;if(de(t))return it;if(et(t)){var e=typeof t.valueOf=="function"?
t.valueOf():t;t=et(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=ce(t);var i=ue.test(t);return i||fe.test(t)?be(t.
slice(2),i?2:8):he.test(t)?it:+t}rt.exports=pe});var at=o((Ze,ot)=>{"use strict";var ge=st(),nt=1/0,me=17976931348623157e292;function ye(t){if(!t)return t===0?t:0;if(t=ge(
t),t===nt||t===-nt){var e=t<0?-1:1;return e*me}return t===t?t:0}ot.exports=ye});var ct=o((ti,lt)=>{"use strict";var xe=at();function ve(t){var e=xe(t),i=e%1;return e===e?i?e-i:e:0}lt.exports=ve});var ht=o((ei,dt)=>{"use strict";var Se=b();function Ae(t){return t==null?"":Se(t)}dt.exports=Ae});var ft=o((ii,ut)=>{"use strict";var Ie=S(),Te=b(),Ee=ct(),we=ht();function ke(t,e,i){return t=we(t),i=i==null?0:Ie(Ee(i),
0,t.length),e=Te(e),t.slice(i,i+e.length)==e}ut.exports=ke});var g=kt(ft(),1);var Oe=t=>typeof t=="string"?["off","false"].includes(t.trim().toLocaleLowerCase()):!t,bt=Oe;var Le=t=>typeof t=="string"?["on","true"].includes(t.trim().toLocaleLowerCase()):!!t,c=Le;var pt="abekmhopctyx123456789",Me=t=>{let{prefix:e,suffix:i,length:r=6,checklist:s}=t??{},n;do{n="";for(let l=0;l<r;l++)
n+=pt.charAt(Math.random()*pt.length|0);e&&(n=e+"-"+n),i&&(n+="-"+i)}while(s?.includes(n));return n},gt=Me;function je(t){let{$template:e,template:i,delegatesFocus:r=!1,mode:s="closed",serializable:n=!1}=t,l=this.attachShadow({
delegatesFocus:r,mode:s,serializable:n});return e instanceof DocumentFragment&&l.appendChild(e.cloneNode(!0)),typeof i==
"string"&&l.setHTMLUnsafe(i),l}var mt=je;var qe=t=>!!t&&typeof t=="object",yt=qe;function De(t,e,i){return(yt(e)?Object.entries(e):[[e,i]]).forEach(([s,n])=>{let l=String(s);if(n===null)t.removeAttribute(
l);else if(n instanceof Attr)t.setAttributeNode(n);else{let y=t.getAttributeNode(l),a=String(n);y!==null?y.value=a:t.setAttribute(
l,a)}}),new Map(t.getAttributeNames().sort().map(s=>[s,t.getAttributeNode(s)]))}var p=De;var xt=(a=>(a.Animation="--animating",a.Collapsed="--collapsed",a.Defined="--defined",a.Disabled="--disabled",a.Expanded=
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
</style><slot part="container"></slot>`;var Ce=({label:t,value:e},i)=>typeof t=="string"&&(0,g.default)(t,i)||typeof e=="string"&&(0,g.default)(e,i),m=class t extends HTMLElement{#r=-1;#c=-1;#d=-1;#e=this.
attachInternals();#t=new Map;#n=null;#o;#i;#a;ariaActiveDescendantElement=null;static formAssociated=!0;static role="lis\
tbox";static tagName="e-listbox";static observedAttributes=["aria-activedescendant","aria-disabled","aria-multiselectabl\
e","aria-required"];static initAttributes(e){let i={"aria-orientation":e.ariaOrientation??"vertical",exportparts:"contai\
ner",role:this.role};return p(e,i)}static initAccessibilityTree(e,i){i.ariaAtomic="true",i.ariaLive="polite",i.role=this.
role,i.ariaDisabled=c(e.ariaDisabled).toString(),i.ariaOrientation=e.ariaOrientation,i.ariaMultiSelectable=c(e.ariaMultiSelectable).
toString(),i.ariaRequired=c(e.ariaRequired).toString()}constructor(){super(),mt.call(this,{template:vt}),t.initAttributes(
this),this.#g(),this.#s.add(d.Defined)}attributeChangedCallback(e,i,r){if(this.isConnected===!1||i===r)return;let s=this.#t.
has(r)&&this.#t.get(r)?.$ref.deref()||null,n=c(r);switch(e){case"aria-activedescendant":this.#e.ariaActiveDescendantElement=
s;break;case"aria-disabled":n?(this.#s.add(d.Disabled),this.#i?.abort()):this.#s.delete(d.Disabled),this.#e.ariaDisabled=
r;break;case"aria-multiselectable":this.#e.ariaMultiSelectable=n.toString();break;case"aria-required":this.#e.ariaRequired=
n.toString();break;default:}}connectedCallback(){t.initAttributes(this),t.initAccessibilityTree(this,this.#e),this.#m()}disconnectedCallback(){
this.#i?.abort(),this.#o?.abort(),this.#a?.abort()}formAssociatedCallback(e){}formDisabledCallback(e){}formResetCallback(){
this.selectedIndex=this.#d}formStateRestoreCallback(e,i){}findByValue(e){for(let[i,r]of this.#t)if(e===r.value)return r;
return null}search(e){let i=new Set;for(let[r,s]of this.#t)Ce(s,e)&&i.add(s);return i.size>0?i:null}select(e){let i;if(e instanceof
HTMLElement)i=e;else if(typeof e=="string"){let r=this.#t.get(e);r!==void 0&&(i=r.$ref.deref())}return i!==void 0?this.#h(
i):!1}shift(e){return this.activeIndex=((this.#r+e)%this.length+this.length)%this.length,this}updateScrollbar(){let e=this.#e.
ariaOrientation==="vertical",i=e?this.#l.clientHeight:this.#l.clientWidth;(e?this.#l.scrollHeight:this.#l.scrollWidth)>i?
this.#s.add(d.Scrolled):this.#s.delete(d.Scrolled)}#b(e){let i={"aria-selected":e.ariaSelected??"false",id:e.id};return i.
id||(i.id=gt({prefix:"option",checklist:this.#n})),e.onclick=r=>this.#f(r),p(e,i)}#p(){return this.selectedIndex=this.#d=
this.options.findIndex(e=>c(e.$ref.deref()?.getAttribute("aria-selected"))),this}#h(e){if(e!==void 0){let i=e.getAttributeNode(
"aria-selected");return i!==null&&bt(i.value)?(i.value="true",!0):!1}else return!1}#u(e){if(e instanceof HTMLElement)return e.
setAttribute("aria-selected","false"),!0;let i=this.selectedOptions;return i&&i.length>0?(this.selectedOptions.forEach(r=>r.
setAttribute("aria-selected","false")),!0):!1}get activeIndex(){return this.#r}set activeIndex(e){let i=(e%this.length+this.
length)%this.length,r=this.options,s=this.#r;s>=0&&r[s].$ref.deref()?.setAttribute("aria-current","false");let n=r[i].$ref.
deref();if(n!==void 0)this.#r=i,this.setAttribute("aria-activedescendant",n.id),n.setAttribute("aria-current","true"),this.#s.
has(d.Scrolled)&&n.scrollIntoView({behavior:"smooth",block:"center",inline:"center"});else throw this.#r=-1,this.removeAttribute(
"aria-activedescendant"),new Error(`The option element by index ${i} is lost and cannot be activated!`)}get disabled(){return this.#e.
states.has(d.Disabled)&&c(this.#e.ariaDisabled)&&c(this.ariaDisabled)}get length(){return this.#t.size}get multiple(){return c(
this.ariaMultiSelectable)}get options(){return Array.from(this.#t.values())}get owns(){return this.#n}get selectedIndex(){
return this.#c}set selectedIndex(e){let i=this.selectedIndex===-1?null:this.options[this.selectedIndex].value;this.dispatchEvent(
new InputEvent("beforeinput",{bubbles:!0,data:i}));let r;if(e===-1)r=e,this.#u();else{r=(e%this.length+this.length)%this.
length,this.multiple===!1&&this.#u();let n=this.options[r].$ref.deref();this.#h(n)}this.#c=r;let s=r===-1?null:this.options[r].
value;this.dispatchEvent(new InputEvent("input",{bubbles:!0,data:s}))}get selectedOptions(){let e=[];for(let{$ref:i}of this.#t.
values()){let r=i.deref();if(r&&c(r.ariaSelected)&&(e.push(r),this.multiple===!1))return e}return e.length>0?e:null}get value(){
let e=this.selectedOptions?.map(i=>this.#t.get(i.id)?.value).filter(i=>typeof i=="string");return e?this.multiple?e:e[0]:
null}get#s(){return this.#e.states}get#l(){return this.#e.shadowRoot?.querySelector("[part=container]")}#g(){return this.#a?.
abort(),this.#a=new AbortController,this.addEventListener("slotchange",e=>{let i=e.target.assignedElements({flatten:!0});
this.#t.clear(),i.forEach(r=>{if(r.role==="option"){this.#b(r);let s={$ref:new WeakRef(r),label:r.ariaLabel||r.textContent,
value:r.dataset.value??r.getAttribute("value")};this.#t.set(r.id,s)}}),this.#t.size>0?(this.#n=Array.from(this.#t.keys()),
this.setAttribute("aria-owns",this.#n.join(" "))):(this.#n=null,this.removeAttribute("aria-owns")),this.#p()},{signal:this.#a.
signal}),this.#a}#m(){this.#o?.abort(),this.#o=new AbortController;let e={signal:this.#o.signal};return this.addEventListener(
"focus",i=>this.#x(i),e),this.addEventListener("blur",i=>this.#y(i),e),this.#o}#y(e){this.#i?.abort()}#x(e){this.#v()}#v(){
this.#i?.abort(),this.#i=new AbortController;let e={signal:this.#i.signal};return this.addEventListener("click",i=>this.#f(
i),e),this.addEventListener("keydown",i=>this.#S(i),e),this.#i}#f(e){e.stopPropagation();let i=e.currentTarget;this.selectedIndex=
this.activeIndex=this.owns!==null?this.owns.indexOf(i.id):-1}#S(e){switch(e.key){case"Enter":this.selectedIndex=this.activeIndex,
e.stopPropagation();break;case"Space":this.selectedIndex===this.activeIndex?this.selectedIndex=this.activeIndex:this.selectedIndex=
this.activeIndex;break;case"End":this.activeIndex=this.length-1;break;case"Home":this.activeIndex=0;break;case"ArrowUp":
this.#r&&(e.altKey?this.activeIndex=0:this.shift(-1),e.stopPropagation()),e.preventDefault();break;case"ArrowDown":e.altKey?
this.activeIndex=this.length-1:this.shift(1),e.preventDefault();break;default:/\w+/.test(e.key);return}}},xi=m;export{xi as default};
