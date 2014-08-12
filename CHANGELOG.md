# apiDoc Changelog

#### 0.6.5

Bugfix: Change RegExp for parameter values to handle all chars. (https://github.com/apidoc/apidoc/issues/97)


#### 0.6.4

Bugfix: Reserved parameter names. (https://github.com/apidoc/apidoc/issues/96)


#### 0.6.3

Bugfix: Multiple added url to api path after compared to other version. (https://github.com/apidoc/apidoc/issues/87)


#### 0.6.2

Bugfix: Docs do not generate without optional @api [title]. (https://github.com/apidoc/apidoc/issues/82)

Bugfix: Escape example output in `apiExample`, `apiErrorExample`, `apiSuccessExample`. (https://github.com/apidoc/apidoc/issues/78)


#### 0.6.1

Changing font include to work on HTTPS.

Some refactors and bugfixes.


#### 0.6.0

Enable markdown for all description fields.

Add `apidoc.json` configuration file for primary configuration over `package.json`. (http://apidocjs.com/#configuration)

Add template specific configuration settings. (http://apidocjs.com/#configuration-template-settings)

Add support for Perl (Doxygen) comment-style.

Add simple CSS3 preloader.


#### 0.5.2

Add css for printing.

Bugfix: Template IE8 compatibility. (https://github.com/apidoc/apidoc/issues/69)


#### 0.5.1

Update node version to 0.10.x.

Add optional custom browser title with `apidoc.title` in `package.json`.
 
Add optional url endpoint with `apidoc.url` in `package.json`.

Bugfix: Template scrollbug. (https://github.com/apidoc/apidoc/issues/64)


#### 0.5.0

Add new Functions:
* [@apiGroupDescription](http://apidocjs.com/#param-api-group-description)
* [@apiHeader](http://apidocjs.com/#param-api-header)
* [@apiHeaderTitle](http://apidocjs.com/#param-api-header-title)
* [@apiDefineHeaderStructure](http://apidocjs.com/#param-api-define-header-structure)
* [@apiHeaderStructure](http://apidocjs.com/#param-api-header-structure)

Remove package.json path `apidocFilename`.

Change package.json path `apidoc`.

Add `apidoc.header` / `apidoc.footer` (with custom navigation titles). (http://apidocjs.com/#headerfooter)

Remove template basic (easier to maintain), the default template will be re-designed in a future version too.

Update template libraries.

Add test cases.


#### 0.4.4

Preserve other files when copying template files to the destination output dir.


#### 0.4.3

Added a short-circuit check. (https://github.com/apidoc/apidoc/issues/41)


#### 0.4.2

Bugfix: Fix parsing of multiline string. (https://github.com/apidoc/apidoc/issues/34)


#### 0.4.1

Add support for CoffeeScript comment-style. 


#### 0.4.0

Add support for other comment-style. Now apiDoc supports:
* Erlang
* JavaScript (JavaDoc-Style: e.g. also useable in C#, Go, Dart, Java, PHP, TypeScript)
* Python
* Ruby

Add some programming language test cases.

Remove german code comments.

Upgrade all used node modules.


#### 0.3.0

Replace deprecated node-markdown with [marked](https://github.com/chjj/marked).

Add cli parameter for marked `--marked-...`, watch all params with`--help`.

Upgrade all used node modules.


#### 0.2.8

Bugfix: executable line delimiters. (again).


#### 0.2.7

Bugfix: Allow usage of structures and titles in the same block. (https://github.com/apidoc/apidoc/issues/21)


#### 0.2.6

Give some indication, in case file listing with fails. (https://github.com/apidoc/apidoc/pull/20)


#### 0.2.5

Allow multiple structure includes.

Split and extend test-files.


#### 0.2.4

Bugfix: Fix parsing for empty lines and removing stars on data that spans over multiple lines. (https://github.com/apidoc/apidoc/pull/11)

Remove http:// link to make https compliant. (https://github.com/apidoc/apidoc/pull/10)


#### 0.2.3

Extend Template with url-param "compare=1" to show the compare version on page view.

Bugfix: Minor fix with double structure examples.


#### 0.2.2

Bugfix: Template not show @apiSuccessExample @apiErrorExample.


#### 0.2.1

Bugfix: executable line delimiters.


#### 0.2.0

Extend `@apiParam`, `@apiSuccess`, `@apiError` with a grouping ability. Example `@apiParam (group) varname`.

view [@apiParam](http://apidocjs.com/#param-api-param)

Add new Functions:
* [@apiParamTitle](http://apidocjs.com/#param-api-param-title)
* [@apiSuccessTitle](http://apidocjs.com/#param-api-success-title)
* [@apiErrorTitle](http://apidocjs.com/#param-api-error-title)

Minor Template-Bugfixes.


#### 0.1.11

Allow whitespace in apiName and apiGroup.

Bugfix: Filter for directories.

Update Node Modules to newer versions.


#### 0.1.10

Add `-e` exclude option for Files / Directories, example `apidoc -e node_modules/`.


#### 0.1.10

Bugfix: Check for a valid title in Template. (https://github.com/apidoc/apidoc/pull/7)


#### 0.1.9

Bugfix: Whitespace before comment block. (https://github.com/apidoc/apidoc/pull/2)


#### 0.1.8

Change templates, enable navigation scroll.


#### 0.1.7

Add [@apiIgnore](http://apidocjs.com/#param-api-ignore).

Update grunt Modules.


#### 0.1.6

Bugfix: OSX executable.


#### 0.1.5

Official release.
