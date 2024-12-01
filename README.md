# Mixing Components

There are three components.

1. `typescript-system` component in Rust, defines a `system` resource with a function `get-arguments`.
2. `typescript` component in TypeScript, defines a `program` resource with a function`concat-arguments`.
3. `test` component in Rust uses `concat-arguments` to print the arguments to stdout.

