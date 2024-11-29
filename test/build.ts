// https://bun.sh/docs/bundler
await Bun.build({
    entrypoints: ['./src/cowsay-test.ts'],
    outdir: './',
    minify: false,
    format: 'esm',
    sourcemap: 'inline',
});
export {};