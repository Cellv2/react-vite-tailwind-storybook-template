import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

// plugins
import prettierConfig from "eslint-config-prettier";
import jestDom from "eslint-plugin-jest-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import testingLibrary from "eslint-plugin-testing-library";

export default defineConfig([
    globalIgnores(["dist", "coverage", ".storybook"]),
    {
        // strict, type-aware linting for actual application code
        files: ["src/**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.strictTypeChecked,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            prettierConfig, // disable conflicting stylistic rules
        ],
        languageOptions: {
            ecmaVersion: "latest",
            globals: globals.browser,
            parserOptions: {
                project: ["./tsconfig.app.json"], // enable type-aware linting
                tsconfigRootDir: process.cwd(),
            },
        },
    },
    {
        // test-specific linting (lighter, no type-aware checks), with both globals environments
        files: ["tests/**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            testingLibrary.configs.react,
            jestDom.configs.recommended,
            prettierConfig,
        ],
        languageOptions: {
            ecmaVersion: "latest",
            globals: {
                ...globals.node,
                ...globals.browser,
            },
            parserOptions: {
                project: null, // disable type-aware linting for speed
            },
        },
    },
    {
        // non-strict linting for configs and Storybook files
        files: [
            "**/*.config.{ts,tsx}",
            "vite.config.ts",
            "vitest.config.ts",
            ".storybook/**/*.{ts,tsx}", // force storybook files back in due to global ignore
        ],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            storybook.configs["flat/recommended"],
            prettierConfig,
        ],
        languageOptions: {
            ecmaVersion: "latest",
            globals: globals.node,
            parserOptions: {
                project: null, // disable type-aware linting
            },
        },
    },
]);
