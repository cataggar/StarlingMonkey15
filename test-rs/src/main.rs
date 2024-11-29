mod bindings;
use bindings::ts::typescript_system::system;

fn main() {
    println!("current directory: {}", system::get_current_directory());
}
