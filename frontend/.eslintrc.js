module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: "@typescript-eslint/parser",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": [
            "error",
            {
                singleQuote: false,
                semi: true,
                trailingComma: "es5",
                tabWidth: 4,
            },
        ],
        "@typescript-eslint/prefer-namespace-keyword": "off",
        "@typescript-eslint/no-namespace": "off",
    },
};
