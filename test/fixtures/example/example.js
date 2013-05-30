/**
 * @test Ignore this block. No apiDoc.
 */

	/**
	 * @apiIgnore Ignore this block, apiIgnore is set.
	 * @api {get} /ignore/me
	 * Test whitespaces befor block.
	 */

/**
 * @api {get} /test1/:id Get Test 1
 * @apiName GetTest1
 * @apiGroup Test
 * @apiVersion 0.1.1
 * @apiDescription Test Version 0.1.x
 * Test some basic functions.
 *
 * @apiParam {String} param1                 Parameter with type and description.
 * @apiParam {String} param2
 * @apiParam {String} param3="Default Value" Parameter with type, description and default value.
 * @apiParam {String} param4="Default Value"
 *
 * @apiParam param5                 Basic Parameter with description.
 * @apiParam param6
 * @apiParam param7="Default Value" Basic Parameter with description and default value.
 * @apiParam param8="Default Value"
 *
 * @apiParam [param9]                  Optional basic Parameter with description.
 * @apiParam [param10]
 * @apiParam [param11="Default Value"] Optional basic Parameter with description and default value.
 * @apiParam [param12="Default Value"]
 *
 * @apiParam {String} [param13]                 Optional Parameter with type and description.
 * @apiParam {String} [param14]
 * @apiParam {String} [param15="Default Value"] Optional Parameter with type, description and default value.
 * @apiParam {String} [param16="Default Value"]
 */

/**
 * @api {get} /test1/:id Get Test 1
 * @apiName GetTest1
 * @apiGroup Test
 * @apiVersion 0.1.0
 * @apiDescription Test Version 0.1.x
 * Test some basic functions.
 *
 * @apiParam {String} param0                 This param is removed in 0.1.1.
 * @apiParam {String} param1                 This is an old text.
 * @apiParam {String} param2
 * @apiParam {String} param3="Default Value" Parameter with type, description and default value.
 * @apiParam {String} param4="Default Value"
 *
 * @apiParam param5                 Basic Parameter with description.
 * @apiParam param6
 * @apiParam param7="Default Value" Basic Parameter with description and default value.
 * @apiParam param8="Default Value"
 *
 * @apiParam [param9]                  Optional basic Parameter with description.
 * @apiParam [param10]
 * @apiParam [param11="Default Value"] Optional basic Parameter with description and default value.
 * @apiParam [param12="Default Value"]
 *
 * @apiParam {String} [param13]                 Optional Parameter with type and description.
 * @apiParam {String} [param14]
 * @apiParam {String} [param15="Default Value"] Optional Parameter with type, description and default value.
 * @apiParam {String} [param16="Default Value"]
 */

/**
 * @api {get} /test2/:id Get Test 2
 * @apiName GetTest2
 * @apiGroup Test
 * @apiVersion 0.2.0
 * @apiDescription Test Version 0.2.x
 * Test Title and Grouping of param, success, error
 *
 *
 * @apiParam {String} param1                         No Group, automatically set Group to "Parameter"
 * 
 * @apiParamTitle (login) Replace "login" with this text
 * @apiParam (login) {String} param2                 Group "login"
 * @apiParam (login) {String} param3="Default Value" Group "login" with default Value
 *
 *
 * @apiSuccess {String} success1                       No Group, automatically set "Success 200"
 * 
 * @apiSuccessTitle (201) 201 - Everything ok, replace "201" with this text.
 * @apiSuccess (201) {String} success2                 Group "201" 
 * @apiSuccess (201) {String} success3="Default Value" Group "201" with default Value
 *
 * 
 * @apiError {String} error1       No Group automatically set "Error 4xx"
 * 
 * @apiError (400) {String} error2 Group "400"
 * 
 * @apiErrorTitle (401) 401 - Oh oh, replace "401" with this text
 * @apiError (401) {String} error3 Group "401"
 */
