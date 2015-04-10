/**
 * @api {post} /api/authenticate
 * @apiVersion 0.3.0
 *
 * @apiGroup Authentication
 * @apiName Authenticate
 *
 * @apiParam (Credentials) {String} username Username
 * @apiParam (Credentials) {String} password password
 *
 * @apiUse InternalServerError
 */

/**
 * @api {get} /api/subscriptioninfo
 * @apiVersion 0.3.0
 *
 * @apiDescription Get the subscription information from an authenticated user.
 *
 *
 * @apiGroup Authentication
 * @apiName GetSubscriptionInfo
 *
 * @apiUse AuthHeader
 * @apiUse InternalServerError
 */
