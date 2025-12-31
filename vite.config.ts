import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// More info at:
// - https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// - https://testing-library.com/docs/react-testing-library/setup
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        // this is the default, but setting just to be explicit
        coverage: {
            provider: "v8",
        },
        environment: "jsdom",
        setupFiles: ["./src/vitest.setup.ts"],
        projects: [
            {
                extends: true,
                test: {
                    name: "src",
                },
            },
            {
                extends: true,
                plugins: [
                    // The plugin will run tests for the stories defined in your Storybook config
                    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                    storybookTest({
                        configDir: path.join(dirname, ".storybook"),
                    }),
                ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright({}),
                        instances: [
                            {
                                browser: "chromium",
                            },
                        ],
                    },
                    setupFiles: [".storybook/vitest.setup.ts"],
                },
            },
        ],
    },
});
