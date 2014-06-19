/**
 * @apiDefinePermission admin Admin access rights needed.
 * Optionally you can write here further Informations about the permission.
 *
 * An "apiDefinePermission"-block can have an "apiVersion", so you can attach the block to a specific version.
 *
 * @apiVersion 0.3.0
 */

/**
 * @apiDefinePermission admin This title is visible in version 0.1.0 and 0.2.0
 * @apiVersion 0.1.0
 */

/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.3.0
 * @apiName GetUser
 * @apiGroup User
 * @apiGroupDescription User Group Description
 * @apiPermission admin
 *
 * @apiDescription Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.
 * 
 * @apiParam {String} id The Users-ID.
 *
 * @apiExample CURL example:
 *     curl -i -X POST http://localhost:3001/example
 *          -H 'Content-Type: application/json' \
 *          -d '{ "id": "4711" }'
 *
 * @apiSuccess {String} id         The Users-ID.
 * @apiSuccess {Date}   registered Registration Date. 
 * @apiSuccess {Date}   name       Fullname of the User.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "4711"
 *       "registered": "31.01.2013"
 *       "name": "John Doe"
 *     }
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 * 
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */

/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.2.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Here you can describe the function.
 * Multilines are possible.
 *
 * @apiParam {String} id The Users-ID.
 *
 * @apiSuccess {String} id         The Users-ID.
 * @apiSuccess {Date}   name       Fullname of the User.
 *
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 */

/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Here you can describe the function.
 * Multilines are possible.
 *
 * @apiParam {String} id The Users-ID.
 *
 * @apiSuccess {String} id         The Users-ID.
 * @apiSuccess {Date}   name       Fullname of the User.
 *
 * @apiError UserNotFound   The error description text in version 0.1.0.
 */

/**
 * @apiDefineErrorStructure CreateUser
 * @apiVersion 0.2.0
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNameTooShort Minimum of 5 characters required.
 * 
 * @apiErrorExample  Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "UserNameTooShort"
 *     }
 */

/**
 * @api {post} /user Create a new User
 * @apiVersion 0.3.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 * 
 * @apiParam {String} name Name of the User.
 *
 * @apiSuccess {String} id         The new Users-ID.
 *
 * @apiErrorStructure CreateUser
 */

/**
 * @api {post} /user Create a User
 * @apiVersion 0.2.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 * 
 * @apiParam {String} name Name of the User.
 *
 * @apiSuccess {String} id         The Users-ID.
 *
 * @apiErrorStructure CreateUser
 */

/**
 * @api {put} /user/:id Change a new User
 * @apiVersion 0.3.0
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of the User.
 *
 * @apiErrorStructure CreateUser
 */