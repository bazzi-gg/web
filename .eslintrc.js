module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "eslint:recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["nuxt", "vue", "prettier"],
  // add your custom rules here
  rules: {},
};
