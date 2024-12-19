import { System } from 'ts:typescript-system/types';
import * as ts from 'typescript';

class Program {
    constructor(public system: System){}
    concatArguments() {
        // return "todo";
        // return this.system.getArguments().concat("__");
        // return this.system.hello();
        let args = this.system.args();
        let count = args.count;
        return `args count: ${count} one: ${args.one}, two: ${args.two}, three: ${args.three}`;
    }
}

function version() {
    return ts.version;
}

export const typescript = {
    Program,
    version
}