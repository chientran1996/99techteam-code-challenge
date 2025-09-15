import { describe, it, expect } from "vitest";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./sum";

describe("sum to n implementations", () => {
    it("all three methods give the same result for small inputs.", () => {
        const cases = [0, 1, 2, 3, 5, 10, 1000];
        for (const n of cases) {
            const a = sum_to_n_a(n);
            const b = sum_to_n_b(n);
            const c = sum_to_n_c(n);
            expect(a).toBe(b);
            expect(b).toBe(c);
        }
    });

    it("match known values", () => {
        expect(sum_to_n_b(5)).toBe(15);
        expect(sum_to_n_b(100)).toBe(5050);
    });

    it("throw error on invalid input", () => {
        expect(() => sum_to_n_a(-1 as any)).toThrow();
        expect(() => sum_to_n_b(2.5 as any)).toThrow();
        expect(() => sum_to_n_c(-10 as any)).toThrow();
    });
});