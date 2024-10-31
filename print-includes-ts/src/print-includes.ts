// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API

import { exit } from 'process';
import * as ts from 'typescript';

let tsa = ts as any;
let sys: ts.System = tsa.sys;
console.log("sys: ", sys);

// https://github.com/microsoft/TypeScript/blob/main/src/harness/fakesHosts.ts

class System implements ts.System {
    private inner: ts.System;
    constructor(inner: ts.System) {
        this.inner = inner;
    }
    public readonly args: string[] = [];
    public readonly output: string[] = [];
    public readonly newLine: string = "\n";
    public readonly useCaseSensitiveFileNames = true;

    write(s: string): void {
        console.log("System.write ", s);
        this.inner.write(s);
    }
    // writeOutputIsTTY?(): boolean {
    //     console.log("System.writeOutputIsTTY");
    //     return this.inner.writeOutputIsTTY ? this.inner.writeOutputIsTTY() : false;
    // }
    writeOutputIsTTY = undefined;
    getWidthOfTerminal?(): number {
        console.log("System.getWidthOfTerminal");
        return this.inner.getWidthOfTerminal ? this.inner.getWidthOfTerminal() : 120;
    }
    readFile(path: string, encoding?: string): string | undefined {
        console.log("System.readFile ", path);
        return this.inner.readFile(path, encoding);
    }
    getFileSize?(path: string): number {
        console.log("System.getFileSize ", path);
        return this.inner.getFileSize ? this.inner.getFileSize(path) : 0;
    }
    writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
        throw new Error('Method not implemented.');
    }
    watchFile?(path: string, callback: ts.FileWatcherCallback, pollingInterval?: number, options?: ts.WatchOptions): ts.FileWatcher {
        throw new Error('Method not implemented.');
    }
    watchDirectory?(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher {
        throw new Error('Method not implemented.');
    }
    resolvePath(path: string): string {
        throw new Error('Method not implemented.');
    }
    fileExists(path: string): boolean {
        let fileExists = this.inner.fileExists(path);
        console.log("System.fileExists ", path, fileExists);
        return fileExists;
    }
    directoryExists(path: string): boolean {
        let directoryExists = this.inner.directoryExists(path);
        console.log("System.directoryExists ", path, directoryExists);
        return directoryExists;
    }
    createDirectory(path: string): void {
        throw new Error('Method not implemented.');
    }
    getExecutingFilePath(): string {
        let executingFilePath = this.inner.getExecutingFilePath();
        console.log("System.executingFilePath: ", executingFilePath);
        return executingFilePath;
    }
    getCurrentDirectory(): string {
        let currentDirectory = this.inner.getCurrentDirectory();
        console.log("System.getCurrentDirectory: ", currentDirectory);
        return currentDirectory;
    }
    getDirectories(path: string): string[] {
        let directories = this.inner.getDirectories(path);
        console.log("System.getDirectories: ", path, directories);
        return directories;
    }
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        throw new Error('Method not implemented.');
    }
    getModifiedTime?(path: string): Date | undefined {
        throw new Error('Method not implemented.');
    }
    setModifiedTime?(path: string, time: Date): void {
        throw new Error('Method not implemented.');
    }
    deleteFile?(path: string): void {
        throw new Error('Method not implemented.');
    }
    createHash?(data: string): string {
        throw new Error('Method not implemented.');
    }
    createSHA256Hash?(data: string): string {
        throw new Error('Method not implemented.');
    }
    getMemoryUsage?(): number {
        throw new Error('Method not implemented.');
    }
    exit(exitCode?: number): void {
        throw new Error('Method not implemented.');
    }
    realpath?(path: string): string {
        let realpath = this.inner.realpath ? this.inner.realpath(path) : path;
        console.log("System.realpath: ", path, realpath);
        return realpath;
    }
    setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]) {
        throw new Error('Method not implemented.');
    }
    clearTimeout?(timeoutId: any): void {
        throw new Error('Method not implemented.');
    }
    clearScreen?(): void {
        throw new Error('Method not implemented.');
    }
    base64decode?(input: string): string {
        throw new Error('Method not implemented.');
    }
    base64encode?(input: string): string {
        throw new Error('Method not implemented.');
    }
    
}

tsa.setSys(new System(sys))


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