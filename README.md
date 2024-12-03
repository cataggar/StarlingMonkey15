# Mixing Components

There are three components.

1. `typescript-system` component in Rust, defines a `system` resource with a function `get-arguments`.
2. `typescript` component in TypeScript, defines a `program` resource with a function`concat-arguments`.
3. `test-rs` component in Rust uses `concat-arguments` to print the arguments to stdout.

I am having trouble getting the second component to use the first in [typescript/src/world.ts](typescript/src/world.ts).


## Cloning

```
git clone git@github.com:cataggar/StarlingMonkey15.git --no-checkout
cd StarlingMonkey15
git checkout jco534
```

## Required Tools

Required tools are [bun](https://bun.sh/docs/installation), [wkg](https://github.com/bytecodealliance/wasm-pkg-tools), [wac](https://github.com/bytecodealliance/wac), and [wasmtime](https://wasmtime.dev/).

Example installation on Mac or Linux:
```
curl -fsSL https://bun.sh/install | bash
cargo install wkg
cargo install wac-cli
curl https://wasmtime.dev/install.sh -sSf | bash
```

## Building

```
bun install
bun run build.ts
```

## Sample Build Output

```
~/ms/StarlingMonkey15> bun run build.ts
$ wkg wit fetch

$ cargo component build
  Generating bindings for typescript-system (src/bindings.rs)
   Compiling typescript-system v0.1.0 (/Users/cataggar/ms/StarlingMonkey15/typescript-system)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.61s
    Creating component target/wasm32-wasip1/debug/typescript_system.wasm

$ wkg wit fetch

$ bunx jco types wit -o .

  Generated Type Files:

 - ./interfaces/ts-typescript-system-types.d.ts  0.14 KiB
 - ./interfaces/ts-typescript-typescript.d.ts    0.17 KiB
 - ./interfaces/wasi-io-poll.d.ts                1.36 KiB
 - ./wit.d.ts                                    0.28 KiB


$ bun run bundle.ts

$ bunx jco componentize world.js --wit wit -o ts-typescript.wasm -d all
ComponentError: failed to encode a component from module
$failed to decode world from module

Caused by:
    0: module was not valid
    1: failed to find export of interface `ts:typescript-system/types@0.1.0` function `[constructor]system`
    at componentNew (file:///Users/cataggar/ms/StarlingMonkey15/node_modules/@bytecodealliance/jco/obj/wasm-tools.js:3618:11)
    at componentNew (file:///Users/cataggar/ms/StarlingMonkey15/node_modules/@bytecodealliance/jco/src/api.js:37:10)
    at async componentize (file:///Users/cataggar/ms/StarlingMonkey15/node_modules/@bytecodealliance/componentize-js/src/componentize.js:381:5)
    at async componentize (file:///Users/cataggar/ms/StarlingMonkey15/node_modules/@bytecodealliance/jco/src/cmd/componentize.js:11:25)
    at async file:///Users/cataggar/ms/StarlingMonkey15/node_modules/@bytecodealliance/jco/src/jco.js:200:9
error: script "componentize" exited with code 1
(jco componentize) 
In 'typescript' script 'componentize' failed with exit code 1
```
