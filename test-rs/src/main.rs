mod bindings;
use bindings::ts::typescript::typescript as ts;
use bindings::ts::typescript_system::types as sys;
use anyhow::Context;

fn main() -> anyhow::Result<()> {

    ts::set_sys(sys::System::new());

    // let program = ts.createProgram(["abc.ts"], compilerOptions, compilerHost, undefined, undefined);
    // let checker = program.getTypeChecker();
    // let diagnostics = ts.getPreEmitDiagnostics(program, undefined, undefined);

    // let program = Program::new();
    let program = ts::create_program(
        //&["abc.ts".to_string()],
        // ts::CompilerOptions::new()
    ).map_err(|e| anyhow::anyhow!(e))?;
    let _checker = program.get_type_checker();
    let _diagnostics = ts::get_pre_emit_diagnostics(&program);

    let version = ts::version();
    println!("typescript version: {version}");

    Ok(())
}
