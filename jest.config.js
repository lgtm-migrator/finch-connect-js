const packageJson = require('./package.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    SDK_VERSION: packageJson.version,
  }
};
