import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
