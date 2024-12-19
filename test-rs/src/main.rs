mod bindings;
use bindings::ts::typescript::typescript::{version, Program};
use bindings::ts::typescript_system::types::System;

fn main() -> anyhow::Result<()> {

    let program = Program::new(System::new());
    let all_args = program.concat_arguments();
    println!("all arguments: {all_args}");

    let version = version();
    println!("typescript version: {version}");

    Ok(())
}
