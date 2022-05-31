import adapter from '@sveltejs/adapter-auto';
import adapter_node from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import fs from 'fs';
import path from 'path';
import url from 'url';

/**
 * @type {{env: ImportMetaEnv}}
 */
const { env } = process;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/**
 * @type {import('vite').UserConfig}
 */
const vite = {
	server: {
		proxy: {
			[env.VITE_SERVER_STATIC_PATH]: {
				target: env.VITE_SERVER_ORIGIN,
				changeOrigin: true,
				rewrite: (path) => path,
			},
			[env.VITE_API_SERVER_BASE_PATH]: {
				target: env.VITE_SERVER_ORIGIN,
				changeOrigin: true,
				rewrite: (path) => path,
			},
			[env.VITE_EVENT_SERVER_BASE_PATH]: {
				target: env.VITE_SERVER_ORIGIN,
				changeOrigin: true,
				rewrite: (path) => path,
			},
			[env.VITE_WS_SERVER_BASE_PATH]: {
				target: env.VITE_SERVER_ORIGIN,
				ws: true,
				changeOrigin: true,
				rewrite: (path) => path,
			},
		}
	},
	resolve: {
		alias: {
			$components: path.resolve(__dirname, 'src/components'),
			$models: path.resolve(__dirname, 'src/models'),
			$css: path.resolve(__dirname, 'src/app.css'),
		}
	},
	plugins: [],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter_node({
			precompress: true,
		}),
		vite,
	}
};

export default config;
