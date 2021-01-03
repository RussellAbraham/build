// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// Yacas mode copyright (c) 2015 by Grzegorz Mazur
// Loosely based on mathematica mode by Calin Barbat


!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("yacas",function(t,n){function r(e,t){var n;if('"'===(n=e.next()))return t.tokenize=o,t.tokenize(e,t);if("/"===n){if(e.eat("*"))return t.tokenize=i,t.tokenize(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}e.backUp(1);var r=e.match(/^(\w+)\s*\(/,!1);null!==r&&c.hasOwnProperty(r[1])&&t.scopes.push("bodied");var u=a(t);if("bodied"===u&&"["===n&&t.scopes.pop(),"["!==n&&"{"!==n&&"("!==n||t.scopes.push(n),u=a(t),("["===u&&"]"===n||"{"===u&&"}"===n||"("===u&&")"===n)&&t.scopes.pop(),";"===n)for(;"bodied"===u;)t.scopes.pop(),u=a(t);return e.match(/\d+ *#/,!0,!1)?"qualifier":e.match(l,!0,!1)?"number":e.match(f,!0,!1)?"variable-3":e.match(/(?:\[|\]|{|}|\(|\))/,!0,!1)?"bracket":e.match(p,!0,!1)?(e.backUp(1),"variable"):e.match(s,!0,!1)?"variable-2":e.match(/(?:\\|\+|\-|\*|\/|,|;|\.|:|@|~|=|>|<|&|\||_|`|'|\^|\?|!|%|#)/,!0,!1)?"operator":"error"}function o(e,t){for(var n,o=!1,i=!1;null!=(n=e.next());){if('"'===n&&!i){o=!0;break}i=!i&&"\\"===n}return o&&!i&&(t.tokenize=r),"string"}function i(e,t){for(var n,o;null!=(o=e.next());){if("*"===n&&"/"===o){t.tokenize=r;break}n=o}return"comment"}function a(e){var t=null;return e.scopes.length>0&&(t=e.scopes[e.scopes.length-1]),t}var c=function(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}("Assert BackQuote D Defun Deriv For ForEach FromFile FromString Function Integrate InverseTaylor Limit LocalSymbols Macro MacroRule MacroRulePattern NIntegrate Rule RulePattern Subst TD TExplicitSum TSum Taylor Taylor1 Taylor2 Taylor3 ToFile ToStdout ToString TraceRule Until While"),u="(?:[a-zA-Z\\$'][a-zA-Z0-9\\$']*)",l=new RegExp("(?:(?:\\.\\d+|\\d+\\.\\d*|\\d+)(?:[eE][+-]?\\d+)?)"),s=new RegExp(u),f=new RegExp(u+"?_"+u),p=new RegExp(u+"\\s*\\(");return{startState:function(){return{tokenize:r,scopes:[]}},token:function(e,t){return e.eatSpace()?null:t.tokenize(e,t)},indent:function(n,o){if(n.tokenize!==r&&null!==n.tokenize)return e.Pass;var i=0;return"]"!==o&&"];"!==o&&"}"!==o&&"};"!==o&&");"!==o||(i=-1),(n.scopes.length+i)*t.indentUnit},electricChars:"{}[]();",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//"}}),e.defineMIME("text/x-yacas",{name:"yacas"})});
//# sourceMappingURL=yacas.js.map