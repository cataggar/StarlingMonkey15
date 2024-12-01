cargo component build
wac plug target/wasm32-wasip1/debug/test-rs.wasm --plug ../typescript/ts-typescript.wasm -o target/test.wasm --plug ../typescript-system/target/wasm32-wasip1/debug/typescript_system.wasm
# wasmtime run target/test.wasm
WASMTIME_BACKTRACE_DETAILS=1 wasmtime run target/test.wasm