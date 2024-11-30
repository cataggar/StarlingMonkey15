mod bindings;
use bindings::wasi::cli::environment;
use bindings::exports::ts::typescript_system::ts::{Guest, GuestSystem};

struct Component;

impl Guest for Component {
    type System = System;
}

struct System;
impl GuestSystem for System {
    fn get_current_directory(&self) -> String {
        environment::initial_cwd().unwrap_or("/".to_string())
    }
    fn get_arguments(&self) -> Vec<String> {
        environment::get_arguments()
    }
    fn get_environment(&self) -> Vec<(String, String)> {
        environment::get_environment()
    }
}

bindings::export!(Component with_types_in bindings);
