import { resolve } from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			name: "cssCodeQuality",
			fileName: "css-code-quality",
			formats: ['es']
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ["@projectwallace/css-analyzer"],
		},
	},
	plugins: [
		dts(),
	],
})
