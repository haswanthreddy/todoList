/* eslint-disable indent */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: [
      2,
      'tab',
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        MemberExpression: 1,
      },
    ],
    'no-tabs': 0,
    'linebreak-style': 0,
  },
};
