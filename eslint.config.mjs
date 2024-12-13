// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import pluginVue from 'eslint-plugin-vue'
// import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt([
  // Spread Vue recommended rules directly
  ...pluginVue.configs['flat/recommended'],
  // Add Prettier configuration
  // eslintConfigPrettier,
  // Custom rules and options
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        parser: '@typescript-eslint/parser'
      }
    },
    rules: {
      // Vue-specific rules
      'vue/no-unused-vars': 'error',
      'vue/multi-word-component-names': [
        'off',
        {
          ignores: []
        }
      ],
      // General rules
      'linebreak-style': 0,
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-unused-vars': ['error'],
      'no-trailing-spaces': ['error', { skipBlankLines: false }],
      'no-irregular-whitespace': 'error',
      'no-multiple-empty-lines': 'error',
      camelcase: 'error',
      'vue/require-default-prop': 'off',
      'vue/no-multiple-template-root': 'off',
    },
    ignores: [
      // Files or directories to ignore
      'node_modules/',
      'dist/',
      '.output/',
      '.nuxt/',
      'public/'
    ]
  }
])

