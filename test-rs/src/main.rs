mod bindings;
use bindings::ts::typescript::typescript as ts;
use bindings::ts::typescript_system::types as sys;

fn main() -> Result<(), Box<dyn std::error::Error>> {

    ts::set_sys(sys::System::new());

    let version = ts::version();
    println!("typescript version: {version}");

    let compiler_options = ts::CompilerOptions::new();
    let program_options = ts::CreateProgramOptions::new(&["abc.ts".to_string()], &compiler_options);
    let program = ts::create_program2(&program_options)?;

    // let host = ts::create_compiler_host(&compiler_options, true)?;
    // println!("host: {:?}", host);
    // let program = ts::create_program(
    //     &["abc.ts".to_string()],
    //     &compiler_options,
    //     &host
    // )?;
    println!("program: {:?}", program);
    println!("get_type_checker");
    let _checker = program.get_type_checker()?;
    println!("get_pre_emit_diagnostics");
    let diagnostics = ts::get_pre_emit_diagnostics(&program);
    println!("diagnostics: {:?}", diagnostics);
    // print node count
    // println!("node count: {}", program.get_node_count());
    // println!("type count: {}", program.get_type_count());
    // let source_files = program.get_source_files()?;
    // println!("source files: {:?}", source_files);

    Ok(())
}
