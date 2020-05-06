define([
    'jquery',
    'lodash',
    './utils/send_sample_request_utils'
], function($, _, utils) {

    var initDynamic = function() {
        // Button send
        $(".sample-request-send").off("click");
        $(".sample-request-send").on("click", function(e) {
            e.preventDefault();
            var $root = $(this).parents("article");
            var group = $root.data("group");
            var name = $root.data("name");
            var version = $root.data("version");
            sendSampleRequest(group, name, version, $(this).data("sample-request-type"));
        });

        // Button clear
        $(".sample-request-clear").off("click");
        $(".sample-request-clear").on("click", function(e) {
            e.preventDefault();
            var $root = $(this).parents("article");
            var group = $root.data("group");
            var name = $root.data("name");
            var version = $root.data("version");
            clearSampleRequest(group, name, version);
        });
    }; // initDynamic

    function sendSampleRequest(group, name, version, type)
    {
        var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');

        // Optional header
        var header = {};
        $root.find(".sample-request-header:checked").each(function(i, element) {
            var group = $(element).data("sample-request-header-group-id");
            $root.find("[data-sample-request-header-group=\"" + group + "\"]").each(function(i, element) {
                var key = $(element).data("sample-request-header-name");
                var value = element.value;
                if (typeof element.optional === 'undefined') {
                  element.optional = true;
                }
                if ( ! element.optional && element.defaultValue !== '') {
                    value = element.defaultValue;
                }
                header[key] = value;
            });
        });


        // create JSON dictionary of parameters
        var param = {};
        var paramType = {};
        var bodyFormData = new FormData();
        var bodyJson = '';
        $root.find(".sample-request-param:checked").each(function(i, element) {
            var group = $(element).data("sample-request-param-group-id");
            var contentType = $(element).nextAll('.sample-header-content-type-switch').first().val();
            if (contentType == "body-json"){
                $root.find("[data-sample-request-body-group=\"" + group + "\"]").not(function(){
                    return $(this).val() == "" && $(this).is("[data-sample-request-param-optional='true']");
                }).each(function(i, element) {
                    if (isJson(element.value)){
                        header['Content-Type'] = 'application/json';
                        bodyJson = element.value;
                    }
                });
            }else {
                $root.find("[data-sample-request-param-group=\"" + group + "\"]").not(function(){
                    return $(this).val() == "" && $(this).is("[data-sample-request-param-optional='true']");
                }).each(function(i, element) {
                    var key = $(element).data("sample-request-param-name");
                    var value = element.value;
                    if ( ! element.optional && element.defaultValue !== '') {
                        value = element.defaultValue;
                    }
                    if (contentType == "body-form-data"){
                        header['Content-Type'] = 'multipart/form-data'
                        if (element.type == "file") {
                        value = element.files[0];
                      }
                      bodyFormData.append(key,value);
                    }else {
                        param[key] = value;
                        paramType[key] = $(element).next().text();
                    }
                });
            }
        });

        // grab user-inputted URL
        var url = $root.find(".sample-request-url").val();

        //Convert {param} form to :param
        url = utils.convertPathParams(url);

        // Insert url parameter
        var pattern = pathToRegexp(url, null);
        var matches = pattern.exec(url);
        for (var i = 1; i < matches.length; i++) {
            var key = matches[i].substr(1);
            var optional = false
            if (key[key.length - 1] === '?') {
                optional = true;
                key = key.substr(0, key.length - 1);
            }
            if (param[key] !== undefined) {
                url = url.replace(matches[i], encodeURIComponent(param[key]));

                // remove URL parameters from list
                delete param[key];
            } else if (optional) {
                // if parameter is optional denoted by ending '?' in param (:param?)
                // and no parameter is given, replace parameter with empty string instead
                url = url.replace(matches[i], '');
                delete param[key];
            }
        } // for

        //handle nested objects and parsing fields
        param = utils.handleNestedAndParsingFields(param, paramType);

        //add url search parameter
        if (header['Content-Type'] == 'application/json') {
            if (bodyJson) {
                // bodyJson is set to value if request body: 'body/json' was selected and manual json was input
                // in this case, use the given bodyJson and add other params in query string
                url = url + encodeSearchParams(param);
                param = bodyJson;
            } else {
                // bodyJson not set, but Content-Type: application/json header was set. In this case, send parameters
                // as JSON body. First, try parsing fields of object with given paramType definition so that the json
                // is valid against the parameter spec (e.g. Boolean params are boolean instead of strings in final json)
                param = utils.tryParsingWithTypes(param, paramType);
                param = JSON.stringify(param);
            }
        }else if (header['Content-Type'] == 'multipart/form-data'){
            url = url + encodeSearchParams(param);
            param = bodyFormData;
        }

        $root.find(".sample-request-response").fadeTo(250, 1);
        $root.find(".sample-request-response-json").html("Loading...");
        refreshScrollSpy();

        // send AJAX request, catch success or error callback
        var ajaxRequest = {
            url        : url,
            headers    : header,
            data       : param,
            type       : type.toUpperCase(),
            success    : displaySuccess,
            error      : displayError
        };

        if(header['Content-Type'] == 'multipart/form-data'){
            delete ajaxRequest.headers['Content-Type'];
            ajaxRequest.contentType=false;
            ajaxRequest.processData=false;
        }
        $.ajax(ajaxRequest);


        function displaySuccess(data, status, jqXHR) {
            var jsonResponse;
            try {
                jsonResponse = JSON.parse(jqXHR.responseText);
                jsonResponse = JSON.stringify(jsonResponse, null, 4);
            } catch (e) {
                jsonResponse = jqXHR.responseText;
            }
            $root.find(".sample-request-response-json").text(jsonResponse);
            refreshScrollSpy();
        };

        function displayError(jqXHR, textStatus, error) {
            var message = "Error " + jqXHR.status + ": " + error;
            var jsonResponse;
            try {
                jsonResponse = JSON.parse(jqXHR.responseText);
                jsonResponse = JSON.stringify(jsonResponse, null, 4);
            } catch (e) {
                jsonResponse = jqXHR.responseText;
            }

            if (jsonResponse)
                message += "\n" + jsonResponse;

            // flicker on previous error to make clear that there is a new response
            if($root.find(".sample-request-response").is(":visible"))
                $root.find(".sample-request-response").fadeTo(1, 0.1);

            $root.find(".sample-request-response").fadeTo(250, 1);
            $root.find(".sample-request-response-json").text(message);
            refreshScrollSpy();
        };
    }

    function clearSampleRequest(group, name, version)
    {
        var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');

        // hide sample response
        $root.find(".sample-request-response-json").html("");
        $root.find(".sample-request-response").hide();

        // reset value of parameters
        $root.find(".sample-request-param").each(function(i, element) {
            element.value = "";
        });

        // restore default URL
        var $urlElement = $root.find(".sample-request-url");
        $urlElement.val($urlElement.prop("defaultValue"));

        refreshScrollSpy();
    }

    function refreshScrollSpy()
    {
        $('[data-spy="scroll"]').each(function () {
            $(this).scrollspy("refresh");
        });
    }

    function escapeHtml(str) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }


    /**
     * is Json
     */
    function isJson(str) {
        if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    return true;
                }else{
                    return false;
                }
            } catch(e) {
                return false;
            }
        }
    }

    /**
     * encode Search Params
     */
    function encodeSearchParams(obj) {
        const params = [];
        Object.keys(obj).forEach((key) => {
            let value = obj[key];
            params.push([key, encodeURIComponent(value)].join('='));
        })
        return params.length === 0 ? '' : '?' + params.join('&');
    }

    /**
     * Exports.
     */
    return {
        initDynamic: initDynamic
    };

});
