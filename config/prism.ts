import Prism from 'prismjs';
import type { Token, TokenStream } from 'prismjs';

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
    lookbehind: true,
  },

  directory: {
    pattern: /^[^\r\n$*!]+(?=[$])/m,
    alias: 'unselectable',
  },

  command: {
    pattern: /[$](?:[^\r\n])+/,
    inside: {
      prompt: {
        pattern: /^[$] /,
        alias: 'unselectable',
      },
    },
  },
};

// Prism language aliases
const langs: Record<string, string> = {
  tf: 'hcl', // terraform -> hashicorp config lang
  shell: 'sh',
  curl: 'bash',
  svelte: 'html',
  javascript: 'js',
  typescript: 'ts',
  vue: 'html',
};

// Custom token transforms
const transformations: Record<string, any> = {
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
      for: new Set([
        'fetch',
        'console',
        'addEventListener',
        'atob',
        'btoa',
        'setInterval',
        'clearInterval',
        'setTimeout',
        'clearTimeout',
      ]),
    },
  },
};

transformations.ts = transformations.js;

transformations.html = {
  keyword: transformations.js.keyword,
};

interface Node {
  types: string;
  content: string;
}

type Line = Node[];

function normalize(tokens: (Token | string)[]) {
  let line: Line = [];
  let lines: Line[] = [];

  function loop(types: string, item: TokenStream) {
    if (Array.isArray(item)) {
      item.forEach(x => loop(types, x));
    } else if (typeof item === 'string') {
      types = types || 'CodeBlock--token-plain';
      if (item === '') {
        // ignore
      } else if (item === '\n') {
        line.push({ types, content: item });
        lines.push(line);
        line = [];
      } else if (item === '\n\n') {
        line.push({ types, content: '\n' });
        lines.push(line);

        line = [{ types: 'CodeBlock--token-plain', content: '\n' }];
        lines.push(line);

        line = [];
      } else if (item.includes('\n')) {
        item.split(/\r?\n/g).forEach((txt, idx) => {
          let content = txt || '\n';
          if (idx > 0) {
            lines.push(line);
            line = [];
          }
          line.push({ types, content });
        });
      } else {
        line.push({ types, content: item });
      }
    } else if (item) {
      if (types) types += ' ';
      types += 'CodeBlock--token-' + item.type;

      if (item.alias) {
        ([] as string[]).concat(item.alias).forEach(tt => {
          if (!types.includes(tt)) {
            if (types) types += ' ';
            types += 'CodeBlock--token-' + tt;
          }
        });
      }
      loop(types, item.content);
    }
  }

  for (let i = 0; i < tokens.length; i++) {
    loop('', tokens[i]);
  }

  if (line.length > 0) {
    lines.push(line);
  }

  return lines;
}

export function highlight(code: string, lang: string, attrs: string): string {
  lang = langs[lang] || lang || 'txt';
  let grammar = Prism.languages[lang.toLowerCase()];

  if (!grammar) {
    console.warn('[prism] Missing "%s" grammar; using "txt" fallback', lang);
    grammar = Prism.languages.txt;
  }

  // TODO: parse content/attrs for `theme: dark` frontmatter
  // TODO: highlight, theme, filename, header
  // @see https://github.com/cloudflare/cloudflare-docs-engine/blob/dcaabff937e789145259417376e329d96a0d9e2f/src/components/mdx/code-block.js#L76

  // tokenize & build custom string output
  let tokens = Prism.tokenize(code, grammar);
  let output = '';

  let theme = 'light'; // TODO
  output += '<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally';
  if (theme === 'light') output += ' CodeBlock-is-light-in-light-theme';
  output += ` CodeBlock--language-${lang}" language="${lang}">`;

  output += '<code>';
  output += '<span class="CodeBlock--rows">';
  output += '<span class="CodeBlock--rows-content">';

  let i = 0;
  let row = '';
  let line: Line;
  let lines = normalize(tokens);

  for (; i < lines.length; i++) {
    line = lines[i];
    row = '<span class="CodeBlock--row">';
    row += '<span class="CodeBlock--row-indicator"></span>';
    row += '<div class="CodeBlock--row-content">';
    for (let j = 0; j < line.length; j++) {
      row += '<span class="' + line[j].types + '">' + line[j].content + '</span>';
    }
    output += row + '</div></span>';
  }

  return output + '</span></span></code></pre>';
}