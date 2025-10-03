module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    es6: true
  },
  rules: {
    'no-console': 0
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    allowImportExportEverywhere: true
  }
};
