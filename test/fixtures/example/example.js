/**
 * @test Ignore this block. No apiDoc.
 */

/**
 * @apiIgnore Ignore this block, apiIgnore is set.
 * @api {get} /ignore/me
 */

/**
 * @api {get} /log/:id Get
 * @apiDescription Daten eines Logs laden.
 *  test
 *
 * @apiVersion 0.2.0
 * @apiPermission none
 * @apiDescription Daten eines Logs laden.
 *
 * @apiParam {String} param1 Beschreibung Param1
 * @apiParam {String} param2
 * @apiParam {String} param3="Default Value" Beschreibung Param3
 * @apiParam {String} param4="Default Value"
 *
 * @apiParam param1 Beschreibung Param1
 * @apiParam param2
 * @apiParam param3="Default Value" Beschreibung Param3
 * @apiParam param4="Default Value"
 *
 * @apiParam [param1] Beschreibung Param1
 * @apiParam [param2]
 * @apiParam [param3="Default Value"] Beschreibung Param3
 * @apiParam [param4="Default Value"]
 *
 * @apiParam {String} [param1] Beschreibung Param1
 * @apiParam {String} [param2]
 * @apiParam {String} [param3="Default Value"] Beschreibung Param3
 * @apiParam {String} [param4="Default Value"]
 *
 * @api {get} /log/:id Get
 */