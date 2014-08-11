function sendSampleRequest(url, type, apiName) {

	var dict = {};

	$(".sample-param-" + apiName).each(function(i, element) {
		var key = element.id;
		var value = element.value;
		dict[key] = value;
	});

	$.ajax({
		url: "/api" + url,
		dataType: "json",
		data: dict,
		type: type.toUpperCase(),
		success: success,
		error: error
	});

	function success(data) {
		$("#sample-response-" + apiName).show();
		$("#sample-response-json-" + apiName).html(JSON.stringify(data, null, 4));
	};

	function error(jqXHR, textStatus, errorThrown) {
		$("#sample-response-" + apiName).show();
		$("#sample-response-json-" + apiName).html(jqXHR.status + " Error: " + errorThrown);
	};

	// update scrollspy TO DO FIXTHIS
  	$('[data-spy="scroll"]').each(function () {
  		console.log("found a scrollspy");
    	var $spy = $(this).scrollspy('refresh');
	});
};

function clearResponse(apiName) {
	$("#sample-response-" + apiName).hide();
	$("#sample-response-json-" + apiName).empty();
};