import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['resources/js/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: pluginReact,
      prettier
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
      'react/no-unescaped-entities': 'warn',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-undef-init': 'warn'
    }
  }
]);
