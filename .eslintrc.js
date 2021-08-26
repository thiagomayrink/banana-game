module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'arrow-parens': 'off',
    eqeqeq: 'error',
    'function-paren-newline': 'off',
    indent: ['error', 2],
    'linebreak-style': [2, 'unix'],
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
      },
    ],
    'no-duplicate-imports': 'error',
    'no-extra-parens': 'error',
    'no-return-await': 'error',
    'no-shadow': [
      'error',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: [],
      },
    ],
    'operator-linebreak': [2, 'before', { overrides: { '?': 'after' } }],
    'import/prefer-default-export': 'off',
  },
};
