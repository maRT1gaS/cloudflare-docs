import { define } from 'bongo';
import { markdown } from '@bongo/markdown';
import { highlight } from './config/prism.mjs';

export default define({
	$site: {
		lang: 'en',
		title: 'Cloudflare Developers',
		url: 'https://developers.cloudflare.com',
	},
	plugins: [
		markdown({
			highlight
		})
	]
});
