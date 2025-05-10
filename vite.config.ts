import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
	plugins: [react()],
	css: {
		modules: {
			localsConvention: "dashes",
		},
	},
	build: {
		outDir: "build",
		rollupOptions: {
			input: {
				main: "./index.html",
			},
		},
	},
});
