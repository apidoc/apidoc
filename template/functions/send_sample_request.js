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
		success: success
	});

	function success(data) {
		$("#sample-response-" + apiName).html(JSON.stringify(data, null, 4));
	};
};

function clearResponse(apiName) {
	$("#sample-response-" + apiName).html("");
};