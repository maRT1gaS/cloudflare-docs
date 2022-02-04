import { toMarkdown } from 'mdast-util-to-markdown';
import { fromMarkdown } from 'mdast-util-from-markdown';
import * as html from 'node-html-parser';
import * as astray from 'astray';
import yaml from 'yaml';

import * as $ from './utils';

import type * as MDAST from 'mdast';

const ORIGIN = 'https://developers.cloudflare.com';

/**
 * @param prefix The "/{product}/" prefix
 * @param input The current image/link value
 * @returns {string} The normalized "/{product}/{...}" absolute value
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

const PRODNAME = /content[\\/]+([^\\/]+)/;
const PARTIAL = /[\\/]+_partials[\\/]+/;

export async function content(file: string) {
  let data = await $.read(file, 'utf8');

  if (data.substring(0, 3) !== '---') {
    return console.error('[ERRO] Missing frontmatter!', file);
  }

  let index = data.indexOf('---', 3);
  let ftxt = data.substring(3, index);
  let fmatter = yaml.parse(ftxt) || {};

  data = data.substring(index + 3).trim();
  let tree = fromMarkdown(data);

  let title = '';
  let isPartial = PARTIAL.test(file);
  let [, product] = PRODNAME.exec(file) || [];
  let prefix = `/${product}/`;

  // look for title value from h1
  astray.walk<MDAST.Root, void, any>(tree, {
    heading(node: MDAST.Heading) {
      if (isPartial || node.depth !== 1) return;

      astray.walk<MDAST.Heading, void, any>(node, {
        text(t: MDAST.Text) {
          title += t.value;
        },
      });

      return astray.SKIP;
    },

    link(node: MDAST.Link) {
      node.url = href(prefix, node.url);
    },

    image(node: MDAST.Image) {
      if (!/^(\/|(..\/){1,})/.test(node.url)) return;

      let { pathname } = new URL(node.url, ORIGIN);

      if (pathname.startsWith(prefix)) {
        pathname = pathname.substring(prefix.length);
      }

      pathname = pathname.replace(/^[/]images[/]/, '/static/');
      node.url = prefix + pathname.substring(1);
    },

    html(node: MDAST.HTML) {
      if (node.value.startsWith('<button ') && node.value.includes(' href=')) {
        let doc = html.parse(node.value);
        let button = doc.querySelector('button[href]');

        if (button) {
          let target = button.getAttribute('href');

          if (target) {
            button.setAttribute('href', href(prefix, target));
            node.value = button.toString().slice(0, -9);
          } else {
            console.log('Missing "href" value!', node.value);
          }
        }
      }
    },
  });

  if (isPartial) {
    // tell hugo to ignore this file
    // ~> don't render as own page, sitemap, etc
    fmatter._build = {
      publishResources: false,
      render: 'never',
      list: 'never',
    };
  } else {
    title = title.trim();
    fmatter.title = (fmatter.title || '').trim();

    if (!title) {
      return console.error('[ERRO] Missing title!', file);
    }

    if ('order' in fmatter) {
      let weight = fmatter.weight || fmatter.order;
      // in hugo, `weight:0` is same as `null` in gatsby
      fmatter.weight = weight == null ? 0 : ++weight;
      delete fmatter.order;
    }

    // use the "layouts/_default/list.html" for non-documents
    if (fmatter.type && fmatter.type !== 'document') {
      fmatter.layout = 'list';
    }

    if (fmatter.title === title) {
      // do nothing
    } else if (fmatter.title) {
      fmatter.meta = fmatter.meta || {};
      fmatter.meta.title = (fmatter.meta.title || title).trim();
      if (fmatter.meta.title !== title) {
        console.warn('[WARN] Mismatch `meta.title` value!', file);
      }
    } else {
      fmatter.title = title;
    }
  }

  // regenerate new front matter
  ftxt = '---\n' + yaml.stringify(fmatter) + '---\n\n';

  // write the updated markdown file
  return $.write(file, ftxt + toMarkdown(tree));
}

// foo='hello world' ~> foo="hello world"
export function attributes(attrs: string) {
  return attrs.replace(/(\s+?)([^=]+)\=\'([^']+)\'/g, (_, ws, name, value) => ws + `${name}="${value}"`);
}

export function rewrite(content: string, tag: string, partial: string) {
  let open = new RegExp('\\?<' + tag + '([^>]+)>', 'g');
  let close = new RegExp('<\\/' + tag + '>', 'g');

  return content
    .replace(open, (_, attrs) => {
      if (attrs) attrs = attributes(attrs);
      return '{{<' + partial + attrs + '>}}';
    })
    .replace(close, '{{</' + partial + '>}}');
}

/**
 * Rewrite (some) static MDX components
 * ~> insert the hugo partial instead
 * TODO: read `import`s from _partials and _components
 */
export async function mdx(file: string) {
  let data = await $.read(file, 'utf8');

  // <Aside(.*)>...</Aside>
  // ~> {{<Aside$1>}}...{{</Aside>}}
  data = rewrite(data, 'Aside', 'Aside');

  // <Button(.*)>...</Button>
  // ~> {{<button$1>}}...{{</button>}}
  data = rewrite(data, 'Button', 'button');

  // <ButtonGroup(.*)>...</ButtonGroup>
  // ~> {{<button-group$1>}}...{{</button-group>}}
  data = rewrite(data, 'ButtonGroup', 'button-group');

  // <YouTube(.*)/> ~> {{<youtube$1>}}
  data = rewrite(data, 'YouTube', 'youtube');

  // <TableWrap(.*)>...</TableWrap>
  // ~> {{<table-wrap$1>}}...{{</table-wrap>}}
  data = rewrite(data, 'TableWrap', 'table-wrap');

  // <ContentColumn(.*)>...</ContentColumn>
  // ~> {{<content-column$1>}}...{{</content-column>}}
  data = rewrite(data, 'ContentColumn', 'content-column');

  // TODO: other partials ??

  // TODO: imports from partials/components

  await $.write(file, data);
}