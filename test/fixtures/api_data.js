define({ api: [
  {
    "type": "post",
    "url": "/test/error",
    "title": "Multiple Error Structures",
    "name": "PostError",
    "group": "Error",
    "version": "0.1.0",
    "description": "<p>Use of multiple ErrorStructures.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "error3Error",
            "optional": false,
            "description": "<p>This is Error 3 (local).</p>"
          },
          {
            "group": "Error 4xx",
            "field": "error1Error",
            "optional": false,
            "description": "<p>This is Error 1.</p>"
          },
          {
            "group": "Error 4xx",
            "field": "error2Error",
            "optional": false,
            "description": "<p>This is Error 2.</p>"
          }
        ]
      }
    },
    "filename": "test/fixtures/example/error_structure.js"
  },
  {
    "type": "post",
    "url": "/test/title_and_error",
    "title": "Title and Structure",
    "name": "PostTitleAndError",
    "group": "Error",
    "version": "0.1.0",
    "description": "<p>Use of Title and Structures in the same block.</p>",
    "success": {
      "fields": {
        "204 No Content. Added to global namespace.": [
          {
            "group": "204",
            "field": "message",
            "optional": false,
            "description": "<p>Successfully deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "error3Error",
            "optional": false,
            "description": "<p>This is Error 3 (local).</p>"
          },
          {
            "group": "Error 4xx",
            "field": "error1Error",
            "optional": false,
            "description": "<p>This is Error 1.</p>"
          }
        ]
      }
    },
    "filename": "test/fixtures/example/title_and_structure.js"
  },
  {
    "type": "get",
    "url": "/test/escape",
    "title": "Escape Example",
    "name": "GetEscape",
    "group": "Escape",
    "version": "0.6.0",
    "description": "<p>Escape Example data.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "   curl -i http://localhost/escape/text\n   <b>curl -i http://localhost/escape/html</b>\n   <xml>curl -i http://localhost/escape/xml</xml>\n"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK {\n field_text: 'text-value',\n field_html: '<b>html-value</b>',\n field_xml: '<xml>xml-value</xml>'\n}\n"
        }
      ]
    },
    "filename": "test/fixtures/example/escape.js"
  },
  {
    "type": "get",
    "url": "/test/escape",
    "title": "Escape Example",
    "name": "GetEscape",
    "group": "Escape",
    "version": "0.5.0",
    "description": "<p>Escape Example data - with comparison.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "   curl -i http://localhost/escape/text-old\n   <b>curl -i http://localhost/escape/html-old</b>\n   <xml>curl -i http://localhost/escape/xml-old</xml>\n"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Example Response",
          "content": "HTTP/1.1 200 OK {\n field_text: 'text-value old',\n field_html: '<b>html-value old</b>',\n field_xml: '<xml>xml-value old</xml>'\n}\n"
        }
      ]
    },
    "filename": "test/fixtures/example/escape.js"
  },
  {
    "type": "get",
    "url": "/group/:id",
    "title": "Group and Description",
    "name": "GetGroup",
    "group": "Group",
    "groupDescription": "<p>This is a Group Description.Mulitline capable.</p>",
    "version": "0.5.0",
    "filename": "test/fixtures/example/group.js"
  },
  {
    "type": "get",
    "url": "/test/:id",
    "title": "Grouping",
    "name": "GetGrouping",
    "group": "Grouping",
    "version": "0.1.0",
    "description": "<p>Title and Grouping of param, success and error</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "param1",
            "optional": false,
            "description": "<p>No Group, automatically set Group to &quot;Parameter&quot;</p>"
          }
        ],
        "Replace \"login\" with this text": [
          {
            "group": "login",
            "type": "String",
            "field": "param2",
            "optional": false,
            "description": "<p>Group &quot;login&quot;</p>"
          },
          {
            "group": "login",
            "type": "String",
            "field": "param3",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Group &quot;login&quot; with default Value</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201 - Everything ok, replace \"201\" with this text.": [
          {
            "group": "201",
            "type": "String",
            "field": "success2",
            "optional": false,
            "description": "<p>Group &quot;201&quot;</p>"
          },
          {
            "group": "201",
            "type": "String",
            "field": "success3",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Group &quot;201&quot; with default Value</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "success1",
            "optional": false,
            "description": "<p>No Group, automatically set &quot;Success 200&quot;</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "String",
            "field": "error2",
            "optional": false,
            "description": "<p>Group &quot;400&quot;</p>"
          }
        ],
        "401 - Oh oh, replace \"401\" with this text": [
          {
            "group": "401",
            "type": "String",
            "field": "error3",
            "optional": false,
            "description": "<p>Group &quot;401&quot;</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "field": "error1",
            "optional": false,
            "description": "<p>No Group automatically set &quot;Error 4xx&quot;</p>"
          }
        ]
      }
    },
    "filename": "test/fixtures/example/_grouping.js"
  },
  {
    "type": "get",
    "url": "/header/:id",
    "title": "Parameters",
    "name": "GetHeader",
    "group": "Header",
    "version": "0.5.0",
    "description": "<p>Test for @apiHeader (same as @apiParam)</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "field": "header1",
            "optional": false,
            "description": "<p>Parameter with type and description.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "field": "header2",
            "optional": false,
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "field": "header3",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Parameter with type, description and default value.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "field": "header4",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          },
          {
            "group": "Header",
            "field": "header5",
            "optional": false,
            "description": "<p>Basic Parameter with description.</p>"
          },
          {
            "group": "Header",
            "field": "header6",
            "optional": false,
            "description": ""
          },
          {
            "group": "Header",
            "field": "header7",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Basic Parameter with description and default value.</p>"
          },
          {
            "group": "Header",
            "field": "header8",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          },
          {
            "group": "Header",
            "field": "header9",
            "optional": true,
            "description": "<p>Optional basic Parameter with description.</p>"
          },
          {
            "group": "Header",
            "field": "header10",
            "optional": true,
            "description": ""
          },
          {
            "group": "Header",
            "field": "header11",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Optional basic Parameter with description and default value.</p>"
          },
          {
            "group": "Header",
            "field": "header12",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "field": "header13",
            "optional": true,
            "description": "<p>Optional Parameter with type and description.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "field": "header14",
            "optional": true,
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "field": "header15",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Optional Parameter with type, description and default value.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "field": "header16",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          }
        ]
      }
    },
    "filename": "test/fixtures/example/header.js"
  },
  {
    "type": "get",
    "url": "/header/example/",
    "title": "Header Example",
    "name": "GetHeaderExample",
    "group": "Header",
    "version": "0.5.0",
    "description": "<p>Usage of @headerExample.</p>",
    "header": {
      "examples": [
        {
          "title": "An example:",
          "content": "   curl -i http://localhost/header/example/\n"
        }
      ]
    },
    "filename": "test/fixtures/example/header_example.js"
  },
  {
    "type": "get",
    "url": "/header/title/",
    "title": "Header Title",
    "name": "GetHeaderTitle",
    "group": "Header",
    "version": "0.5.0",
    "description": "<p>Usage of @headerTitle.</p>",
    "header": {
      "fields": {
        "This are the Parameters for MyGroup:": [
          {
            "group": "MyHeaderGroup",
            "field": "authorization",
            "optional": false,
            "description": "<p>The authorization code.</p>"
          },
          {
            "group": "MyHeaderGroup",
            "type": "string",
            "field": "text",
            "optional": false,
            "description": "<p>Some text.</p>"
          }
        ]
      }
    },
    "filename": "test/fixtures/example/header_title.js"
  },
  {
    "type": "post",
    "url": "/test/header",
    "title": "Header Structure",
    "name": "PostHeader",
    "group": "Header",
    "version": "0.5.0",
    "description": "<p>Use of multiple HeaderStructures.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "field": "Header3",
            "optional": false,
            "description": "<p>This is Header 3 (local).</p>"
          },
          {
            "group": "Header",
            "field": "Header1",
            "optional": false,
            "description": "<p>This is Header 1.</p>"
          },
          {
            "group": "Header",
            "field": "header2",
            "optional": false,
            "description": "<p>This is Header 2.</p>"
          }
        ]
      }
    },
    "filename": "test/fixtures/example/header_structure.js"
  },
  {
    "type": "get",
    "url": "/language/coffeescript",
    "title": "CoffeeScript",
    "name": "GetLanguageCoffeeScript",
    "group": "Language",
    "version": "0.4.0",
    "description": "<p>Test for CoffeeScript Comment-Syntax.</p>",
    "filename": "test/fixtures/example/language.coffee"
  },
  {
    "type": "get",
    "url": "/language/coffeescript/indented1",
    "title": "CoffeeScript indented 1",
    "name": "GetLanguageCoffeeScriptIndented1",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n  Line 4 indented (with tab at beginning).\n  Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.coffee"
  },
  {
    "type": "get",
    "url": "/language/coffeescript/indented2",
    "title": "CoffeeScript indented 2",
    "name": "GetLanguageCoffeeScriptIndented2",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n  Line 4 indented (with tab at beginning).\n  Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.coffee"
  },
  {
    "type": "get",
    "url": "/language/erlang",
    "title": "Erlang",
    "name": "GetLanguageErlang",
    "group": "Language",
    "version": "0.4.0",
    "description": "<p>Test for Erlang Comment-Syntax.</p>",
    "filename": "test/fixtures/example/language.erl"
  },
  {
    "type": "get",
    "url": "/language/erlang/indented1",
    "title": "Erlang indented 1",
    "name": "GetLanguageErlangIndented1",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n\t    Line 4 indented (with tab at beginning).\n    Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.erl"
  },
  {
    "type": "get",
    "url": "/language/erlang/indented2",
    "title": "Erlang indented 2",
    "name": "GetLanguageErlangIndented2",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n    Line 4 indented (with tab at beginning).\n   Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.erl"
  },
  {
    "type": "get",
    "url": "/language/javascript",
    "title": "JavaScript",
    "name": "GetLanguageJavaScript",
    "group": "Language",
    "version": "0.4.0",
    "description": "<p>Test for JavaScript Comment-Syntax.</p>",
    "filename": "test/fixtures/example/language.js"
  },
  {
    "type": "get",
    "url": "/language/javascript/indented1",
    "title": "JavaScript indented 1",
    "name": "GetLanguageJavaScriptIndented1",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n    Line 4 indented (with tab at beginning).\n   Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.js"
  },
  {
    "type": "get",
    "url": "/language/javascript/indented2",
    "title": "JavaScript indented 2",
    "name": "GetLanguageJavaScriptIndented2",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n    Line 4 indented (with tab at beginning).\n   Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.js"
  },
  {
    "type": "get",
    "url": "/language/perl",
    "title": "Perl",
    "name": "GetLanguagePerl",
    "group": "Language",
    "version": "0.4.0",
    "description": "<p>Test for Perl Comment-Syntax.</p>",
    "filename": "test/fixtures/example/language.pm"
  },
  {
    "type": "get",
    "url": "/language/perl/indented1",
    "title": "Perl indented 1",
    "name": "GetLanguagePerlIndented1",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n\tLine 4 indented (with tab at beginning).\nLine 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.pm"
  },
  {
    "type": "get",
    "url": "/language/perl/indented2",
    "title": "Perl indented 2",
    "name": "GetLanguagePerlIndented2",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n    Line 4 indented (with tab at beginning).\n   Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.pm"
  },
  {
    "type": "get",
    "url": "/language/python",
    "title": "Python",
    "name": "GetLanguagePython",
    "group": "Language",
    "version": "0.4.0",
    "description": "<p>Test for Python Comment-Syntax.</p>",
    "filename": "test/fixtures/example/language.py"
  },
  {
    "type": "get",
    "url": "/language/python/indented1",
    "title": "Python indented 1",
    "name": "GetLanguagePythonIndented1",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n  Line 4 indented (with tab at beginning).\n  Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.py"
  },
  {
    "type": "get",
    "url": "/language/python/indented2",
    "title": "Python indented 2",
    "name": "GetLanguagePythonIndented2",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n  Line 4 indented (with tab at beginning).\n  Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.py"
  },
  {
    "type": "get",
    "url": "/language/ruby",
    "title": "Ruby",
    "name": "GetLanguageRuby",
    "group": "Language",
    "version": "0.4.0",
    "description": "<p>Test for Ruby Comment-Syntax.</p>",
    "filename": "test/fixtures/example/language.rb"
  },
  {
    "type": "get",
    "url": "/language/ruby/indented1",
    "title": "Ruby indented 1",
    "name": "GetLanguageRubyIndented1",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n  Line 4 indented (with tab at beginning).\n  Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.rb"
  },
  {
    "type": "get",
    "url": "/language/ruby/indented2",
    "title": "Ruby indented 2",
    "name": "GetLanguageRubyIndented2",
    "group": "Language",
    "version": "0.4.0",
    "examples": [
      {
        "title": "Test for indented comment.",
        "content": "This is example line 2.\nThis is example line 3.\n  Line 4 indented (with tab at beginning).\n  Line 5 indented.\nThis is example line 6.\n"
      }
    ],
    "filename": "test/fixtures/example/language.rb"
  },
  {
    "type": "get",
    "url": "/markdown/:id",
    "title": "Markdown",
    "name": "GetMarkdown",
    "group": "Markdown",
    "version": "0.6.0",
    "description": "<p>Enable markdown for all description fields.</p><p>This <strong>text</strong> is in a <strong>separate</strong> p.</p><ul><li>List 1</li><li>List 2</li></ul><p>Multiline markdown text, output in one line.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "param1",
            "optional": false,
            "description": "<p>This is a markdown <strong>apiParam</strong></p><p>Separate line.</p>"
          }
        ]
      }
    },
    "filename": "test/fixtures/example/markdown.js"
  },
  {
    "type": "get",
    "url": "/param/:id",
    "title": "Parameters",
    "name": "GetParam",
    "group": "Param",
    "version": "0.1.1",
    "description": "<p>Parameters and different Versions: 0.1.1</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "param1",
            "optional": false,
            "description": "<p>Parameter with type and description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param2",
            "optional": false,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param3",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Parameter with type, description and default value.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param4",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "field": "param5",
            "optional": false,
            "description": "<p>Basic Parameter with description.</p>"
          },
          {
            "group": "Parameter",
            "field": "param6",
            "optional": false,
            "description": ""
          },
          {
            "group": "Parameter",
            "field": "param7",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Basic Parameter with description and default value.</p>"
          },
          {
            "group": "Parameter",
            "field": "param8",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "field": "param9",
            "optional": true,
            "description": "<p>Optional basic Parameter with description.</p>"
          },
          {
            "group": "Parameter",
            "field": "param10",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "field": "param11",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Optional basic Parameter with description and default value.</p>"
          },
          {
            "group": "Parameter",
            "field": "param12",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param13",
            "optional": true,
            "description": "<p>Optional Parameter with type and description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param14",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param15",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Optional Parameter with type, description and default value.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param16",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          }
        ]
      }
    },
    "filename": "test/fixtures/example/param.js"
  },
  {
    "type": "get",
    "url": "/param/:id",
    "title": "Parameters",
    "name": "GetParam",
    "group": "Param",
    "version": "0.1.0",
    "description": "<p>Parameters and different Versions: 0.1.0</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "param0",
            "optional": false,
            "description": "<p>This param is removed in 0.1.1.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param1",
            "optional": false,
            "description": "<p>This is an old text.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param2",
            "optional": false,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param3",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Parameter with type, description and default value.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param4",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "field": "param5",
            "optional": false,
            "description": "<p>Basic Parameter with description.</p>"
          },
          {
            "group": "Parameter",
            "field": "param6",
            "optional": false,
            "description": ""
          },
          {
            "group": "Parameter",
            "field": "param7",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Basic Parameter with description and default value.</p>"
          },
          {
            "group": "Parameter",
            "field": "param8",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "field": "param9",
            "optional": true,
            "description": "<p>Optional basic Parameter with description.</p>"
          },
          {
            "group": "Parameter",
            "field": "param10",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "field": "param11",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Optional basic Parameter with description and default value.</p>"
          },
          {
            "group": "Parameter",
            "field": "param12",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param13",
            "optional": true,
            "description": "<p>Optional Parameter with type and description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param14",
            "optional": true,
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param15",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "<p>Optional Parameter with type, description and default value.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param16",
            "defaultValue": "Default Value",
            "optional": true,
            "description": ""
          }
        ]
      }
    },
    "filename": "test/fixtures/example/param.js"
  },
  {
    "type": "post",
    "url": "/test/structure",
    "title": "Multiple Structures",
    "name": "PostStructure",
    "group": "Structure",
    "version": "0.1.0",
    "description": "<p>Use of multiple Structures.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "field": "field3",
            "optional": false,
            "description": "<p>This is Field 3 (local).</p>"
          },
          {
            "group": "Parameter",
            "field": "field1",
            "optional": false,
            "description": "<p>This is Field 1.</p>"
          },
          {
            "group": "Parameter",
            "field": "field2",
            "optional": false,
            "description": "<p>This is Field 2.</p>"
          }
        ]
      }
    },
    "filename": "test/fixtures/example/structure.js"
  },
  {
    "type": "post",
    "url": "/test/success",
    "title": "Multiple Success Structures",
    "name": "PostSuccess",
    "group": "Success",
    "version": "0.1.0",
    "description": "<p>Use of multiple SuccessStructures.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "field": "success3",
            "optional": false,
            "description": "<p>This is Success 3 (local).</p>"
          },
          {
            "group": "Success 200",
            "field": "success1",
            "optional": false,
            "description": "<p>This is Success 1.</p>"
          },
          {
            "group": "Success 200",
            "field": "success2",
            "optional": false,
            "description": "<p>This is Success 2.</p>"
          }
        ]
      }
    },
    "filename": "test/fixtures/example/success_structure.js"
  },
  {
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "error1Error",
            "optional": false,
            "description": "<p>This is Error 1.</p>"
          }
        ]
      }
    },
    "group": "error_structure_js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "test/fixtures/example/error_structure.js"
  },
  {
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "error2Error",
            "optional": false,
            "description": "<p>This is Error 2.</p>"
          }
        ]
      }
    },
    "group": "error_structure_js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "test/fixtures/example/error_structure.js"
  },
  {
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "field": "header2",
            "optional": false,
            "description": "<p>This is Header 2.</p>"
          }
        ]
      }
    },
    "group": "header_structure_js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "test/fixtures/example/header_structure.js"
  },
  {
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "field": "Header1",
            "optional": false,
            "description": "<p>This is Header 1.</p>"
          }
        ]
      }
    },
    "group": "header_structure_js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "test/fixtures/example/header_structure.js"
  },
  {
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "field": "field1",
            "optional": false,
            "description": "<p>This is Field 1.</p>"
          }
        ]
      }
    },
    "group": "structure_js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "test/fixtures/example/structure.js"
  },
  {
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "field": "field2",
            "optional": false,
            "description": "<p>This is Field 2.</p>"
          }
        ]
      }
    },
    "group": "structure_js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "test/fixtures/example/structure.js"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "field": "success1",
            "optional": false,
            "description": "<p>This is Success 1.</p>"
          }
        ]
      }
    },
    "group": "success_structure_js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "test/fixtures/example/success_structure.js"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "field": "success2",
            "optional": false,
            "description": "<p>This is Success 2.</p>"
          }
        ]
      }
    },
    "group": "success_structure_js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "test/fixtures/example/success_structure.js"
  },
  {
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "error1Error",
            "optional": false,
            "description": "<p>This is Error 1.</p>"
          }
        ]
      }
    },
    "group": "title_and_structure_js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "test/fixtures/example/title_and_structure.js"
  }
] });