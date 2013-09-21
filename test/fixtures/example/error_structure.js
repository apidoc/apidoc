/**
 * Use of multiple ErrorStructures.
 */

/**
 * @apiDefineErrorStructure Error1
 *
 * @apiError error1Error This is Error 1.
 */

/**
 * @apiDefineErrorStructure Error2
 *
 * @apiError error2Error This is Error 2.
 */

/**
 * @api {post} /test/error Multiple Error Structures
 * @apiName PostError
 * @apiGroup Error
 * @apiVersion 0.1.0
 * @apiDescription Use of multiple ErrorStructures.
 *
 * @apiErrorStructure Error1
 * @apiErrorStructure Error2
 *
 * @apiError error3Error This is Error 3 (local).
 */
