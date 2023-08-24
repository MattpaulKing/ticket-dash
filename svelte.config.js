import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
const config = {
	preprocess: vitePreprocess(),
	
	kit: {
		adapter: adapter({
      runtime: 'nodejs18.x',
    }),
	}
};
export default config;

//npm i @vercel/analytics
