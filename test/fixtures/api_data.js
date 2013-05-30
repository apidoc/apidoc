define({ api: [
  {
    "type": "get",
    "url": "/test1/:id",
    "title": "Get Test 1",
    "name": "GetTest1",
    "group": "Test",
    "version": "0.1.1",
    "description": "Test Version 0.1.x\nTest some basic functions.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "param1",
            "optional": false,
            "description": "Parameter with type and description."
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
            "description": "Parameter with type, description and default value."
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
            "description": "Basic Parameter with description."
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
            "description": "Basic Parameter with description and default value."
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
            "description": "Optional basic Parameter with description."
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
            "description": "Optional basic Parameter with description and default value."
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
            "description": "Optional Parameter with type and description."
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
            "description": "Optional Parameter with type, description and default value."
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
    "filename": "test\\fixtures\\example\\example.js"
  },
  {
    "type": "get",
    "url": "/test1/:id",
    "title": "Get Test 1",
    "name": "GetTest1",
    "group": "Test",
    "version": "0.1.0",
    "description": "Test Version 0.1.x\nTest some basic functions.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "param0",
            "optional": false,
            "description": "This param is removed in 0.1.1."
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "param1",
            "optional": false,
            "description": "This is an old text."
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
            "description": "Parameter with type, description and default value."
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
            "description": "Basic Parameter with description."
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
            "description": "Basic Parameter with description and default value."
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
            "description": "Optional basic Parameter with description."
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
            "description": "Optional basic Parameter with description and default value."
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
            "description": "Optional Parameter with type and description."
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
            "description": "Optional Parameter with type, description and default value."
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
    "filename": "test\\fixtures\\example\\example.js"
  },
  {
    "type": "get",
    "url": "/test2/:id",
    "title": "Get Test 2",
    "name": "GetTest2",
    "group": "Test",
    "version": "0.2.0",
    "description": "Test Version 0.2.x\nTest Title and Grouping of param, success, error",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "param1",
            "optional": false,
            "description": "No Group, automatically set Group to \"Parameter\""
          }
        ],
        "Replace \"login\" with this text": [
          {
            "group": "login",
            "type": "String",
            "field": "param2",
            "optional": false,
            "description": "Group \"login\""
          },
          {
            "group": "login",
            "type": "String",
            "field": "param3",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "Group \"login\" with default Value"
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
            "description": "Group \"201\""
          },
          {
            "group": "201",
            "type": "String",
            "field": "success3",
            "defaultValue": "Default Value",
            "optional": true,
            "description": "Group \"201\" with default Value"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "success1",
            "optional": false,
            "description": "No Group, automatically set \"Success 200\""
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
            "description": "Group \"400\""
          }
        ],
        "401 - Oh oh, replace \"401\" with this text": [
          {
            "group": "401",
            "type": "String",
            "field": "error3",
            "optional": false,
            "description": "Group \"401\""
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "field": "error1",
            "optional": false,
            "description": "No Group automatically set \"Error 4xx\""
          }
        ]
      }
    },
    "filename": "test\\fixtures\\example\\example.js"
  }
] });