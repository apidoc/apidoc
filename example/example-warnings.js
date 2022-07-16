// ------------------------------------------------------------------------------------------
// Parameter Warnings Sample File, ALL samples will return warnings
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /user Missing URL parameter
 * @apiVersion 0.2.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription @apiParam 'name' was defined but does not appear in URL of @api
 *
 * @apiParam {String} name Name of the User.
 *
 * @apiSuccess {String} id         The Users-ID.
 *
 * @apiUse CreateUserError
 */

/**
 * @api {GET} /resource/:resId/sub/:subId Undocumented URL Parameter
 * @apiName GetSubResource
 * @apiGroup Warnings
 *
 * @apiDescription  URL contains a parameter ':resId' that is not documented as @apiParam in @api
 *
 * @apiParam {String} subId
 */

/**
 * @api {GET} /resource/:resId Mismatched URL Parameter
 * @apiName GetResource
 * @apiGroup Warnings
 *
 * @apiDescription  URL contains a parameter ':resId' that is not documented as @apiParam in @api
 *
 * @apiParam {String} id
 */

/**
 *
 * We could even push further and add a warning if there is an api param that doesn't correspond
 * to anything (so the other way around). Code that would emit a warning
 */

/**
 * @api {get} /user/:id Unused URL Parameter
 * @apiName GetUnused
 * @apiGroup Warnings
 *
 * @apiDescription  ':oops' was defined but does not appear in URL of @api
 *
 * @apiParam {Number} id user id
 * @apiParam {String} oops some leftover
 */

/**
 *
 * Example taken from test case by @Lucas-C
 */

/**
 * @api     {post}   /api/school/students/:studentId/cloth  Multiple Warnings
 * @apiName         createCloth
 * @apiGroup        Warnings
 *
 * @apiDescription  @apiParam 'id' was defined but does not appear in URL of @api
 *                  URL contains a parameter ':studentId' that is not documented as @apiParam in @api
 *
 * @apiParam        id
 * @apiParam (body) {String}          [name]
 * @apiSuccess      {Number}    code  200
 * @apiSuccessExample {json} Success-Response:
 * {
 *      status: 200
 * }
*/
