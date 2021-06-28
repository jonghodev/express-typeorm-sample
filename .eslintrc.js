module.exports = {
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-unused-vars': ['error', { args: 'none' }],
    'no-use-before-define': [
      'error',
      { variables: false, functions: false, classes: false },
    ],
    'max-len': [
      'error',
      150,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    camelcase: 0,
    'no-console': 'off',
  },
};
