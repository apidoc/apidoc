define({ "api": [
  {
    "type": "delete",
    "url": "/user/:id",
    "title": "Delete user",
    "version": "0.3.0",
    "name": "DeleteUser",
    "group": "User",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "Custom Markdown Parser: Optionally you can write here further Informations about the permission.  An \"apiDefinePermission\"-block can have an \"apiVersion\", so you can attach the block to a specific version."
      }
    ],
    "description": "Custom Markdown Parser: Be careful! This will remove all the data associated with that user!",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "Custom Markdown Parser: The token can be generated from your user profile."
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: token 5f048fe\"",
          "type": "Header"
        }
      ]
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "id",
        "description": "Custom Markdown Parser: <code>id</code> of the user."
      }
    ],
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -X DELETE -H \"Authorization: token 5f048fe\" -i https://api.example.com/user/4711",
        "type": "bash"
      },
      {
        "title": "Javascript example",
        "content": "const client = AcmeCorpApi('5f048fe');\nconst user = client.deleteUser(42);",
        "type": "js"
      },
      {
        "title": "Python example",
        "content": "client = AcmeCorpApi.Client(token=\"5f048fe\")\nuser = client.delete_user(42)",
        "type": "python"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "result",
            "description": "Custom Markdown Parser: <code>ok</code> if everything went fine."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"result\": \"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "Custom Markdown Parser: Only authenticated Admins can access the data."
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "Custom Markdown Parser: The <code>id</code> of the User was not found."
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "InternalServerError",
            "description": "Custom Markdown Parser: The server encountered an internal error."
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"error\": \"NoAccessRight\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "example/example.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://apidoc.free.beeceptor.com/user/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Read data of a User",
    "version": "0.3.0",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "Custom Markdown Parser: Optionally you can write here further Informations about the permission.  An \"apiDefinePermission\"-block can have an \"apiVersion\", so you can attach the block to a specific version."
      }
    ],
    "description": "Custom Markdown Parser: Compare version 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "Custom Markdown Parser: The token can be generated from your user profile."
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: token 5f048fe\"",
          "type": "Header"
        }
      ]
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "id",
        "description": "Custom Markdown Parser: The Users-ID."
      }
    ],
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -H \"Authorization: token 5f048fe\" -i https://api.example.com/user/4711",
        "type": "bash"
      },
      {
        "title": "Javascript example",
        "content": "const client = AcmeCorpApi('5f048fe');\nconst user = client.getUser(42);",
        "type": "js"
      },
      {
        "title": "Python example",
        "content": "client = AcmeCorpApi.Client(token=\"5f048fe\")\nuser = client.get_user(42)",
        "type": "python"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: Number",
            "optional": false,
            "field": "id",
            "description": "Custom Markdown Parser: The Users-ID."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: Date",
            "optional": false,
            "field": "registered",
            "description": "Custom Markdown Parser: Registration Date."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "name",
            "description": "Custom Markdown Parser: Fullname of the User."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: String[]",
            "optional": false,
            "field": "nicknames",
            "description": "Custom Markdown Parser: List of Users nicknames (Array of Strings)."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: Object",
            "optional": false,
            "field": "profile",
            "description": "Custom Markdown Parser: Profile data (example for an Object)"
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: Number",
            "optional": false,
            "field": "profile.age",
            "description": "Custom Markdown Parser: Users age."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "profile.image",
            "description": "Custom Markdown Parser: Avatar-Image."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: Object[]",
            "optional": false,
            "field": "options",
            "description": "Custom Markdown Parser: List of Users options (Array of Objects)."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "options.name",
            "description": "Custom Markdown Parser: Option Name."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "options.value",
            "description": "Custom Markdown Parser: Option Value."
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "Custom Markdown Parser: Only authenticated Admins can access the data."
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "Custom Markdown Parser: The <code>id</code> of the User was not found."
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "InternalServerError",
            "description": "Custom Markdown Parser: The server encountered an internal error"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"error\": \"NoAccessRight\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "example/example.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://apidoc.free.beeceptor.com/user/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Read data of a User",
    "version": "0.2.0",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "Custom Markdown Parser: Here you can describe the function. Multilines are possible.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "id",
            "description": "Custom Markdown Parser: The Users-ID."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "id",
            "description": "Custom Markdown Parser: The Users-ID."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: Date",
            "optional": false,
            "field": "name",
            "description": "Custom Markdown Parser: Fullname of the User."
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "Custom Markdown Parser: The <code>id</code> of the User was not found."
          }
        ]
      }
    },
    "filename": "example/_apidoc.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://apidoc.free.beeceptor.com/user/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Read data of a User",
    "version": "0.1.0",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "admin",
        "title": "This title is visible in version 0.1.0 and 0.2.0",
        "description": ""
      }
    ],
    "description": "Custom Markdown Parser: Here you can describe the function. Multilines are possible.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "id",
            "description": "Custom Markdown Parser: The Users-ID."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "id",
            "description": "Custom Markdown Parser: The Users-ID."
          },
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: Date",
            "optional": false,
            "field": "name",
            "description": "Custom Markdown Parser: Fullname of the User."
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "Custom Markdown Parser: The error description text in version 0.1.0."
          }
        ]
      }
    },
    "filename": "example/_apidoc.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://apidoc.free.beeceptor.com/user/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Create a new User",
    "version": "0.3.0",
    "name": "PostUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "Custom Markdown Parser: In this case \"apiErrorStructure\" is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.",
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "Custom Markdown Parser: Name of the User."
      }
    ],
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "age",
        "description": "Custom Markdown Parser: Age of the User"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: Number",
            "optional": false,
            "field": "id",
            "description": "Custom Markdown Parser: The new Users-ID."
          }
        ]
      }
    },
    "filename": "example/example.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://apidoc.free.beeceptor.com/user"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "Custom Markdown Parser: Only authenticated Admins can access the data."
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNameTooShort",
            "description": "Custom Markdown Parser: Minimum of 5 characters required."
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"UserNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Create a User",
    "version": "0.2.0",
    "name": "PostUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "Custom Markdown Parser: In this case \"apiErrorStructure\" is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "name",
            "description": "Custom Markdown Parser: Name of the User."
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "id",
            "description": "Custom Markdown Parser: The Users-ID."
          }
        ]
      }
    },
    "filename": "example/_apidoc.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://apidoc.free.beeceptor.com/user"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "Custom Markdown Parser: Only authenticated Admins can access the data."
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNameTooShort",
            "description": "Custom Markdown Parser: Minimum of 5 characters required."
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"UserNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "Change a User",
    "version": "0.3.0",
    "name": "PutUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "Custom Markdown Parser: This function has same errors like POST /user, but errors not defined again, they were included with \"apiErrorStructure\"",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Custom Markdown Parser: String",
            "optional": false,
            "field": "name",
            "description": "Custom Markdown Parser: Name of the User."
          },
          {
            "group": "Parameter",
            "type": "Custom Markdown Parser: File",
            "optional": false,
            "field": "avatar",
            "description": "Custom Markdown Parser: Upload avatar."
          }
        ]
      }
    },
    "filename": "example/example.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://apidoc.free.beeceptor.com/user/:id"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "Custom Markdown Parser: Only authenticated Admins can access the data."
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNameTooShort",
            "description": "Custom Markdown Parser: Minimum of 5 characters required."
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"UserNameTooShort\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/user/:id",
    "title": "Thank a user: this is quite a long name indeed",
    "version": "0.3.0",
    "name": "ThankUser",
    "group": "User",
    "description": "Custom Markdown Parser: This is here to have a long name in the left menu.",
    "filename": "example/example.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "https://apidoc.free.beeceptor.com/user/:id"
      }
    ]
  }
] });
