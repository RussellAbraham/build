// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE


!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("julia",function(t,n){function r(e,t){return void 0===t&&(t="\\b"),new RegExp("^(("+e.join(")|(")+"))"+t)}function i(e){return e.nestedArrays>0}function a(e){return e.nestedGenerators>0}function o(e,t){return void 0===t&&(t=0),e.scopes.length<=t?null:e.scopes[e.scopes.length-(t+1)]}function s(e,t){if(e.match(/^#=/,!1))return t.tokenize=f,t.tokenize(e,t);var n=t.leavingExpr;if(e.sol()&&(n=!1),t.leavingExpr=!1,n&&e.match(/^'+/))return"operator";if(e.match(/\.{4,}/))return"error";if(e.match(/\.{1,3}/))return"operator";if(e.eatSpace())return null;var r=e.peek();if("#"===r)return e.skipToEnd(),"comment";if("["===r&&(t.scopes.push("["),t.nestedArrays++),"("===r&&(t.scopes.push("("),t.nestedGenerators++),i(t)&&"]"===r){for(;t.scopes.length&&"["!==o(t);)t.scopes.pop();t.scopes.pop(),t.nestedArrays--,t.leavingExpr=!0}if(a(t)&&")"===r){for(;t.scopes.length&&"("!==o(t);)t.scopes.pop();t.scopes.pop(),t.nestedGenerators--,t.leavingExpr=!0}if(i(t)){if("end"==t.lastToken&&e.match(/^:/))return"operator";if(e.match(/^end/))return"number"}var s;if((s=e.match(x,!1))&&t.scopes.push(s[0]),e.match(z,!1)&&t.scopes.pop(),e.match(/^::(?![:\$])/))return t.tokenize=c,t.tokenize(e,t);if(!n&&e.match(E)||e.match(/:([<>]:|<<=?|>>>?=?|->|\/\/|\.{2,3}|[\.\\%*+\-<>!\/^|&]=?|[~\?\$])/))return"builtin";if(e.match(p))return"operator";if(e.match(/^\.?\d/,!1)){var b=RegExp(/^im\b/),k=!1;if(e.match(/^0x\.[0-9a-f_]+p[\+\-]?[_\d]+/i)&&(k=!0),e.match(/^0x[0-9a-f_]+/i)&&(k=!0),e.match(/^0b[01_]+/i)&&(k=!0),e.match(/^0o[0-7_]+/i)&&(k=!0),e.match(/^(?:(?:\d[_\d]*)?\.(?!\.)(?:\d[_\d]*)?|\d[_\d]*\.(?!\.)(?:\d[_\d]*))?([Eef][\+\-]?[_\d]+)?/i)&&(k=!0),e.match(/^\d[_\d]*(e[\+\-]?\d+)?/i)&&(k=!0),k)return e.match(b),t.leavingExpr=!0,"number"}if(e.match(/^'/))return t.tokenize=l,t.tokenize(e,t);if(e.match(_))return t.tokenize=m(e.current()),t.tokenize(e,t);if(e.match(A))return"meta";if(e.match(h))return null;if(e.match(y))return"keyword";if(e.match(P))return"builtin";var F=t.isDefinition||"function"==t.lastToken||"macro"==t.lastToken||"type"==t.lastToken||"struct"==t.lastToken||"immutable"==t.lastToken;return e.match(d)?F?"."===e.peek()?(t.isDefinition=!0,"variable"):(t.isDefinition=!1,"def"):e.match(/^({[^}]*})*\(/,!1)?(t.tokenize=u,t.tokenize(e,t)):(t.leavingExpr=!0,"variable"):(e.next(),"error")}function u(e,t){for(;;){var n=e.match(/^(\(\s*)/),r=0;if(n&&(t.firstParenPos<0&&(t.firstParenPos=t.scopes.length),t.scopes.push("("),r+=n[1].length),"("==o(t)&&e.match(/^\)/)&&(t.scopes.pop(),r+=1,t.scopes.length<=t.firstParenPos)){var i=e.match(/^(\s*where\s+[^\s=]+)*\s*?=(?!=)/,!1);return e.backUp(r),t.firstParenPos=-1,t.tokenize=s,i?"def":"builtin"}if(e.match(/^$/g,!1)){for(e.backUp(r);t.scopes.length>t.firstParenPos;)t.scopes.pop();return t.firstParenPos=-1,t.tokenize=s,"builtin"}if(!e.match(/^[^()]+/))return e.next(),null}}function c(e,t){return e.match(/.*?(?=,|;|{|}|\(|\)|=|$|\s)/),e.match(/^{/)?t.nestedParameters++:e.match(/^}/)&&t.nestedParameters>0&&t.nestedParameters--,t.nestedParameters>0?e.match(/.*?(?={|})/)||e.next():0==t.nestedParameters&&(t.tokenize=s),"builtin"}function f(e,t){return e.match(/^#=/)&&t.nestedComments++,e.match(/.*?(?=(#=|=#))/)||e.skipToEnd(),e.match(/^=#/)&&0==--t.nestedComments&&(t.tokenize=s),"comment"}function l(e,t){var n,r=!1;if(e.match(b))r=!0;else if(n=e.match(/\\u([a-f0-9]{1,4})(?=')/i)){var i=parseInt(n[1],16);(i<=55295||i>=57344)&&(r=!0,e.next())}else if(n=e.match(/\\U([A-Fa-f0-9]{5,8})(?=')/)){var i=parseInt(n[1],16);i<=1114111&&(r=!0,e.next())}return r?(t.leavingExpr=!0,t.tokenize=s,"string"):(e.match(/^[^']+(?=')/)||e.skipToEnd(),e.match(/^'/)&&(t.tokenize=s),"error")}function m(e){function t(t,n){if(t.eat("\\"))t.next();else{if(t.match(e))return n.tokenize=s,n.leavingExpr=!0,"string";t.eat(/[`"]/)}return t.eatWhile(/[^\\`"]/),"string"}return'"""'===e.substr(-3)?e='"""':'"'===e.substr(-1)&&(e='"'),t}var p=n.operators||r(["[<>]:","[<>=]=","<<=?",">>>?=?","=>","->","\\/\\/","[\\\\%*+\\-<>!=\\/^|&\\u00F7\\u22BB]=?","\\?","\\$","~",":","\\u00D7","\\u2208","\\u2209","\\u220B","\\u220C","\\u2218","\\u221A","\\u221B","\\u2229","\\u222A","\\u2260","\\u2264","\\u2265","\\u2286","\\u2288","\\u228A","\\u22C5","\\b(in|isa)\\b(?!.?\\()"],""),h=n.delimiters||/^[;,()[\]{}]/,d=n.identifiers||/^[_A-Za-z\u00A1-\u2217\u2219-\uFFFF][\w\u00A1-\u2217\u2219-\uFFFF]*!*/,b=r(["\\\\[0-7]{1,3}","\\\\x[A-Fa-f0-9]{1,2}","\\\\[abefnrtv0%?'\"\\\\]","([^\\u0027\\u005C\\uD800-\\uDFFF]|[\\uD800-\\uDFFF][\\uDC00-\\uDFFF])"],"'"),k=["begin","function","type","struct","immutable","let","macro","for","while","quote","if","else","elseif","try","finally","catch","do"],F=["end","else","elseif","catch","finally"],g=["if","else","elseif","while","for","begin","let","end","do","try","catch","finally","return","break","continue","global","local","const","export","import","importall","using","function","where","macro","module","baremodule","struct","type","mutable","immutable","quote","typealias","abstract","primitive","bitstype"],v=["true","false","nothing","NaN","Inf"];e.registerHelper("hintWords","julia",g.concat(v));var x=r(k),z=r(F),y=r(g),P=r(v),A=/^@[_A-Za-z][\w]*/,E=/^:[_A-Za-z\u00A1-\uFFFF][\w\u00A1-\uFFFF]*!*/,_=/^(`|([_A-Za-z\u00A1-\uFFFF]*"("")?))/;return{startState:function(){return{tokenize:s,scopes:[],lastToken:null,leavingExpr:!1,isDefinition:!1,nestedArrays:0,nestedComments:0,nestedGenerators:0,nestedParameters:0,firstParenPos:-1}},token:function(e,t){var n=t.tokenize(e,t),r=e.current();return r&&n&&(t.lastToken=r),n},indent:function(e,n){var r=0;return("]"===n||")"===n||/^end\b/.test(n)||/^else/.test(n)||/^catch\b/.test(n)||/^elseif\b/.test(n)||/^finally/.test(n))&&(r=-1),(e.scopes.length+r)*t.indentUnit},electricInput:/\b(end|else|catch|finally)\b/,blockCommentStart:"#=",blockCommentEnd:"=#",lineComment:"#",closeBrackets:'()[]{}""',fold:"indent"}}),e.defineMIME("text/x-julia","julia")});
//# sourceMappingURL=julia.js.map