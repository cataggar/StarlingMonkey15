
import { promises as fs } from 'fs';

// https://bun.sh/docs/bundler
let build = await Bun.build({
    entrypoints: ['./src/world.ts'],
    outdir: './',
    minify: false,
    format: 'esm',
    sourcemap: 'none',
    external: ['ts-typescript-system-types']
});
if (!build.success) {
    console.error(build);
    process.exit(1);
}

export {};