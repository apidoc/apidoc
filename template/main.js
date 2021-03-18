require.config({
    paths: {
        bootstrap: './vendor/bootstrap.min',
        diffMatchPatch: './vendor/diff_match_patch.min',
        handlebars: './vendor/handlebars.min',
        handlebarsExtended: './utils/handlebars_helper',
        jquery: './vendor/jquery.min',
        locales: './locales/locale',
        lodash: './vendor/lodash.custom.min',
        pathToRegexp: './vendor/path-to-regexp/index',
        prismjs: './vendor/prism',
        semver: './vendor/semver.min',
        utilsSampleRequest: './utils/send_sample_request',
        webfontloader: './vendor/webfontloader',
        list: './vendor/list.min',
        apiData: './api_data',
        apiProject: './api_project',
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        diffMatchPatch: {
            exports: 'diff_match_patch'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        handlebarsExtended: {
            deps: ['jquery', 'handlebars'],
            exports: 'Handlebars'
        },
        prismjs: {
            exports: 'Prism'
        },
    },
    urlArgs: 'v=' + (new Date()).getTime(),
    waitSeconds: 150
});

require([
    'jquery',
    'lodash',
    'locales',
    'handlebarsExtended',
    'apiProject',
    'apiData',
    'prismjs',
    'utilsSampleRequest',
    'semver',
    'webfontloader',
    'bootstrap',
    'pathToRegexp',
    'list'
], function($, _, locale, Handlebars, apiProject, apiData, Prism, sampleRequest, semver, WebFont) {

    // Load google web fonts.
    WebFont.load({
        active: function() {
            // Only init after fonts are loaded.
            init($, _, locale, Handlebars, apiProject, apiData, Prism, sampleRequest, semver);
        },
        inactive: function() {
            // Run init, even if loading fonts fails
            init($, _, locale, Handlebars, apiProject, apiData, Prism, sampleRequest, semver);
        },
        google: {
            families: ['Source Code Pro', 'Source Sans Pro:n4,n6,n7']
        }
    });
});

function init($, _, locale, Handlebars, apiProject, apiData, Prism, sampleRequest, semver) {
    var api = apiData.api;

    //
    // Templates
    //
    var templateHeader         = Handlebars.compile( $('#template-header').html() );
    var templateFooter         = Handlebars.compile( $('#template-footer').html() );
    var templateArticle        = Handlebars.compile( $('#template-article').html() );
    var templateCompareArticle = Handlebars.compile( $('#template-compare-article').html() );
    var templateGenerator      = Handlebars.compile( $('#template-generator').html() );
    var templateProject        = Handlebars.compile( $('#template-project').html() );
    var templateSections       = Handlebars.compile( $('#template-sections').html() );
    var templateSidenav        = Handlebars.compile( $('#template-sidenav').html() );

    //
    // Default host url used if no sampleUrl is present in config
    //
    var baseURL = window.location.origin;

    //
    // apiProject defaults
    //
    if ( ! apiProject.template)
        apiProject.template = {};

    if (apiProject.template.withCompare == null)
        apiProject.template.withCompare = true;

    if (apiProject.template.withGenerator == null)
        apiProject.template.withGenerator = true;

    if (apiProject.template.forceLanguage)
        locale.setLanguage(apiProject.template.forceLanguage);

    if (apiProject.template.aloneDisplay == null)
        apiProject.template.aloneDisplay = false;

    // Setup jQuery Ajax
    $.ajaxSetup(apiProject.template.jQueryAjaxSetup);

    //
    // Data transform
    //
    // grouped by group
    var apiByGroup = _.groupBy(api, function(entry) {
        return entry.group;
    });

    // grouped by group and name
    var apiByGroupAndName = {};
    $.each(apiByGroup, function(index, entries) {
        apiByGroupAndName[index] = _.groupBy(entries, function(entry) {
            return entry.name;
        });
    });

    //
    // sort api within a group by title ASC and custom order
    //
    var newList = [];
    var umlauts = { 'ä': 'ae', 'ü': 'ue', 'ö': 'oe', 'ß': 'ss' }; // TODO: remove in version 1.0
    $.each (apiByGroupAndName, function(index, groupEntries) {
        // get titles from the first entry of group[].name[] (name has versioning)
        var titles = [];
        $.each (groupEntries, function(titleName, entries) {
            var title = entries[0].title;
            if(title !== undefined) {
                title.toLowerCase().replace(/[äöüß]/g, function($0) { return umlauts[$0]; });
                titles.push(title + '#~#' + titleName); // '#~#' keep reference to titleName after sorting
            }
        });
        // sort by name ASC
        titles.sort();

        // custom order
        if (apiProject.order)
            titles = sortByOrder(titles, apiProject.order, '#~#');

        // add single elements to the new list
        titles.forEach(function(name) {
            var values = name.split('#~#');
            var key = values[1];
            groupEntries[key].forEach(function(entry) {
                newList.push(entry);
            });
        });
    });
    // api overwrite with ordered list
    api = newList;

    //
    // Group- and Versionlists
    //
    var apiGroups = {};
    var apiGroupTitles = {};
    var apiVersions = {};
    apiVersions[apiProject.version] = 1;

    $.each(api, function(index, entry) {
        apiGroups[entry.group] = 1;
        apiGroupTitles[entry.group] = entry.groupTitle || entry.group;
        apiVersions[entry.version] = 1;
    });

    // sort groups
    apiGroups = Object.keys(apiGroups);
    apiGroups.sort();

    // custom order
    if (apiProject.order)
        apiGroups = sortByOrder(apiGroups, apiProject.order);

    // sort versions DESC
    apiVersions = Object.keys(apiVersions);
    apiVersions.sort(semver.compare);
    apiVersions.reverse();

    //
    // create Navigationlist
    //
    var nav = [];
    apiGroups.forEach(function(group) {
        // Mainmenu entry
        nav.push({
            group: group,
            isHeader: true,
            title: apiGroupTitles[group]
        });

        // Submenu
        var oldName = '';
        api.forEach(function(entry) {
            if (entry.group === group) {
                if (oldName !== entry.name) {
                    nav.push({
                        title: entry.title,
                        group: group,
                        name: entry.name,
                        type: entry.type,
                        version: entry.version,
                        url: entry.url
                    });
                } else {
                    nav.push({
                        title: entry.title,
                        group: group,
                        hidden: true,
                        name: entry.name,
                        type: entry.type,
                        version: entry.version,
                        url: entry.url
                    });
                }
                oldName = entry.name;
            }
        });
    });

    /**
     * Add navigation items by analyzing the HTML content and searching for h1 and h2 tags
     * @param nav Object the navigation array
     * @param content string the compiled HTML content
     * @param index where to insert items
     * @return boolean true if any good-looking (i.e. with a group identifier) <h1> tag was found
     */
    function add_nav(nav, content, index) {
        var found_level1 = false;
        if ( ! content) {
          return found_level1;
        }
        var topics = content.match(/<h(1|2).*?>(.+?)<\/h(1|2)>/gi);
        if ( topics ) {
          topics.forEach(function(entry) {
              var level = entry.substring(2,3);
              var title = entry.replace(/<.+?>/g, '');    // Remove all HTML tags for the title
              var entry_tags = entry.match(/id="api-([^\-]+)(?:-(.+))?"/);    // Find the group and name in the id property
              var group = (entry_tags ? entry_tags[1] : null);
              var name = (entry_tags ? entry_tags[2] : null);
              if (level==1 && title && group)  {
                  nav.splice(index, 0, {
                      group: group,
                      isHeader: true,
                      title: title,
                      isFixed: true
                  });
                  index++;
                  found_level1 = true;
              }
              if (level==2 && title && group && name)    {
                  nav.splice(index, 0, {
                      group: group,
                      name: name,
                      isHeader: false,
                      title: title,
                      isFixed: false,
                      version: '1.0'
                  });
                  index++;
              }
          });
        }
        return found_level1;
    }

    // Mainmenu Header entry
    if (apiProject.header) {
        var found_level1 = add_nav(nav, apiProject.header.content, 0); // Add level 1 and 2 titles
        if (!found_level1) {    // If no Level 1 tags were found, make a title
            nav.unshift({
                group: '_',
                isHeader: true,
                title: (apiProject.header.title == null) ? locale.__('General') : apiProject.header.title,
                isFixed: true
            });
        }
    }

    // Mainmenu Footer entry
    if (apiProject.footer) {
        var last_nav_index = nav.length;
        var found_level1 = add_nav(nav, apiProject.footer.content, nav.length); // Add level 1 and 2 titles
        if (!found_level1 && apiProject.footer.title != null) {    // If no Level 1 tags were found, make a title
            nav.splice(last_nav_index, 0, {
                group: '_footer',
                isHeader: true,
                title: apiProject.footer.title,
                isFixed: true
            });
        }
    }

    // render pagetitle
    var title = apiProject.title ? apiProject.title : 'apiDoc: ' + apiProject.name + ' - ' + apiProject.version;
    $(document).attr('title', title);

    // remove loader
    $('#loader').remove();

    // render sidenav
    var fields = {
        nav: nav
    };
    $('#sidenav').append( templateSidenav(fields) );

    // render Generator
    $('#generator').append( templateGenerator(apiProject) );

    // render Project
    _.extend(apiProject, { versions: apiVersions});
    $('#project').append( templateProject(apiProject) );

    // render apiDoc, header/footer documentation
    if (apiProject.header)
        $('#header').append( templateHeader(apiProject.header) );

    if (apiProject.footer)
        $('#footer').append( templateFooter(apiProject.footer) );

    //
    // Render Sections and Articles
    //
    var articleVersions = {};
    var content = '';
    apiGroups.forEach(function(groupEntry) {
        var articles = [];
        var oldName = '';
        var fields = {};
        var title = groupEntry;
        var description = '';
        articleVersions[groupEntry] = {};

        // render all articles of a group
        api.forEach(function(entry) {
            if(groupEntry === entry.group) {
                if (oldName !== entry.name) {
                    // determine versions
                    api.forEach(function(versionEntry) {
                        if (groupEntry === versionEntry.group && entry.name === versionEntry.name) {
                            if ( ! articleVersions[entry.group].hasOwnProperty(entry.name) ) {
                                articleVersions[entry.group][entry.name] = [];
                            }
                            articleVersions[entry.group][entry.name].push(versionEntry.version);
                        }
                    });
                    fields = {
                        article: entry,
                        versions: articleVersions[entry.group][entry.name]
                    };
                } else {
                    fields = {
                        article: entry,
                        hidden: true,
                        versions: articleVersions[entry.group][entry.name]
                    };
                }

                if (apiProject.sampleUrl == false) {
                    fields.article.sampleRequest = [
                        {
                            "url": baseURL + fields.article.url
                        }
                    ];
                }

                // add prefix URL for endpoint unless it's already absolute
                if (apiProject.url) {
                    if (fields.article.url.substr(0, 4).toLowerCase() !== 'http') {
                        fields.article.url = apiProject.url + fields.article.url;
                    }
                }

                addArticleSettings(fields, entry);

                if (entry.groupTitle)
                    title = entry.groupTitle;

                // TODO: make groupDescription compareable with older versions (not important for the moment)
                if (entry.groupDescription)
                    description = entry.groupDescription;

                articles.push({
                    article: templateArticle(fields),
                    group: entry.group,
                    name: entry.name,
                    aloneDisplay: apiProject.template.aloneDisplay
                });
                oldName = entry.name;
            }
        });

        // render Section with Articles
        var fields = {
            group: groupEntry,
            title: title,
            description: description,
            articles: articles,
            aloneDisplay: apiProject.template.aloneDisplay
        };
        content += templateSections(fields);
    });
    $('#sections').append( content );

    // Bootstrap Scrollspy
    $(this).scrollspy({ target: '#scrollingNav' });

    // Content-Scroll on Navigation click.
    $('.sidenav').find('a').on('click', function(e) {
        e.preventDefault();
        var id = $(this).attr('href');
        if ($(id).length > 0)
            $('html,body').animate({ scrollTop: parseInt($(id).offset().top) }, 400);
        window.location.hash = $(this).attr('href');
    });

    /**
     * Check if Parameter (sub) List has a type Field.
     * Example: @apiSuccess          varname1 No type.
     *          @apiSuccess {String} varname2 With type.
     *
     * @param {Object} fields
     */
    function _hasTypeInFields(fields) {
        var result = false;
        $.each(fields, function(name) {
            result = result || _.some(fields[name], function(item) { return item.type; });
        });
        return result;
    }

    /**
     * On Template changes, recall plugins.
     */
    function initDynamic() {
        // Bootstrap popover
        $('button[data-toggle="popover"]').popover().click(function(e) {
            e.preventDefault();
        });

        var version = $('#version strong').html();
        $('#sidenav li').removeClass('is-new');
        if (apiProject.template.withCompare) {
            $('#sidenav li[data-version=\'' + version + '\']').each(function(){
                var group = $(this).data('group');
                var name = $(this).data('name');
                var length = $('#sidenav li[data-group=\'' + group + '\'][data-name=\'' + name + '\']').length;
                var index  = $('#sidenav li[data-group=\'' + group + '\'][data-name=\'' + name + '\']').index($(this));
                if (length === 1 || index === (length - 1))
                    $(this).addClass('is-new');
            });
        }

        // tabs
        $('.nav-tabs-examples a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
        $('.nav-tabs-examples').find('a:first').tab('show');

        // sample header-content-type switch
        $('.sample-header-content-type-switch').change(function () {
            var paramName = '.' + $(this).attr('name') + '-fields';
            var bodyName = '.' + $(this).attr('name') + '-body';
            var selectName = 'select[name=' + $(this).attr('name') + ']';
            if ($(this).val() == 'body-json') {
                $(selectName).val('undefined');
                $(this).val('body-json');
                $(paramName).removeClass('hide');
                $(this).parent().nextAll(paramName).first().addClass('hide');
                $(bodyName).addClass('hide');
                $(this).parent().nextAll(bodyName).first().removeClass('hide');
            } else if ($(this).val() == "body-form-data") {
                $(selectName).val('undefined');
                $(this).val('body-form-data');
                $(bodyName).addClass('hide');
                $(paramName).removeClass('hide');
            } else {
                $(this).parent().nextAll(paramName).first().removeClass('hide')
                $(this).parent().nextAll(bodyName).first().addClass('hide');
            }
            $(this).prev('.sample-request-switch').prop('checked', true);
        });

        // sample request switch
        $('.sample-request-switch').click(function (e) {
            var paramName = '.' + $(this).attr('name') + '-fields';
            var bodyName = '.' + $(this).attr('name') + '-body';
            var select = $(this).next('.' + $(this).attr('name') + '-select').val();
            if($(this).prop("checked")){
                if (select == 'body-json'){
                    $(this).parent().nextAll(bodyName).first().removeClass('hide');
                }else {
                    $(this).parent().nextAll(paramName).first().removeClass('hide');
                }
            }else {
                if (select == 'body-json'){
                    $(this).parent().nextAll(bodyName).first().addClass('hide');
                }else {
                    $(this).parent().nextAll(paramName).first().addClass('hide');
                }
            }
        });

        if (apiProject.template.aloneDisplay){
            //show group
            $('.show-group').click(function () {
                var apiGroup = '.' + $(this).attr('data-group') + '-group';
                var apiGroupArticle = '.' + $(this).attr('data-group') + '-article';
                $(".show-api-group").addClass('hide');
                $(apiGroup).removeClass('hide');
                $(".show-api-article").addClass('hide');
                $(apiGroupArticle).removeClass('hide');
            });

            //show api
            $('.show-api').click(function () {
                var apiName = '.' + $(this).attr('data-name') + '-article';
                var apiGroup = '.' + $(this).attr('data-group') + '-group';
                $(".show-api-group").addClass('hide');
                $(apiGroup).removeClass('hide');
                $(".show-api-article").addClass('hide');
                $(apiName).removeClass('hide');
            });
        }

        // call scrollspy refresh method
        $(window).scrollspy('refresh');

        // init modules
        sampleRequest.initDynamic();
        Prism.highlightAll()
    }
    initDynamic();

    if (apiProject.template.aloneDisplay) {
        var hashVal = window.location.hash;
        if (hashVal != null && hashVal.length !== 0) {
            $("." + hashVal.slice(1) + "-init").click();
        }
    }

    //
    // HTML-Template specific jQuery-Functions
    //
    // Change Main Version
    function setMainVersion(selectedVersion) {
        if (typeof(selectedVersion) === 'undefined') {
            selectedVersion = $('#version strong').html();
        }
        else {
            $('#version strong').html(selectedVersion);
        }

        // hide all
        $('article').addClass('hide');
        $('#sidenav li:not(.nav-fixed)').addClass('hide');

        // show 1st equal or lower Version of each entry
        $('article[data-version]').each(function(index) {
            var group = $(this).data('group');
            var name = $(this).data('name');
            var version = $(this).data('version');

            if (semver.lte(version, selectedVersion)) {
                if ($('article[data-group=\'' + group + '\'][data-name=\'' + name + '\']:visible').length === 0) {
                    // enable Article
                    $('article[data-group=\'' + group + '\'][data-name=\'' + name + '\'][data-version=\'' + version + '\']').removeClass('hide');
                    // enable Navigation
                    $('#sidenav li[data-group=\'' + group + '\'][data-name=\'' + name + '\'][data-version=\'' + version + '\']').removeClass('hide');
                    $('#sidenav li.nav-header[data-group=\'' + group + '\']').removeClass('hide');
                }
            }
        });

        // show 1st equal or lower Version of each entry
        $('article[data-version]').each(function(index) {
            var group = $(this).data('group');
            $('section#api-' + group).removeClass('hide');
            if ($('section#api-' + group + ' article:visible').length === 0) {
                $('section#api-' + group).addClass('hide');
            } else {
                $('section#api-' + group).removeClass('hide');
            }
        });

        initDynamic();
        return;
    }
    setMainVersion();

    $('#versions li.version a').on('click', function(e) {
        e.preventDefault();

        setMainVersion($(this).html());
    });

    // compare all article with their predecessor
    $('#compareAllWithPredecessor').on('click', changeAllVersionCompareTo);

    // change version of an article
    $('article .versions li.version a').on('click', changeVersionCompareTo);

    // compare url-parameter
    $.urlParam = function(name) {
        var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        return (results && results[1]) ? results[1] : null;
    };

    if ($.urlParam('compare')) {
        // URL Paramter ?compare=1 is set
        $('#compareAllWithPredecessor').trigger('click');
    }

    // Quick jump on page load to hash position.
    // Should happen after setting the main version
    // and after triggering the click on the compare button,
    // as these actions modify the content
    // and would make it jump to the wrong position or not jump at all.
    if (window.location.hash) {
        var id = decodeURI(window.location.hash);
        if ($(id).length > 0)
            $('html,body').animate({ scrollTop: parseInt($(id).offset().top) }, 0);
    }

    /**
     * Initialize search
     */
    var options = {
      valueNames: [ 'nav-list-item','nav-list-url-item']
    };
    var endpointsList = new List('scrollingNav', options);

    /**
     * Set initial focus to search input
     */
    $('#scrollingNav .sidenav-search input.search').focus();

    /**
     * Detect ESC key to reset search
     */
    $(document).keyup(function(e) {
      if (e.keyCode === 27) $('span.search-reset').click();
    });

    /**
     * Search reset
     */
    $('span.search-reset').on('click', function() {
      $('#scrollingNav .sidenav-search input.search')
        .val("")
        .focus()
      ;
      endpointsList.search();
    });

    /**
     * Change version of an article to compare it to an other version.
     */
    function changeVersionCompareTo(e) {
        e.preventDefault();

        var $root = $(this).parents('article');
        var selectedVersion = $(this).html();
        var $button = $root.find('.version');
        var currentVersion = $button.find('strong').html();
        $button.find('strong').html(selectedVersion);

        var group = $root.data('group');
        var name = $root.data('name');
        var version = $root.data('version');

        var compareVersion = $root.data('compare-version');

        if (compareVersion === selectedVersion)
            return;

        if ( ! compareVersion && version == selectedVersion)
            return;

        if (compareVersion && articleVersions[group][name][0] === selectedVersion || version === selectedVersion) {
            // the version of the entry is set to the highest version (reset)
            resetArticle(group, name, version);
        } else {
            var $compareToArticle = $('article[data-group=\'' + group + '\'][data-name=\'' + name + '\'][data-version=\'' + selectedVersion + '\']');

            var sourceEntry = {};
            var compareEntry = {};
            $.each(apiByGroupAndName[group][name], function(index, entry) {
                if (entry.version === version)
                    sourceEntry = entry;
                if (entry.version === selectedVersion)
                    compareEntry = entry;
            });

            var fields = {
                article: sourceEntry,
                compare: compareEntry,
                versions: articleVersions[group][name]
            };

            // add unique id
            // TODO: replace all group-name-version in template with id.
            fields.article.id = fields.article.group + '-' + fields.article.name + '-' + fields.article.version;
            fields.article.id = fields.article.id.replace(/\./g, '_');

            fields.compare.id = fields.compare.group + '-' + fields.compare.name + '-' + fields.compare.version;
            fields.compare.id = fields.compare.id.replace(/\./g, '_');

            var entry = sourceEntry;
            if (entry.parameter && entry.parameter.fields)
                fields._hasTypeInParameterFields = _hasTypeInFields(entry.parameter.fields);

            if (entry.error && entry.error.fields)
                fields._hasTypeInErrorFields = _hasTypeInFields(entry.error.fields);

            if (entry.success && entry.success.fields)
                fields._hasTypeInSuccessFields = _hasTypeInFields(entry.success.fields);

            if (entry.info && entry.info.fields)
                fields._hasTypeInInfoFields = _hasTypeInFields(entry.info.fields);

            var entry = compareEntry;
            if (fields._hasTypeInParameterFields !== true && entry.parameter && entry.parameter.fields)
                fields._hasTypeInParameterFields = _hasTypeInFields(entry.parameter.fields);

            if (fields._hasTypeInErrorFields !== true && entry.error && entry.error.fields)
                fields._hasTypeInErrorFields = _hasTypeInFields(entry.error.fields);

            if (fields._hasTypeInSuccessFields !== true && entry.success && entry.success.fields)
                fields._hasTypeInSuccessFields = _hasTypeInFields(entry.success.fields);

            if (fields._hasTypeInInfoFields !== true && entry.info && entry.info.fields)
                fields._hasTypeInInfoFields = _hasTypeInFields(entry.info.fields);

            var content = templateCompareArticle(fields);
            $root.after(content);
            var $content = $root.next();

            // Event on.click re-assign
            $content.find('.versions li.version a').on('click', changeVersionCompareTo);

            // select navigation
            $('#sidenav li[data-group=\'' + group + '\'][data-name=\'' + name + '\'][data-version=\'' + currentVersion + '\']').addClass('has-modifications');

            $root.remove();
            // TODO: on change main version or select the highest version re-render
        }

        initDynamic();
    }

    /**
     * Compare all currently selected Versions with their predecessor.
     */
    function changeAllVersionCompareTo(e) {
        e.preventDefault();
        $('article:visible .versions').each(function(){
            var $root = $(this).parents('article');
            var currentVersion = $root.data('version');
            var $foundElement = null;
            $(this).find('li.version a').each(function() {
                var selectVersion = $(this).html();
                if (selectVersion < currentVersion && ! $foundElement)
                    $foundElement = $(this);
            });

            if($foundElement)
                $foundElement.trigger('click');
        });
        initDynamic();
    }

    /**
     * Sort the fields.
     */
    function sortFields(fields_object) {
        $.each(fields_object, function (key, fields) {
            // Find only object fields
            var objects = fields.filter(function(item) { return item.type === "Object"; });

            // Check if has any object
            if (objects.length === 0) {
                return;
            }

            // Iterate over all objects
            for(var object of objects) {
                // Retrieve the index
                var index = fields.indexOf(object);

                // Find all child fields for this object
                var objectFields = fields.filter(function(item) { return item.field.indexOf(object.field + ".") > -1; });

                // Get the child index
                var firstIndex = fields.indexOf(objectFields[0]);

                // Put the object it before the first child index
                fields.splice(index, 1);
                fields.splice(firstIndex, 0, object);

                // Startup the last index with the object index 
                var lastIndex = firstIndex;

                // Iterate over all children
                for(var child of objectFields) {
                    lastIndex++;

                    // Retrieve the index
                    var childIndex = fields.indexOf(child);

                    // Put it after the object declaration
                    fields.splice(childIndex, 1);
                    fields.splice(lastIndex, 0, child);
                }
            }

            // Retrieve the first object field index
            var firstObjectIndex = fields.indexOf(objects[0]);

            // Find all non-object fields that doesn't contain dot notation
            var nonObjects = fields.filter(function(item) { return item.field.indexOf(".") === -1 && item.type !== "Object"; });

            // Iterate over all non-objects
            for(var nonObject of nonObjects) {
                // Put it before the first object field
                var index = fields.indexOf(nonObject);
                fields.splice(index, 1);
                fields.splice(firstObjectIndex, 0, nonObject);
            }
        });
    }

    /**
     * Add article settings.
     */
    function addArticleSettings(fields, entry) {
        // add unique id
        // TODO: replace all group-name-version in template with id.
        fields.id = fields.article.group + '-' + fields.article.name + '-' + fields.article.version;
        fields.id = fields.id.replace(/\./g, '_');

        if (entry.header && entry.header.fields) {
            sortFields(entry.header.fields);
            fields._hasTypeInHeaderFields = _hasTypeInFields(entry.header.fields);
        }

        if (entry.parameter && entry.parameter.fields) {
            sortFields(entry.parameter.fields);
            fields._hasTypeInParameterFields = _hasTypeInFields(entry.parameter.fields);
        }

        if (entry.error && entry.error.fields) {
            sortFields(entry.error.fields);
            fields._hasTypeInErrorFields = _hasTypeInFields(entry.error.fields);
        }

        if (entry.success && entry.success.fields) {
            sortFields(entry.success.fields);
            fields._hasTypeInSuccessFields = _hasTypeInFields(entry.success.fields);
        }

        if (entry.info && entry.info.fields) {
            sortFields(entry.info.fields);
            fields._hasTypeInInfoFields = _hasTypeInFields(entry.info.fields);
        }

        // add template settings
        fields.template = apiProject.template;
    }

    /**
     * Render Article.
     */
    function renderArticle(group, name, version) {
        var entry = {};
        $.each(apiByGroupAndName[group][name], function(index, currentEntry) {
            if (currentEntry.version === version)
                entry = currentEntry;
        });
        var fields = {
            article: entry,
            versions: articleVersions[group][name]
        };

        addArticleSettings(fields, entry);

        return templateArticle(fields);
    }

    /**
     * Render original Article and remove the current visible Article.
     */
    function resetArticle(group, name, version) {
        var $root = $('article[data-group=\'' + group + '\'][data-name=\'' + name + '\']:visible');
        var content = renderArticle(group, name, version);

        $root.after(content);
        var $content = $root.next();

        // Event on.click needs to be reassigned (should actually work with on ... automatically)
        $content.find('.versions li.version a').on('click', changeVersionCompareTo);

        $('#sidenav li[data-group=\'' + group + '\'][data-name=\'' + name + '\'][data-version=\'' + version + '\']').removeClass('has-modifications');

        $root.remove();
        return;
    }

    /**
     * Return ordered entries by custom order and append not defined entries to the end.
     * @param  {String[]} elements
     * @param  {String[]} order
     * @param  {String}   splitBy
     * @return {String[]} Custom ordered list.
     */
    function sortByOrder(elements, order, splitBy) {
        var results = [];
        order.forEach (function(name) {
            if (splitBy)
                elements.forEach (function(element) {
                    var parts = element.split(splitBy);
                    var key = parts[0]; // reference keep for sorting
                    if (key == name || parts[1] == name)
                        results.push(element);
                });
            else
                elements.forEach (function(key) {
                    if (key == name)
                        results.push(name);
                });
        });
        // Append all other entries that ar not defined in order
        elements.forEach(function(element) {
            if (results.indexOf(element) === -1)
                results.push(element);
        });
        return results;
    }
    Prism.highlightAll()
}
