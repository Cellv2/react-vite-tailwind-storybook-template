import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// TODO: global context providers : https://testing-library.com/docs/react-testing-library/setup/#global-config

// https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});
