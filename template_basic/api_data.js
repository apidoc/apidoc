define({ api:
[
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Read data of a User",
    "version": "0.3.0",
    "name": "GetUser",
    "group": "User",
    "permission": {
      "name": "admin",
      "title": "Admin access rights needed. ",
      "description": "Optionally you can write here further Informations about the permission.\nAn \"apiDefinePermission\"-block can have an \"apiVersion\", so you can attach the block to a specific version.\n"
    },
    "description": "Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.",
    "parameter": {
      "fields": [
        {
          "type": "String",
          "field": "id",
          "optional": false,
          "description": "The Users-ID."
        }
      ]
    },
    "success": {
      "fields": [
        {
          "type": "String",
          "field": "id",
          "optional": false,
          "description": "The Users-ID."
        },
        {
          "type": "Date",
          "field": "registered",
          "optional": false,
          "description": "Registration Date."
        },
        {
          "type": "Date",
          "field": "name",
          "optional": false,
          "description": "Fullname of the User."
        }
      ]
    },
    "error": {
      "fields": [
        {
          "field": "NoAccessRight",
          "optional": false,
          "description": "Only authenticated Admins can access the data."
        },
        {
          "field": "UserNotFound",
          "optional": false,
          "description": "The <code>id</code> of the User was not found."
        }
      ],
      "examples": [
        {
          "title": "Response (example):",
          "content": "   HTTP/1.1 401 Not Authenticated\n   {\n     \"error\": \"NoAccessRight\"\n   }\n"
        }
      ]
    },
    "filename": "./example/example.js"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Read data of a User",
    "version": "0.2.0",
    "name": "GetUser",
    "group": "User",
    "permission": {
      "name": "admin",
      "title": "This title is visible in version 0.1.0 and 0.2.0",
      "description": ""
    },
    "description": "Here you can describe the function.\nMultilines are possible.",
    "parameter": {
      "fields": [
        {
          "type": "String",
          "field": "id",
          "optional": false,
          "description": "The Users-ID."
        }
      ]
    },
    "success": {
      "fields": [
        {
          "type": "String",
          "field": "id",
          "optional": false,
          "description": "The Users-ID."
        },
        {
          "type": "Date",
          "field": "name",
          "optional": false,
          "description": "Fullname of the User."
        }
      ]
    },
    "error": {
      "fields": [
        {
          "field": "UserNotFound",
          "optional": false,
          "description": "The <code>id</code> of the User was not found."
        }
      ]
    },
    "filename": "./example/example.js"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Read data of a User",
    "version": "0.1.0",
    "name": "GetUser",
    "group": "User",
    "permission": {
      "name": "admin",
      "title": "This title is visible in version 0.1.0 and 0.2.0",
      "description": ""
    },
    "description": "Here you can describe the function.\nMultilines are possible.",
    "parameter": {
      "fields": [
        {
          "type": "String",
          "field": "id",
          "optional": false,
          "description": "The Users-ID."
        }
      ]
    },
    "success": {
      "fields": [
        {
          "type": "String",
          "field": "id",
          "optional": false,
          "description": "The Users-ID."
        },
        {
          "type": "Date",
          "field": "name",
          "optional": false,
          "description": "Fullname of the User."
        }
      ]
    },
    "error": {
      "fields": [
        {
          "field": "UserNotFound",
          "optional": false,
          "description": "The error description text in version 0.1.0."
        }
      ]
    },
    "filename": "./example/example.js"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Create a new User",
    "version": "0.3.0",
    "name": "PostUser",
    "group": "User",
    "permission": "none",
    "description": "In this case \"apiErrorStructure\" is defined and used.\nDefine blocks with params that will be used in several functions, so you dont have to rewrite them.",
    "parameter": {
      "fields": [
        {
          "type": "String",
          "field": "name",
          "optional": false,
          "description": "Name of the User."
        }
      ]
    },
    "success": {
      "fields": [
        {
          "type": "String",
          "field": "id",
          "optional": false,
          "description": "The new Users-ID."
        }
      ]
    },
    "error": {
      "fields": [
        {
          "field": "NoAccessRight",
          "optional": false,
          "description": "Only authenticated Admins can access the data."
        },
        {
          "field": "UserNameTooShort",
          "optional": false,
          "description": "Minimum of 5 characters required."
        }
      ],
      "examples": [
        {
          "title": " Response (example):",
          "content": "   HTTP/1.1 401 Not Authenticated\n   {\n     \"error\": \"UserNameTooShort\"\n   }\n"
        }
      ]
    },
    "filename": "./example/example.js"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Create a User",
    "version": "0.2.0",
    "name": "PostUser",
    "group": "User",
    "permission": "none",
    "description": "In this case \"apiErrorStructure\" is defined and used.\nDefine blocks with params that will be used in several functions, so you dont have to rewrite them.",
    "parameter": {
      "fields": [
        {
          "type": "String",
          "field": "name",
          "optional": false,
          "description": "Name of the User."
        }
      ]
    },
    "success": {
      "fields": [
        {
          "type": "String",
          "field": "id",
          "optional": false,
          "description": "The Users-ID."
        }
      ]
    },
    "error": {
      "fields": [
        {
          "field": "NoAccessRight",
          "optional": false,
          "description": "Only authenticated Admins can access the data."
        },
        {
          "field": "UserNameTooShort",
          "optional": false,
          "description": "Minimum of 5 characters required."
        }
      ],
      "examples": [
        {
          "title": " Response (example):",
          "content": "   HTTP/1.1 401 Not Authenticated\n   {\n     \"error\": \"UserNameTooShort\"\n   }\n"
        }
      ]
    },
    "filename": "./example/example.js"
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "Change a new User",
    "version": "0.3.0",
    "name": "PutUser",
    "group": "User",
    "permission": "none",
    "description": "This function has same errors like POST /user, but errors not defined again, they were included with \"apiErrorStructure\"",
    "parameter": {
      "fields": [
        {
          "type": "String",
          "field": "name",
          "optional": false,
          "description": "Name of the User."
        }
      ]
    },
    "error": {
      "fields": [
        {
          "field": "NoAccessRight",
          "optional": false,
          "description": "Only authenticated Admins can access the data."
        },
        {
          "field": "UserNameTooShort",
          "optional": false,
          "description": "Minimum of 5 characters required."
        }
      ],
      "examples": [
        {
          "title": " Response (example):",
          "content": "   HTTP/1.1 401 Not Authenticated\n   {\n     \"error\": \"UserNameTooShort\"\n   }\n"
        }
      ]
    },
    "filename": "./example/example.js"
  }
]
});