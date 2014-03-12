# apiDoc 0.4.x

Generates a RESTful web API Documentation.

Documentation at [apidocjs.com](http://apidocjs.com).

[Example](http://apidocjs.com/example/) output.

## Supported programming languages

 * **C#, Go, Dart, Java, JavaScript, PHP** (all DocStyle capable languages):

   ```javascript
   /**
     * This is a comment.
     */
   ```

 * **CoffeeScript**:

   ```coffeescript
   ###
   This is a comment.
   ###
   ```

 * **Erlang**:

   ```erlang
   %{
   This is a comment.
   %}
   ```

 * **Python**

   ```python
   """
   This is a comment.
   """
   ```

 * **Ruby**

   ```ruby
   =begin
   This is a comment.
   =end
   ```

## Installation

`npm install apidoc -g`


## Example

`apidoc -i example/ -o doc/`

Creates from input files a documentation in path `doc/`.


## Grunt Module

[grund-apidoc](https://github.com/apidoc/grunt-apidoc) `npm install grunt-apidoc`.


## Changelog

[CHANGELOG.md](https://github.com/apidoc/apidoc/blob/master/CHANGELOG.md)


## License

Copyright (c) 2013 inveris OHG
Author Peter Rottmann <rottmann@inveris.de>
Licensed under the MIT license.
