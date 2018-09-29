module.exports = {
    env: {
        browser: true,
        jquery: true,
        es6: true,
        mocha: true,
    },
    globals: {
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            impliedStrict: true
        },
        ecmaVersion: 6,
        sourceType: "module"
    },
    rules: {
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": "off",
        "constructor-super": "warn",
        "valid-typeof": "warn",
        // "flowtype/boolean-style": [2, "boolean"],
        // "flowtype/define-flow-type": 1,
        // "flowtype/delimiter-dangle": [2, "always-multiline"],
        // "flowtype/generic-spacing": [2, "never"],
        // "flowtype/no-dupe-keys": 2,
        // "flowtype/no-weak-types": 0,
        // "flowtype/object-type-delimiter": [2, "comma"],
        // "flowtype/require-parameter-type": 0,
        // "flowtype/require-return-type": 0,
        // "flowtype/require-valid-file-annotation": [
        //     0,
        //     "never", {
        //         "annotationStyle": "line"
        //     }
        // ],
        // "flowtype/semi": [2, "always"],
        // "flowtype/sort": 0,
        // "flowtype/space-after-type-colon": [2, "always"],
        // "flowtype/space-before-generic-bracket": [2, "never"],
        // "flowtype/space-before-type-colon": [2, "never"],
        // "flowtype/type-id-match": 0,
        // "flowtype/union-intersection-spacing": [2, "always"],
        // "flowtype/use-flow-type": 1,
        // "flowtype/no-types-missing-file-annotation": 0,
        // "import/no-unresolved": [2, {commonjs: true, amd: true}],
        // "import/named": 2,
        // "import/namespace": 2,
        // "import/default": 2,
        // "import/export": 2,
    },
    extends: [
        "plugin:flowtype/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
    ],
    settings: {
        flowtype: {
            "onlyFilesWithFlowAnnotation": false
        }
    },
    plugins: [
        "flowtype",
        "import",
    ]
}
