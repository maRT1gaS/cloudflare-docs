// @ts-check
import Prism from 'prismjs';

globalThis.Prism = Prism;
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-c.min.js';
import 'prismjs/components/prism-diff.min.js';
import 'prismjs/components/prism-git.min.js';
import 'prismjs/components/prism-go.min.js';
import 'prismjs/components/prism-graphql.min.js';
import 'prismjs/components/prism-hcl.min.js';
import 'prismjs/components/prism-http.min.js';
import 'prismjs/components/prism-ini.min.js';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-markdown.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-ruby.min.js';
import 'prismjs/components/prism-rust.min.js';
import 'prismjs/components/prism-sql.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-toml.min.js';
import 'prismjs/components/prism-yaml.min.js';

// Custom `shell` grammar
Prism.languages.sh = {
	comment: {
		pattern: /(^|[^'{\\$])#.*/,
		alias: 'unselectable',
		lookbehind: true
	},

	directory: {
		pattern: /^[^\r\n$*!]+(?=[$])/m,
		alias: 'unselectable'
	},

	command: {
		pattern: /[$](?:[^\r\n])+/,
		inside: {
			prompt: {
				pattern: /^[$] /,
				alias: 'unselectable'
			}
		}
	}
};

// prism aliases
const langs = {
	tf: 'hcl', // terraform -> hashicorp config lang
	shell: 'sh',
	curl: 'bash',
	svelte: 'html',
	javascript: 'js',
	typescript: 'ts',
	vue: 'html'
};

const transformations = {
	js: {
		'keyword': {
			to: 'declaration-keyword',
			for: new Set(['const', 'let', 'var', 'async', 'await', 'function', 'class']),
		},
		'punctuation': {
			to: 'operator',
			for: new Set(['.']),
		},
		'class-name': {
			to: 'api',
			for: new Set(['HTMLRewriter', 'Request', 'Response', 'URL', 'Error']),
		},
		'function': {
			to: 'builtin',
			for: new Set(['fetch', 'console', 'addEventListener', 'atob', 'btoa', 'setInterval', 'clearInterval', 'setTimeout', 'clearTimeout']),
		}
	}
};

transformations.ts = transformations.js;

transformations.html = {
	keyword: transformations.js.keyword,
};

/**
 * @param {string} code
 * @param {string} lang
 * @param {string} attrs
 * @returns {string}
 */
export function highlight(code, lang, attrs) {
	lang = langs[lang] || lang || 'txt';
	let grammar = Prism.languages[lang.toLowerCase()];

	if (!grammar) {
		console.warn('[prism] Missing "%s" grammar; using "txt" fallback', lang);
		grammar = Prism.languages.txt;
	}

	// tokenize & build custom string output
	let tokens = Prism.tokenize(code, grammar);

	let i=0, tmp, wip, output='';
	let dict = transformations[lang];

	for (; i < tokens.length; i++) {
		tmp = tokens[i];
		wip = '<span class="CodeBlock--token-';

		if (typeof tmp === 'string') {
			wip += 'plain">' + tmp;
		} else {
			if (dict && dict[tmp.type] && dict[tmp.type].for.has(tmp.content)) {
				wip += dict[tmp.type].to;
			} else {
				wip += tmp.type;
			}
			wip += '">' + tmp.content;
		}

		output += wip + '</span>';
	}

	return output;
	// return Prism.highlight(code, grammar, lang);
}
