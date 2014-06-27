/**
 * Use of multiple HeaderStructures.
 */

/**
 * @apiDefineHeaderStructure Header1
 *
 * @apiHeader Header1 This is Header 1.
 */

/**
 * @apiDefineHeaderStructure Header2
 *
 * @apiHeader header2 This is Header 2.
 */

/**
 * @api {post} /test/header Header Structure
 * @apiName PostHeader
 * @apiGroup Header
 * @apiVersion 0.5.0
 * @apiDescription Use of multiple HeaderStructures.
 *
 * @apiHeaderStructure Header1
 * @apiHeaderStructure Header2
 *
 * @apiHeader Header3 This is Header 3 (local).
 */
