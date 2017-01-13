# Example text from header.md

This text is from file "header.md".

## <span id="api-example-for-a-submenu-entry">HowTo include</span>

In your projects "package.json" you can set "apidoc.header" with a title and a filename to include this file into your documentation.

This example attempts to integrate "header.md" and "footer.md".

    {
      "name": "example",
      "version": "0.3.0",
      "description": "apidoc example project.",
      "apidoc": {
        "header": {
          "title": "My own header title",
          "filename": "header.md"
        },
        "footer": {
          "title": "My own footer title",
          "filename": "footer.md"
        }
      }
    }
