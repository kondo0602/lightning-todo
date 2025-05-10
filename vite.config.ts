import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist",
		rollupOptions: {
			input: {
				main: "./index.html",
			},
		},
	},
	css: {
		modules: {
			localsConvention: "dashes",
		},
	},
});
