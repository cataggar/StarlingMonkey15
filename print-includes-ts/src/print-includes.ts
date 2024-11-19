// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API

import { exit } from 'process';
import * as ts from 'typescript';

let compilerOptions: ts.CompilerOptions = {};
compilerOptions.target = ts.ScriptTarget.ESNext;
// compilerOptions.lib = ["lib.es2022.d.ts"];
// compilerOptions.esModuleInterop = true;
// compilerOptions.skipDefaultLibCheck = true;
compilerOptions.moduleResolution = ts.ModuleResolutionKind.NodeNext;
compilerOptions.module = ts.ModuleKind.NodeNext;

let setParentNodes = true;
let compilerHost = ts.createCompilerHost(compilerOptions, setParentNodes);
compilerHost.useCaseSensitiveFileNames = () => {
    return true;
}

let getCurrentDirectory = compilerHost.getCurrentDirectory;
compilerHost.getCurrentDirectory = () => {
    let currentDirectory = getCurrentDirectory();
    // console.log("getCurrentDirectory: ", currentDirectory);
    // return currentDirectory;
    return "";
}

let getCanonicalFileName = compilerHost.getCanonicalFileName;
compilerHost.getCanonicalFileName = (fileName: string) => {
    let canonicalFileName = getCanonicalFileName(fileName);
    // console.log("getCanonicalFileName", fileName, canonicalFileName);
    return canonicalFileName;
}

let getSourceFile = compilerHost.getSourceFile;
compilerHost.getSourceFile = (fileName: string, languageVersion: ts.ScriptTarget, onError: (message: string) => void, shouldCreateNewSourceFile: boolean) => {
    // console.log("getSourceFile", fileName);
    let sourceFile = getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
    return sourceFile;
}
let program = ts.createProgram(["abc.ts"], compilerOptions, compilerHost, undefined, undefined);
let checker = program.getTypeChecker();
let diagnostics = ts.getPreEmitDiagnostics(program, undefined, undefined);
// console.log("diagnostics", diagnostics);
if(diagnostics.length !== 0) {
    console.log("Errors " + diagnostics.length);
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
    exit(1);
}

console.log("No errors");

let sourceFiles = program.getSourceFiles();
// get source file "abc.ts"
let fileName = "abc.ts";
let sourceFile = sourceFiles.find(sourceFile => sourceFile.fileName === fileName);
if (sourceFile === undefined) {
    console.log("sourceFile not found");
    exit(1);
}

// print nodes in source file
let nodes = sourceFile.getChildren();
let printNode = (node: ts.Node, indent: string) => {
    console.log(indent + ts.SyntaxKind[node.kind]);
    indent += "  ";
    node.getChildren().forEach(child => {
        printNode(child, indent);
    });
}
printNode(sourceFile, "");