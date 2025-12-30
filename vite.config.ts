// import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
// More info at:
// - https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// - https://testing-library.com/docs/react-testing-library/setup
export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: ["./src/vitest-setup.ts"],
    },
});
