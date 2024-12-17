mod bindings;
use bindings::wasi::cli::environment;
use bindings::exports::ts::typescript_system::types::{Guest, GuestSystem};

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
        "Hello from Rust!".to_string()
    }
}

bindings::export!(Component with_types_in bindings);
