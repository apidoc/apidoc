/**
 * @apiDefine Structure1 title
 * Some description.
 *
 * @apiParam field1 This is Field 1.
 */

/**
 * @api {get} /define Define
 * @apiName GetDefine
 * @apiGroup Define
 * @apiVersion 0.8.0
 * @apiDescription Example of @apiDefine and @apiUse
 *
 * @apiUse Structure1
 *
 * @apiParam field2 This is Field 2 (local).
 */
