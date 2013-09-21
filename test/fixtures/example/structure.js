/**
 * Use of multiple Structures.
 */

/**
 * @apiDefineStructure Structure1
 *
 * @apiParam field1 This is Field 1.
 */

/**
 * @apiDefineStructure Structure2
 *
 * @apiParam field2 This is Field 2.
 */

/**
 * @api {post} /test/structure Multiple Structures
 * @apiName PostStructure
 * @apiGroup Structure
 * @apiVersion 0.1.0
 * @apiDescription Use of multiple Structures.
 *
 * @apiStructure Structure1
 * @apiStructure Structure2
 *
 * @apiParam field3 This is Field 3 (local).
 */
