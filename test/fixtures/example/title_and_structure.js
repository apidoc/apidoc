/**
 * Use of Title and Structures in the same block.
 */

/**
 * @apiDefineErrorStructure TitleAndError1
 *
 * @apiError error1Error This is Error 1.
 */

/**
 * @api {post} /test/title_and_error Title and Structure
 * @apiName PostTitleAndError
 * @apiGroup Error
 * @apiVersion 0.1.0
 * @apiDescription Use of Title and Structures in the same block.
 *
 * @apiSuccessTitle (204) 204 No Content. Added to global namespace.
 * @apiSuccess (204) message Successfully deleted.
 *
 * @apiErrorStructure TitleAndError1
 *
 * @apiError error3Error This is Error 3 (local).
 */
