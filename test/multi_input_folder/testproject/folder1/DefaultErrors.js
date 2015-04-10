/**
 * @apiDefine Unauthorized
 * @apiError (401 Unauthorized) Unauthorized Invalid or missing Authorization
 * @apiErrorExample 401 Unauthorized:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "uri": "<api-endpoint>"
 *     "type": "http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html",
 *     "title": "Unauthorized",
 *     "status": 401,
 *     "detail": "Invalid Authentication."
 * }
 */

/**
 * @apiDefine InternalServerError
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 * @apiErrorExample 500 Internal Server Error
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "uri": "<api-endpoint>",
 *     "method": "<method used>",
 *     "type": "http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html",
 *     "title": "Internal Server Error",
 *     "status": 500,
 *     "detail": "<Detail Message>"
 * }
 */