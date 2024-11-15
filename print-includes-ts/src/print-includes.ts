// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API

import * as ts from 'typescript';

let compilerOptions: ts.CompilerOptions = {};
compilerOptions.target = ts.ScriptTarget.ESNext;

let setParentNodes = true;
let compilerHost = ts.createCompilerHost(compilerOptions, setParentNodes);
compilerHost.useCaseSensitiveFileNames = () => {
    return true;
}
compilerHost.getCurrentDirectory = () => {
    console.log("getCurrentDirectory");
    return "";
}
compilerHost.getCanonicalFileName = (fileName: string) => {
    console.log("getCanonicalFileName", fileName);
    return fileName;
}
compilerHost.getSourceFile = (fileName: string, languageVersion: ts.ScriptTarget, onError: (message: string) => void, shouldCreateNewSourceFile: boolean) => {
    console.log("getSourceFile", fileName);
    return undefined;
}
let program = ts.createProgram(["abc"], compilerOptions, compilerHost, undefined, undefined);
let checker = program.getTypeChecker();
let diagnostics = ts.getPreEmitDiagnostics(program, undefined, undefined);
console.log("diagnostics", diagnostics);
