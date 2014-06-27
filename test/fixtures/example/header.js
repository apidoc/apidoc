/**
 * @api {get} /header/:id Parameters
 * @apiName GetHeader
 * @apiGroup Header
 * @apiVersion 0.5.0
 * @apiDescription Test for @apiHeader (same as @apiParam)
 *
 * @apiHeader {String} header1                 Parameter with type and description.
 * @apiHeader {String} header2
 * @apiHeader {String} header3="Default Value" Parameter with type, description and default value.
 * @apiHeader {String} header4="Default Value"
 *
 * @apiHeader header5                 Basic Parameter with description.
 * @apiHeader header6
 * @apiHeader header7="Default Value" Basic Parameter with description and default value.
 * @apiHeader header8="Default Value"
 *
 * @apiHeader [header9]                  Optional basic Parameter with description.
 * @apiHeader [header10]
 * @apiHeader [header11="Default Value"] Optional basic Parameter with description and default value.
 * @apiHeader [header12="Default Value"]
 *
 * @apiHeader {String} [header13]                 Optional Parameter with type and description.
 * @apiHeader {String} [header14]
 * @apiHeader {String} [header15="Default Value"] Optional Parameter with type, description and default value.
 * @apiHeader {String} [header16="Default Value"]
 */
