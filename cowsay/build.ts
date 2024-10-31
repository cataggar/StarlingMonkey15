
import { promises as fs } from 'fs';

// https://bun.sh/docs/bundler
await Bun.build({
    entrypoints: ['./src/cowsay.ts'],
    outdir: './',
    // minify: true,
    minify: false,
    format: 'esm',
    // sourcemap: 'inline',
    sourcemap: 'none',
});

// Cannot access performance properties at pre-initialization time.
// https://github.com/bytecodealliance/ComponentizeJS/issues/153
// Workaround is to turn off the performance hooks by returning undefined.
// https://github.com/microsoft/TypeScript/blob/main/src/compiler/performanceCore.ts
let js = await fs.readFile('cowsay.js', 'utf8');
js = js.replace('function tryGetPerformanceHooks() {', 'function tryGetPerformanceHooks() { return;');
await fs.writeFile('cowsay.js', js, 'utf8');

export {};