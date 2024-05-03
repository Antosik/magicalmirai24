import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import preprocess from 'svelte-preprocess';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: `@import '${join(__dirname, 'src/scss/components.scss').replace(/\\/g, '/')}';`
		}
	}),
};

export default config;