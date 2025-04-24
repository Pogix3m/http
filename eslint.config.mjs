// @ts-check

import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        // config with just ignores is the replacement for `.eslintignore`
        ignores: [
            "**/dist/**",
            "**/migrations/**",
            "**/test/**",

            // TODO delete later
            "**/src2/**",
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylisticTypeChecked,
    // {
    //     rules: {
    //         "sort-imports": "error",
    //     },
    // },
    {
        plugins: {
            "@typescript-eslint": tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
            },
        },
        rules: {
            "@typescript-eslint/array-type": [
                "error",
                {
                    default: "array",
                },
            ],
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/dot-notation": "error",
            "@typescript-eslint/explicit-member-accessibility": [
                "error",
                {
                    accessibility: "explicit",
                    overrides: {
                        accessors: "explicit",
                    },
                },
            ],
            "@typescript-eslint/explicit-module-boundary-types": "off",
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

                            // "private-field",
                            // "protected-field",
                            "public-field",

                            "constructor",

                            "private-static-method",
                            "private-method",
                            "protected-method",

                            "public-static-field",
                            "public-static-method",
                            "public-method",
                        ],
                        order: "alphabetically",
                    },
                },
            ],
            "@typescript-eslint/naming-convention": [
                "error",
                // {
                //     selector: "interface",
                //     format: ["PascalCase"],
                //     prefix: ["I"],
                // },
                // {
                //     selector: "typeAlias",
                //     format: ["PascalCase"],
                //     prefix: ["T", "__T"],
                // },
                {
                    selector: "variableLike",
                    format: ["camelCase", "PascalCase", "UPPER_CASE"],
                },
            ],
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true, varsIgnorePattern: "^__" }],
            "@typescript-eslint/prefer-nullish-coalescing": "off",
            "@typescript-eslint/typedef": [
                "error",
                {
                    // arrayDestructuring: false,
                    // arrowParameter: true,
                    // memberVariableDeclaration: true,
                    objectDestructuring: false,
                    parameter: true,
                    propertyDeclaration: true,
                    // variableDeclaration: true,
                    // variableDeclarationIgnoreFunction: true,
                },
            ],
            "arrow-parens": ["error", "always"],
            "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
            "comma-dangle": ["error", "always-multiline"],
            curly: "error",
            "eol-last": "error",
            "max-len": [
                "error",
                {
                    ignoreComments: true,
                    ignorePattern: "//",
                    code: 120,
                },
            ],
            "newline-per-chained-call": "off",
            "no-async-promise-executor": "off",
            "no-console": "error",
            // "no-duplicate-imports": "error",
            "no-irregular-whitespace": "error",
            "no-magic-numbers": "off",
            "no-multiple-empty-lines": "error",
            "no-trailing-spaces": ["error", { skipBlankLines: true }],
            "object-curly-spacing": ["error", "always"],
            "one-var": ["error", "never"],
            "prefer-const": "error",
            "spaced-comment": [
                "error",
                "always",
                {
                    markers: ["/"],
                },
            ],
            "space-before-function-paren": ["error", "never"],
            "space-in-parens": ["error", "never"],
        },
    },
    {
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
            "@stylistic/member-delimiter-style": [
                "error",
                {
                    multiline: {
                        delimiter: "semi",
                        requireLast: true,
                    },
                    singleline: {
                        delimiter: "semi",
                        requireLast: false,
                    },
                },
            ],
            "@stylistic/quotes": ["error", "double", { allowTemplateLiterals: true }],
            "@stylistic/type-annotation-spacing": "error",
            "@stylistic/semi": ["error", "always"],
        },
    },
);
