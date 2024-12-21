mod bindings;
use bindings::ts::typescript::typescript::{version, Program, set_sys, CompilerOptions};
use bindings::ts::typescript_system::types::System;

fn main() -> anyhow::Result<()> {

    set_sys(System::new());

    let program = Program::new();
    // let all_args = program.concat_arguments();
    // println!("all arguments: {all_args}");

    let version = version();
    println!("typescript version: {version}");

    Ok(())
}
