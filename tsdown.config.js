import { defineConfig } from "tsdown"

export default defineConfig({
	entry: ["./src/index.ts", "./src/core.ts"],
	format: "esm",
	platform: "neutral",
	dts: true,
	publint: true,
	outExtension: () => ({ js: ".js" }),
})
