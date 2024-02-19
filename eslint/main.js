const rules = [
  './errors',
  './imports',
  './react-hooks',
  './react',
  './style',
  './es6',
  './variables',
  './cypress',
  './jest',
  './typescript',
].map(require.resolve);

module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  extends: ['eslint:recommended', 'prettier', ...rules],

  rules: {
    strict: 'error',
  },
};
