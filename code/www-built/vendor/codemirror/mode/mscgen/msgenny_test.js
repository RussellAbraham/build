// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE


!function(){function e(e){test.mode(e,r,Array.prototype.slice.call(arguments,1),"msgenny")}var r=CodeMirror.getMode({indentUnit:2},"text/x-msgenny");e("comments","[comment // a single line comment]","[comment # another  single line comment /* and */ ignored here]","[comment /* A multi-line comment even though it contains]",'[comment msc keywords and "quoted text"*/]'),e("strings",'[string "// a string"]','[string "a string running over]','[string two lines"]','[string "with \\"escaped quote"]'),e("xù/ msgenny keywords classify as 'keyword'","[keyword watermark]","[keyword wordwrapentities]","[keyword alt]","[keyword loop]","[keyword opt]","[keyword ref]","[keyword else]","[keyword break]","[keyword par]","[keyword seq]","[keyword assert]"),e("xù/ msgenny constants classify as 'variable'","[variable auto]","[variable true]","[variable false]","[variable on]","[variable off]"),e("mscgen options classify as keyword","[keyword hscale]","[keyword width]","[keyword arcgradient]","[keyword wordwraparcs]"),e("mscgen arcs classify as keyword","[keyword note]","[keyword abox]","[keyword rbox]","[keyword box]","[keyword |||...---]","[keyword ..--==::]","[keyword ->]","[keyword <-]","[keyword <->]","[keyword =>]","[keyword <=]","[keyword <=>]","[keyword =>>]","[keyword <<=]","[keyword <<=>>]","[keyword >>]","[keyword <<]","[keyword <<>>]","[keyword -x]","[keyword x-]","[keyword -X]","[keyword X-]","[keyword :>]","[keyword <:]","[keyword <:>]"),e("within an attribute list, mscgen/ xù attributes classify as base","[base [[label]","[base idurl id url]","[base linecolor linecolour textcolor textcolour textbgcolor textbgcolour]","[base arclinecolor arclinecolour arctextcolor arctextcolour arctextbgcolor arctextbgcolour]","[base arcskip]]]"),e("outside an attribute list, mscgen/ xù attributes classify as base","[base label]","[base idurl id url]","[base linecolor linecolour textcolor textcolour textbgcolor textbgcolour]","[base arclinecolor arclinecolour arctextcolor arctextcolour arctextbgcolor arctextbgcolour]","[base arcskip]"),e("a typical program","[comment # typical msgenny program]",'[keyword wordwraparcs][operator =][variable true][base , ][keyword hscale][operator =][string "0.8"][base , ][keyword arcgradient][operator =][base 30;]','[base   a : ][string "Entity A"][base ,]',"[base   b : Entity B,]","[base   c : Entity C;]",'[base   a ][keyword =>>][base  b: ][string "Hello entity B"][base ;]',"[base   a ][keyword alt][base  c][bracket {]",'[base     a ][keyword <<][base  b: ][string "Here\'s an answer dude!"][base ;]','[keyword ---][base : ][string "sorry, won\'t march - comm glitch"]',"[base     a ][keyword x-][base  b: ][string \"Here's an answer dude! (won't arrive...)\"][base ;]","[bracket }]","[base   c ][keyword :>][base  *: What about me?;]")}();
//# sourceMappingURL=msgenny_test.js.map