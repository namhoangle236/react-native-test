// ESLint flat config (no legacy "env", fully compatible with Flat Config)

import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';

export default [
  {
    // File pattern to apply config to
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest', // updated from 12 to latest for modern JS support
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
      },
    },

    plugins: {
      prettier: eslintPluginPrettier,
      react: eslintPluginReact,
    },

    settings: {
      react: {
        version: 'detect', // auto-detect React version
      },
    },

    rules: {
      'react/react-in-jsx-scope': 'off', // DISABLE this outdated rule
      'prettier/prettier': 'off',        // treat Prettier issues as ESLint errors -> turn this off
      'no-unused-vars': 'warn',          // will warn if variables are unused
      'semi': ['error', 'always'],       // enforces semicolons
      'quotes': 'off',                   // 🔧 disable quote rule
    },
  },
];
