import { defineConfig } from "tsdown"

export default defineConfig({
	entry: ["./src/index.js", "./src/core.js"],
	format: "esm",
	platform: "neutral",
	dts: true,
	publint: true,
	deps: {
		neverBundle: ["@projectwallace/css-analyzer"],
	},
	outExtension: () => ({ js: ".js" }),
})
