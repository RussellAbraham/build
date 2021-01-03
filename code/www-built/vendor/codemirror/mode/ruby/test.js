// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE


!function(){function r(r){test.mode(r,e,Array.prototype.slice.call(arguments,1))}var e=CodeMirror.getMode({indentUnit:2},"ruby");r("divide_equal_operator","[variable bar] [operator /=] [variable foo]"),r("divide_equal_operator_no_spacing","[variable foo][operator /=][number 42]"),r("complex_regexp","[keyword if] [variable cr] [operator =~] [string-2 /(?: \\( #{][tag RE_NOT][string-2 }\\( | #{][tag RE_NOT_PAR_OR][string-2 }* #{][tag RE_OPA_OR][string-2 } )/][variable x]"),r("indented_heredoc","[keyword def] [def x]","  [variable y] [operator =] [string <<-FOO]","[string     bar]","[string   FOO]","[keyword end]")}();
//# sourceMappingURL=test.js.map