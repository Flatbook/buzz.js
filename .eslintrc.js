module.exports = {
  ignorePatterns: ["dist/", "node_modules/"],
  extends: [
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  plugins: ["jest", "prettier", "@typescript-eslint"],
  rules: {
    "no-console": "error",
    "no-undef": "off",
    "jest/no-jasmine-globals": "off",
    "prettier/prettier": "error",
    "prefer-const": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
  },
};
