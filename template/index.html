<!DOCTYPE html>
<html>
<head>
  <title>Loading...</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <link href="vendor/bootstrap.min.css" rel="stylesheet" media="screen">
  <link href="vendor/prettify.css" rel="stylesheet" media="screen">
  <link href="css/style.css" rel="stylesheet" media="screen, print">
  <link href="img/favicon.ico" rel="icon" type="image/x-icon">
  <script src="vendor/polyfill.js"></script>
</head>
<body>

<script id="template-sidenav" type="text/x-handlebars-template">
<nav id="scrollingNav">
  <ul class="sidenav nav nav-list">
  {{#each nav}}
    {{#if title}}
      {{#if isHeader}}
        {{#if isFixed}}
          <li class="nav-fixed nav-header" data-group="{{group}}"><a href="#api-{{group}}">{{underscoreToSpace title}}</a></li>
        {{else}}
          <li class="nav-header" data-group="{{group}}"><a href="#api-{{group}}">{{underscoreToSpace title}}</a></li>
        {{/if}}
      {{else}}
        <li {{#if hidden}}class="hide" {{/if}}data-group="{{group}}" data-name="{{name}}" data-version="{{version}}">
          <a href="#api-{{group}}-{{name}}">{{title}}</a>
        </li>
      {{/if}}
    {{/if}}
  {{/each}}
  </ul>
</nav>
</script>

<script id="template-project" type="text/x-handlebars-template">
  <div class="pull-left">
    <h1>{{name}}</h1>
    {{#if description}}<h2>{{{nl2br description}}}</h2>{{/if}}
  </div>
  {{#if template.withCompare}}
  <div class="pull-right">
    <div class="btn-group">
      <button id="version" class="btn btn-large dropdown-toggle" data-toggle="dropdown">
        <strong>{{version}}</strong> <span class="caret"></span>
      </button>
      <ul id="versions" class="dropdown-menu open-left">
          <li><a id="compareAllWithPredecessor" href="#">{{__ "Compare all with predecessor"}}</a></li>
          <li class="divider"></li>
          <li class="disabled"><a href="#">{{__ "show up to version:"}}</a></li>
  {{#each versions}}
        <li class="version"><a href="#">{{this}}</a></li>
  {{/each}}
      </ul>
    </div>
  </div>
  {{/if}}
  <div class="clearfix"></div>
</script>

<script id="template-header" type="text/x-handlebars-template">
  {{#if content}}
    <div id="api-_">{{{content}}}</div>
  {{/if}}
</script>

<script id="template-footer" type="text/x-handlebars-template">
  {{#if content}}
    <div id="api-_footer">{{{content}}}</div>
  {{/if}}
</script>

<script id="template-generator" type="text/x-handlebars-template">
  {{#if template.withGenerator}}
    {{#if generator}}
      <div class="content">
        {{__ "Generated with"}} <a href="{{{generator.url}}}">{{{generator.name}}}</a> {{{generator.version}}} - {{{generator.time}}}
      </div>
    {{/if}}
  {{/if}}
</script>

<script id="template-sections" type="text/x-handlebars-template">
  <section id="api-{{group}}">
    <h1>{{underscoreToSpace title}}</h1>
    {{#if description}}
      <p>{{{nl2br description}}}</p>
    {{/if}}
    {{#each articles}}
      <div id="api-{{group}}-{{name}}">
        {{{article}}}
      </div>
    {{/each}}
  </section>
</script>

<script id="template-article" type="text/x-handlebars-template">
  <article id="api-{{article.group}}-{{article.name}}-{{article.version}}" {{#if hidden}}class="hide"{{/if}} data-group="{{article.group}}" data-name="{{article.name}}" data-version="{{article.version}}">
    <div class="pull-left">
      <h1>{{article.groupTitle}}{{#if article.title}} - {{article.title}}{{/if}}</h1>
    </div>
    {{#if template.withCompare}}
    <div class="pull-right">
      <div class="btn-group">
        <button class="version btn dropdown-toggle" data-toggle="dropdown">
          <strong>{{article.version}}</strong> <span class="caret"></span>
        </button>
        <ul class="versions dropdown-menu open-left">
          <li class="disabled"><a href="#">{{__ "compare changes to:"}}</a></li>
  {{#each versions}}
          <li class="version"><a href="#">{{this}}</a></li>
  {{/each}}
        </ul>
      </div>
    </div>
    {{/if}}
    <div class="clearfix"></div>

    {{#if article.description}}
      <p>{{{nl2br article.description}}}</p>
    {{/if}}

    <pre class="prettyprint language-html" data-type="{{toLowerCase article.type}}"><code>{{article.url}}</code></pre>

    {{#if article.permission}}
      <p>
        {{__ "Permission:"}}
        {{#each article.permission}}
          {{name}}
          {{#if title}}
            &nbsp;<a href="#" data-toggle="popover" data-placement="right" data-html="true" data-content="{{nl2br description}}" title="" data-original-title="{{title}}"><span class="label label-info"><i class="icon icon-info-sign icon-white"></i></span></a>
            {{#unless @last}}, {{/unless}}
          {{/if}}
        {{/each}}
      </p>
    {{/if}}

    {{#if_gt article.examples.length compare=0}}
      <ul class="nav nav-tabs nav-tabs-examples">
        {{#each article.examples}}
          <li{{#if_eq @index compare=0}} class="active"{{/if_eq}}>
            <a href="#examples-{{../id}}-{{@index}}">{{title}}</a>
          </li>
        {{/each}}
      </ul>

      <div class="tab-content">
      {{#each article.examples}}
        <div class="tab-pane{{#if_eq @index compare=0}} active{{/if_eq}}" id="examples-{{../id}}-{{@index}}">
          <pre class="prettyprint language-{{type}}" data-type="{{type}}"><code>{{content}}</code></pre>
        </div>
      {{/each}}
      </div>
    {{/if_gt}}

    {{subTemplate "article-param-block" params=article.header _hasType=_hasTypeInHeaderFields section="header"}}
    {{subTemplate "article-param-block" params=article.parameter _hasType=_hasTypeInParameterFields section="parameter"}}
    {{subTemplate "article-param-block" params=article.success _hasType=_hasTypeInSuccessFields section="success"}}
    {{subTemplate "article-param-block" params=article.error _col1="Name" _hasType=_hasTypeInErrorFields section="error"}}

    {{subTemplate "article-sample-request" article=article id=id}}

  </article>
</script>

<script id="template-article-param-block" type="text/x-handlebars-template">
  {{#if params}}
    {{#each params.fields}}
      <h2>{{__ @key}}</h2>
      <table>
        <thead>
          <tr>
          <th style="width: 30%">{{#if ../../_col1}}{{__ ../../_col1}}{{else}}{{__ "Field"}}{{/if}}</th>
            {{#if ../../_hasType}}<th style="width: 10%">{{__ "Type"}}</th>{{/if}}
            <th style="width: {{#if _hasType}}60%{{else}}70%{{/if}}">{{__ "Description"}}</th>
          </tr>
        </thead>
        <tbody>
      {{#each this}}
          <tr>
            <td class="code">{{{splitFill field "." "&nbsp;&nbsp;"}}}{{#if optional}} <span class="label label-optional">{{__ "optional"}}</span>{{/if}}</td>
            {{#if ../../_hasType}}
              <td>
                {{{type}}}
              </td>
            {{/if}}
            <td>
            {{{nl2br description}}}
            {{#if defaultValue}}<p class="default-value">{{__ "Default value:"}} <code>{{{defaultValue}}}</code></p>{{/if}}
            {{#if size}}<p class="type-size">{{__ "Size range:"}} <code>{{{size}}}</code></p>{{/if}}
            {{#if allowedValues}}<p class="type-size">{{__ "Allowed values:"}}
              {{#each allowedValues}}
                <code>{{{this}}}</code>{{#unless @last}}, {{/unless}}
              {{/each}}
              </p>
            {{/if}}
            </td>
          </tr>
      {{/each}}
        </tbody>
      </table>
    {{/each}}

    {{#if_gt params.examples.length compare=0}}
      <ul class="nav nav-tabs nav-tabs-examples">
        {{#each params.examples}}
          <li{{#if_eq @index compare=0}} class="active"{{/if_eq}}>
            <a href="#{{../section}}-examples-{{../id}}-{{@index}}">{{title}}</a>
          </li>
        {{/each}}
      </ul>

      <div class="tab-content">
      {{#each params.examples}}
        <div class="tab-pane{{#if_eq @index compare=0}} active{{/if_eq}}" id="{{../section}}-examples-{{../id}}-{{@index}}">
        <pre class="prettyprint language-{{type}}" data-type="{{type}}"><code>{{content}}</code></pre>
        </div>
      {{/each}}
      </div>
    {{/if_gt}}

  {{/if}}
</script>

<script id="template-article-sample-request" type="text/x-handlebars-template">
    {{#if article.sampleRequest}}
      <h2>{{__ "Send a Sample Request"}}</h2>
      <form class="form-horizontal">
        <fieldset>
          <div class="control-group">
            <div class="controls">
              <div class="input-prepend">>
                <span class="add-on">{{__ "url"}}</span>
                <input type="text" class="input-xxlarge sample-request-url" value="{{article.sampleRequest.0.url}}" />
              </div>
            </div>
          </div>

      {{#if article.header}}
        {{#if article.header.fields}}
          <h3>{{__ "Headers"}}</h3>
          {{#each article.header.fields}}
            <h4><input type="radio" data-sample-request-header-group-id="sample-request-header-{{@index}}" name="{{../id}}-sample-request-header" value="{{@index}}" class="sample-request-header sample-request-switch"{{#if_eq @index compare=0}} checked{{/if_eq}}> {{@key}}</h4>
            <div class="{{../id}}-sample-request-header-fields{{#if_gt @index compare=0}} hide{{/if_gt}}">
              {{#each this}}
              <div class="control-group">
                <label class="control-label" for="sample-request-header-field-{{field}}">{{field}}</label>
                <div class="controls">
                  <div class="input-append">>
                    <input type="text" placeholder="{{field}}" class="input-xxlarge sample-request-header" data-sample-request-header-name="{{field}}" data-sample-request-header-group="sample-request-header-{{@../index}}">
                    <span class="add-on">{{{type}}}</span>
                  </div>
                </div>
              </div>
              {{/each}}
            </div>
          {{/each}}
        {{/if}}
      {{/if}}

      {{#if article.parameter}}
        {{#if article.parameter.fields}}
          <h3>{{__ "Parameters"}}</h3>
          {{#each article.parameter.fields}}
            <h4><input type="radio" data-sample-request-param-group-id="sample-request-param-{{@index}}"  name="{{../id}}-sample-request-param" value="{{@index}}" class="sample-request-param sample-request-switch"{{#if_eq @index compare=0}} checked{{/if_eq}}> {{@key}}</h4>
            <div class="{{../id}}-sample-request-param-fields{{#if_gt @index compare=0}} hide{{/if_gt}}">
              {{#each this}}
              <div class="control-group">
                <label class="control-label" for="sample-request-param-field-{{field}}">{{field}}</label>
                <div class="controls">
                  <div class="input-append">>
                    <input type="text" placeholder="{{field}}" class="input-xxlarge sample-request-param" data-sample-request-param-name="{{field}}" data-sample-request-param-group="sample-request-param-{{@../index}}">
                    <span class="add-on">{{{type}}}</span>
                  </div>
                </div>
              </div>
              {{/each}}
            </div>
          {{/each}}
        {{/if}}
      {{/if}}

          <div class="control-group">
            <div class="controls">
              <button class="btn btn-default sample-request-send" data-sample-request-type="{{article.type}}">{{__ "Send"}}</button>
            </div>
          </div>

          <div class="sample-request-response" style="display: none;">
            <h3>
              {{__ "Response"}}
              <button class="btn btn-small btn-default pull-right sample-request-clear">X</button>
            </h3>
            <pre class="prettyprint language-json" data-type="json"><code class="sample-request-response-json"></code></pre>
          </div>

        </fieldset>
      </form>
    {{/if}}
</script>

<script id="template-compare-article" type="text/x-handlebars-template">
  <article id="api-{{article.group}}-{{article.name}}-{{article.version}}" {{#if hidden}}class="hide"{{/if}} data-group="{{article.group}}" data-name="{{article.name}}" data-version="{{article.version}}" data-compare-version="{{compare.version}}">
    <div class="pull-left">
      <h1>{{underscoreToSpace article.group}} - {{{showDiff article.title compare.title}}}</h1>
    </div>

    <div class="pull-right">
      <div class="btn-group">
        <button class="btn btn-success" disabled>
          <strong>{{article.version}}</strong> {{__ "compared to"}}
        </button>
        <button class="version btn btn-danger dropdown-toggle" data-toggle="dropdown">
          <strong>{{compare.version}}</strong> <span class="caret"></span>
        </button>
        <ul class="versions dropdown-menu open-left">
          <li class="disabled"><a href="#">{{__ "compare changes to:"}}</a></li>
          <li class="divider"></li>
  {{#each versions}}
          <li class="version"><a href="#">{{this}}</a></li>
  {{/each}}
        </ul>
      </div>
    </div>
    <div class="clearfix"></div>

    {{#if article.description}}
      <p>{{{showDiff article.description compare.description "nl2br"}}}</p>
    {{else}}
      {{#if compare.description}}
      <p>{{{showDiff "" compare.description "nl2br"}}}</p>
      {{/if}}
    {{/if}}

    <pre class="prettyprint language-html" data-type="{{toLowerCase article.type}}"><code>{{{showDiff article.url compare.url}}}</code></pre>

    {{subTemplate "article-compare-permission" article=article compare=compare}}

    <ul class="nav nav-tabs nav-tabs-examples">
    {{#each_compare_title article.examples compare.examples}}

      {{#if typeSame}}
        <li{{#if_eq index compare=0}} class="active"{{/if_eq}}>
          <a href="#compare-examples-{{../../article.id}}-{{index}}">{{{showDiff source.title compare.title}}}</a>
        </li>
      {{/if}}

      {{#if typeIns}}
        <li{{#if_eq index compare=0}} class="active"{{/if_eq}}>
          <a href="#compare-examples-{{../../article.id}}-{{index}}"><ins>{{{source.title}}}</ins></a>
        </li>
      {{/if}}

      {{#if typeDel}}
        <li{{#if_eq index compare=0}} class="active"{{/if_eq}}>
          <a href="#compare-examples-{{../../article.id}}-{{index}}"><del>{{{compare.title}}}</del></a>
        </li>
      {{/if}}

    {{/each_compare_title}}
    </ul>

    <div class="tab-content">
    {{#each_compare_title article.examples compare.examples}}

      {{#if typeSame}}
        <div class="tab-pane{{#if_eq index compare=0}} active{{/if_eq}}" id="compare-examples-{{../../article.id}}-{{index}}">
          <pre class="prettyprint language-{{source.type}}" data-type="{{source.type}}"><code>{{{showDiff source.content compare.content}}}</code></pre>
        </div>
      {{/if}}

      {{#if typeIns}}
        <div class="tab-pane{{#if_eq index compare=0}} active{{/if_eq}}" id="compare-examples-{{../../article.id}}-{{index}}">
          <pre class="prettyprint language-{{source.type}}" data-type="{{source.type}}"><code>{{{source.content}}}</code></pre>
        </div>
      {{/if}}

      {{#if typeDel}}
        <div class="tab-pane{{#if_eq index compare=0}} active{{/if_eq}}" id="compare-examples-{{../../article.id}}-{{index}}">
          <pre class="prettyprint language-{{source.type}}" data-type="{{compare.type}}"><code>{{{compare.content}}}</code></pre>
        </div>
      {{/if}}

    {{/each_compare_title}}
    </div>

    {{subTemplate "article-compare-param-block" source=article.parameter compare=compare.parameter _hasType=_hasTypeInParameterFields section="parameter"}}
    {{subTemplate "article-compare-param-block" source=article.success compare=compare.success _hasType=_hasTypeInSuccessFields section="success"}}
    {{subTemplate "article-compare-param-block" source=article.error compare=compare.error _col1="Name" _hasType=_hasTypeInErrorFields section="error"}}

    {{subTemplate "article-sample-request" article=article id=id}}

  </article>
</script>

<script id="template-article-compare-permission" type="text/x-handlebars-template">
  {{#each_compare_list_field article.permission compare.permission field="name"}}
    {{#if source}}
      {{#if typeSame}}
        {{source.name}}
        {{#if source.title}}
          &nbsp;<a href="#" data-toggle="popover" data-placement="right" data-html="true" data-content="{{nl2br source.description}}" title="" data-original-title="{{source.title}}"><span class="label label-info"><i class="icon icon-info-sign icon-white"></i></span></a>
          {{#unless _last}}, {{/unless}}
        {{/if}}
      {{/if}}

      {{#if typeIns}}
        <ins>{{source.name}}</ins>
        {{#if source.title}}
          &nbsp;<a href="#" data-toggle="popover" data-placement="right" data-html="true" data-content="{{nl2br source.description}}" title="" data-original-title="{{source.title}}"><span class="label label-info"><i class="icon icon-info-sign icon-white"></i></span></a>
          {{#unless _last}}, {{/unless}}
        {{/if}}
      {{/if}}

      {{#if typeDel}}
        <del>{{source.name}}</del>
        {{#if source.title}}
          &nbsp;<a href="#" data-toggle="popover" data-placement="right" data-html="true" data-content="{{nl2br source.description}}" title="" data-original-title="{{source.title}}"><span class="label label-info"><i class="icon icon-info-sign icon-white"></i></span></a>
          {{#unless _last}}, {{/unless}}
        {{/if}}
      {{/if}}
    {{else}}
      {{#if typeSame}}
        {{compare.name}}
        {{#if compare.title}}
          &nbsp;<a href="#" data-toggle="popover" data-placement="right" data-html="true" data-content="{{nl2br compare.description}}" title="" data-original-title="{{compare.title}}"><span class="label label-info"><i class="icon icon-info-sign icon-white"></i></span></a>
          {{#unless _last}}, {{/unless}}
        {{/if}}
      {{/if}}

      {{#if typeIns}}
        <ins>{{compare.name}}</ins>
        {{#if compare.title}}
          &nbsp;<a href="#" data-toggle="popover" data-placement="right" data-html="true" data-content="{{nl2br compare.description}}" title="" data-original-title="{{compare.title}}"><span class="label label-info"><i class="icon icon-info-sign icon-white"></i></span></a>
          {{#unless _last}}, {{/unless}}
        {{/if}}
      {{/if}}

      {{#if typeDel}}
        <del>{{compare.name}}</del>
        {{#if compare.title}}
          &nbsp;<a href="#" data-toggle="popover" data-placement="right" data-html="true" data-content="{{nl2br compare.description}}" title="" data-original-title="{{compare.title}}"><span class="label label-info"><i class="icon icon-info-sign icon-white"></i></span></a>
          {{#unless _last}}, {{/unless}}
        {{/if}}
      {{/if}}
    {{/if}}
  {{/each_compare_list_field}}
</script>

<script id="template-article-compare-param-block" type="text/x-handlebars-template">
  {{#if source}}
    {{#each_compare_keys source.fields compare.fields}}
      {{#if typeSame}}
        <h2>{{__ source.key}}</h2>
        <table>
        <thead>
          <tr>
            <th style="width: 30%">{{#if ../../_col1}}{{__ ../../_col1}}{{else}}{{__ "Field"}}{{/if}}</th>
            {{#if ../../_hasType}}<th style="width: 10%">{{__ "Type"}}</th>{{/if}}
            <th style="width: {{#if _hasType}}60%{{else}}70%{{/if}}">{{__ "Description"}}</th>
          </tr>
        </thead>
        {{subTemplate "article-compare-param-block-body" source=source.value compare=compare.value _hasType=../../_hasType}}
        </table>
      {{/if}}

      {{#if typeIns}}
        <h2><ins>{{__ source.key}}</ins></h2>
        <table class="ins">
        <thead>
          <tr>
            <th style="width: 30%">{{#if ../../_col1}}{{__ ../../_col1}}{{else}}{{__ "Field"}}{{/if}}</th>
            {{#if ../../_hasType}}<th style="width: 10%">{{__ "Type"}}</th>{{/if}}
            <th style="width: {{#if _hasType}}60%{{else}}70%{{/if}}">{{__ "Description"}}</th>
          </tr>
        </thead>
        {{subTemplate "article-compare-param-block-body" source=source.value compare=source.value _hasType=../../_hasType}}
        </table>
      {{/if}}

      {{#if typeDel}}
        <h2><del>{{__ compare.key}}</del></h2>
        <table class="del">
        <thead>
          <tr>
            <th style="width: 30%">{{#if ../../_col1}}{{__ ../../_col1}}{{else}}{{__ "Field"}}{{/if}}</th>
            {{#if ../../_hasType}}<th style="width: 10%">{{__ "Type"}}</th>{{/if}}
            <th style="width: {{#if _hasType}}60%{{else}}70%{{/if}}">{{__ "Description"}}</th>
          </tr>
        </thead>
        {{subTemplate "article-compare-param-block-body" source=compare.value compare=compare.value _hasType=../../_hasType}}
        </table>
      {{/if}}
    {{/each_compare_keys}}

    <ul class="nav nav-tabs nav-tabs-examples">
    {{#each_compare_title source.examples compare.examples}}

      {{#if typeSame}}
        <li{{#if_eq index compare=0}} class="active"{{/if_eq}}>
          <a href="#{{../../section}}-compare-examples-{{../../article.id}}-{{index}}">{{{showDiff source.title compare.title}}}</a>
        </li>
      {{/if}}

      {{#if typeIns}}
        <li{{#if_eq index compare=0}} class="active"{{/if_eq}}>
          <a href="#{{../../section}}-compare-examples-{{../../article.id}}-{{index}}"><ins>{{{source.title}}}</ins></a>
        </li>
      {{/if}}

      {{#if typeDel}}
        <li{{#if_eq index compare=0}} class="active"{{/if_eq}}>
          <a href="#{{../../section}}-compare-examples-{{../../article.id}}-{{index}}"><del>{{{compare.title}}}</del></a>
        </li>
      {{/if}}

    {{/each_compare_title}}
    </ul>

    <div class="tab-content">
    {{#each_compare_title source.examples compare.examples}}

      {{#if typeSame}}
        <div class="tab-pane{{#if_eq index compare=0}} active{{/if_eq}}" id="{{../../section}}-compare-examples-{{../../article.id}}-{{index}}">
          <pre class="prettyprint language-{{source.type}}" data-type="{{source.type}}"><code>{{{showDiff source.content compare.content}}}</code></pre>
        </div>
      {{/if}}

      {{#if typeIns}}
        <div class="tab-pane{{#if_eq index compare=0}} active{{/if_eq}}" id="{{../../section}}-compare-examples-{{../../article.id}}-{{index}}">
          <pre class="prettyprint language-{{source.type}}" data-type="{{source.type}}"><code>{{{source.content}}}</code></pre>
        </div>
      {{/if}}

      {{#if typeDel}}
        <div class="tab-pane{{#if_eq index compare=0}} active{{/if_eq}}" id="{{../../section}}-compare-examples-{{../../article.id}}-{{index}}">
          <pre class="prettyprint language-{{source.type}}" data-type="{{compare.type}}"><code>{{{compare.content}}}</code></pre>
        </div>
      {{/if}}

    {{/each_compare_title}}
    </div>

  {{/if}}
</script>

<script id="template-article-compare-param-block-body" type="text/x-handlebars-template">
  <tbody>
    {{#each_compare_field source compare}}
      {{#if typeSame}}
        <tr>
          <td class="code">
            {{{splitFill source.field "." "&nbsp;&nbsp;"}}}
            {{#if source.optional}}
              {{#if compare.optional}} <span class="label label-optional">{{__ "optional"}}</span>
              {{else}} <span class="label label-optional label-ins">{{__ "optional"}}</span>
              {{/if}}
            {{else}}
              {{#if compare.optional}} <span class="label label-optional label-del">{{__ "optional"}}</span>{{/if}}
            {{/if}}
          </td>

        {{#if source.type}}
          {{#if compare.type}}
          <td>{{{showDiff source.type compare.type}}}</td>
          {{else}}
          <td>{{{source.type}}}</td>
          {{/if}}
        {{else}}
          {{#if compare.type}}
          <td>{{{compare.type}}}</td>
          {{else}}
            {{#if ../../../../_hasType}}<td></td>{{/if}}
          {{/if}}
        {{/if}}
          <td>
            {{{showDiff source.description compare.description "nl2br"}}}
            {{#if source.defaultValue}}<p class="default-value">{{__ "Default value:"}} <code>{{{showDiff source.defaultValue compare.defaultValue}}}</code><p>{{/if}}
          </td>
        </tr>
      {{/if}}

      {{#if typeIns}}
        <tr class="ins">
          <td class="code">
            {{{splitFill source.field "." "&nbsp;&nbsp;"}}}
            {{#if source.optional}} <span class="label label-optional label-ins">{{__ "optional"}}</span>{{/if}}
          </td>

        {{#if source.type}}
          <td>{{{source.type}}}</td>
        {{else}}
          {{{typRowTd}}}
        {{/if}}

          <td>
            {{{nl2br source.description}}}
            {{#if source.defaultValue}}<p class="default-value">{{__ "Default value:"}} <code>{{{source.defaultValue}}}</code><p>{{/if}}
          </td>
        </tr>
      {{/if}}

      {{#if typeDel}}
        <tr class="del">
          <td class="code">
            {{{splitFill compare.field "." "&nbsp;&nbsp;"}}}
            {{#if compare.optional}} <span class="label label-optional label-del">{{__ "optional"}}</span>{{/if}}
          </td>

        {{#if compare.type}}
          <td>{{{compare.type}}}</td>
        {{else}}
          {{{typRowTd}}}
        {{/if}}

          <td>
            {{{nl2br compare.description}}}
            {{#if compare.defaultValue}}<p class="default-value">{{__ "Default value:"}} <code>{{{compare.defaultValue}}}</code><p>{{/if}}
          </td>
        </tr>
      {{/if}}

    {{/each_compare_field}}
  </tbody>
</script>

<div class="container-fluid">
  <div class="row-fluid">
    <div id="sidenav" class="span2"></div>
    <div id="content">
      <div id="project"></div>
      <div id="header"></div>
      <div id="sections"></div>
      <div id="footer"></div>
      <div id="generator"></div>
    </div>
  </div>
</div>

<div id="loader">
  <div class="spinner">
    <div class="spinner-container container1">
      <div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div>
    </div>
    <div class="spinner-container container2">
      <div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div>
    </div>
    <div class="spinner-container container3">
      <div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div>
    </div>
    <p>Loading...</p>
  </div>
</div>

<script data-main="main.js" src="vendor/require.min.js"></script>
</body>
</html>
