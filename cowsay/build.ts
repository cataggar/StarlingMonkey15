// https://bun.sh/docs/bundler
await Bun.build({
    entrypoints: ['./src/cowsay.ts'],
    outdir: './',
    minify: true,
    format: 'esm',
    sourcemap: 'inline',
});
export {};