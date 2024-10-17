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
export {};