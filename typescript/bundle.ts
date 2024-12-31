
import { promises as fs } from 'fs';

// https://bun.sh/docs/bundler
let build = await Bun.build({
    entrypoints: ['./src/world.ts'],
    outdir: './',
    minify: false,
    format: 'esm',
    sourcemap: 'none',
    external: [
        'ts:typescript-system/types@0.1.0',
    ],
    target: 'browser',
    
});
if (!build.success) {
    console.error(build);
    process.exit(1);
}

// Cannot access performance properties at pre-initialization time.
// https://github.com/bytecodealliance/ComponentizeJS/issues/153
// Workaround is to turn off the performance hooks by returning undefined.
// https://github.com/microsoft/TypeScript/blob/main/src/compiler/performanceCore.ts
// let js = await fs.readFile('world.js', 'utf8');
// js = js.replace('function tryGetPerformanceHooks() {', 'function tryGetPerformanceHooks() { return;');
// await fs.writeFile('world.js', js, 'utf8');

export {};