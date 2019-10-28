module.exports = {
    root: true,
    extends: [
        "airbnb",
        "plugin:jsx-a11y/recommended",
        "plugin:jsx-control-statements/recommended",
        "plugin:prettier/recommended"
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
            generators: true,
            experimentalObjectRestSpread: true
        },
        sourceType: "module"
    },
    rules: {
        "react/jsx-wrap-multilines": [
            "error",
            {
                prop: false // this conflicts with Prettier
            }
        ],
        "import/no-named-as-default": 0,
        "import/no-webpack-loader-syntax": 0,
        "import/no-unresolved": 0,
        "import/extensions": 2,
        "import/no-cycle": 0,
        "import/no-useless-path-segments": [2, { noUselessIndex: true }],
        "import/no-extraneous-dependencies": [
            "error",
            { devDependencies: true }
        ],
        "no-trailing-spaces": [2],
        "arrow-spacing": [2, { before: true }],
        "keyword-spacing": [2, { before: true }],
        "object-curly-spacing": [2, "always"],
        semi: ["error", "always"],
        "react/jsx-no-undef": [2, { allowGlobals: true }],
        "react/jsx-filename-extension": [
            1,
            { extensions: [".js", ".jsx", ".ts", ".tsx"] }
        ],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "react/no-danger": 0,
        "react/destructuring-assignment": 0,
        "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/label-has-for": [
            2,
            {
                required: {
                    every: ["id"]
                }
            }
        ],
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies,
        "jsx-control-statements/jsx-use-if-tag": "off"
    },
    plugins: [
        "jsx-a11y",
        "react",
        "graphql",
        "prettier",
        "react-hooks",
        "import"
    ],
    parser: "babel-eslint"
};
