module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json']
  },
  plugins: ['jest', 'import'],
  extends: ['@react-native-community', 'airbnb-typescript', 'prettier'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'arrow-body-style': 'off',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false
      }
    ],
    'global-require': 0,
    semi: ['error', 'never'],
    'object-curly-newline': 'off',
    'max-len': ['error', {code: 120, ignoreUrls: true}],
    'react/jsx-filename-extension': 'off',
    'react/jsx-fragments': 'off',
    'react/prefer-stateless-function': 'off',
    'import/no-unresolved': 'off',
    'react/require-default-props': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'react/no-unused-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    indent: 'off',
    // typescript rules
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/space-infix-ops': ['warn'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-use-before-define': 'off',
    'react/static-property-placement': 'off',
    '@typescript-eslint/indent': ['warn', 2],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    'jest/no-disabled-tests': 'warn',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'jest/expect-expect': 'off'
  },
  ignorePatterns: ['coverage/', '.eslintrc.js']
}
