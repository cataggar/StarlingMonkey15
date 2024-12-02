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
git checkout rs-ts-rs
```

## Building

```
bun install
bun run build.ts
```

## Sample Build Output

```
~/StarlingMonkey15> bun run build.ts
$ wkg wit fetch

$ cargo component build
  Generating bindings for typescript-system (src/bindings.rs)
   Compiling typescript-system v0.1.0 (/Users/cataggar/ms/StarlingMonkey15/typescript-system)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.50s
    Creating component target/wasm32-wasip1/debug/typescript_system.wasm

$ wkg wit fetch

$ bunx jco types wit -o .

  Generated Type Files:

 - ./interfaces/ts-typescript-typescript.d.ts  0.17 KiB
 - ./interfaces/wasi-io-poll.d.ts              1.36 KiB
 - ./wit.d.ts                                  0.19 KiB


$ bun run bundle.ts

$ bunx jco componentize world.js --wit wit -o ts-typescript.wasm -d all
OK Successfully written ts-typescript.wasm.

$ wkg wit fetch

$ cargo component build
  Generating bindings for test-rs (src/bindings.rs)
   Compiling test-rs v0.1.0 (/Users/cataggar/ms/StarlingMonkey15/test-rs)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.17s
    Creating component target/wasm32-wasip1/debug/test-rs.wasm

$ wac plug target/wasm32-wasip1/debug/test-rs.wasm --plug ../typescript/ts-typescript.wasm -o target/test.wasm --plug ../typescript-system/target/wasm32-wasip1/debug/typescript_system.wasm

$ wasmtime run target/test.wasm
all arguments: todo
```

Notice the `todo`. When fixed, it should be result in `a__b__c` or whatever args are passed in.
