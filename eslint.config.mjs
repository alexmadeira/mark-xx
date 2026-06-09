import woodenReact from '@wooden-script/eslint-config/react'
import globals from 'globals'

const internalPattern = [
  '^@/',
  '^@GAMETypes/',
  '^~/',
  '^#/',
  '^_TEST/',
  '^_APP/',
  '^_LAY/',
  '^_PAG/',
  '^_UTL/',
  '^_SRV/',
  '^_STR/',
  '^_MDL/',
  '^_CTL/',
  '^_CFG/',
  '^_AST/',
  '^_GAME/',
]

export default [
  {
    ignores: ['node_modules/**', '*.html', 'src/@types/prismic/**/types.d.ts'],
  },
  ...woodenReact,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
        Phaser: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      'accessor-pairs': [
        'error',
        {
          setWithoutGet: false,
        },
      ],
      'no-new': 'off',
      'no-useless-constructor': 'off',
      'jsx-a11y-x/heading-has-content': 'off',
      '@eslint-react/exhaustive-deps': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@eslint-react/dom-no-dangerously-set-innerhtml': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          newlinesBetween: 1,
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'side-effect',
            'style',
            'unknown',
          ],
          internalPattern,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          endOfLine: 'auto',
          printWidth: 120,
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
        },
      ],
    },
  },
  {
    files: ['src/**/*.d.ts', 'src/@types/**/*.{ts,tsx}'],
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'perfectionist/sort-exports': 'off',
    },
  },
]
