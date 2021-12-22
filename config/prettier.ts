import { join } from 'path';
import { readFileSync } from 'fs';
import * as prettier from 'prettier';

const config = join(__dirname, '../.prettierrc');
const options: prettier.Options = JSON.parse(readFileSync(config, 'utf8'));

// prism languages to ignore
const Ignores = new Set(['txt', 'bash', 'sh', 'rust', 'ruby', 'python', 'toml']);

// prism lang -> prettier parser
const Parsers: Record<string, prettier.BuiltInParserName> = {
  js: 'babel',
  javascript: 'babel',

  json: 'json',
  json5: 'json5',

  ts: 'typescript',
  typescript: 'typescript',

  gql: 'graphql',
  graphql: 'graphql',

  html: 'html',
  svelte: 'html',
  vue: 'vue',

  yaml: 'yaml',
  yml: 'yaml',
};

export function format(code: string, lang: string): string {
  if (Ignores.has(lang)) return code;

  let parser = Parsers[lang] || 'babel';
  return prettier.format(code, { ...options, parser });
}
