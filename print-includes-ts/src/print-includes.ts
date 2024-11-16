// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API

import * as ts from 'typescript';

let compilerOptions: ts.CompilerOptions = {};
compilerOptions.target = ts.ScriptTarget.ESNext;
// compilerOptions.lib = ["lib.es2022.d.ts"];
compilerOptions.esModuleInterop = true;
// compilerOptions.skipDefaultLibCheck = true;
compilerOptions.moduleResolution = ts.ModuleResolutionKind.NodeNext;
compilerOptions.module = ts.ModuleKind.NodeNext;

let setParentNodes = true;
let compilerHost = ts.createCompilerHost(compilerOptions, setParentNodes);
compilerHost.useCaseSensitiveFileNames = () => {
    return true;
}
// compilerHost.getCurrentDirectory = () => {
//     console.log("getCurrentDirectory");
//     return "";
// }
// compilerHost.getCanonicalFileName = (fileName: string) => {
//     console.log("getCanonicalFileName", fileName);
//     return fileName;
// }
// compilerHost.getSourceFile = (fileName: string, languageVersion: ts.ScriptTarget, onError: (message: string) => void, shouldCreateNewSourceFile: boolean) => {
//     console.log("getSourceFile", fileName);
//     return undefined;
// }
let program = ts.createProgram(["abc"], compilerOptions, compilerHost, undefined, undefined);
let checker = program.getTypeChecker();
let diagnostics = ts.getPreEmitDiagnostics(program, undefined, undefined);
// console.log("diagnostics", diagnostics);
diagnostics.forEach(diagnostic => {
    const categoryString = ts.DiagnosticCategory[diagnostic.category];
    console.log("category: ", categoryString);
    // if diagnostic.messageText is object, try to get messageText, if not print whole object
    if (typeof diagnostic.messageText === "object") {
        console.log("messageText: ", diagnostic.messageText.messageText);
    } else {
        console.log("messageText: ", diagnostic.messageText);
    }
    // console.log("diagnostic: ", diagnostic.messageText);
    // print filename and line number
    if (diagnostic.file) {
        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        console.log("    filename: ", diagnostic.file.fileName);
        console.log("    line: ", line);
        console.log("    character: ", character);
    }
});
