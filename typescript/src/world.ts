import { System } from 'ts:typescript-system/types';

class Program {
    constructor(public system: System){}
    concatArguments() {
        // return "todo";
        return this.system.getArguments().join("__");
        // return this.system.hello();
    }
}

export const typescript = {
    Program,
}