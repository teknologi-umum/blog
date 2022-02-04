---
title: Introductory to Treesitter
desc: A short introduction of Treesitter, a general parser for your text editor which can be used for many cool things, even outside of text editing.
author: Elianiva
github: elianiva
twitter: elianiva_
cover: https://i.ibb.co/wdrbd9f/thumb.png
telegram: manusier_bernapas
date: 2022-01-27
categories:
  - text editor
---

[lsp-reference]: https://microsoft.github.io/language-server-protocol/
[dap-reference]: https://microsoft.github.io/debug-adapter-protocol/
[treesitter-reference]: https://tree-sitter.github.io/
[anycode-link]: https://github.com/microsoft/vscode-anycode

In today's world, we rely on smart features provided by our text editor or IDE. For most people, IDE and text editor is just a tool to help us write code so they tend to not care about how they work (I mean, why would you, it's just a text editor). Though, some other people think that text editor-related things are interesting, including me.

I find it interesting to know how they work under the hood. There's a protocol called [Language Server Protocol (LSP)][lsp-reference] which unifies the work for smart language features such as go to definition, context-aware auto-completion, peek references, etc. There's also [Debug Adapter Protocol (DAP)][dap-reference] which is in a similar vein as LSP but less known and used. A tool that I want to talk about in this post is [Treesitter][treesitter-reference].

## What is Treesitter

Quoting from the [official website][treesitter-reference]:

> Tree-sitter is a parser generator tool and an incremental parsing library. It can build a concrete syntax tree for a source file and efficiently update the syntax tree as the source file is edited.

Basically, it's a _very_ fast incremental parser made by Github that is fast enough it can incrementally parse your file — theoretically — in every keystroke. It can also do error-recovery, meaning that if you have an error in your file then the rest of the file's AST (yes, like any other parser, it generates an Abstract Syntax Tree) won't get messed up.

I said "theoretically" because it still depends on the generated parser. Some languages require a complex hand-written parsing rule that makes it slower. Of course, it still depends on how good the hand-written parser is.

## Why would I want to use Treesitter?

When we're talking about Treesitter, we usually use it inside a text editor. Treesitter can provide an AST that synchronises with your code. Why do we need an AST inside a text editor anyway? Well, because it can provide more accurate syntax highlighting than regex-based highlighting. It can also provide smarter code folding, code navigation, structural editing, etc.

Generating an AST from a language is not that easy. You would need a parser, and building a parser is not that easy either, especially one that's _really_ fast to a point where it can parse on each keystroke, incremental, and capable of doing error-recovery. By using Treesitter, we get these capabilities for free! (Well, not really, you'd still need to make the grammar yourself, but more on that later)

## Treesitter use cases

Since I'm using Neovim, I will be pretty much talking about Treesitter use cases inside Neovim.

#### More accurate syntax highlighting

Neovim's legacy syntax highlighting system — which stems from Vim since Neovim is a fork of Vim — is based on regex like most editors do. Because of this, it leads to a complex regex that is hard to read and slow in performance. Treesitter highlighting, on the other hand, is faster and more accurate while still keeping its _query_ — which is a file that determines how the code should get highlighted — clean and readable. I mean, just take a look at this:

```viml
" Operators;
" match single-char operators:          - + % < > ! & | ^ * =
" and corresponding two-char operators: -= += %= <= >= != &= |= ^= *= ==
syn match goOperator /[-+%<>!&|^*=]=\?/
" match / and /=
syn match goOperator /\/\%(=\|\ze[^/*]\)/
" match two-char operators:               << >> &^
" and corresponding three-char operators: <<= >>= &^=
syn match goOperator /\%(<<\|>>\|&^\)=\?/
" match remaining two-char operators: := && || <- ++ --
syn match goOperator /:=\|||\|<-\|++\|--/
```

Compare that to this:

```scheme
; Operators
[
  "--" "-" "-=" ":=" "!" "!=" "..." "*" "*" "*=" "/" "/="
  "&" "&&" "&=" "%" "%=" "^" "^=" "+" "++" "+=" "<-" "<"
  "<<" "<<=" "<=" "=" "==" ">" ">=" ">>" ">>=" "|" "|=" "||" "~"
] @operator
```

It looks _so_ much simpler because the hard work is delegated to the parser. The query would only need to "map" the node to the corresponding highlight group, which is what the `@operator` part is doing.

Although, the current implementation in Neovim is not perfect. There are some edge cases where it failed to highlight things properly, but it's mostly caused by not-so-good grammar, not Neovim itself. Compare these two images to get an idea of how better the syntax highlighting is.

![comparison](https://i.ibb.co/BypQxTB/cmp.png)
<small>actually, it could be more colourful but my color scheme isn't that colourful because too many colours would distract me :p</small>

I'd recommend watching [this presentation](https://youtu.be/Jes3bD6P0To?t=372) by Max Brunsfeld himself which gave a much better comparison than a single image here.

You might say that Semantic Syntax Highlighting from Language Server is more powerful, well, because it is, but to an extent. Why would you want to use Treesitter then? Like any other technology, there are several pros and cons to them both.

- **Portability**

  Treesitter works virtually everywhere while Language Server semantic highlighting can only work when it's possible to run a Language Server. For example, you can use Treesitter inside a browser but not a Language Server.

- **Semantic**

  Since Treesitter can only work on a single file, its context is very limited compared to semantic highlighting. Here's an example:

  ![useState](https://i.ibb.co/VYZC0Rw/Shot-2022-01-27-17-06-33.png)

  Treesitter (first line) wouldn't know if setState is a function because it's coming from a different file, thus making it thinks that node is just a regular variable. The semantic highlighting (second line) actually knows if `setDebouncedValue` is a function so it highlights that node as a function.

- **Performance**

  Most of the time, Treesitter wins by _a lot_. It works super fast because it does less thinking (it's limited to a single file) and the parser itself is written in C. Fast performance isn't always the case with semantic highlighting because some Language Servers are written in a slow language. Although, Treesitter could also get sluggish because the hand-written parsing rule is not that good

#### Structural code editing

When we edit the text, usually it doesn't have a structure. It's just lines and columns. Traditional text editors won't know about which part is a node in a syntax tree, but with Treesitter we'll be able to know those details resulting in structural text editing.

If you're coming from a Lisp background, you're most likely already know what structural editing is. Instead of just editing the text, you edit its syntax tree. For example, instead of "select 12th line until 30th line" or "select 3rd column through 40th column" (of course, nobody thinks like that, most of us will just move our cursor to whatever place we want to select manually), you can just say "select this function" or "select this class" or "move this function" and it will do it automatically for you.

There's incremental selection in Neovim which goes up or down the syntax tree incrementally. Instead of "select this part until that part", it will go "select this node until its 4th parent". Here's a quick demonstration:

![demo](https://i.ibb.co/cNTxp7n/ezgif-com-gif-maker.gif)

There is also a [presentation from EmacsConf2021](https://www.youtube.com/watch?v=FwDsuz0waIY) which demonstrates structural editing in more detail.

#### Smarter code folding

Code folding is useful when you navigate through the code and don't really care about some of the details.

Usually code folding is based on indentation, if you have a code like this:

```cpp
void some_function(std::string foo, std::string bar, int baz, int qux) {
    // some long function implementation
    // doing something really important
}
```

It will look how we'd expect it to look:

```cpp
void some_function(std::string foo, std::string bar, int baz, int qux) {...
}
```

But things will get funky when you have a function that looks like this, which is quite common when you have a function with tons of parameters and you want to align it.

```cpp
void some_function(std::string foo,
                   std::string bar,
                   int baz,
                   int qux) {
    // some long function implementation
    // doing something really important
}
```

It will fold like this:

```cpp
void some_function(std::string foo,...
}
```

Yeah, doesn't look so good, almost all of its parameters are folded. With Treesitter, it will look like this:

```cpp
void some_function(std::string foo,
                   std::string bar,
                   int baz,
                   int qux) {...
}
```

It actually knows which node needs to be folded because we have the AST to work with. No matter how you indent your code, it will fold it correctly as long as the generated AST is correct.

Max Brunsfeld also has a section in his presentation about [code folding with Treesitter](https://youtu.be/Jes3bD6P0To?t=749).

## Editors using Treesitter

Several editors are already using Treesitter as of today, though not by many.

**Atom** would be the obvious one because it was made by Github. They use Treesitter to highlight the code, folding, incremental selection, etc. You can read the [full announcement here.](https://github.blog/2018-10-31-atoms-new-parsing-system/)

**Visual Studio Code** has an extension called [vscode-anycode][anycode-link] which is basically a lightweight and simpler alternative to Language Server implementation based on Treesitter. It is used for an environment that doesn't allow running an actual language server like [github.dev](https://github.dev) and [vscode.dev](https://vscode.dev). It won't be as accurate as an actual Language Server, though.

**Neovim** implements Treesitter starting from v0.5, but it's still in a rough beta phase and there are still some cases where it doesn't work as good as you would expect, but things have gotten better in v0.7 (which is the master branch at the time of writing this, it's not released yet).

**Emacs** also implements it, though I don't know too much about it. They have a [pretty detailed website](https://emacs-tree-sitter.github.io/) covering its features and whatnot.

..and some other editors which aren't as commonly used such as [Helix](https://helix-editor.com), [Lapce](https://github.com/lapce/lapce), etc.

## Outside of text editor

Treesitter can also be used for other things unrelated to text editing. For example, [tjdevries/tree-sitter-lua](https://github.com/tjdevries/tree-sitter-lua) has a docgen for EmmyLua -> Vimdoc format. [sunjon/telescope-arecibo.nvim](https://github.com/sunjon/telescope-arecibo.nvim) uses Treesitter as a replacement (sort of) for the browser's DOM selector API (ie. querying nodes, getting node's content, etc). There's also [mjlbach/babelfish.nvim](https://github.com/mjlbach/babelfish.nvim) which is basically a Markdown -> Vimdoc converter. Pretty much anything that needs an AST, you can make it with Treesitter.

## Treesitter Parser

Like any other parser, Treesitter needs a "grammar" for it to know "how" to parse a document. Treesitter grammars are written in DSL using a file called `grammar.js`. It looks like this:

```javascript
module.exports = grammar({
  // the grammar's name
  name: 'javascript',

  // these are the nodes for the hand-written parsing rule to consume
  externals: ($) => [$._automatic_semicolon, $._template_chars, $._ternary_qmark],

  // the parsing rules
  rules: {
    program: ($) => seq(optional($.hash_bang_line), repeat($.statement)),

    hash_bang_line: ($) => /#!.*/,

    // the rest of the rules goes here
  },
});
```

It's quite complex so I'd suggest you head over to [treesitter's documentation](https://tree-sitter.github.io/tree-sitter/creating-parsers) which covers every topic you'd need to make your own parser.

## Treesitter Queries

As its name suggests, it is used to query our AST just like how you'd query an HTML document using CSS selector. It's written in a very simple `scheme` language. It looks this:

```scheme
(some_node (node) @target_name)
```

The `@target_name` binds the node to `target_name`. It has some special operators to help you capture more complex things like wildcard, negation, quantification, etc. Just like regex.

For more detail about this, they have [an entire section](https://tree-sitter.github.io/tree-sitter/using-parsers#pattern-matching-with-queries) dedicated for this.

## Closing Note

Treesitter is a _relatively_ new technology and it's still hasn't widely adopted. If you want to get started with Treesitter, I'd suggest starting from [the official documentation](https://tree-sitter.github.io/) which has a pretty detailed explanation.
