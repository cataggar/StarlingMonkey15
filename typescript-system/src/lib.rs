mod bindings;
use bindings::wasi::cli::environment;

struct System;

impl bindings::exports::ts::typescript_system::system::Guest for System {
    fn get_current_directory() -> String {
        environment::initial_cwd().unwrap_or("/none".to_string())
    }
    fn get_arguments() -> Vec<String> {
        environment::get_arguments()
    }
}

bindings::export!(System with_types_in bindings);
