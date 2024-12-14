import * as path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin as VitePlugin } from "vite";

const workerPlugin = {
	name: 'configure-worker-headers',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			// Check if the request is for a worker file
			if (req.url?.includes('worker')) {
				res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
				res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
			}
			next();
		});
	},
};

export default defineConfig({
	plugins: [react(), workerPlugin],
	server: {
		port: 3000,
		// NOTE this is required for worker-loader to work
		// works in localhost only
		headers: {
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Embedder-Policy': 'require-corp',
		},
	},
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.mjs$/,
	// 			include: /node_modules/,
	// 			type: "javascript/auto"
	// 		}
	// 	],
	// },
	build: {
    target: 'esnext', // or appropriate target for your environment
    rollupOptions: {
      output: {
        format: 'es', // Ensure workers use ES modules
      },
    },
  },
  worker: {
    format: 'es', // Use ES module format for workers
  },
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});