// import * as ts from 'typescript';
export function test() {
    return "ok";
}

class CompilerOptions {
    inner;
    constructor() {
        this.inner = 3;
    }
}

function tsVersion() {
    // return ts.version;
    return "5.2";
}

export const canvas = {
    tsVersion,
    CompilerOptions
};