module.exports = {
  env: {
    "browser": true,
    "es2021": true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "plugin:import/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "import/extensions": ["warn", "never"],
    "no-restricted-globals": "warn",
    "@typescript-eslint/no-shadow": ["error"],
    "no-shadow": "off",
    "no-promise-executor-return": "warn",
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "double", { avoidEscape: true }],
    "semi": ["error", "always"],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "max-len": [
      "error",
      { ignoreTrailingComments: true },
      {
        ignoreComments: true,
      },
      {
        code: 100,
        tabWidth: 2,
      },
    ],
    "import/no-unresolved": "off",
  },
};
