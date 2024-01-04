module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: ['plugin:import/recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['*.js'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
