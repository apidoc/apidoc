# apiDoc Changelog

#### 0.4.2
Fix parsing of multiline string (Alexander Else https://github.com/apidoc/apidoc/issues/34)

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
Bugfix: Allow usage of structures and titles in the same block (https://github.com/apidoc/apidoc/issues/21)

#### 0.2.6
Give some indication, in case file listing with fails (Johannes Zellner https://github.com/apidoc/apidoc/pull/20)

#### 0.2.5
Allow multiple structure includes.
Split and extend test-files.

#### 0.2.4
Fix parsing for empty lines and removing stars on data that spans over multiple lines. (Martin Jonsson https://github.com/apidoc/apidoc/pull/11)
Remove http:// link to make https compliant. (Thomas Schaaf https://github.com/apidoc/apidoc/pull/10)

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
Bugfix filter for directories.
Update Node Modules to newer versions.

#### 0.1.10
Add `-e` exclude option for Files / Directories, example `apidoc -e node_modules/`.

#### 0.1.10
Bugfix: check for a valid title in Template (Ben S. Stahlhood II https://github.com/apidoc/apidoc/pull/7)

#### 0.1.9
Bugfix: Whitespace before comment block (Brandon Hamilton https://github.com/apidoc/apidoc/pull/2)

#### 0.1.8
Change templates, enable navigation scroll.

#### 0.1.7
Add [@apiIgnore](http://apidocjs.com/#param-api-ignore).
Update grunt Modules.

#### 0.1.6
Bugfix: OSX executable

#### 0.1.5
Official release
