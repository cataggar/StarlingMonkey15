mod bindings;
use std::f32::consts::E;

use bindings::wasi::{self, cli};
use bindings::wasi::filesystem::types as fs;
use bindings::wasi::filesystem::preopens;
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
        cli::environment::get_arguments()
    }

    fn hello(&self) -> Result<String,String> {
        let dirs = preopens::get_directories();
        let err_msg = format!("Directories: {:?}", dirs);
        Err(err_msg)
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
    
    fn directory_exists(
        &self,
        path: String,
    ) -> Result<bool, String> {
        let dirs = preopens::get_directories();
        let dirs = dirs.into_iter().map(|d| d.1 ).collect::<Vec<_>>();
        let err_msg = format!("Directories: {:?}", dirs);
        Err(err_msg)
    }

    
}

bindings::export!(Component with_types_in bindings);
