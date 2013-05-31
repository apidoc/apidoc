# apiDoc Changelog

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