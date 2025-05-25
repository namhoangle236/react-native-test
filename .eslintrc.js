module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'prettier', // disables ESLint rules that might conflict with Prettier
  ],
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest', // updated from 12 to latest for modern JS support
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // auto-detect React version
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // DISABLE this outdated rule
    'prettier/prettier': 'error',   // treat Prettier issues as ESLint errors
    'no-unused-vars': 'warn',       // will warn if variables are unused
    'semi': ['error', 'always'],    // enforces semicolons
    'quotes': ['error', 'single'],  // enforces single quotes
  },
};
