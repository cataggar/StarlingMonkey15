import { TsTypescriptSystemTypes as tssystem } from 'ts-typescript-system-types';
import TsSystem = tssystem.System;

class Program {
    readonly system: TsSystem;
    constructor(){
        this.system = new TsSystem();
    }
    // constructor(public system: TsSystem){}
    concatArguments() {
        // return "todo";
        return this.system.getArguments().concat("__");
    }
}

export const typescript = {
    Program,
}