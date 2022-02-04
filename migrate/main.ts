// SETUP
// ---
// $ cp -rf ../docs-hugo/migrate .
// $ cd migrate && pnpm i
// $ pnpm migrate

import { join } from 'node:path';

import * as normalize from './normalize';
import * as $ from './utils';

const { PRODUCTS, CONTENT, STATIC, DATA } = $;

const isMDX = /\.mdx?$/i;

$.log('~> creating empty directories');
await $.mkdir(CONTENT);
await $.mkdir(STATIC);
await $.mkdir(DATA);

// Move "products/*/src/content" ~> "content/**"
// Normalize "static|images" subdir location
// Convert "products/*/docs-config.js" ~> "data/*.yml"
await $.ls(PRODUCTS).then(products => {
  return Promise.all(
    products.map(async name => {
      // ignore products/readme.md
      if (isMDX.test(name)) return;

      let src = join(PRODUCTS, name, 'src/content');
      let file = join(PRODUCTS, name, 'docs-config.js');

      if ($.exists(file)) {
        let output = join(DATA, name + '.yml');
        await normalize.product(file, output);

        $.log(`rm "products/${name}/docs-config.js"`);
        await $.rm(file);
      } else {
        console.warn('[WARN] Missing "products/%s/docs-config.js" file!', name);
      }

      if (!$.exists(src)) {
        return console.error('[ERRO] Missing "%s/src/content"', name);
      }

      let target = join(CONTENT, name);

      $.log(`cp -rf "products/${name}" "content/${name}"`);
      await $.cp(src, target, { recursive: true });

      $.log(`rm -rf "products/${name}"`);
      await $.rm(src, { recursive: true });

      let images = join(target, 'images');
      let statics = join(target, 'static');

      if ($.exists(images)) {
        if ($.exists(statics)) {
          console.warn('[WARN] Both "images" and "static" exist in "%s" content!', name);
        } else {
          $.log(`mv "content/${name}/images/**" "content/${name}/static/."`)
          await $.cp(images, statics, { recursive: true });
        }
      }
    })
  );
});

await $.git(`add products content`);
await $.git(`commit -m "move products -> content"`);

await $.git(`add data`);
await $.git(`commit -m "migrate docs-configs -> data yaml"`);

// Touch all "content/**" files for code style
// ~> minimizes the commit diff for later work

await $.walk(CONTENT, {
  async task({ file }) {
    await normalize.markdown(file);
  }
});

await $.git(`add content`);
await $.git(`commit -m "initial code style"`);

// ---
// Normalize markdown content
//   - if partial, apply hugo "ignore me" yaml
//   - ensure `title` in frontmatter
//   - normalize anchor link paths
//   - normalize image src paths
// ---

await $.walk(CONTENT, {
  async task({ file }) {
    await normalize.content(file);
  }
});

await $.git(`add content`);
await $.git(`commit -m "normalize; fix links, images, frontmatter"`);

// rewrite MDX -> hugo partials
await $.walk(CONTENT, {
  async task({ file }) {
    await normalize.mdx(file);
  }
});

await $.git(`add content`);
await $.git(`commit -m "mdx -> hugo partials"`);

// --- others ---

await $.rm(PRODUCTS, { recursive: true });
await $.git(`add products`);
await $.git(`commit -m "rm -rf products"`);

console.warn('~~~\nREMINDER: copy over `layouts` and `assets` directories!\n~~~');
