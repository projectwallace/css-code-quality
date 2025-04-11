import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
	build: {
		lib: {
			entry: [
				'./src/index.js',
				'./src/core.js',
			],
			fileName: () => `[name].js`,
			formats: ["es"],
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
