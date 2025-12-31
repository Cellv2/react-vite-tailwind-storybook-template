// import { afterEach } from "vitest";
// import { cleanup } from "@testing-library/react";
// import "@testing-library/jest-dom/vitest";

// // TODO: global context providers : https://testing-library.com/docs/react-testing-library/setup/#global-config

// // https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
// // runs a clean after each test case (e.g. clearing jsdom)
// afterEach(() => {
//     cleanup();
// });

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/node.js";

// TODO: global context providers : https://testing-library.com/docs/react-testing-library/setup/#global-config

beforeAll(() => {
    server.listen();
});
afterEach(() => {
    server.resetHandlers();
    // https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
    // runs a clean after each test case (e.g. clearing jsdom)
    cleanup();
});
afterAll(() => {
    server.close();
});
