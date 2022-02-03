import { join } from 'node:path';
import { toMarkdown } from 'mdast-util-to-markdown';
import { fromMarkdown } from 'mdast-util-from-markdown';
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

/**
 * Ensure file has frontmatter, even if empty
 * Write the file w/ MDAST code style (necessary atm)
 * @param file The absolute "content/.../*.md" file path
 */
export async function markdown(file: string): Promise<void> {
  let [, product] = /content[\\/]+([^\\/]+)/.exec(file) || [];
  $.log('~> markdown file belongs to "%s" product', product);

  let data = await $.read(file, 'utf8');

  let ftxt: string;
  if (data.substring(0, 3) !== '---') {
    ftxt = '---\n---';
  } else {
    let index = data.indexOf('---', 3);
    ftxt = data.substring(0, index + 3).trim();
    data = data.substring(index + 3).trim();
  }

  let tree = fromMarkdown(data);
  let content = ftxt + '\n\n' + toMarkdown(tree);

  return $.write(file, content);
}