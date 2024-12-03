# Mixing Components

There are three components.

1. `typescript-system` component in Rust, defines a `system` resource with a function `get-arguments`.
2. `typescript` component in Rust, defines a `program` resource with a function`concat-arguments`.
3. `test-rs` component in Rust uses `concat-arguments` to print the arguments to stdout.

## Cloning

```
git clone git@github.com:cataggar/StarlingMonkey15.git --no-checkout
cd StarlingMonkey15
git checkout rs-rs-rs
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
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.22s
    Creating component target/wasm32-wasip1/debug/typescript_system.wasm

$ wkg wit fetch

$ cargo component build
  Generating bindings for typescript (src/bindings.rs)
   Compiling typescript v0.1.0 (/Users/cataggar/ms/StarlingMonkey15/typescript)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.28s
    Creating component target/wasm32-wasip1/debug/typescript.wasm

$ wkg wit fetch

$ cargo component build
  Generating bindings for test-rs (src/bindings.rs)
   Compiling test-rs v0.1.0 (/Users/cataggar/ms/StarlingMonkey15/test-rs)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.30s
    Creating component target/wasm32-wasip1/debug/test-rs.wasm

$ wac plug target/wasm32-wasip1/debug/test-rs.wasm --plug ../typescript/target/wasm32-wasip1/debug/typescript.wasm -o target/test.wasm

$ wac plug target/test.wasm --plug ../typescript-system/target/wasm32-wasip1/debug/typescript_system.wasm -o target/test2.wasm

$ wasmtime run target/test2.wasm a b c
all arguments: test2.wasm__a__b__c
```

This is working.
