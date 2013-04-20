# Example text from API.md

## General

This Text is optionally and not needed to create the documentation.


## HowTo include

This text is from file "API.md".

In your projects "package.json" you can set "apidoc" with a description text or "apidocFilename" with the filename to include into your documentation.

This example attempts to integrate "API.md". If not available, then the "apidoc" string is used.

    {
      "name": "example",
      "version": "0.3.0",
      "description": "apidoc example project.",
      "apidoc": "This is a description, it will be ignored if parameter apidocFilename exist.",
      "apidocFilename": "API.md"
    }
