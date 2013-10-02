define({
  "name": "apidoc-example",
  "version": "0.3.0",
  "description": "apidoc example project",
  "apidoc": "<h1>Example text from API.md</h1>\n\n<h2>General</h2>\n\n<p>This Text is optionally and not needed to create the documentation.</p>\n\n<h2>HowTo include</h2>\n\n<p>This text is from file \"API.md\".</p>\n\n<p>In your projects \"package.json\" you can set \"apidoc\" with a description text or \"apidocFilename\" with the filename to include into your documentation.</p>\n\n<p>This example attempts to integrate \"API.md\". If not available, then the \"apidoc\" string is used.</p>\n\n<pre><code>{\n  \"name\": \"example\",\n  \"version\": \"0.3.0\",\n  \"description\": \"apidoc example project.\",\n  \"apidoc\": \"This is a description, it will be ignored if parameter apidocFilename exist.\",\n  \"apidocFilename\": \"API.md\"\n}\n</code></pre>",
  "generator": {
    "version": "0.1.0",
    "time": "2013-04-01T16:21:27.342Z"
  }
});