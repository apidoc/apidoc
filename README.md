# apiDoc 0.9.x

Generates a RESTful web API Documentation.

[![Build Status](https://travis-ci.org/apidoc/apidoc.svg?branch=master)](https://travis-ci.org/apidoc/apidoc)
[![Dependency Status](https://david-dm.org/apidoc/apidoc.svg)](https://david-dm.org/apidoc/apidoc)
[![NPM version](https://badge.fury.io/js/apidoc.svg)](http://badge.fury.io/js/apidoc)

**Changes from previous version visit [CHANGELOG.md](https://github.com/apidoc/apidoc/blob/master/CHANGELOG.md)**

apiDoc creates a documentation from API descriptions in your source code.

Documentation at [apidocjs.com](http://apidocjs.com).

[Example](http://apidocjs.com/example/) output.


## Installation

`npm install apidoc -g`


## Changelog

[CHANGELOG.md](https://github.com/apidoc/apidoc/blob/master/CHANGELOG.md)


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


More examples and best practice hints: [EXAMPLES.md](https://github.com/apidoc/apidoc/blob/master/EXAMPLES.md)


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

 * **Perl**

   ```perl
   #**
   # This is a comment.
   #*
   ```

   ```perl
   =pod
   This is a comment.
   =cut
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


## Help

Please add [issues](https://github.com/apidoc/apidoc/issues) if you have a question or found a problem.
Pull requests are welcome too!

A chat about apiDoc is on [Gitter](https://gitter.im/apidoc/talk).

[![Gitter chat](https://badges.gitter.im/apidoc/talk.png)](https://gitter.im/apidoc/talk)


## License

Copyright (c) 2013-2014 inveris OHG

Author Peter Rottmann <rottmann@inveris.de>

Licensed under the MIT license.
