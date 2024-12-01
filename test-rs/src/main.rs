mod bindings;
use bindings::ts::typescript::typescript::*;

fn main() -> anyhow::Result<()> {
    set_sys();
    let compiler_options = CompilerOptions::new();
    println!("compiler options: {:?}", compiler_options);

    // let sys = System::new();
    // println!("current directory: {:?}", system::get_current_directory());
    // println!("arguments: {:?}", system::get_arguments());
    // println!("environment: {:?}", system::get_environment());

    match create_program(compiler_options) {
        Ok(_program) => println!("create program success"),
        Err(e) => println!("create program failed: {:?}", e),
    }
    Ok(())
}
