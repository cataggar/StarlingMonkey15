
import { promises as fs } from 'fs';

// https://bun.sh/docs/bundler
let build = await Bun.build({
    entrypoints: ['./src/world.ts'],
    outdir: './',
    minify: false,
    format: 'esm',
    sourcemap: 'none',
});
if (!build.success) {
    console.error(build);
    process.exit(1);
}

// workaround for https://github.com/oven-sh/bun/issues/15537
let js = await fs.readFile('world.js', 'utf8');
js = js.replace('export { System };', '');
await fs.writeFile('world.js', js, 'utf8');

export {};