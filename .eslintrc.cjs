/* eslint-env node */

module.exports = {
  env: {
    browser: true,
    es2020: true,
    commonjs: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  // parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
  settings: { react: { version: "detect" } },
  // @typescript-plugin
  plugins: ["react-refresh"],
  rules: {
    "arrow-body-style": ["off", "as-needed"],
    "brace-style": ["warn", "1tbs"],
    "comma-dangle": ["off"],
    "class-methods-use-this": ["warn"],
    "consistent-return": ["warn"],
    "curly": ["error", "all"],
    "eqeqeq": ["warn", "smart"],
    "func-names": ["warn"],
    "indent": ["error", 2],
    "max-classes-per-file": ["off"],
    "max-len":
      [
        "off",
        80,
        {
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
    "no-alert": ["warn"],
    "no-console": ["warn"],
    "no-await-in-loop": ["warn"],
    "no-debugger": ["warn"],
    "no-multi-assign": ["off"],
    "no-param-reassign": ["error", { props: false }],
    "no-plusplus": ["warn"],
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "no-return-assign": ["error", "except-parens"],
    "no-return-await": ["warn"],
    "no-shadow":
      [
        "off",
        {
          hoist: "all",
          allow: ["resolve", "reject", "done", "next", "err", "error"],
        },
      ],
    "no-trailing-spaces": ["error"],
    "no-underscore-dangle": ["off"],
    "no-unused-expressions":
      [
        "warn",
        {
          allowTaggedTemplates: true,
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
    "no-unused-vars":
      [
        "warn",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "res|next|^err|^_",
          varsIgnorePattern: "^_",
        },
      ],
    "no-use-before-define": ["warn"],
    "no-var": ["warn"],
    "prefer-const": ["error", { destructuring: "all" }],
    "prefer-destructuring": ["off"],
    "semi": ["error", "always"],
    "space-before-function-paren": ["off"],
    "vars-on-top": ["warn"],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "react/prop-types": ["off"],
    "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
  }
};

