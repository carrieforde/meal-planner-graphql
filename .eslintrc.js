module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint", "plugin:node/recommended"],
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
};
