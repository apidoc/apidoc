# apiDoc

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

 * **C#, Go, Dart, Java, JavaScript, PHP, Scala** (all DocStyle capable languages):

   ```javascript
   /**
     * This is a comment.
     */
   ```

 * **Clojure**:

   ```clojure
   ;;;;
   ;; This is a comment.
   ;;;;
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


## Build tools

* [flask-apidoc](https://pypi.python.org/pypi/flask-apidoc/) `pip install flask-apidoc`
* [grunt-apidoc](https://github.com/apidoc/grunt-apidoc) `npm install grunt-apidoc`.
* [gapidoc (gulp)](https://github.com/techgaun/gulp-apidoc) `npm install gapidoc`.
* [gulp-apidoc](https://github.com/ayhankuru/gulp-apidoc) `npm install gulp-apidoc`.
* [gulp-apidocjs](https://github.com/apriendeau/gulp-apidocjs) `npm install gulp-apidocjs`.


## Editor integration

* [Eclipse plugin](https://github.com/DWand/eclipse_pdt_apiDoc_editor_templates)
* [Sublime Text plugin](https://github.com/DWand/ST3_apiDocAutocompletion)


## Converter

* [apidoc-swagger](https://github.com/fsbahman/apidoc-swagger)
* [gulp-apidoc-swagger](https://github.com/fsbahman/gulp-apidoc-swagger)


## FAQ

* [Filter for public / private API](https://github.com/apidoc/grunt-apidoc/issues/27#issuecomment-147664797)


## Help

Please add [issues](https://github.com/apidoc/apidoc/issues) if you have a question or found a problem.
Pull requests are welcome too!

A chat about apiDoc is on [Gitter](https://gitter.im/apidoc/talk).

[![Gitter chat](https://badges.gitter.im/apidoc/talk.png)](https://gitter.im/apidoc/talk)
