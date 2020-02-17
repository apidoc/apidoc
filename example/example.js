/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.3.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Compare version 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.
 *
 * @apiHeader {String} Authorization The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: token 5f048fe"
 * @apiParam {Number} id The Users-ID.
 *
 * @apiExample {curl} Curl example
 * curl -H "Authorization: token 5f048fe" -i https://api.example.com/user/4711
 * @apiExample {js} Javascript example
 * const client = AcmeCorpApi('5f048fe');
 * const user = client.getUser(42);
 * @apiExample {python} Python example
 * client = AcmeCorpApi.Client(token="5f048fe")
 * user = client.get_user(42)
 *
 * @apiSuccess {Number}   id            The Users-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {Date}     name          Fullname of the User.
 * @apiSuccess {String[]} nicknames     List of Users nicknames (Array of Strings).
 * @apiSuccess {Object}   profile       Profile data (example for an Object)
 * @apiSuccess {Number}   profile.age   Users age.
 * @apiSuccess {String}   profile.image Avatar-Image.
 * @apiSuccess {Object[]} options       List of Users options (Array of Objects).
 * @apiSuccess {String}   options.name  Option Name.
 * @apiSuccess {String}   options.value Option Value.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
function getUser() { return; }

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
 * @apiSuccess {Number} id         The new Users-ID.
 *
 * @apiUse CreateUserError
 */
function postUser() { return; }

/**
 * @api {put} /user/:id Change a User
 * @apiVersion 0.3.0
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of the User.
 * @apiParam {File} avatar Upload avatar.
 *
 * @apiUse CreateUserError
 */
function putUser() { return; }

/**
 * @api {delete} /user/:id Delete user
 * @apiVersion 0.3.0
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Be careful! This will remove all the data associated with that user!
 *
 * @apiHeader {String} Authorization The token can be generated from your user profile.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: token 5f048fe"
 * @apiParam {Number} id <code>id</code> of the user.
 *
 * @apiExample {curl} Curl example
 * curl -X DELETE -H "Authorization: token 5f048fe" -i https://api.example.com/user/4711
 * @apiExample {js} Javascript example
 * const client = AcmeCorpApi('5f048fe');
 * const user = client.deleteUser(42);
 * @apiExample {python} Python example
 * client = AcmeCorpApi.Client(token="5f048fe")
 * user = client.delete_user(42)
 *
 * @apiSuccess {String} result <code>ok</code> if everything went fine.
 * @apiSuccessExample {json} Success-Example
 *     HTTP/1.1 200 OK
 *     {
 *         "result": "ok"
 *     }
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
function deleteUser() { return; }
