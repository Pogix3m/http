module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "project": "tsconfig.json",
    },
    plugins: [
        "@typescript-eslint",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "prettier",
    ],
    rules: {
        "@typescript-eslint/array-type": [
            "error",
            {
                "default": "array"
            }
        ],
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit",
                "overrides": {
                    "accessors": "explicit"
                }
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        // "@typescript-eslint/indent": "error",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                default: {
                    memberTypes: [
                        // private/protected members // Declare your data
                        // constructor               // Initialize your data
                        // private methods           // Manage your data
                        // public getters/setters    // Expose your data (read & write)
                        // public methods            // Expose your data (read, write & execute)

                        "signature",

                        "private-static-field",
                        "protected-static-field",

                        "private-field",
                        "protected-field",

                        "public-static-field",
                        "public-field",

                        "constructor",

                        "private-static-method",
                        "private-method",
                        "protected-method",

                        "public-static-method",
                        "public-method",
                    ],
                    order: "alphabetically",
                },
            }
        ],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "interface",
                "format": ["PascalCase"],
                "prefix": ["I"]
            },
            {
                "selector": "typeAlias",
                "format": ["PascalCase"],
                "prefix": ["T", "__T"]
            },
            {
                "selector": "variableLike",
                "format": ["camelCase", "PascalCase", "UPPER_CASE"],
            },
        ],
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true, "varsIgnorePattern": "^__" }],
        // "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/quotes": [
            "error",
            "double",
            { "allowTemplateLiterals": true }
        ],
        // "@typescript-eslint/tslint/config": [
        //     "error",
        //     {
        //         "rules": {
        //             "typedef": [
        //                 true,
        //                 // "arrow-call-signature",
        //                 "arrow-parameter",
        //                 "call-signature",
        //                 "member-variable-declaration",
        //                 "parameter",
        //                 "property-declaration",
        //                 "variable-declaration",
        //                 "variable-declaration-ignore-function"
        //             ],
        //             "whitespace": [
        //                 true,
        //                 "check-branch",
        //                 "check-decl",
        //                 "check-operator",
        //                 "check-separator",
        //                 "check-type",
        //                 "check-type-operator",
        //                 "check-preblock"
        //             ],
        //             "ordered-imports": true,
        //             "semicolon": [true, "always"],
        //         }
        //     }
        // ],
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/typedef": [
            "error",
            {
                "arrayDestructuring": false,
                "arrowParameter": true,
                "memberVariableDeclaration": true,
                "objectDestructuring": false,
                "parameter": true,
                "propertyDeclaration": true,
                "variableDeclaration": true,
                "variableDeclarationIgnoreFunction": true
            }
        ],
        "arrow-parens": [
            "error",
            "always"
        ],
        "brace-style": [
            "error",
            "stroustrup",
            { "allowSingleLine": true }
        ],
        "comma-dangle": [
            "error",
            "always-multiline"
        ],
        "curly": "error",
        "eol-last": "error",
        // "import/order": "error",
        "max-len": [
            "error",
            {
                "ignorePattern": "//",
                "code": 120
            }
        ],
        "newline-per-chained-call": "off",
        "no-async-promise-executor": "off",
        "no-console": "off",
        "no-duplicate-imports": "error",
        "no-irregular-whitespace": "error",
        "no-magic-numbers": "off",
        "no-multiple-empty-lines": "error",
        "no-trailing-spaces": ["error", { "skipBlankLines": true }],
        "object-curly-spacing": ["error", "always"],
        "one-var": [
            "error",
            "never",
        ],
        "prefer-const": "error",
        "spaced-comment": [
            "error",
            "always",
            {
                "markers": [
                    "/"
                ]
            }
        ],
        "space-before-function-paren": [
            "error",
            "never"
        ],
        "space-in-parens": [
            "error",
            "never"
        ],
        "semi": "off",
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        // "unicorn/filename-case": [
        //     "error",
        //     {
        //         "case": "pascalCase"
        //     }
        // ]
    },
};
