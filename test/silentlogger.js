/**
 * A silent logger used for tests
 */
const logger = {
  debug: msg => {},
  verbose: msg => {},
  info: msg => {},
  warn: msg => {},
  error: msg => {},
}

module.exports = logger;
