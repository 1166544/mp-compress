// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
	'no-return-await': 0,
	'no-tabs': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-fallthrough': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'space-before-function-paren': 0,
    'comma-dangle': ['error', 'never'],
    // semi: [2, 'always'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['off', 2],
    // 'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'eol-last': 0,
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    getApp: true,
    getPage: true,
  },
};
