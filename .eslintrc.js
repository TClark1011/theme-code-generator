module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: ['error', 'always'],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          '$/models',
          '$/logic',
          '$/hooks',
          '$/utils',
          '$/components',
          '$/store',
          '$/constants',
        ].map((item) => ({
          name: item,
          message: 'Packages in the root must be imported directly from file',
        })),
        patterns: [
          {
            group: ['!$/*/*', '$/features', '$/lib'],
            message: 'Use short-form path instead ("$lib-name" or "$feature-name")',
          },
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
