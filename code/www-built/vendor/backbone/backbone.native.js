/**
 * Backbone.Native
 *
 * For all details and documentation:
 * http://github.com/inkling/backbone.native
 *
 * Copyright 2013 Inkling Systems, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


(function(){"use strict";function e(e){e[s]||(e[s]=0===u.length?++c:u.pop());var t=e[s];return l[t]||(l[t]=[])}function t(e){var t=e[s];l[t]&&(l[t]=null,e[s]=null,u.push(t))}function n(t,n,r,o){"function"==typeof r&&(o=r,r=null);var s=i.exec(n);n=s[1]||null;var c=s[2]||null;if(n){var l=o,u=o;l=r?function(e){for(var n=e.target;n&&n!==t;n=n.parentElement)if(a.call(n,r)){var o=u.call(n,e,n);return!1===o&&(e.stopPropagation(),e.preventDefault()),o}}:function(e){var n=u.call(t,e,t);return!1===n&&(e.stopPropagation(),e.preventDefault()),n},t.addEventListener(n,l,!1),e(t).push({eventName:n,callback:o,handler:l,namespace:c,selector:r})}}function r(n,r,o,a){"function"==typeof o&&(a=o,o=null);var s=i.exec(r||"");r=s[1];var c=s[2],l=e(n)||[];if(r||c||o||a){l.filter(function(e){return!(c&&e.namespace!==c||r&&e.eventName!==r||a&&e.callback!==a||o&&e.selector!==o)}).forEach(function(e){n.removeEventListener(e.eventName,e.handler,!1),l.splice(l.indexOf(e),1)}),0===l.length&&t(n)}else l.forEach(function(e){n.removeEventListener(e.eventName,e.handler,!1)}),t(n)}function o(e,t){if(t=t||document,!(this instanceof o))return new o(e,t);if(e)if("string"==typeof e)if(/^\s*</.test(e)){var n=document.createElement("div");n.innerHTML=e,this[0]=n.firstChild,n.removeChild(n.firstChild),this.length=1}else e=t.querySelector(e),null!==e?(this[0]=e,this.length=1):this.length=0;else this[0]=e,this.length=1;else this.length=0}var i=/^([^.]+)?(?:\.([^.]+))?$/,a=Element.prototype.matchesSelector||null;a||["webkit","moz","o","ms"].forEach(function(e){var t=Element.prototype[e+"MatchesSelector"];t&&(a=t)});var s="backboneNativeKey"+Math.random(),c=1,l={},u=[];if(o.prototype={hide:null,appendTo:null,find:null,attr:function(e){return Object.keys(e).forEach(function(t){switch(t){case"html":this[0].innerHTML=e[t];break;case"text":this[0].textContent=e[t];break;case"class":this[0].className=e[t];break;default:this[0].setAttribute(t,e[t])}},this),this},html:function(e){return this[0].innerHTML=e,this},remove:function(){var e=this[0];return e.parentElement&&e.parentElement.removeChild(e),function e(t){r(t);for(var n=0,o=t.childNodes.length;n<o;n++)t.childNodes[n].nodeType!==Node.TEXT_NODE&&e(t.childNodes[n])}(e),this},on:function(e,t,r){return n(this[0],e,t,r),this},off:function(e,t,n){return r(this[0],e,t,n),this},bind:function(e,t){return this.on(e,t)},unbind:function(e,t){return this.off(e,t)},delegate:function(e,t,n){return this.on(t,e,n)},undelegate:function(e,t,n){return this.off(t,e,n)}},o.ajax=function(e){e=e||{};var t=e.type||"GET",n=e.url,r=void 0===e.processData||!!e.processData,o=e.contentType||"application/x-www-form-urlencoded; charset=UTF-8",i=e.data;if(r&&"object"==typeof i){var a=Object.keys(i).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])});i=a.join("&")}!i||"GET"!==t&&"HEAD"!==t||(n+=(-1===n.indexOf("?")?"?":"&")+i,i=void 0);var s=new XMLHttpRequest;return s.open(t,n,!0),s.setRequestHeader("Content-Type",o),e.beforeSend&&e.beforeSend(s),s.onload=function(){var t=!1,n=s.responseText;if("json"===e.dataType)try{n=JSON.parse(n)}catch(e){t=!0}!t&&s.status>=200&&s.status<300?e.success&&e.success(n,s.statusText,s):e.error&&e.error(s)}.bind(this),s.onerror=s.onabort=function(){e.error&&e.error(s)},s.send(i),s},o.on=n,o.off=r,"undefined"!=typeof exports)module.exports=o;else{var f=this,h=f.Backbone?f.Backbone.Native:null,d=f.$;f.Backbone&&(f.Backbone.Native=o),f.$=o,o.noConflict=function(e){return f.$=d,e&&(f.Backbone.Native=h),o},f.Backbone&&(f.Backbone.setDomLibrary?f.Backbone.setDomLibrary(o):f.Backbone.$=o)}}).call(this);
//# sourceMappingURL=backbone.native.js.map