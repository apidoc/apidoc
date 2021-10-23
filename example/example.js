/**
 * @apiDefine admin:computer User access only
 * This optional description belong to to the group admin.
 */

/**
 * @api {get} /user/:region/:id/:opt Read data of a User
 * @apiVersion 0.3.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin:computer
 *
 * @apiDescription Compare version 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.
 *
 * @apiHeader {String} Authorization The token can be generated from your user profile.
 * @apiHeader {String} X-Apidoc-Cool-Factor=big Some other header with a default value.
 * @apiHeaderExample {Header} Header-Example
 *     "Authorization: token 5f048fe"
 * @apiParam {Number} id User unique ID
 * @apiParam {String} region=fr-par User region
 * @apiParam {String} [opt] An optional param
 *
 * @apiExample {bash} Curl example
 * curl -H "Authorization: token 5f048fe" -i https://api.example.com/user/fr-par/4711
 * curl -H "Authorization: token 5f048fe" -H "X-Apidoc-Cool-Factor: superbig" -i https://api.example.com/user/de-ber/1337/yep
 * @apiExample {js} Javascript example
 * const client = AcmeCorpApi('5f048fe');
 * const user = client.getUser(42);
 * @apiExample {python} Python example
 * client = AcmeCorpApi.Client(token="5f048fe")
 * user = client.get_user(42)
 *
 * @apiSuccess {Number}   id            The Users-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {String}   name          Fullname of the User.
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
 * @apiBody {Number} age Age of the User
 * @apiBody {String} name=Caroline Name of the User
 * @apiBody {Date} extraInfo.hireDate Date when user was hired
 * @apiBody {Date} extraInfo.hireDateWithDefault=2021-09-01 Date when user was hired with default
 * @apiBody {String} extraInfo.nickname Nickname of the user
 * @apiBody {Boolean} extraInfo.isVegan=true Is the user vegan? (boolean with default)
 * @apiBody {Boolean} extraInfo.isAlive Is the user alive? (boolean with no default)
 * @apiBody {String} extraInfo.secrets.crush The user secret crush
 * @apiBody {Number} extraInfo.secrets.hair=1000 Number of hair of user
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
 * @apiParam {Number} id <code>id</code> of the user.
 * @apiBody {String} name Name of the User.
 * @apiBody {File} avatar Upload avatar.
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
 * @apiExample {bash} Curl example
 * curl -X DELETE -H "Authorization: token 5f048fe" -i https://api.example.com/user/4711
 * @apiExample {js} Javascript example
 * const client = AcmeCorpApi('5f048fe');
 * const user = client.deleteUser(42);
 * @apiExample {python} Python example
 * client = AcmeCorpApi.Client(token="5f048fe")
 * user = client.delete_user(42)
 *
 * @apiSuccess {String} result <code>ok</code> if everything went fine.
 * @apiSuccess {String} [nullableField] This response field is not always there (can be null).
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

/**
 * @api {post} /user/:id Thank a user: this is quite a long name indeed
 * @apiVersion 0.3.0
 * @apiName ThankUser
 * @apiGroup User
 * @apiDescription This is here to have a long name in the left menu.
 * @apiSampleRequest off
 */
function thankUser() { return; }

/**
 * @api {post} /city Create a new city
 * @apiVersion 0.3.0
 * @apiName CreateCity
 * @apiGroup City
 * @apiDescription Create a new city.
 * @apiBody {String} name=Paris Name of the city
 * @apiQuery {String=Aerial,Land,Underwater} view=Aerial Type of view.
 * @apiQuery {Number} zoom Zoom.
 */
function createCity() { return; }

/**
 * @api {get} /category Get a category
 * @apiVersion 0.3.0
 * @apiSampleRequest http://www.example.com
 * @apiName GetCategory
 * @apiGroup Category (official)
 * @apiDescription Get a category. Sample request on example.com here.
 * @apiQuery {Number} id Category ID.
 */
function getCategory() { return; }

/**
 * @api {delete} /category Delete a category
 * @apiVersion 0.3.0
 * @apiSampleRequest off
 * @apiName DeleteCategory
 * @apiGroup Category (official)
 * @apiDescription Delete a category. Sample request has been disabled here.
 * @apiQuery {Number} id Category ID.
 * @apiParamExample {json} Some json code:
 *   {
 *     "user": "Sample User",
 *      "payload": {
 *        "test": [
 *          "code": "
 *            public class HelloWorldTest {
 *              HelloWorld hw = new HelloWorld();
 *              @Test
 *              public void testOkay {
 *              assertEquals(\"HelloWorld\", hw.getMsg());
 *            }
 *         }"
 *        ]
 *      }
 *   }
 */
function deleteCategory() { return; }
