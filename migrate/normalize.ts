import { join } from 'node:path';
import yaml from 'yaml';

import * as $ from './utils';

const ORIGIN = 'https://developers.cloudflare.com';

/**
 * @param prefix The "/{product}/" prefix
 * @param input The current image/link value
 * @returns The normalized "/{product}/{...}" absolute value
 */
export function href(prefix: string, input: string): string {
  if (input.startsWith('#')) return input;

  if (/^(https?:)?\/\//.test(input)) {
    let tmp = new URL(input);
    if (tmp.origin !== ORIGIN) return input;
    return tmp.pathname + tmp.search + tmp.hash;
  }

  if (input.startsWith(prefix)) return input;

  let tmp = new URL(input, ORIGIN);

  let path = tmp.pathname;
  if (!path.endsWith('/')) {
    path += '/';
  }

  if (!path.startsWith(prefix)) {
    path = prefix + path.substring(1);
  }

  return path + tmp.search + tmp.hash;
}

const PARTIAL_YAML = `
---
_build:
  publishResources: false
  render: never
  list: never
---
`.trim();

export async function partials(src: string, target: string) {
  let files = await $.ls(src);

  await Promise.all(
    files.map(async fname => {
      let file = join(src, fname);
      let content = await $.read(file, 'utf8');

      return $.write(
        join(target, fname),
        PARTIAL_YAML + '\n' + content
      );
    })
  );
}

/**
 * @param src The "docs-config.js" file path
 * @param target The target "data/*.yml" file path
 * @returns {Promise<any>}
 */
export function product(src: string, target: string) {
  let raw = $.require(src);
  let data: Record<string, unknown> = {};

  if (raw.logoSVGContent) {
		data.logo = raw.logoSVGContent;
	}

	data.meta = {
		title: raw.siteMetadata.title,
		description: raw.siteMetadata.description,
		author: raw.siteMetadata.author,
		image: raw.siteMetadata.image,
	};

	if (raw.search) {
		data.algolia = {
			index: raw.search.indexName,
			apikey: raw.search.apiKey,
			filters: raw.search.algoliaOptions.facetFilters,
		};
	} else {
		console.log('MISSING "search" key', src);
	}

	data.externals = raw.externalLinks;

  let result = yaml.stringify(data)
    .replace('meta:', '\nmeta:')
    .replace('algolia:', '\nalgolia:')
    .replace('externals:', '\nexternals:');

	return $.write(target, result);
}