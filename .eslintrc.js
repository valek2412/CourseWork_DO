module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier", "prettier/react"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "unused-imports", "prettier"],
  rules: {
    "react/jsx-filename-extension": [0],
    "unused-imports/no-unused-imports": 2,
    "unused-imports/no-unused-vars": 2,
    "no-console": [
      2,
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "prettier/prettier": 2,
    "react/prop-types": 0,
    "jsx-a11y/alt-text": 0,
    "react/jsx-props-no-spreading": 0,
  },
};
