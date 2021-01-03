!function(t){var e="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global;if("function"==typeof define&&define.amd)define(["underscore","exports"],function(n,i){e.Backbone=t(e,i,n)});else if("undefined"!=typeof exports){var n=require("underscore");t(e,exports,n)}else e.Backbone=t(e,{},e._)}(function(t,e,n){var i=t.Backbone;e.VERSION="1.4.0",e.noConflict=function(){return t.Backbone=i,this},e.emulateHTTP=!1,e.emulateJSON=!1;var s,o=e.Events={},r=/\s+/,l=function(t,e,i,s,o){var c,f=0;if(i&&"object"==typeof i){void 0!==s&&"context"in o&&void 0===o.context&&(o.context=s);for(c=n.keys(i);f<c.length;f++)e=l(t,e,c[f],i[c[f]],o)}else if(i&&r.test(i))for(c=i.split(r);f<c.length;f++)e=t(e,c[f],s,o);else e=t(e,i,s,o);return e};o.on=function(t,e,n){if(this._events=l(c,this._events||{},t,e,{context:n,ctx:this,listening:s}),s){(this._listeners||(this._listeners={}))[s.id]=s,s.interop=!1}return this},o.listenTo=function(t,e,i){if(!t)return this;var o=t._listenId||(t._listenId=n.uniqueId("l")),r=this._listeningTo||(this._listeningTo={}),l=s=r[o];l||(this._listenId||(this._listenId=n.uniqueId("l")),l=s=r[o]=new d(this,t));var c=f(t,e,i,this);if(s=void 0,c)throw c;return l.interop&&l.on(e,i),this};var c=function(t,e,n,i){if(n){var s=t[e]||(t[e]=[]),o=i.context,r=i.ctx,l=i.listening;l&&l.count++,s.push({callback:n,context:o,ctx:o||r,listening:l})}return t},f=function(t,e,n,i){try{t.on(e,n,i)}catch(t){return t}};o.off=function(t,e,n){return this._events?(this._events=l(a,this._events,t,e,{context:n,listeners:this._listeners}),this):this},o.stopListening=function(t,e,i){var s=this._listeningTo;if(!s)return this;for(var o=t?[t._listenId]:n.keys(s),r=0;r<o.length;r++){var l=s[o[r]];if(!l)break;l.obj.off(e,i,this),l.interop&&l.off(e,i)}return n.isEmpty(s)&&(this._listeningTo=void 0),this};var a=function(t,e,i,s){if(t){var o,r=s.context,l=s.listeners,c=0;if(e||r||i){for(o=e?[e]:n.keys(t);c<o.length;c++){e=o[c];var f=t[e];if(!f)break;for(var a=[],h=0;h<f.length;h++){var u=f[h];if(i&&i!==u.callback&&i!==u.callback._callback||r&&r!==u.context)a.push(u);else{var v=u.listening;v&&v.off(e,i)}}a.length?t[e]=a:delete t[e]}return t}for(o=n.keys(l);c<o.length;c++)l[o[c]].cleanup()}};o.once=function(t,e,n){var i=l(h,{},t,e,this.off.bind(this));return"string"==typeof t&&null==n&&(e=void 0),this.on(i,e,n)},o.listenToOnce=function(t,e,n){var i=l(h,{},e,n,this.stopListening.bind(this,t));return this.listenTo(t,i)};var h=function(t,e,i,s){if(i){var o=t[e]=n.once(function(){s(e,o),i.apply(this,arguments)});o._callback=i}return t};o.trigger=function(t){if(!this._events)return this;for(var e=Math.max(0,arguments.length-1),n=Array(e),i=0;i<e;i++)n[i]=arguments[i+1];return l(u,this._events,t,void 0,n),this};var u=function(t,e,n,i){if(t){var s=t[e],o=t.all;s&&o&&(o=o.slice()),s&&v(s,i),o&&v(o,[e].concat(i))}return t},v=function(t,e){var n,i=-1,s=t.length,o=e[0],r=e[1],l=e[2];switch(e.length){case 0:for(;++i<s;)(n=t[i]).callback.call(n.ctx);return;case 1:for(;++i<s;)(n=t[i]).callback.call(n.ctx,o);return;case 2:for(;++i<s;)(n=t[i]).callback.call(n.ctx,o,r);return;case 3:for(;++i<s;)(n=t[i]).callback.call(n.ctx,o,r,l);return;default:for(;++i<s;)(n=t[i]).callback.apply(n.ctx,e);return}},d=function(t,e){this.id=t._listenId,this.listener=t,this.obj=e,this.interop=!0,this.count=0,this._events=void 0};return d.prototype.on=o.on,d.prototype.off=function(t,e){var n;this.interop?(this._events=l(a,this._events,t,e,{context:void 0,listeners:void 0}),n=!this._events):(this.count--,n=0===this.count),n&&this.cleanup()},d.prototype.cleanup=function(){delete this.listener._listeningTo[this.obj._listenId],this.interop||delete this.obj._listeners[this.id]},o.bind=o.on,o.unbind=o.off,n.extend(e,o),e});
//# sourceMappingURL=backbone.events.js.map