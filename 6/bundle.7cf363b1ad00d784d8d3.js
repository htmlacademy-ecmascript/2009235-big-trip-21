(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var i=n(537),s=n.n(i),r=n(645),a=n.n(r)()(s());a.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const o=a},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,r){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(i)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(a[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);i&&a[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),s&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=s):u[4]="".concat(s)),t.push(u))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",u="year",d="date",p="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,a=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:o,d:a,D:d,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=h;var g=function(e){return e instanceof w},$=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();b[r]&&(s=r),n&&(b[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;b[o]=t,s=o}return!i&&s&&(y=s),s||!i&&y},E=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},M=_;M.l=$,M.i=g,M.w=function(e,t){return E(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function h(e){this.$L=$(e.locale,null,!0),this.parse(e)}var m=h.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(v);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(e,t){var n=E(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return E(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<E(e)},m.$g=function(e,t,n){return M.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!M.u(t)||t,p=M.p(e),v=function(e,t){var i=M.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(a)},f=function(e,t){return M.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case u:return c?v(1,0):v(31,11);case l:return c?v(1,m):v(0,m+1);case o:var b=this.$locale().weekStart||0,g=(h<b?h+7:h)-b;return v(c?_-g:_+(6-g),m);case a:case d:return f(y+"Hours",0);case r:return f(y+"Minutes",1);case s:return f(y+"Seconds",2);case i:return f(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,c=M.p(e),p="set"+(this.$u?"UTC":""),v=(o={},o[a]=p+"Date",o[d]=p+"Date",o[l]=p+"Month",o[u]=p+"FullYear",o[r]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[c],f=c===a?this.$D+(t-this.$W):t;if(c===l||c===u){var h=this.clone().set(d,1);h.$d[v](f),h.init(),this.$d=h.set(d,Math.min(this.$D,h.daysInMonth())).$d}else v&&this.$d[v](f);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[M.p(e)]()},m.add=function(n,c){var d,p=this;n=Number(n);var v=M.p(c),f=function(e){var t=E(p);return M.w(t.date(t.date()+Math.round(e*n)),p)};if(v===l)return this.set(l,this.$M+n);if(v===u)return this.set(u,this.$y+n);if(v===a)return f(1);if(v===o)return f(7);var h=(d={},d[s]=e,d[r]=t,d[i]=1e3,d)[v]||1,m=this.$d.getTime()+n*h;return M.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,u=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},d=function(e){return M.s(r%12||12,e,"0")},v=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:M.s(o+1,2,"0"),MMM:u(n.monthsShort,o,c,3),MMMM:u(c,o),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:d(1),hh:d(2),a:v(r,a,!0),A:v(r,a,!1),m:String(a),mm:M.s(a,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:s};return i.replace(f,(function(e,t){return t||h[e]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,p){var v,f=M.p(d),h=E(n),m=(h.utcOffset()-this.utcOffset())*e,_=this-h,y=M.m(this,h);return y=(v={},v[u]=y/12,v[l]=y,v[c]=y/3,v[o]=(_-m)/6048e5,v[a]=(_-m)/864e5,v[r]=_/t,v[s]=_/e,v[i]=_/1e3,v)[f]||_,p?y:M.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return b[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=$(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),x=w.prototype;return E.prototype=x,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",u],["$D",d]].forEach((function(e){x[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),E.extend=function(e,t){return e.$i||(e(t,w,E),e.$i=!0),E},E.locale=$,E.isDayjs=g,E.unix=function(e){return E(1e3*e)},E.en=b[y],E.Ls=b,E.p={},E}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var r={},a=[],o=0;o<e.length;o++){var l=e[o],c=i.base?l[0]+i.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var p=n(d),v={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)t[p].references++,t[p].updater(v);else{var f=s(v,i);i.byIndex=o,t.splice(o,0,{identifier:d,updater:f,references:1})}a.push(d)}return a}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var r=i(e=e||[],s=s||{});return function(e){e=e||[];for(var a=0;a<r.length;a++){var o=n(r[a]);t[o].references--}for(var l=i(e,s),c=0;c<r.length;c++){var u=n(r[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={id:i,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";var e=n(379),t=n.n(e),i=n(795),s=n.n(i),r=n(569),a=n.n(r),o=n(565),l=n.n(o),c=n(216),u=n.n(c),d=n(589),p=n.n(d),v=n(10),f={};f.styleTagTransform=p(),f.setAttributes=l(),f.insert=a().bind(null,"head"),f.domAPI=s(),f.insertStyleElement=u(),t()(v.Z,f),v.Z&&v.Z.locals&&v.Z.locals;const h="shake";class m{#e=null;constructor(){if(new.target===m)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(h),setTimeout((()=>{this.element.classList.remove(h),e?.()}),600)}}function _(e,t,n="beforeend"){if(!(e instanceof m))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function y(e,t){if(!(e instanceof m&&t instanceof m))throw new Error("Can replace only components");const n=e.element,i=t.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}class b extends m{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked="">\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled="">\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled="">\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}}class g extends m{get template(){return'<ul class="trip-events__list"></ul>'}}var $=n(484),E=n.n($);const M="HH:mm",w="DD-MM-YYYYTHH:mm",x="DD/MM/YYYY HH:mm",A=(e,t=w)=>e?E()(e).format(t):"";class D extends m{#t=null;#n=null;#i=null;#s=null;#r=null;constructor({event:e,offers:t,onEventFavoriteButton:n,onEventRollupButton:i}){super(),this.#t=e,this.#n=t,this.#i=n,this.#s=i,this.#r=this.element.querySelector(".event__favorite-btn"),this.#r.addEventListener("click",this.#a),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#o)}get template(){return function(e,t){const{basePrice:n,dateFrom:i,dateTo:s,destination:r,type:a,isFavorite:o}=e,l=t.find((e=>e.type===a)),c=A(i,M),u=A(i,w),d=A(s,M),p=A(s,w),v=A(i,"MMM DD"),f=o?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="${A(i,"DD-MM-YYYY")}">${v}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${a}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${a} ${r}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${u}">${c}</time>\n          —\n          <time class="event__end-time" datetime="${p}">${d}</time>\n        </p>\n        <p class="event__duration">30M</p>\n      </div>\n      <p class="event__price">\n        €&nbsp;<span class="event__price-value">${n}</span>\n      </p>\n      ${function(e,t){return e.length?`<h4 class="visually-hidden">Offers:</h4>\n    <ul class="event__selected-offers">\n    ${e.map((e=>{const n=t.offers.find((t=>t.id===e));return`<li class="event__offer">\n        <span class="event__offer-title">${n.title}</span>\n        +€&nbsp;\n        <span class="event__offer-price">${n.price}</span>\n    </li>`})).join("")}\n  </ul>`:""}(e.offers,l)}\n      <button class="event__favorite-btn ${f}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28" focusable="false" >\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>`}(this.#t,this.#n)}#a=e=>{e.preventDefault(),this.#r.classList.toggle("event__favorite-btn--active"),this.#i(e)};#o=e=>{e.preventDefault(),this.#s(e)}}const S={basePrice:0,dateFrom:new Date,dateTo:new Date,destination:"Amsterdam",isFavorite:!1,offers:[],type:"taxi",add:!0};class B extends m{#t=null;#l=null;#n=null;#c=null;#u=null;#d=null;constructor({event:e=S,destinations:t,offers:n,onEventEditSubmitButton:i,onEventEditResetButton:s,onEventEditRollupButton:r}){super(),this.#t=e,this.#l=t,this.#n=n,this.#c=i,this.#u=s,this.#d=r,this.element.querySelector("form").addEventListener("submit",this.#p),this.element.querySelector(".event__reset-btn").addEventListener("click",this.#v),e.add||this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#o)}get template(){return function(e,t,n){const{basePrice:i,dateFrom:s,dateTo:r,destination:a,type:o,add:l}=e,c=t.find((e=>e.name.toLowerCase()===a.toLowerCase())),u=n.find((e=>e.type.toLowerCase()===o.toLowerCase())).offers,d=A(s,x),p=A(r,x);return`<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${o}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n\n              <div class="event__type-item">\n                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">\n                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n              </div>\n\n              <div class="event__type-item">\n                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n              </div>\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${o}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${a}" list="destination-list-1">\n          <datalist id="destination-list-1">\n            <option value="Amsterdam"></option>\n            <option value="Geneva"></option>\n            <option value="Chamonix"></option>\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${d}">\n          —\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${p}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            €\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${i}">\n        </div>\n\n        ${l?'<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n    <button class="event__reset-btn" type="reset">Cancel</button>':'<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n    <button class="event__reset-btn" type="reset">Delete</button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>'}\n      </header>\n      <section class="event__details">\n      ${function(e,t){return e.length?`<section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n    <div class="event__available-offers">\n      ${e.map((e=>{const n=t.find((t=>t===e.id));return`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="${e.title}" type="checkbox" name="${e.title}" ${n?"checked":""}>\n        <label class="event__offer-label" for="${e.title}">\n          <span class="event__offer-title">${e.title}</span>\n          +€&nbsp;\n          <span class="event__offer-price">${e.price}</span>\n        </label>\n      </div>`})).join("")}\n    </div>\n  </section>`:""}(u,e.offers)}\n      ${function(e){return e.pictures.length||e.description?`<section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      ${e.description?`<p class="event__destination-description">${e.description}</p>`:""}\n\n      ${e.pictures.length?`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${e.pictures.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`)).join("")}\n        </div>\n      </div>`:""}\n    </section>`:""}(c)}\n      </section>\n    </form>\n  </li>`}(this.#t,this.#l,this.#n)}#p=e=>{e.preventDefault(),this.#c(e)};#v=e=>{e.preventDefault(),this.#u(e)};#o=e=>{e.preventDefault(),this.#d(e)}}class C extends m{#f=null;constructor(e){super(),this.#f=e}get template(){return`<p class="trip-events__msg">${this.#f}</p>`}}const k=e=>e[Math.floor(Math.random()*e.length)],T=(e,t)=>{const n=Math.ceil(Math.min(Math.abs(e),Math.abs(t))),i=Math.floor(Math.max(Math.abs(e),Math.abs(t))),s=Math.random()*(i-n+1)+n;return Math.floor(s)},O=(e,t)=>{const n=[];return()=>{let i=T(e,t);if(n.length>=t-e+1)return null;for(;n.includes(i);)i=T(e,t);return n.push(i),i}},L=[{id:"1cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, its renowned for its skiing.",name:"Chamonix",pictures:[{src:"img/photos/1.jpg",description:"text 1"},{src:"img/photos/2.jpg",description:"text 2"}]},{id:"2cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"Geneva, is a beautiful city, a true asian pearl, with crowded streets.",name:"Geneva",pictures:[{src:"img/photos/3.jpg",description:"text 3"},{src:"img/photos/4.jpg",description:"text 4"},{src:"img/photos/5.jpg",description:"text 5"}]},{id:"3cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"In rutrum ac purus sit amet tempus.",name:"Paris",pictures:[{src:"https://w.forfun.com/fetch/90/90ce93f8acc729abeb63e515e4869f3a.jpeg",description:"Paris buildings"}]},{id:"4cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.",name:"Amsterdam",pictures:[]},{id:"5cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.",name:"Balashikha",pictures:[{src:"https://sun9-79.userapi.com/impg/r6yxrBao6WYh41vwep1e204EPRzjJEnup-bz6Q/5zOypAJEDK8.jpg?size=480x320&quality=95&sign=e8b4680159e9a014ecf8b7d4b3a65b9f&type=album",description:"Balashikha buildings"}]}],R=["taxi","bus","train","ship","check-in","sightseeing","restaurant"],F=[{id:"1b4c3e4e6-9053-42ce-b747-e281314baa31",title:"Upgrade1",price:20},{id:"2b4c3e4e6-9053-42ce-b747-e281314baa31",title:"Upgrade2",price:120},{id:"3b4c3e4e6-9053-42ce-b747-e281314baa31",title:"Upgrade3",price:90},{id:"4b4c3e4e6-9053-42ce-b747-e281314baa31",title:"Upgrade4",price:70},{id:"5b4c3e4e6-9053-42ce-b747-e281314baa31",title:"Upgrade5",price:30}],Y=()=>{const e=O(0,F.length-1);return Array.from({length:T(0,F.length-1)},(()=>F[e()]))},j=Array.from({length:R.length},((e,t)=>({type:R[t],offers:Y()}))),q=["2023-07-10T20:55:56.845Z","2023-07-10T21:55:56.845Z","2024-07-10T22:55:56.845Z","2024-07-10T23:55:56.845Z"],H=["2023-08-10T20:55:56.845Z","2023-08-10T21:55:56.845Z","2024-08-10T22:55:56.845Z","2024-08-10T23:55:56.845Z"],I=(()=>{let e=0;return()=>(e+=1,e)})();let Z;const P=e=>{const t=j.find((t=>t.type===e)).offers;if(!t.length)return[];const n=O(0,t.length-1);return Array.from({length:T(0,t.length-1)},(()=>t[n()].id))},U=()=>({id:I(),basePrice:T(1e3,1e4),dateFrom:new Date(k(q)),dateTo:new Date(k(H)),destination:k(L).name,isFavorite:1===T(0,1),type:(Z=k(j).type,Z),offers:P(Z)}),N={everything:e=>e.filter((e=>!e.isArchive)),future:e=>e.filter((e=>{return(t=e.dateFrom)&&E()(t).isAfter(E()(),"D")&&!e.isArchive;var t})),present:e=>e.filter((e=>{return t=e.dateFrom,n=e.dateTo,t&&n&&E()(t).isSame(E()(),"D")&&E()(n).isAfter(E()(),"D")&&!e.isArchive;var t,n})),past:e=>e.filter((e=>{return(t=e.dateTo)&&E()(t).isBefore(E()(),"D")&&!e.isArchive;var t}))},W=document.querySelector(".page-header"),z=W.querySelector(".trip-main"),J=W.querySelector(".trip-controls__filters"),X=document.querySelector(".page-main").querySelector(".trip-events"),G=new class{#h=null;constructor(){this.#h=Array.from({length:4},U)}get events(){return this.#h}},V=new class{#l=null;constructor(){this.#l=L}get destinations(){return this.#l}},K=new class{#n=null;constructor(){this.#n=j}get offers(){return this.#n}},Q=new class{#m=null;#_=null;#y=null;#b=null;#g=null;#$=null;#E=null;#M=new b;#w=new g;constructor({boardContainer:e,eventsModel:t,destinationsModel:n,offersModel:i}){this.#m=e,this.#_=t,this.#y=n,this.#b=i}init(){this.#g=[...this.#_.events],this.#$=[...this.#y.destinations],this.#E=[...this.#b.offers],this.#x()}#x(){this.#g.every((e=>e.isArchive))?_(new C("Click New Event to create your first point"),this.#m):(_(this.#M,this.#m),_(this.#w,this.#m),this.#g.forEach((e=>{this.#A(e)})))}#A(e){const t=e=>{(e=>"Escape"===e.key)(e)&&(e.preventDefault(),s(),document.removeEventListener("keydown",t))},n=new D({event:e,offers:this.#E,onEventFavoriteButton:()=>{},onEventRollupButton:()=>{y(i,n),document.addEventListener("keydown",t)}}),i=new B({event:e,destinations:this.#$,offers:this.#E,onEventEditSubmitButton:()=>{s(),document.removeEventListener("keydown",t)},onEventEditResetButton:()=>{!function(e){if(null!==e){if(!(e instanceof m))throw new Error("Can remove only components");e.element.remove(),e.removeElement()}}(i)},onEventEditRollupButton:()=>{s(),document.removeEventListener("keydown",t)}});function s(){y(n,i)}_(n,this.#w.element)}}({boardContainer:X,eventsModel:G,destinationsModel:V,offersModel:K}),ee=Object.keys(N).map((e=>({type:e})));_(new class extends m{#D=null;constructor({filters:e}){super(),this.#D=e}get template(){return function(e){const t=e.map(((e,t)=>function(e,t){const{type:n}=e;return`<div class="trip-filters__filter">\n      <input id="filter-${n}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${n}" ${t?"checked":""}>\n      <label class="trip-filters__filter-label" for="filter-${n}">${n}</label>\n    </div>`}(e,0===t))).join("");return`<form class="trip-filters" action="#" method="get">\n      ${t}\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>`}(this.#D)}}({filters:ee}),J),_(new class extends m{get template(){return'<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>\n\n      <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: €&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>'}},z,"afterbegin"),Q.init()})()})();
//# sourceMappingURL=bundle.7cf363b1ad00d784d8d3.js.map