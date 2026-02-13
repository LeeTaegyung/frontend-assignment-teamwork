import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    plugins: {
      import: importPlugin,
      prettier,
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      // Prettier
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      ...prettierConfig.rules,

      // TypeScript
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Imports
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react'],
            ['^@?\\w'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=[^/]*/*$)', '^\\./?$'],
            ['^.+\\.?(css|scss|sass|less)$'],
            ['^.+\\.svg(\\?.*)?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      'import/order': 'off',
      'import/no-unresolved': 'error',
      'import/no-cycle': 'warn',

      // Safety
      'no-unsafe-optional-chaining': 'warn',

      // React
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]);
