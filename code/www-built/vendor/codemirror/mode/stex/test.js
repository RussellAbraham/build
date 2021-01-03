// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE


!function(){function t(t){test.mode(t,e,Array.prototype.slice.call(arguments,1))}var e=CodeMirror.getMode({tabSize:4},"stex");t("word","foo"),t("twoWords","foo bar"),t("beginEndDocument","[tag \\begin][bracket {][atom document][bracket }]","[tag \\end][bracket {][atom document][bracket }]"),t("beginEndEquation","[tag \\begin][bracket {][atom equation][bracket }]","  E=mc^2","[tag \\end][bracket {][atom equation][bracket }]"),t("beginModule","[tag \\begin][bracket {][atom module][bracket }[[]]]"),t("beginModuleId","[tag \\begin][bracket {][atom module][bracket }[[]id=bbt-size[bracket ]]]"),t("importModule","[tag \\importmodule][bracket [[][string b-b-t][bracket ]]{][builtin b-b-t][bracket }]"),t("importModulePath","[tag \\importmodule][bracket [[][tag \\KWARCslides][bracket {][string dmath/en/cardinality][bracket }]]{][builtin card][bracket }]"),t("psForPDF","[tag \\PSforPDF][bracket [[][atom 1][bracket ]]{]#1[bracket }]"),t("comment","[comment % foo]"),t("tagComment","[tag \\item][comment % bar]"),t("commentTag"," [comment % \\item]"),t("commentLineBreak","[comment %]","foo"),t("tagErrorCurly","[tag \\begin][error }][bracket {]"),t("tagErrorSquare","[tag \\item][error ]]][bracket {]"),t("commentCurly","[comment % }]"),t("tagHash","the [tag \\#] key"),t("tagNumber","a [tag \\$][atom 5] stetson"),t("tagPercent","[atom 100][tag \\%] beef"),t("tagAmpersand","L [tag \\&] N"),t("tagUnderscore","foo[tag \\_]bar"),t("tagBracketOpen","[tag \\emph][bracket {][tag \\{][bracket }]"),t("tagBracketClose","[tag \\emph][bracket {][tag \\}][bracket }]"),t("tagLetterNumber","section [tag \\S][atom 1]"),t("textTagNumber","para [tag \\P][atom 2]"),t("thinspace","x[tag \\,]y"),t("thickspace","x[tag \\;]y"),t("negativeThinspace","x[tag \\!]y"),t("periodNotSentence","J.\\ L.\\ is"),t("periodSentence","X[tag \\@]. The"),t("italicCorrection","[bracket {][tag \\em] If[tag \\/][bracket }] I"),t("tagBracket","[tag \\newcommand][bracket {][tag \\pop][bracket }]"),t("inlineMathTagFollowedByNumber","[keyword $][tag \\pi][number 2][keyword $]"),t("inlineMath","[keyword $][number 3][variable-2 x][tag ^][number 2.45]-[tag \\sqrt][bracket {][tag \\$\\alpha][bracket }] = [number 2][keyword $] other text"),t("inlineMathLatexStyle","[keyword \\(][number 3][variable-2 x][tag ^][number 2.45]-[tag \\sqrt][bracket {][tag \\$\\alpha][bracket }] = [number 2][keyword \\)] other text"),t("displayMath","More [keyword $$]\t[variable-2 S][tag ^][variable-2 n][tag \\sum] [variable-2 i][keyword $$] other text"),t("displayMath environment","[tag \\begin][bracket {][atom equation][bracket }] x [tag \\end][bracket {][atom equation][bracket }] other text"),t("displayMath environment with label","[tag \\begin][bracket {][atom equation][bracket }][tag \\label][bracket {][atom eq1][bracket }] x [tag \\end][bracket {][atom equation][bracket }] other text~[tag \\ref][bracket {][atom eq1][bracket }]"),t("mathWithComment","[keyword $][variable-2 x] [comment % $]","[variable-2 y][keyword $] other text"),t("lineBreakArgument","[tag \\\\][bracket [[][atom 1cm][bracket ]]]")}();
//# sourceMappingURL=test.js.map