# apiDoc Changelog

### 0.29.0
* Fix broken handlebar
* [DEV] add a npm run serve command
* Remove space that was added for optional params
* Make the 'optional' label unselectable (#970 by Thomas Bruun)

### 0.28.1
* Fix issue with handlebar (#967)

### 0.28.0
* Use npm lockfile v2
* Update handlebar to fix vulnerability (#962)
* Fix runtime error in single page template (#944 via #945 by Ashlanfox)
* Implement apiBody parsing into multi page template (#953 by Seth Wheeler)

### 0.27.0
* Maintain comment order for @apiParam and @apiSuccess (fix #206 via #951 by Matheus Giovani)
* Add option for JavaScript output mode (#933 by refineddigital)
* Add new configuration variable `useHostUrlAsSampleUrl` (#930) by Shivam Kumar Jha
* Add new favicon (#926 by Francisko Arenas)
* Implement apiBody parsing into single page template (#916 by Seth Wheeler)

### 0.26.0
* Clean up useless CSS rule (#923)
* Enable GitHub actions (#918 by @tommy87)
* Send sample url request to url hosting the documentation when no sampleUrl is provided in config (#915 by @thealphadollar)

### 0.25.0

* Add programmatic usage to README (#898 by rigwild)
* Fix page refresh on non ascii characters (#896)

#### 0.24.0

* Fix output when offline (#894) by @SecretAgentKen
* Increase require.js timeout (#889) by @NicolasCARPi
* Use Prism.js instead of deprecated prettify.js (#888) by @NicolasCARPi

#### 0.23.0

* Send sample request auto json body if body/json is not used but Content-Type application/json header is set (#862)
* Fix documentation not showing / Show version when withCompare is set to false (#880) Fix #879
* Add support for javascript config files (#872)
* Add support for different config files (#874)
* Fix tests for Windows (#873)
* Fix pre borders overflowing on print view (#887)

#### 0.22.1

* Fix initial jump with hashed URL (#871) by @rafaelgssa

#### 0.22.0

* Fix issue with newer api endpoint showing up on first page load (#869) by @Yopai
* Update Handlebars to latest version (fix security issue) (#867) by @NicolasCARPi
* Allow several path parameters (#866) by @rafaelgssa
* Add param file upload support (#850) by @aqnaruto

#### 0.21.0

* Add --single option to output in a single HTML file (#840) by @eyasliu

#### 0.20.1

* Avoid using container-fluid on the body if the screen is larger than 1200px (#846)

#### 0.20.0

* Add `@rigwild/apidoc-markdown` converter in README (#839)
* Add --watch command line option to generate doc if source changes (#835)
* Handle parsing of array fields (#829)
* Handle nested fields when sending the request (#828)
* Revert back the api Group/Name change in template (#821)

#### 0.19.1

* Bring back apidoc-example as devDependencies for CI
* Update apidoc-core version in package-lock.json
* Fix documentation for filter-by option (use = instead of :)
* Fix HTML after comparison (#827)

#### 0.19.0

The number of open pull requests in now 0! :D In this release you'll find one bugfix and also some new features/improvements.

* Bugfix:
  * Fix default header being sent instead of user input (#813)

* New features:
  * Add aloneDisplay config option to filter the page after clicking menu header (#820 by @sxiazb)
  * Add filtering navigation bar based on URL (#820 by @sxiazb)
  * Add dropdown box for the body parameter and modify to allow multiple params (#812 by @sxiazb)
  * Add --filter-by option (#810 by @omaretna)
  * Add possibility to define absolute url in @api (fix #201)

* Enhancements:
  * Add mjs file extension to the list of parsed files (#815 by @mons54)
  * Improve the example project
  * Don't output anything by default on CLI (fix #799)

#### 0.18.0

This release comes after more than two years without changes to the code. A lot of things were merged and fixed, so it is possible that this changelog is not entirely complete. Refer to the git log if necessary.

* Common
  * Add Docker image and improve it (#807)
  * Fix apiGroup showing instead of apiName in template
  * Add support for custom markdown parser location (#714)

* CLI
  * Add kotlin to default file-filters.
  * Escape content of success examples.

* Template
  * Update style.css to have horizontal scrolling for long URLs.
  * Add Vietnamese translation.
  * Add Turkish translation.
  * Blank optional parameters omitted from sample request.
  * Update template form parameter to be in form group (#669)
  * Improve the sorting of names (#688)
  * Avoid underscores in article titles (#764)
  * Add default value of the headers in the input (#806)
  * Add notes about Elixir (#658)
  * Send JSON body for APIs (#559)

* Maintenance
  * Update dependencies where possible

#### 0.17.5

* CLI
  * Bugfix for folder problem.


#### 0.17.4

* Parser
  * Fix missing chars in root folder.
  * Replace removed fs-extra.walkSync with klaw-sync.


#### 0.17.3

* Template
  * Fix missing lodash dependency.


#### 0.17.2

* Template
  * Fix hidden optional field.

#### 0.17.1

* Template
  * Fix missing type in template.
  * Add check for empty header/footer nav points.


#### 0.17.0

Add new [@apiDeprecated](http://apidocjs.com/#param-api-deprecated) annotation.
Add new @apiPrivate annotation.

* CLI
  * Add `--private false|true` parameter to export `@apiPrivate` marked methods.
  * Add .cls, .jsx, p, .pl, .vue file extensions.
  * Update dependencies.

* Parser
  * Add @apiDeprecated support. [52](https://github.com/apidoc/apidoc-core/pull/52)
  * Added support for private APIs `@apiPrivate`. [530](https://github.com/apidoc/apidoc/pull/530)
  * Add support for plugins in scoped modules. [51](https://github.com/apidoc/apidoc-core/pull/51)
  * Remove deprecated lib wrench and replace with fs-extra.
  * Update dependencies.

* Template
  * Update Bootstrap to 3.3.7.
  * Navigation filter added. [562](https://github.com/apidoc/apidoc/pull/562)
  * h2 links in Header / Footer files will now be visible in the main navigation. [525](https://github.com/apidoc/apidoc/pull/525)
  * Fix issue of left menu displaying major function in older version. [528](https://github.com/apidoc/apidoc/pull/528)
  * Replace lodash with only needed custom build lodash functions.
  * Update italian language file. [507](https://github.com/apidoc/apidoc/pull/507)


#### 0.16.0

Greatest improvement: Plugin support

apidoc search now in global node modules dir and local `node_modules` for modules that start with `apidoc-plugin-`. (local installed plugins have higher priority)

View / clone: [apidoc-plugin-test](https://github.com/apidoc/apidoc-plugin-test)
With a plugin you can add features like new parsers (this was possible before only with CLI param) or filters and workers.

Start adding [hooks](https://github.com/apidoc/apidoc-core/blob/master/hooks.md).
Hooks can be used in plugins to extend or transform data.

If you need a hook in apidoc-core please add your hook and provide a pull request.
How to add a hook into apidoc-core view [source code](https://github.com/apidoc/apidoc-core/blob/20921efd32f95e7934333d633c56ff6f60722123/lib/parser.js#L454-L458)

* CLI
  * Update dependencies.
  * Remove not needed js-cookie module.
  * Allow for single source configuration. [458](https://github.com/apidoc/apidoc/pull/458)

* Parser
  * Add Plugin Loader. Extend filter, parser, worker for plugin usage. [example plugin](https://github.com/apidoc/apidoc-plugin-example)
  * Add plugin hooks for found elements. [available hooks](https://github.com/apidoc/apidoc-core/hooks.md)
  * Add support for other encodings (default ist uf8).
    `apidoc --encoding utf8`
  * Add Lua support.
  * Add cpp support.
  * Add Arduino support.

* Template
  * Do not use monospace for sans-serif fonts, only code fonts.
  * Sort field by grouping. [457](https://github.com/apidoc/apidoc/pull/457)
  * Add X-UA-Compatible for Internet Explorer to prevent loading only screen.
  * Reformat JSON example output.
  * Example table column widths set to 100%.
  * Add Italian translation.


#### 0.15.1

* Parser
  * Bugfix: Inherit error of lodash merge / mergeWidth split.


#### 0.15.0

* CLI
  * Update dependencies.

* Parser
  * Upgrade markdown parser to version 0.6.

* Template
  * Make ajaxRequest simpler. [384](https://github.com/apidoc/apidoc/pull/384)
  * Format response json. [396](https://github.com/apidoc/apidoc/pull/396)
  * Improve sendSampelRequest. [400](https://github.com/apidoc/apidoc/pull/400)
  * Add Catalan translation. [403](https://github.com/apidoc/apidoc/pull/403)
  * Bugfix: zh_cn translation string. [415](https://github.com/apidoc/apidoc/pull/415)
  * Bugfix: Template break on defined prototype methods.
  * Update json response css.
  * Update webfontloader.
  * Add monospace font fallback.


#### 0.14.0

* CLI
  * Clarify that -c option must be a directory.

* Parser
  * Add support for `:` in @apiParam names.
  * Add Ruby doxygen-style support.
  * Add Groovy support.
  * Add Exlixir support.
  * Add Parameter name array syntax.
  * Add travis-ci tests for node 0.12.

* Template
  * Add semver for correct sort order. [335](https://github.com/apidoc/apidoc/issues/335)
  * Add google webfontloader to fix scrollspy position after webfont loading.
  * Add semver for correct sort order.
  * Add Spanish translation.
  * Add Chinese Simplified (zh-cn) tranlsation.
  * Update to semantic tradition Chinese words.
  * Update Polish translation.
  * Ensure params isn't empty before sending.
  * Set required defaults for sample request.
  * Bugfix: Locale don't work with pt-br. [329](https://github.com/apidoc/apidoc/issues/329)
  * Bugfix: Empty Groups for Future Versions showing when old Versions are selected. [349](https://github.com/apidoc/apidoc/issues/349)
  * Bugfix: Add path to template variable (_col1).
  * Sample requests with GET parameters need to be added to the query string.
  * Fix handle bar expression to not apply html encode for data type field.
  * Typo in header.md.


#### 0.13.2

* Parser
  * Remove p-Tags from type-Field.
  * Update dependencies.
  * Update fixtures (type-Fields and line endings).


#### 0.13.1

* Template
  * Update French and Russian translation files.


#### 0.13.0

* **Important changes**:
  * __Remove__ deprecated annotations (http://apidocjs.com/deprecated.html).
  * __Replace__ markdown parser [markdown-it](https://github.com/markdown-it/markdown-it).

* CLI
  * Add path to config file (with `-c`).
  * Add multiple input locations (with `-i`).
  * Remove markdown config parameters, for custom configurations view [MARKDOWN.md](https://github.com/apidoc/apidoc/blob/master/MARKDOWN.md).
  * Disable warning if packageJson.apidoc was defined.
  * Add litcoffee and scala file extension.

* Template
  * Add `template.forceLanguage` in `apidoc.json` to set a fixed language file without auto-detect the browser language.
  * Add word wrap for pure text examples.
  * Add Brazilian, French, Polish and Russian translation files.

* Parser
  * Remove deprecated annotations (http://apidocjs.com/deprecated.html).
  * Replace markdown parser with [markdown-it](https://github.com/markdown-it/markdown-it).
  * Add custom markdown parser support, view [MARKDOWN.md](https://github.com/apidoc/apidoc/blob/master/MARKDOWN.md) for details.
  * Add support for markdown in the type section. Example: `@apiParam {(CustomType)[http://...link-to-description.html]}`


#### 0.12.2

* CLI
  * Bugfix: Multiple bin parameters. [244](https://github.com/apidoc/apidoc/issues/244)

* Template
  * Update template vendor lib path-to-regexp.
  * Bugfix: Example overlaps navigation. [240](https://github.com/apidoc/apidoc/issues/240)

* Parser
  * Update dependencies.


#### 0.12.1

* CLI
  * Add some version information for verbose / debug output.

* Parser
  * Bugfix: Parse blocks with unknown parameters (before the block was skipped).
  * Bugfix: show correct block index.
  * Update dependencies.


#### 0.12.0

* Parser
  * Unindent strings in description fields. Mulitlines start with the same leading whitespaces. [173](https://github.com/apidoc/apidoc/pull/173)


#### 0.11.0

* CLI
  * Add parameter `--parse-languages` for custom language regex.

* Parser
  * Add Clojure parser for `.clj` files.
  * Extend parser to transfer own language regex.
  * Update apidoc-core interface (replace arguments with setters).

* Template
  * Add chinese and dutch translations files.


#### 0.10.1

* Bugfix: Path to apidoc-core.


#### 0.10.0

* __Split apidoc code__
  * [apidoc](https://github.com/apidoc/apidoc) is now only the CLI-Tool with UI-Template and file creation (as you know it).
    You can use apidoc without change anything.

  * [apidoc-core](https://github.com/apidoc/apidoc-core) (for developers) is the parser and response the api-data.

  * [apidoc-example](https://github.com/apidoc/apidoc-example) (for developers) are the test files for the [apidoc-spec](https://github.com/apidoc/apidoc-spec).

* CLI
  * Replace optimist (not maintained anymore) with nomnom:
    true / false parameters can now be used, e.g. enable markdown (default) `--markdown` or disable `--no-markdown`.
  * Add parameter `--markdown`.
  * Replace the custom Logger with [winston](https://github.com/flatiron/winston).

* Parser
  * Bugfix: Settings to enable / disable markdown (marked-gfm was previously used).

* Template
  * Add generator.url and generator.name to the footer generator information (for custom ui-generators).
  * Move handlebars_helper.js to utils/

* Common
  * Remove grunt dependencies (test run with `npm run test`).
  * Change grunt-apidoc (0.10.0) to use always the latest version of apiDoc.


#### 0.9.1

* Parser
  * Allow overwrite of packageInfo e.g. from grunt task (https://github.com/apidoc/apidoc/pull/177)

* Bugfix: Extend parser regexp to allow inline comment-code (https://github.com/apidoc/apidoc/pull/180)
* Bugfix: Slash only path in api triggered error (https://github.com/apidoc/apidoc/pull/159)
* Bugfix: Scrollspy offset (https://github.com/apidoc/apidoc/pull/176)
* Bugfix: Get package infos from package.json or apidoc.json (https://github.com/apidoc/apidoc/pull/169)


#### 0.9.0

* CLI
  * Allow to include an external file which can set the markdown settings. (https://github.com/apidoc/apidoc/pull/166)

* Template
  * Add custom order in [apidoc.json](https://github.com/apidoc/apidoc/blob/master/test/fixtures/example/apidoc.json)
    Append apiName or apiGroup in the `order` list:
    ```
    "order": [
      "MyGroupName",
      "MyParameterName",
      "MyOtherParameterName"
    ]
    ```

  * Speed up rendering of subtemplates (https://github.com/apidoc/apidoc/issues/164)
  * Bugfix: Special char doesn't show in @apiGroup. (https://github.com/apidoc/apidoc/issues/163)


#### 0.8.2

* Bugfix: apiGroupDescription from apiDefine not working. (https://github.com/apidoc/apidoc/issues/156)
* Bugfix: remove deprecated message for apiPermission. (https://github.com/apidoc/apidoc/issues/154)
* Bugfix: Testclient did not send JSON format. (https://github.com/apidoc/apidoc/issues/152)


#### 0.8.1

* Bugfix: Python regex doublequote. (https://github.com/apidoc/apidoc/issues/151)
* Bugfix: Issue with multiple apiSuccessExample blocks. (https://github.com/apidoc/apidoc/issues/150)


#### 0.8.0

* Parameter
  * __Add__ as replacement for all (now) deprecated define and structure methods:
    * `@apiDefine`
    * `@apiUse`

  * __Deprecated__:
    * `@apiDefineErrorStructure`
    * `@apiDefineHeaderStructure`
    * `@apiDefinePermission`
    * `@apiDefineStructure`
    * `@apiDefineSuccessStructure`
    * `apiErrorTitle`
    * `apiErrorStructure`
    * `apiHeaderStructure`
    * `apiHeaderTitle`
    * `apiParamTitle`
    * `apiStructure`
    * `apiSuccessTitle`
    * `apiSuccessStructure`

  * __Remove__ unneeded methods since success and error response can be grouped:
    * `@apiInfo`
    * `@apiInfoExample`
    * `@apiInfoTitle`

  * __Add__ for consistent usage:
    * `@apiHeaderExample`
    * `@apiParamExample`

  * __Change__:
    * `@apiPermission`, multiple permission usage in a block is allowed now. Permission names must be defined with @apiDefine.

  * __Extend__:
    * `@apiParam` with size and allowed values.

* CLI
  * Show deprecated message. Show details with `--debug` or `--verbose`.
  * Improved error output.
  * Turn off verbose output by default.
  * Add debug output.

* Parser
  * Ignore other doc-language @-parameters (enables jsdoc, phpdoc, ... again).
  * Add apidoc specification version to project file.
  * Correctly handle Erlang comments.
  * Bugfix: Markdown error on Empty description.
  * Revised worker preProcess / postProcess functions.
  * Change parser export names.

* Template
  * Show size and allowed values in field description.
  * Change template sample request to handle custom named groups.
  * Update template vendor files (handlebars 2, requirejs)
  * Added support for using path-to-regexp in sample request.
  * Add `jQueryAjaxSetup` to apidoc.json for setup ajax requests (http://apidocjs.com/#configuration-template-settings).
  * Hide the ul for tabs if no content.


#### 0.7.2

* Bugfix: Custom parsers not working. (https://github.com/apidoc/apidoc/issues/113)


#### 0.7.1

* Add type for `@apiExample {type} Title`, `@apiSuccessExample`, `@apiErrorExample`.
* Add type switch in template.
* Append filetype to fields at ajax reuqest testform.
* Bugfix: Same file handling with regexp under win32. (https://github.com/apidoc/apidoc/issues/109)


#### 0.7.0

* Add rudimentary support for direct api calls (test requests) from within the doc.
  * New configuration var [sampleUrl](http://apidocjs.com#configuration-settings-sample-url) for `apidoc.json`.
  * [@apiSampleRequest](http://apidocjs.com#param-api-sample-request)
* Added ability to have forward slash (/) in parameter field names.
* Add parameter `--parse` for parse only the files and return the parsed data.
* Allow perl comments between "=pod" and "=cut".


#### 0.6.5

* Bugfix: Change RegExp for parameter values to handle all chars. (https://github.com/apidoc/apidoc/issues/97)


#### 0.6.4

* Bugfix: Reserved parameter names. (https://github.com/apidoc/apidoc/issues/96)


#### 0.6.3

* Bugfix: Multiple added url to api path after compared to other version. (https://github.com/apidoc/apidoc/issues/87)


#### 0.6.2

* Bugfix: Docs do not generate without optional @api [title]. (https://github.com/apidoc/apidoc/issues/82)
* Bugfix: Escape example output in `apiExample`, `apiErrorExample`, `apiSuccessExample`. (https://github.com/apidoc/apidoc/issues/78)


#### 0.6.1

* Changing font include to work on HTTPS.
* Some refactors and bugfixes.


#### 0.6.0

* Enable markdown for all description fields.
* Add `apidoc.json` configuration file for primary configuration over `package.json`. (http://apidocjs.com/#configuration)
* Add template specific configuration settings. (http://apidocjs.com/#configuration-template-settings)
* Add support for Perl (Doxygen) comment-style.
* Add simple CSS3 preloader.


#### 0.5.2

* Add css for printing.
* Bugfix: Template IE8 compatibility. (https://github.com/apidoc/apidoc/issues/69)


#### 0.5.1

* Update node version to 0.10.x.
* Add optional custom browser title with `apidoc.title` in `package.json`.
* Add optional url endpoint with `apidoc.url` in `package.json`.
* Bugfix: Template scrollbug. (https://github.com/apidoc/apidoc/issues/64)


#### 0.5.0

* Add new Functions:
  * [@apiGroupDescription](http://apidocjs.com/#param-api-group-description)
  * [@apiHeader](http://apidocjs.com/#param-api-header)
  * [@apiHeaderTitle](http://apidocjs.com/#param-api-header-title)
  * [@apiDefineHeaderStructure](http://apidocjs.com/#param-api-define-header-structure)
  * [@apiHeaderStructure](http://apidocjs.com/#param-api-header-structure)

* Remove package.json path `apidocFilename`.
* Change package.json path `apidoc`.
* Add `apidoc.header` / `apidoc.footer` (with custom navigation titles). (http://apidocjs.com/#headerfooter)
* Remove template basic (easier to maintain), the default template will be re-designed in a future version too.
* Update template libraries.
* Add test cases.


#### 0.4.4

* Preserve other files when copying template files to the destination output dir.


#### 0.4.3

* Added a short-circuit check. (https://github.com/apidoc/apidoc/issues/41)


#### 0.4.2

* Bugfix: Fix parsing of multiline string. (https://github.com/apidoc/apidoc/issues/34)


#### 0.4.1

* Add support for CoffeeScript comment-style.


#### 0.4.0

* Add support for other comment-style. Now apiDoc supports:
  * Erlang
  * JavaScript (JavaDoc-Style: e.g. also useable in C#, Go, Dart, Java, PHP, TypeScript)
  * Python
  * Ruby

* Add some programming language test cases.
* Remove german code comments.
* Upgrade all used node modules.


#### 0.3.0

* Replace deprecated node-markdown with [marked](https://github.com/chjj/marked).
* Add cli parameter for marked `--marked-...`, watch all params with`--help`.
* Upgrade all used node modules.


#### 0.2.8

* Bugfix: executable line delimiters. (again).


#### 0.2.7

* Bugfix: Allow usage of structures and titles in the same block. (https://github.com/apidoc/apidoc/issues/21)


#### 0.2.6

* Give some indication, in case file listing with fails. (https://github.com/apidoc/apidoc/pull/20)


#### 0.2.5

* Allow multiple structure includes.
* Split and extend test-files.


#### 0.2.4

* Bugfix: Fix parsing for empty lines and removing stars on data that spans over multiple lines. (https://github.com/apidoc/apidoc/pull/11)
* Remove http:// link to make https compliant. (https://github.com/apidoc/apidoc/pull/10)


#### 0.2.3

* Extend Template with url-param "compare=1" to show the compare version on page view.
* Bugfix: Minor fix with double structure examples.


#### 0.2.2

* Bugfix: Template not show @apiSuccessExample @apiErrorExample.


#### 0.2.1

* Bugfix: executable line delimiters.


#### 0.2.0

* Extend `@apiParam`, `@apiSuccess`, `@apiError` with a grouping ability. Example `@apiParam (group) varname`.
  view [@apiParam](http://apidocjs.com/#param-api-param)

* Add new Functions:
  * [@apiParamTitle](http://apidocjs.com/#param-api-param-title)
  * [@apiSuccessTitle](http://apidocjs.com/#param-api-success-title)
  * [@apiErrorTitle](http://apidocjs.com/#param-api-error-title)

* Minor Template-Bugfixes.


#### 0.1.11

* Allow whitespace in apiName and apiGroup.
* Bugfix: Filter for directories.
* Update Node Modules to newer versions.


#### 0.1.10

* Add `-e` exclude option for Files / Directories, example `apidoc -e node_modules/`.


#### 0.1.10

* Bugfix: Check for a valid title in Template. (https://github.com/apidoc/apidoc/pull/7)


#### 0.1.9

* Bugfix: Whitespace before comment block. (https://github.com/apidoc/apidoc/pull/2)


#### 0.1.8

* Change templates, enable navigation scroll.


#### 0.1.7

* Add [@apiIgnore](http://apidocjs.com/#param-api-ignore).
* Update grunt Modules.


#### 0.1.6

* Bugfix: OSX executable.


#### 0.1.5

* Official release.
