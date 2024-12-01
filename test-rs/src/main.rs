mod bindings;
use bindings::ts::typescript::typescript::*;

fn main() {
    set_sys();
    let compiler_options = CompilerOptions::new();
    println!("compiler options: {:?}", compiler_options);

    // let sys = System::new();
    // println!("current directory: {:?}", system::get_current_directory());
    // println!("arguments: {:?}", system::get_arguments());
    // println!("environment: {:?}", system::get_environment());

    let compiler_host = create_program(compiler_options);
    println!("compiler host: {:?}", compiler_host);
}
