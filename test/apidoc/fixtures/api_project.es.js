export default {
  name: 'test',
  version: '0.13.0',
  description: 'RESTful web API Documentation Generator',
  url: 'https://api.github.com/v1',
  sampleUrl: 'https://api.github.com/v1',
  header: {
    title: 'My own header title',
    content: '<h1>Header .md File</h1>\n<p>Content of header.md file.</p>\n',
  },
  footer: {
    title: 'My own footer title',
    content: '<h1>Footer .md File</h1>\n<p>Content of footer.md file.</p>\n',
  },
  order: [
    'Error',
    'Define',
    'PostTitleAndError',
    'NotExistingEntry',
    'PostError',
    'GetParam',
  ],
  defaultVersion: '0.0.0',
  apidoc: '0.3.0',
  generator: {
    name: 'apidoc',
    time: '2017-05-19T09:34:32.325Z',
    url: 'https://apidocjs.com',
    version: '0.17.5',
  },
};
