/**
 * @api {get} /sample/request/ Sampe Request
 * @apiName GetSampleRequest
 * @apiGroup Sample
 * @apiVersion 0.8.0
 * @apiDescription Usage of many @apiHeaderTitle with different parameters.
 *
 * @apiHeaderTitle (HeaderGroup1) This are the Header for Group 1:
 * @apiHeader (HeaderGroup1) {string} authorization The authorization code.
 * @apiHeader (HeaderGroup1) {string} secrect Additional secret.
 *
 * @apiHeaderTitle (HeaderGroup2) This are the Header for Group 2:
 * @apiHeader (HeaderGroup2) {string} authorization The authorization code.
 * @apiHeader (HeaderGroup2) {string} secrect Additional secret.
 * @apiHeader (HeaderGroup2) {string} type Content-Type.
 *
 * @apiParamTitle (ParameterGroup1) This are Parameter for Group 1:
 * @apiParam (ParameterGroup1) {String} name Your name.
 *
 * @apiParamTitle (ParameterGroup2) This are Parameter for Group 2:
 * @apiParam (ParameterGroup2) {string} firstname Your firstname.
 * @apiParam (ParameterGroup2) {string} lastname Some lastname.
 */
