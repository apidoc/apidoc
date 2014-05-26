# apiDoc 0.4.x

Generates a RESTful web API Documentation.

Documentation at [apidocjs.com](http://apidocjs.com).

[Example](http://apidocjs.com/example/) output.


## Installation

`npm install apidoc -g`


## Example

   ```javascript
/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
   ```

`apidoc -i example/ -o doc/`

Creates from input files in `example/` a documentation in path `doc/`.


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


## Grunt Module

[grunt-apidoc](https://github.com/apidoc/grunt-apidoc) `npm install grunt-apidoc`.


## Changelog

[CHANGELOG.md](https://github.com/apidoc/apidoc/blob/master/CHANGELOG.md)


## License

Copyright (c) 2013 inveris OHG
Author Peter Rottmann <rottmann@inveris.de>
Licensed under the MIT license.
