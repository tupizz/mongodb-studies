module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:security/recommended'
  ],
  plugins: [
      'prettier',
      'security'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
      'func-names': 'off',
      'object-shorthand': 'off',
      'no-console': 'off',
      'prettier/prettier': 'error',
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      'camelcase': 'off',
      'no-unused-vars': ['error', {'argsIgnorePattern': 'next'}]
  },
};