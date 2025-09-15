import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",         // pure logic → node environment
        include: ["app/**/*.test.ts"],
        coverage: {
            reporter: ["text", "html"], // View coverage overview + HTML report
        },
    },
});