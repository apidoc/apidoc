define({
  "name": "AcmeCorp Api documentation",
  "version": "0.3.0",
  "description": "Documentation for the REST api access provided at AcmeCorp",
  "title": "Custom apiDoc browser title",
  "url": "https://api.example.com",
  "sampleUrl": "https://apidoc.free.beeceptor.com",
  "header": {
    "title": "Introduction",
    "content": "Custom Markdown Parser: # Introduction\n\nThis example documentation contains all the possible configuration options for apidoc.\n\nTo generate this documentation:\n\n```bash\ngit clone https://github.com/apidoc/apidoc && cd apidoc\nnpm install --prod\n./bin/apidoc -i example -o /tmp/doc\n$BROWSER /tmp/doc\n```\n\nNote that this text is from the file \"header.md\".\n\n## <span id=\"api-example-for-a-submenu-entry\">Adding a header</span>\n\nIn your projects \"package.json\" you can set \"apidoc.header\" with a title and a filename to include this file into your documentation.\n\nThis example attempts to integrate \"header.md\" and \"footer.md\".\n\n    {\n      \"name\": \"example\",\n      \"version\": \"0.3.0\",\n      \"description\": \"apidoc example project.\",\n      \"apidoc\": {\n        \"header\": {\n          \"title\": \"Introduction\",\n          \"filename\": \"header.md\"\n        },\n        \"footer\": {\n          \"title\": \"Best practices\",\n          \"filename\": \"footer.md\"\n        }\n      }\n    }\n"
  },
  "footer": {
    "title": "Best practices",
    "content": "Custom Markdown Parser: # Best practices\n\nHere we are using the footer file to add documentation on best practices while using `apidoc`.\nThis text is from \"footer.md\" and is included the same way as the \"header.md\" file.\n\n\n\n## Define & use\n\nFor a better readability in the source code, it is recommended to use `@apiDefine` and `@apiUse` as much as possible.\n\n\n\n### Naming\n\nYou should choose a consistent naming schema, which makes it easier to understand what is defined and included.\n\nE.g. with `@apiUse LoginParam`, `@apiUse LoginError`, `@apiUse LoginSuccess` you see that parameter-, errors- and\nsuccess-fields are classified with the suffix `Param`, `Error` and `Success`.\n\n\n\n### Example for parameter\n\n```js\n/**\n * @apiDefine LoginParam\n * @apiParam {String} username Your e-mail-address.\n * @apiParam {String} password Your password.\n */\n\n/**\n * @apiDefine UserParam\n * @apiParam {String} firstname Your firstname.\n * @apiParam {String} lastname  Your lastname.\n * @apiParam {Date}   birthday  Your birthday.\n */\n\n/**\n * @api {GET} /account/register Register a new user.\n * @apiUse LoginParam\n * @apiUse UserParam\n * @apiParam {Boolean} terms Checkbox to accept the terms.\n */\n\n/**\n * @api {GET} /account/login Signin with an existing user.\n * @apiUse LoginParam\n * @apiParam {Boolean} rememberme Checkbox to auto-login on revisit.\n */\n```\nBlock 1 defines the `LoginParam` with 2 fields, which are required for register and login.\nBlock 2 defines the `UserParam` with 3 fields, which are required only for register.\nBlock 3 is the endpoint `/account/register`, which uses parameters from `LoginParam`, `UserParam` and an extra checkbox.\nBlock 4 is the endpoint `/account/login`, which use only parameters from `LoginParam` and an extra checkbox.\n\n\n\n### Example for a group\n\n```js\n/**\n * @apiDefine AccountGroup Account endpoints\n *\n * Here is the description for the \"AccountGroup\".\n * It can contain **markdown** syntax.\n */\n\n/**\n * @api {GET} /account/login Signin with an existing user.\n * @apiGroup AccountGroup\n */\n```\nBlock 1 defines the `AccountGroup` with a title and a description (the following lines).\nBlock 2 is the endpoint `/account/login`, which belongs to the group `AccountGroup` and inherit from there the title and\ndescription.\n`@apiGroup name` only inherit the title and description, while `@apiUse` would inherit all defined fields in a block.\n"
  },
  "template": {
    "withCompare": true,
    "withGenerator": true,
    "aloneDisplay": false
  },
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2021-09-04T20:07:32.495Z",
    "url": "https://apidocjs.com",
    "version": "0.30.0"
  }
});
