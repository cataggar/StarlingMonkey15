mod bindings;
use bindings::exports::ts::typescript_system::types as sys;
use bindings::wasi::cli::environment as env;

struct Component;

impl sys::Guest for Component {
    type System = System;
}

struct System;
impl sys::GuestSystem for System {
    fn new() -> Self {
        System
    }
    // fn get_arguments(&self) -> Vec<String> {
    //     cli::environment::get_arguments()
    // }
    
    fn directory_exists(
        &self,
        path: String,
    ) -> bool {
        println!("directory_exists({:?})", path);
        // let dirs = preopens::get_directories();
        // let dirs = dirs.into_iter().map(|d| d.1 ).collect::<Vec<_>>();
        // let err_msg = format!("Directories: {:?}", dirs);
        // Err(err_msg)
        // Ok(dirs.iter().any(|d| d.1 == path))
        true
    }
    
    fn get_directories(
        &self,
        path: String,
    ) -> Vec<String> {
        println!("get_directories({:?})", path);
        return Vec::new();
    }
    
    fn write(&self, message: String) {
        println!("write({:?})", message);
        println!("{}", message);
    }
    
    fn write_output_is_tty(&self) -> bool {
        println!("write_output_is_tty()");
        false
    }
    
    fn get_width_of_terminal(&self) -> u8 {
        println!("get_width_of_terminal()");
        120
    }
    
    fn read_file(
        &self,
        path: String,
        encoding: Option<String>,
    ) -> Option<String> {
        println!("read_file({:?}, {:?})", path, encoding);
        None
    }
    
    fn get_file_size(&self, path: String) -> u32 {
        todo!()
    }
    
    fn write_file(
        &self,
        path: String,
        data: String,
        write_byte_order_mark: bool,
    ) {
        println!("write_file({:?}, {:?}, {:?})", path, data, write_byte_order_mark);
    }
    
    fn resolve_path(&self, path: String) -> String {
        println!("resolve_path({:?})", path);
        path
    }
    
    fn file_exists(&self, path: String) -> bool {
        println!("file_exists({:?})", path);
        true
    }
    
    fn create_directory(&self, path: String) {
        println!("create_directory({:?})", path);
    }
    
    fn get_executing_file_path(&self) -> String {
        println!("get_executing_file_path()");
        env::initial_cwd().unwrap_or_default()
    }

    fn get_current_directory(&self) -> String {
        println!("get_current_directory()");
        env::initial_cwd().unwrap_or_default()
    }
    
    fn read_directory(
        &self,
        path: String,
        extensions: Vec<String>,
        exclude: Vec<String>,
        includes: Vec<String>,
        depth: Option<u8>,
    ) -> Vec<String> {
        println!("read_directory({:?}, {:?}, {:?}, {:?}, {:?})", path, extensions, exclude, includes, depth);
        Vec::new()
    }
    
    fn get_modified_time(&self, path: String) -> Option<sys::Instant> {
        println!("get_modified_time({:?})", path);
        None
    }
    
    fn set_modified_time(&self, path: String, time: sys::Instant) {
        println!("set_modified_time({:?}, {:?})", path, time);
    }
    
    fn delete_file(&self, path: String) {
        println!("delete_file({:?})", path);
    }
    
    fn create_hash(&self, data: String) -> String {
        println!("create_hash({:?})", data);
        data
    }
    
    fn create_sha256_hash(&self, data: String) -> String {
        println!("create_sha256_hash({:?})", data);
        data
    }
    
    fn get_memory_usage(&self) -> u32 {
        println!("get_memory_usage()");
        0
    }
    
    fn exit(&self, exit_code: i32) {
        println!("exit({:?})", exit_code);
    }
    
    fn real_path(&self, path: String) -> String {
        println!("real_path({:?})", path);
        path
    }
    
    fn clear_timeout(&self, timeout_id: u32) {
        println!("clear_timeout({:?})", timeout_id);
    }
    
    fn clear_screen(&self) {
        println!("clear_screen()");
    }
    
    fn base64_encode(&self, data: String) -> String {
        println!("base64_encode({:?})", data);
        data
    }
    
    fn base64_decode(&self, data: String) -> String {
        println!("base64_decode({:?})", data);
        data
    }
    
}

bindings::export!(Component with_types_in bindings);
