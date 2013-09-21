/**
 * Use of multiple SuccessStructures.
 */

/**
 * @apiDefineSuccessStructure Success1
 *
 * @apiSuccess success1 This is Success 1.
 */

/**
 * @apiDefineSuccessStructure Success2
 *
 * @apiSuccess success2 This is Success 2.
 */

/**
 * @api {post} /test/success Multiple Success Structures
 * @apiName PostSuccess
 * @apiGroup Success
 * @apiVersion 0.1.0
 * @apiDescription Use of multiple SuccessStructures.
 *
 * @apiSuccessStructure Success1
 * @apiSuccessStructure Success2
 *
 * @apiSuccess success3 This is Success 3 (local).
 */
