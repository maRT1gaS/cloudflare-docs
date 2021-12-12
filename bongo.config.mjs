import { define } from 'bongo';
import * as markdown from '@bongo/markdown';

export default define({
	$site: {
		lang: 'en',
		title: 'Cloudflare Developers',
		url: 'https://developers.cloudflare.com',
	},
	plugins: [
		markdown,
	]
});
