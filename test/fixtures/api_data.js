define({ api: [
  {
    "type": "get",
    "url": "/log/:id",
    "title": "Get",
    "description": "Daten eines Logs laden.",
    "version": "0.2.0",
    "permission": "none",
    "parameter": {
      "fields": [
        {
          "type": "String",
          "field": "param1",
          "optional": false,
          "description": "Beschreibung Param1"
        },
        {
          "type": "String",
          "field": "param2",
          "optional": false
        },
        {
          "type": "String",
          "field": "param3",
          "defaultValue": "Default Value",
          "optional": true,
          "description": "Beschreibung Param3"
        },
        {
          "type": "String",
          "field": "param4",
          "defaultValue": "Default Value",
          "optional": true
        }
      ]
    },
    "group": "example.js",
    "filename": "test/fixtures/example/example.js"
  }
] });