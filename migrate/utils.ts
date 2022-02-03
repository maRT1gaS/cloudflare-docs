import * as fs from 'node:fs';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import * as c from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
export const require = createRequire(__filename);
export const __dirname = dirname(__filename);

// directories
export const ROOT = join(__dirname, '..');
export const ASSETS = join(ROOT, 'assets');
export const LAYOUTS = join(ROOT, 'layouts');
export const PRODUCTS = join(ROOT, 'products');
export const CONTENT = join(ROOT, 'content');
export const STATIC = join(ROOT, 'static');
export const DATA = join(ROOT, 'data');

// executables
export const run = promisify(c.exec);
export const git = (...args: string[]) => {
  return run(`git ${args.join(' ')}`, {
    cwd: ROOT
  });
}

// fs :: files
export const exists = fs.existsSync;
export const write = fs.promises.writeFile;
export const read = fs.promises.readFile;
export const cp = fs.promises.cp;

// fs :: dirs
export const rm = fs.promises.rm;
export const ls = fs.promises.readdir;
export async function mkdir(dir: string) {
  return exists(dir) || fs.promises.mkdir(dir, { recursive: true });
}

const isDEBUG = process.argv.includes('--debug');
export function log(...x: unknown[]) {
  if (isDEBUG) console.log(...x);
}