// https://mswjs.io/docs/recipes/vitest-browser-mode

import { test as testBase } from "vitest";
import { worker } from "./mocks/browser";

export const test = testBase.extend({
    worker: [
        async (_, use) => {
            // Start the worker before the test.
            await worker.start();

            // Expose the worker object on the test's context.
            await use(worker);

            // Remove any request handlers added in individual test cases.
            // This prevents them from affecting unrelated tests.
            worker.resetHandlers();

            // Stop the worker after the test.
            worker.stop();
        },
        {
            auto: true,
        },
    ],
});
