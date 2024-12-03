mod bindings;
use bindings::exports::ts::typescript::typescript::{Guest, GuestProgram};
use bindings::ts::typescript_system::types::System;

struct Component;

impl Guest for Component {
    type Program = Program;
}

struct Program{
    system: System,
}

impl GuestProgram for Program {
    fn new() -> Self {
        Program {
            system: System::new(),
        }
    }
    
    fn concat_arguments(&self) -> String {
        self.system.get_arguments().join("__")
    }
}

bindings::export!(Component with_types_in bindings);
