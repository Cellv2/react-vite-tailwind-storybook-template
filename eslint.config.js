// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores(["dist", "coverage", ".storybook"]),
    {
        // strict, type-aware linting actual application code
        files: ["src/**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.strictTypeChecked,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ["./tsconfig.app.json"],
                tsconfigRootDir: process.cwd(),
            },
        },
    },
    {
        // non-strict linting for tests, configs etc
        files: [
            "**/*.config.{ts,tsx}",
            "vite.config.ts",
            "vitest.config.ts",
            "tests/**/*.{ts,tsx}",
            ".storybook/**/*.{ts,tsx}", // force storybook files back in due to global ignore
        ],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            storybook.configs["flat/recommended"],
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.node,
            parserOptions: {
                project: null, // disable type-aware linting
            },
        },
    },
]);
