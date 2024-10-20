
# https://component-model.bytecodealliance.org/language-support/csharp.html
# dotnet build -p adder
# dotnet build -p host-app
dotnet build

(wac plug
    host-app/bin/Debug/net9.0/wasi-wasm/native/host-app.wasm
    --plug adder/bin/Debug/net9.0/wasi-wasm/native/adder.wasm
    -o main.wasm)

wasmtime run main.wasm
