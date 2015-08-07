define([
    'jquery',
    'lodash'
], function($, _) {
    var initDynamic;
    initDynamic = function () {
        $(".tag").off("click");
        $(".tag").on('click', function (e) {
            e.preventDefault();
            var tag = $(this).data('tag');
            hideTags(tag);
        });

        $(".author").off("click");
        $(".author").on("click", function(e) {
            e.preventDefault();
            var author = $(this).data('author');
            hideAuthors(author);
        });

        $(".all").off("click");
        $(".all").on("click", function (e) {
            e.preventDefault();
            showAll();
        });
    };

    function showAll() {
        accessorFilter($("article"), 'role', 'api');
    }

    function hideTags(tag) {
        accessorFilter($("article[data-tags]"), 'data-tags', tag);
    }

    function hideAuthors(author) {
        accessorFilter($("article[data-author]"), 'data-author', author);
    }

    function accessorFilter(e, key, value) {
        e.each(function () {

            $root = $(this);
            var group = $root.data("group");
            var name = $root.data("name");
            var version = $root.data("version");

            selector = '[href="#api-' + group + '-' + name + '"]';
            $e = $(selector).parent('li');

            var values = $root.attr(key).split(/[\s,]+/);
            if ($.inArray(value, values) != -1) {
                if ($e.hasClass('hide')) {
                    $e.removeClass('hide');
                }
            } else {
                if (!($e.hasClass('hide'))) {
                    $e.addClass('hide');
                }
            }
        });

        console.log('Filter ' + value + ' in ' + key);
    }


    /**
     * Exports.
     */
    return {
        initDynamic: initDynamic
    };

});