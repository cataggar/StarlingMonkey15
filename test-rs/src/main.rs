mod bindings;
use bindings::ts::typescript::typescript::Program;

fn main() -> anyhow::Result<()> {

    let program = Program::new();
    let all_args = program.concat_arguments();
    println!("all arguments: {all_args}");

    Ok(())
}
