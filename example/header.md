# Introduction

This example documentation contains all the possible configuration options for apidoc.

To generate this documentation:

```bash
git clone https://github.com/apidoc/apidoc && cd apidoc
npm install --prod
./bin/apidoc -i example -o /tmp/doc
$BROWSER /tmp/doc
```

Note that this text is from the file "header.md".

## <span id="api-example-for-a-submenu-entry">Adding a header</span>

In your projects "package.json" you can set "apidoc.header" with a title and a filename to include this file into your documentation.

This example configuration attempts to integrate "header.md" and "footer.md".

```json
{
  "name": "example",
  "version": "0.3.0",
  "description": "apidoc example project.",
  "apidoc": {
    "header": {
      "title": "Introduction",
      "filename": "header.md"
    },
    "footer": {
      "title": "Best practices",
      "filename": "footer.md"
    }
  }
}
```
