mod bindings;
use bindings::ts::typescript::ts;
use bindings::exports::ts::typescript::ts_sys::{Guest, GuestSystem};

struct Component;

impl Guest for Component {
    type System = System;
}


struct System;
impl GuestSystem for System {
    fn new() -> Self {
        System
    }
    // fn get_arguments(&self) -> Vec<String> {
    //     environment::get_arguments()
    // }
    fn hello(&self) -> String {
        "Hello from Rust!".to_string()
        // return concatenated string
        // self.get_arguments().join(" ")
    }
    
    // fn args(&self) -> Args {
    //     let args = self.get_arguments();
    //     let count = args.len() as u8;
    //     let one = args.get(0).cloned();
    //     let two = args.get(1).cloned();
    //     let three = args.get(2).cloned();
    //     Args {
    //         count,
    //         one,
    //         two,
    //         three,
    //     }
    // }

    
}

fn main() -> Result<(), Box<dyn std::error::Error>> {

    // ts::set_system(sys::System::new());

    // let program = ts.createProgram(["abc.ts"], compilerOptions, compilerHost, undefined, undefined);
    // let checker = program.getTypeChecker();
    // let diagnostics = ts.getPreEmitDiagnostics(program, undefined, undefined);

    // let program = Program::new();
    let program = ts::create_program(
        //&["abc.ts".to_string()],
        // ts::CompilerOptions::new()
    )?;
    let _checker = program.get_type_checker();
    let _diagnostics = ts::get_pre_emit_diagnostics(&program);

    let version = ts::version();
    println!("typescript version: {version}");

    Ok(())
}

bindings::export!(Component with_types_in bindings);