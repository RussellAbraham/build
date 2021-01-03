// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE


!function(){function e(e){test.mode(e,r,Array.prototype.slice.call(arguments,1))}var r=CodeMirror.getMode({indentUnit:2},"soy");e("keywords-test","[keyword {] [keyword as] worrying [keyword and] notorious [keyword as]","    the Fandor[operator -]alias assassin, [keyword or]","    Corcand cannot fit [keyword in] [keyword }]"),e("let-test","[keyword {template] [def .name][keyword }]",'  [keyword {let] [def $name]: [string "world"][keyword /}]',"  [tag&bracket <][tag h1][tag&bracket >]","    Hello, [keyword {][variable-2 $name][keyword }]","  [tag&bracket </][tag h1][tag&bracket >]","[keyword {/template}]",""),e("function-test",'[keyword {] [callee&variable css]([string "MyClass"])[keyword }]','[tag&bracket <][tag input] [attribute value]=[string "][keyword {] [callee&variable index]([variable-2&error $list])[keyword }][string "][tag&bracket />]'),e("soy-element-composition-test","[keyword <{][callee&variable foo]()[keyword }]","[keyword ></>]"),e("soy-element-composition-attribute-test","[keyword <{][callee&variable foo]()[keyword }]",'[attribute class]=[string "Foo"]',"[keyword ></>]"),e("namespace-test","[keyword {namespace] [variable namespace][keyword }]"),e("namespace-with-attribute-test",'[keyword {namespace] [variable my.namespace.templates] [attribute requirecss]=[string "my.namespace"][keyword }]'),e("operators-test","[keyword {] [atom 1] [operator ==] [atom 1] [keyword }]","[keyword {] [atom 1] [operator !=] [atom 2] [keyword }]","[keyword {] [atom 2] [operator +] [atom 2] [keyword }]","[keyword {] [atom 2] [operator -] [atom 2] [keyword }]","[keyword {] [atom 2] [operator *] [atom 2] [keyword }]","[keyword {] [atom 2] [operator /] [atom 2] [keyword }]","[keyword {] [atom 2] [operator %] [atom 2] [keyword }]","[keyword {] [atom 2] [operator <=] [atom 2] [keyword }]","[keyword {] [atom 2] [operator >=] [atom 2] [keyword }]","[keyword {] [atom 3] [operator >] [atom 2] [keyword }]","[keyword {] [atom 2] [operator >] [atom 3] [keyword }]",'[keyword {] [atom null] [operator ?:] [string ""] [keyword }]',"[keyword {] [variable-2&error $variable] [operator |] safeHtml [keyword }]"),e("primitive-test","[keyword {] [atom true] [keyword }]","[keyword {] [atom false] [keyword }]","[keyword {] truethy [keyword }]","[keyword {] falsey [keyword }]","[keyword {] [atom 42] [keyword }]","[keyword {] [atom .42] [keyword }]","[keyword {] [atom 0.42] [keyword }]","[keyword {] [atom -0.42] [keyword }]","[keyword {] [atom -.2] [keyword }]","[keyword {] [atom 6.03e23] [keyword }]","[keyword {] [atom -0.03e0] [keyword }]","[keyword {] [atom 0x1F] [keyword }]","[keyword {] [atom 0x1F00BBEA] [keyword }]"),e("param-type-record","[keyword {@param] [def record]: [[[property foo]: [type bool], [property bar]: [type int] ]][keyword }]"),e("param-type-map","[keyword {@param] [def unknown]: [type map]<[type string], [type bool]>[keyword }]"),e("param-type-list","[keyword {@param] [def list]: [type list]<[type ?]>[keyword }]"),e("param-type-any","[keyword {@param] [def unknown]: [type ?][keyword }]"),e("param-type-nested","[keyword {@param] [def a]: [type list]<[[[property a]: [type int], [property b]: [type map]<[type string], [type bool]>]]>][keyword }]"),e("undefined-var","[keyword {][variable-2&error $var]"),e("param-scope-test","[keyword {template] [def .a][keyword }]","  [keyword {@param] [def x]: [type string][keyword }]","  [keyword {][variable-2 $x][keyword }]","[keyword {/template}]","","[keyword {template] [def .b][keyword }]","  [keyword {][variable-2&error $x][keyword }]","[keyword {/template}]",""),e("if-variable-test","[keyword {if] [variable-2&error $showThing][keyword }]","  Yo!","[keyword {/if}]",""),e("defined-if-variable-test","[keyword {template] [def .foo][keyword }]","  [keyword {@param?] [def showThing]: [type bool][keyword }]","  [keyword {if] [variable-2 $showThing][keyword }]","    Yo!","  [keyword {/if}]","[keyword {/template}]",""),e("template-calls-test","[keyword {call] [variable-2 .foo][keyword /}]","[keyword {call] [variable foo][keyword /}]","[keyword {call] [variable foo][keyword }] [keyword {/call}]","[keyword {call] [variable first1.second.third_3][keyword /}]","[keyword {call] [variable first1.second.third_3] [keyword }] [keyword {/call}]",""),e("foreach-scope-test","[keyword {@param] [def bar]: [type string][keyword }]","[keyword {foreach] [def $foo] [keyword in] [variable-2&error $foos][keyword }]","  [keyword {][variable-2 $foo][keyword }]","[keyword {/foreach}]","[keyword {][variable-2&error $foo][keyword }]","[keyword {][variable-2 $bar][keyword }]"),e("foreach-ifempty-indent-test","[keyword {foreach] [def $foo] [keyword in] [variable-2&error $foos][keyword }]","  something","[keyword {ifempty}]","  nothing","[keyword {/foreach}]",""),e("foreach-index","[keyword {foreach] [def $foo],[def $index] [keyword in] [[]] [keyword }]","  [keyword {][variable-2 $foo][keyword }] [keyword {][variable-2 $index][keyword }]","[keyword {/foreach}]"),e("nested-kind-test",'[keyword {template] [def .foo] [attribute kind]=[string "html"][keyword }]',"  [tag&bracket <][tag div][tag&bracket >]","    [keyword {call] [variable-2 .bar][keyword }]",'      [keyword {param] [property propertyName] [attribute kind]=[string "js"][keyword }]',"        [keyword var] [def bar] [operator =] [number 5];","      [keyword {/param}]","    [keyword {/call}]","  [tag&bracket </][tag div][tag&bracket >]","[keyword {/template}]",""),e("tag-starting-with-function-call-is-not-a-keyword","[keyword {][callee&variable index]([variable-2&error $foo])[keyword }]",'[keyword {css] [string "some-class"][keyword }]','[keyword {][callee&variable css]([string "some-class"])[keyword }]',""),e("allow-missing-colon-in-@param","[keyword {template] [def .foo][keyword }]","  [keyword {@param] [def showThing] [type bool][keyword }]","  [keyword {if] [variable-2 $showThing][keyword }]","    Yo!","  [keyword {/if}]","[keyword {/template}]",""),e("param-type-and-default-value","[keyword {template] [def .foo][keyword }]","  [keyword {@param] [def bar]: [type bool] = [atom true][keyword }]","[keyword {/template}]",""),e("attribute-type","[keyword {template] [def .foo][keyword }]","  [keyword {@attribute] [def bar]: [type string][keyword }]","[keyword {/template}]",""),e("attribute-type-optional","[keyword {template] [def .foo][keyword }]","  [keyword {@attribute] [def bar]: [type string][keyword }]","[keyword {/template}]",""),e("attribute-type-all","[keyword {template] [def .foo][keyword }]","  [keyword {@attribute] [type *][keyword }]","[keyword {/template}]",""),e("state-variable-reference","[keyword {template] [def .foo][keyword }]","  [keyword {@param] [def bar]:= [atom true][keyword }]","  [keyword {@state] [def foobar]:= [variable-2 $bar][keyword }]","[keyword {/template}]",""),e("param-type-template","[keyword {template] [def .foo][keyword }]","  [keyword {@param] [def renderer]: ([def s]:[type string])=>[type html][keyword }]","  [keyword {call] [variable-2 $renderer] [keyword /}]","[keyword {/template}]",""),e("single-quote-strings","[keyword {][string \"foo\"] [string 'bar'][keyword }]",""),e("literal-comments","[keyword {literal}]/* comment */ // comment[keyword {/literal}]"),e("highlight-command-at-eol","[keyword {msg]","    [keyword }]"),e("switch-indent-test","[keyword {let] [def $marbles]: [atom 5] [keyword /}]","[keyword {switch] [variable-2 $marbles][keyword }]","  [keyword {case] [atom 0][keyword }]","    No marbles","  [keyword {default}]","    At least 1 marble","[keyword {/switch}]",""),e("if-elseif-else-indent","[keyword {if] [atom true][keyword }]","  [keyword {let] [def $a]: [atom 5] [keyword /}]","[keyword {elseif] [atom false][keyword }]","  [keyword {let] [def $bar]: [atom 5] [keyword /}]","[keyword {else}]","  [keyword {let] [def $bar]: [atom 5] [keyword /}]","[keyword {/if}]"),e("msg-fallbackmsg-indent",'[keyword {msg] [attribute desc]=[string "A message"][keyword }]',"  A message",'[keyword {fallbackmsg] [attribute desc]=[string "A message"][keyword }]',"  Old message","[keyword {/msg}]"),e("literal-indent","[keyword {template] [def .name][keyword }]","  [keyword {literal}]","    Lerum","  [keyword {/literal}]","  Ipsum","[keyword {/template}]"),e("special-chars","[keyword {sp}]","[keyword {nil}]","[keyword {\\r}]","[keyword {\\n}]","[keyword {\\t}]","[keyword {lb}]","[keyword {rb}]"),e("let-list-literal","[keyword {let] [def $test]: [[[[[string 'a'] ], [[[string 'b'] ] ] [keyword /}]"),e("let-record-literal","[keyword {let] [def $test]: [keyword record]([property test]: [callee&variable bidiGlobalDir](), [property foo]: [atom 5]) [keyword /}]"),e("let-map-literal","[keyword {let] [def $test]: [keyword map]([string 'outer']: [keyword map]([atom 5]: [atom false]), [string 'foo']: [string 'bar']) [keyword /}]"),e("wrong-closing-tag","[keyword {if] [atom true][keyword }]","  Optional","[keyword&error {/badend][keyword }]"),e("list-comprehension","[keyword {let] [def $myList]: [[[[[string 'a'] ] ] [keyword /}] [keyword {let] [def $test]: [[[variable $a] [operator +] [atom 1] [keyword for] [def $a] [keyword in] [variable-2 $myList] [keyword if] [variable-2 $a] [operator >=] [atom 3] ] [keyword /}]"),e("list-comprehension-index","[keyword {let] [def $test]: [[[variable $a] [operator +] [variable $index] [keyword for] [def $a],[def $index] [keyword in] [[]] [keyword if] [variable-2 $a] [operator >=] [variable-2 $index] ] [keyword /}]"),e("list-comprehension-variable-scope",'[keyword {let] [def $name]: [string "world"][keyword /}]',"[keyword {let] [def $test]: [[[variable $a] [operator +] [variable $index] [keyword for] [def $a],[def $index] [keyword in] [[]] [keyword if] [variable-2 $a] [operator >=] [variable-2 $index] ] [keyword /}]","[keyword {][variable-2&error $a][keyword }]","[keyword {][variable-2&error $index][keyword }]","[keyword {][variable-2 $test][keyword }]","[keyword {][variable-2 $name][keyword }]"),e("import","[keyword import] {[def Name], [variable Person] [keyword as] [def P]} [keyword from] [string 'examples/proto/example.proto'];")}();
//# sourceMappingURL=test.js.map