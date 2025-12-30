import { describe, expect, test, vi } from "vitest";
import * as sumService from "./sum.service";

describe("sum service", () => {
    test("adds 1 + 2 to equal 3", () => {
        vi.spyOn(sumService, "sum");

        expect(sumService.sum(1, 2)).toBe(3);
        expect(sumService.sum).toHaveBeenCalledExactlyOnceWith(1, 2);
    });
});
