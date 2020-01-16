# apiDoc

apiDoc creates a documentation from API descriptions in your source code.

[![Build Status](https://travis-ci.org/apidoc/apidoc.svg?branch=master)](https://travis-ci.org/apidoc/apidoc)
[![Dependency Status](https://david-dm.org/apidoc/apidoc.svg)](https://david-dm.org/apidoc/apidoc)
[![NPM version](https://badge.fury.io/js/apidoc.svg)](http://badge.fury.io/js/apidoc)
[![Join the chat at https://gitter.im/apidoc/talk](https://badges.gitter.im/apidoc/talk.svg)](https://gitter.im/apidoc/talk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Documentation: [apidocjs.com](http://apidocjs.com)

[Example](http://apidocjs.com/example/) output.

## Installation

```bash
$ npm install -g apidoc
```

## Usage

Add some apidoc comments anywhere in your source code:

```java
/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
```

Now generate the documentation from `src/` into `doc/`.

```bash
$ apidoc -i src/ -o doc/
```

This repository contains and `example` folder from which you can generate a very complete documentation on an example api endpoint. It also contains best practice hints (in the `footer.md` file).

```bash
$ git clone https://github.com/apidoc/apidoc && cd apidoc
$ npm install --prod
$ ./bin/apidoc -i example -o /tmp/doc
$ $BROWSER /tmp/doc
```

## Docker image

You can use apidoc in Docker like this:

~~~bash
# first build the image after cloning this repository
docker build -t apidoc/apidoc .
# run it
docker run --rm -v $(pwd):/home/node/apidoc apidoc/apidoc -o outputdir -i inputdir
~~~

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

 * **Elixir**:

   ```elixir
   #{
   # This is a comment.
   #}
   ```

 * **Erlang**:

   ```erlang
   %{
   % This is a comment.
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

For details and an example on how to implement your own plugin, please view [apidoc-plugin-test](https://github.com/apidoc/apidoc-plugin-test).

## Support

Please [create a new issue](https://github.com/apidoc/apidoc/issues/new/choose) if you have a suggestion/question or if you found a problem/bug.

## Contributing

apiDoc is a collaborative project. Pull requests are welcome. Please see the [CONTRIBUTING](https://github.com/apidoc/apidoc/blob/master/CONTRIBUTING.md) file.

## FAQ

* [Filter for public / private API](https://github.com/apidoc/grunt-apidoc/issues/27#issuecomment-147664797)

## Build tools

* [flask-apidoc](https://pypi.python.org/pypi/flask-apidoc/) `pip install flask-apidoc`
* [grunt-apidoc](https://github.com/apidoc/grunt-apidoc) `npm install grunt-apidoc`.
* [gapidoc (gulp)](https://github.com/techgaun/gulp-apidoc) `npm install gapidoc`.
* [webpack-apidoc](https://github.com/c0b41/webpack-apidoc) `npm install --save-dev webpack-apidoc`.

## Integration

* [Eclipse Java apiDoc editor templates](https://github.com/skhani/eclipse_java_apiDoc_templates)
* [Eclipse plugin](https://github.com/DWand/eclipse_pdt_apiDoc_editor_templates)
* [Microsoft WebAPI](https://github.com/chehabz/grunt-edge-apidoc-webapi-generator)
* [Sublime Text plugin](https://github.com/DWand/ST3_apiDocAutocompletion)

## Converter

* [apidoc-swagger](https://github.com/fsbahman/apidoc-swagger)
* [gulp-apidoc-swagger](https://github.com/fsbahman/gulp-apidoc-swagger)
* [Docmaster](https://github.com/bonzzy/docmaster)
* [@rigwild/apidoc-markdown](https://github.com/rigwild/apidoc-markdown)
