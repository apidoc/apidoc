# Markdown Parser

By default apiDoc uses [markdown-it](https://github.com/markdown-it/markdown-it) Markdown Parser.

If you need to modify the parser options or use an other markdown parser, create a .js file with a custom parser.

Visit the markdown-it page for details, in particular if you want to use markdown plugins.


## Custom Parser

`apidoc --markdown /path/to/a/custom_markdown_parser.js`

Your custom parser must return a class with a render-method.



## Examples

### With "markdown-it" Markdown Parser.

```js
var Markdown = require('markdown-it');

function CustomMarkdownParser() {
    this.markdownParser = new Markdown({
        breaks     : false,
        html       : true,
        linkify    : true,
        typographer: false
    });
}

module.exports = CustomMarkdownParser;

CustomMarkdownParser.prototype.render = function(text) {
    return this.markdownParser.render(text);
};
```



### With "marked" Markdown Parser.

**marked seemed to be outdated and has currently a security issue, please use it not anymore in production.**
This is only an demo.

```js
var markdownParser = require('marked');

function CustomMarkdownParser() {
    markdownParser.setOptions({
        gfm        : true,
        tables     : true,
        breaks     : false,
        pedantic   : false,
        sanitize   : false,
        smartLists : false,
        smartypants: false
    });
}

module.exports = CustomMarkdownParser;

CustomMarkdownParser.prototype.render = function(text) {
    return markdownParser(text);
};
```
