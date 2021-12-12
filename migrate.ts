import * as fs from 'node:fs/promises';
import { existsSync as exists } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let source = join(__dirname, 'products');
let partials = join(__dirname, 'partials');
let components = join(__dirname, '_components');
let content = join(__dirname, 'content');
let assets = join(__dirname, 'assets');

let products = await fs.readdir(source, {
	withFileTypes: true,
});

function copy(src: string, dest: string) {
	return fs.cp(src, dest, { recursive: true });
}

async function move(prev: string, next: string) {
	await copy(prev, next);
	await fs.rm(prev, {
		recursive: true,
		force: true,
	});
}

for (let dir of products) {
	if (dir.isFile()) continue;

	let name = dir.name;
	let src = join(source, name, 'src/content');
	if (!exists(src)) continue;

	console.log('~> copying', name);

	// cp -rf products/*/src/content/ content/$1/
	let dest = join(content, name);
	await copy(src, dest);

	let tmp = join(dest, '_partials');
	if (exists(tmp)) await move(tmp, join(partials, name));

	tmp = join(dest, 'components');
	if (exists(tmp)) await move(tmp, join(components, name));

	// tmp = join(dest, 'static');
	// if (exists(tmp)) await move(tmp, join(assets, name));

	// tmp = join(dest, 'images');
	// if (exists(tmp)) await move(tmp, join(assets, name));
}
