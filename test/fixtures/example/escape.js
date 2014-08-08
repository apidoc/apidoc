/**
 * @api {get} /test/escape Escape Example
 * @apiName GetEscape
 * @apiGroup Escape
 * @apiVersion 0.6.0
 * @apiDescription Escape Example data.
 * 
 * @apiExample Example usage:
 *     curl -i http://localhost/escape/text
 *     <b>curl -i http://localhost/escape/html</b>
 *     <xml>curl -i http://localhost/escape/xml</xml>
 *
 * @apiSuccessExample Example Response
 * HTTP/1.1 200 OK {
 *   field_text: 'text-value',
 *   field_html: '<b>html-value</b>',
 *   field_xml: '<xml>xml-value</xml>'
 * }
 */

/**
 * @api {get} /test/escape Escape Example
 * @apiName GetEscape
 * @apiGroup Escape
 * @apiVersion 0.5.0
 * @apiDescription Escape Example data - with comparison.
 * 
 * @apiExample Example usage:
 *     curl -i http://localhost/escape/text-old
 *     <b>curl -i http://localhost/escape/html-old</b>
 *     <xml>curl -i http://localhost/escape/xml-old</xml>
 *
 * @apiSuccessExample Example Response
 * HTTP/1.1 200 OK {
 *   field_text: 'text-value old',
 *   field_html: '<b>html-value old</b>',
 *   field_xml: '<xml>xml-value old</xml>'
 * }
 */
