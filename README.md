# apiDoc

Generates a RESTful web API Documentation.

[![Build Status](https://travis-ci.org/apidoc/apidoc.svg?branch=master)](https://travis-ci.org/apidoc/apidoc)
[![Dependency Status](https://david-dm.org/apidoc/apidoc.svg)](https://david-dm.org/apidoc/apidoc)
[![NPM version](https://badge.fury.io/js/apidoc.svg)](http://badge.fury.io/js/apidoc)

**Changes from previous version visit [CHANGELOG.md](https://github.com/apidoc/apidoc/blob/master/CHANGELOG.md)**

apiDoc creates a documentation from API descriptions in your source code.

Documentation at [apidocjs.com](http://apidocjs.com) or as [Docset](https://github.com/pfefferle/dash-apidoc).

[Example](http://apidocjs.com/example/) output.


## HELP NEEDED! Search for a Developer

Because of my limited time i need one or more devs that could build and maintain a "Send Sample Request Plugin".

The Plugin should be loose coupled to the template, so it should be a separate project.
This Plugin should send example data to an API-Endpoint and process the response. Supported formats should be JSON, XML, whatever.

Many issues belong to the current (unmaintained) plugin, (Milestone: Send Sample Request Plugin)(https://github.com/apidoc/apidoc/milestone/4)
If you want ot work on this, please send me a PM.


## Installation

```console
$ npm install apidoc -g
```

### Alternative docker install

```console
$ docker pull apidoc/apidoc
```

Then you will need to mount your file storage `-v '<apidoc.json dir>:/apidoc'` to docker container.

Example:

```console
$ docker run --rm -v '$(PWD):/apidoc' -it apidoc/apidoc \
    --input ./example \
    --output ./docker-example \
    -v
```

Creates from input files in `example/` a documentation in path `docker-example/`.

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

```console
$ apidoc -i example/ -o doc/
```

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

## Plugins (extend apiDoc)

apiDoc will auto include installed plugins.

 * [apidoc-plugin-schema](https://github.com/willfarrell/apidoc-plugin-schema) Generates and inject apidoc elements from api schemas. `npm install apidoc-plugin-schema`


## Build tools

* [flask-apidoc](https://pypi.python.org/pypi/flask-apidoc/) `pip install flask-apidoc`
* [grunt-apidoc](https://github.com/apidoc/grunt-apidoc) `npm install grunt-apidoc`.
* [gapidoc (gulp)](https://github.com/techgaun/gulp-apidoc) `npm install gapidoc`.
* [gulp-apidoc](https://github.com/ayhankuru/gulp-apidoc) `npm install gulp-apidoc`.
* [gulp-apidocjs](https://github.com/apriendeau/gulp-apidocjs) `npm install gulp-apidocjs`.


## Integration

* [Eclipse Java apiDoc editor templates](https://github.com/skhani/eclipse_java_apiDoc_templates)
* [Eclipse plugin](https://github.com/DWand/eclipse_pdt_apiDoc_editor_templates)
* [Microsoft WebAPI](https://github.com/chehabz/grunt-edge-apidoc-webapi-generator)
* [Sublime Text plugin](https://github.com/DWand/ST3_apiDocAutocompletion)


## Converter

* [apidoc-swagger](https://github.com/fsbahman/apidoc-swagger)
* [gulp-apidoc-swagger](https://github.com/fsbahman/gulp-apidoc-swagger)
* [Docmaster](https://github.com/bonzzy/docmaster)

## FAQ

* [Filter for public / private API](https://github.com/apidoc/grunt-apidoc/issues/27#issuecomment-147664797)


## Extend apiDoc and write your own Plugin

For details and an example view [apidoc-plugin-test](https://github.com/apidoc/apidoc-plugin-test)


## Help

Please add [issues](https://github.com/apidoc/apidoc/issues) if you have a question or found a problem.
Pull requests are welcome too!

A chat about apiDoc is on [Gitter](https://gitter.im/apidoc/talk).

[![Gitter chat](https://badges.gitter.im/apidoc/talk.png)](https://gitter.im/apidoc/talk)
