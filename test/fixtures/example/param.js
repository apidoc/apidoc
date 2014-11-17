/**
 * @api {get} /param/:id Parameters
 * @apiName GetParam
 * @apiGroup Param
 * @apiVersion 0.1.1
 * @apiDescription Parameters and different Versions: 0.1.1
 *
 * @apiParam param1                 Parameter and description.
 * @apiParam param2
 * @apiParam param3="Default Value" Parameter, default value and description.
 * @apiParam param4="Default Value"
 *
 * @apiParam [param5]                 Optional parameter and description.
 * @apiParam [param6]
 * @apiParam [param7="Default Value"] Optional parameter, default value and description.
 * @apiParam [param8="Default Value"]
 *
 * @apiParam {String} param9                  Type, parameter and description.
 * @apiParam {String} param10
 * @apiParam {String} param11="Default Value" Type, parameter and default value.
 * @apiParam {String} param12="Default Value"
 *
 * @apiParam {String} [param13]                 Type, optional parameter and description.
 * @apiParam {String} [param14]
 * @apiParam {String} [param15="Default Value"] Type, optional parameter, default value and description.
 * @apiParam {String} [param26="Default Value"]
 *
 * @apiParam {String{4,8}} param17                  Type, size, parameter and description.
 * @apiParam {Number{1-3}} param18                  Type, size, parameter and description.
 * @apiParam {String{4,8}} param19="Default Value"  Type, size, parameter, default value and description.
 * @apiParam {Number{1-3}} param20=1                Type, size, parameter, default value and description.
 *
 * @apiParam {String="value 1"} param21            Type, parameter and allowed string value.
 * @apiParam {String="value 1", "value 2"} param22 Type, parameter and allowed list of string values.
 * @apiParam {Number=4711} param23                 Type, parameter and allowed value.
 * @apiParam {Number=4711,4712} param24            Type, parameter and allowed list of values.
 *
 * @apiParam {String{1,10}="value 1"}            param25 Type, size, parameter and allowed string value.
 * @apiParam {String{1,10}="value 1", "value 2"} param26 Type, size, parameter and allowed list of string values.
 * @apiParam {Number{1-9999}=4711}               param27 Type, size, parameter and allowed value.
 * @apiParam {Number{1-9999}=4711,4712}          param28 Type, size, parameter and allowed list of values.
 */

/**
 * @api {get} /param/:id Parameters
 * @apiName GetParam
 * @apiGroup Param
 * @apiVersion 0.1.0
 * @apiDescription Parameters and different Versions: 0.1.0
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
