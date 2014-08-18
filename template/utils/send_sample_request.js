define([
  'jquery'
], function($) {
	
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

      // create JSON dictionary of parameters
      var dict = {};
      $root.find(".sample-request-param").each(function(i, element) {
          var key = $(element).data("name");
          var value = element.value;
          dict[key] = $.type(value) === "string" ? escapeHtml(value) : value;
      });

      // grab user-inputted URL
      var url = $root.find(".sample-request-url").val();

      // Insert url parameter
      // @todo Better use a library like https://github.com/component/path-to-regexp
      var pattern = /\:(?!\/)(.*?)(\/|$)/g;
      var matches;
      while ((matches = pattern.exec(url)) !== null)
      {
          var key = matches[1];
          if (dict[key] !== undefined) {
              url = url.replace(matches[0], encodeURIComponent(dict[key]));
              delete dict[key];
          }
      } // while     

      // send AJAX request, catch success or error callback
      $.ajax({
          url: url,
          dataType: "json",
          data: dict,
          type: type.toUpperCase(),
          success: displaySuccess,
          error: displayError
      });

      function displaySuccess(data) {
          $root.find(".sample-request-response").show();
          $root.find(".sample-request-response-json").html(JSON.stringify(data, null, 4));
          refreshScrollSpy();
      };

      function displayError(jqXHR, textStatus, error) {
          $root.find(".sample-request-response").show();
          $root.find(".sample-request-response-json").html(jqXHR.status + " Error: " + error);
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
      var $uRLelement = $root.find(".sample-request-url");
      $uRLelement.val($uRLelement.prop("defaultValue"));

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
   * Exports.
   */
  return {
      initDynamic: initDynamic
  };

});
