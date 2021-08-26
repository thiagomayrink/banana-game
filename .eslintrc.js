module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
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
