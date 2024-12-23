mod bindings;
use bindings::exports::ts::typescript_system::types as sys;
use bindings::wasi::cli::environment as env;
use bindings::wasi::filesystem::types::Descriptor;
use bindings::wasi::filesystem::types::DescriptorStat;
use bindings::wasi::filesystem::types as fs;
use bindings::wasi::filesystem::preopens;

struct Component;

impl sys::Guest for Component {
    type System = System;
}

fn find_descriptor(path: &str) -> Option<Descriptor> {
    let dirs = preopens::get_directories();
    for dir in dirs {
        let path_flags = fs::PathFlags::empty();
        let open_flags = fs::OpenFlags::empty();
        let descriptor_flags = fs::DescriptorFlags::empty();
        let descriptor = dir.0.open_at(path_flags, path, open_flags, descriptor_flags);
        if let Ok(descriptor) = descriptor {
            return Some(descriptor);
        }
    }
    None
}

fn stat(path: &str) -> Option<DescriptorStat> {
    match find_descriptor(path) {
        Some(descriptor) => {
            match descriptor.stat() {
                Ok(stat) => {
                    return Some(stat);
                },
                Err(err) => {
                    println!("stat error: {:?}", err);
                }
            }
        },
        None => {
            // println!("stat {:?} descriptor not found", path);
        }
    }
    None
}

struct System;
impl sys::GuestSystem for System {
    fn new() -> Self {
        System
    }
    
    fn directory_exists(
        &self,
        path: String,
    ) -> bool {
        // println!("directory_exists({:?})", path);
        match stat(&path) {
            Some(stat) => {
                // println!("directory exists: {:?}", path);
                return stat.type_ == fs::DescriptorType::Directory;
            },
            None => {
                false
            }
        }
    }
    
    fn get_directories(
        &self,
        path: String,
    ) -> Vec<String> {
        println!("get_directories({:?})", path);
        match find_descriptor(&path) {
            Some(descriptor) => {
                match descriptor.read_directory() {
                    Ok(entries) => {
                        let mut dirs = Vec::new();
                        while let Ok(Some(entry)) = entries.read_directory_entry() {
                            dirs.push(entry.name);
                        }
                        println!("get_directories result: {:?}", dirs);
                        return dirs;
                    },
                    Err(err) => {
                        println!("get_directories readdir error: {:?}", err);
                    }
                }
            },
            None => {
                println!("get_directories descriptor not found");
            }
        }
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
        let dirs = preopens::get_directories();
        for dir in dirs {
            // https://github.com/WebAssembly/wasi-filesystem/tree/main
            let path_flags = fs::PathFlags::empty();
            let open_flags = fs::OpenFlags::empty();
            let descriptor_flags = fs::DescriptorFlags::empty();
            let descriptor = dir.0.open_at(path_flags, &path, open_flags, descriptor_flags);
            // println!("read_file result: {:?})", descriptor);
            if let Ok(descriptor) = descriptor {
                match descriptor.stat() {
                    Ok(stat) => {
                        // println!("read_file stat: {:?}", stat);
                        let length = stat.size;
                        let bytes = descriptor.read(length, 0);
                        match bytes {
                            Ok((bytes, true)) => {
                                // println!("read_file bytes length true: {}", bytes.len());
                                return Some(String::from_utf8_lossy(&bytes).to_string());
                            },
                            Ok((bytes, false)) => {
                                // println!("read_file bytes length false: {}", bytes.len());
                                // TODO encoding
                                return Some(String::from_utf8_lossy(&bytes).to_string());
                            },
                            Err(err) => {
                                println!("read_file read error: {:?}", err);
                            }
                        }
                    },
                    Err(err) => {
                        println!("read_file stat error: {:?}", err);
                    }
                }
            }
        }
        None
    }
    
    fn get_file_size(&self, path: String) -> u32 {
        println!("get_file_size({:?})", path);
        let dirs = preopens::get_directories();
        for dir in dirs {
            let path_flags = fs::PathFlags::empty();
            let open_flags = fs::OpenFlags::empty();
            let descriptor_flags = fs::DescriptorFlags::empty();
            let descriptor = dir.0.open_at(path_flags, &path, open_flags, descriptor_flags);
            if let Ok(descriptor) = descriptor {
                match descriptor.stat() {
                    Ok(stat) => {
                        return stat.size as u32;
                    },
                    Err(err) => {
                        println!("get_file_size stat error: {:?}", err);
                    }
                }
            }
        }
        return 0;
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
        let exists = stat(&path).is_some();
        // println!("file_exists({:?}) -> {}", path, exists);
        exists
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
