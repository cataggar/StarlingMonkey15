mod bindings;
use bindings::wasi::cli::environment;
use bindings::exports::ts::typescript_system::types::{Args, Guest, GuestSystem};

struct Component;

impl Guest for Component {
    type System = System;
}

struct System;
impl GuestSystem for System {
    fn new() -> Self {
        System
    }
    fn get_arguments(&self) -> Vec<String> {
        environment::get_arguments()
    }
    fn hello(&self) -> String {
        // "Hello from Rust!".to_string()
        // return concatenated string
        self.get_arguments().join(" ")
    }
    
    fn args(&self) -> Args {
        let args = self.get_arguments();
        let count = args.len() as u8;
        let one = args.get(0).cloned();
        let two = args.get(1).cloned();
        let three = args.get(2).cloned();
        Args {
            count,
            one,
            two,
            three,
        }
    }

    
}

bindings::export!(Component with_types_in bindings);
