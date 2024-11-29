#[allow(warnings)]
mod bindings;

struct System;

impl bindings::exports::ts::typescript_system::system::Guest for System {
    fn get_current_directory() -> String {
        return "/".to_string();
    }
}

bindings::export!(System with_types_in bindings);
