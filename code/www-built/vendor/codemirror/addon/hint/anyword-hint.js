// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE


!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";var r=/[\w$]+/;e.registerHelper("hint","anyword",function(t,o){for(var i=o&&o.word||r,n=o&&o.range||500,f=t.getCursor(),s=t.getLine(f.line),a=f.ch,c=a;c&&i.test(s.charAt(c-1));)--c;for(var l=c!=a&&s.slice(c,a),d=o&&o.list||[],u={},p=new RegExp(i.source,"g"),g=-1;g<=1;g+=2)for(var h=f.line,m=Math.min(Math.max(h+g*n,t.firstLine()),t.lastLine())+g;h!=m;h+=g)for(var y,b=t.getLine(h);y=p.exec(b);)h==f.line&&y[0]===l||l&&0!=y[0].lastIndexOf(l,0)||Object.prototype.hasOwnProperty.call(u,y[0])||(u[y[0]]=!0,d.push(y[0]));return{list:d,from:e.Pos(f.line,c),to:e.Pos(f.line,a)}})});
//# sourceMappingURL=anyword-hint.js.map