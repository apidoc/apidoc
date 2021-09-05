module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  env: {
    'browser': true,
    'amd': true,
    'es6': true,
  },
  ignorePatterns: ['**/vendor/*.js', '**/vendor/path-to-regexp/*.js'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-extra-parens': ['error', 'all'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  }
}
