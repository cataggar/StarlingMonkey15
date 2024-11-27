import * as ts from 'typescript';
export function test() {

    let tsa = ts as any;
    let sys: ts.System = tsa.sys;
    // console.log("sys: ", sys);
    tsa.setSys(new System(sys))

    return "ok";
}

class CompilerOptions {
    private readonly _inner: ts.CompilerOptions;
    // constructor() {
    //     this._inner = new Object() as ts.CompilerOptions;
    // }
    constructor(inner: ts.CompilerOptions) {
        this._inner = inner;
    }

    static create() {
        return new CompilerOptions(new Object() as ts.CompilerOptions);
    }

    inner() {
        return this._inner;
    }

    getAlwaysStrict(): boolean | undefined {
        return this._inner.alwaysStrict;
    }

    setAlwaysStrict(value: boolean | undefined) {
        this._inner.alwaysStrict = value;
    }

    setTarget(value: ts.ScriptTarget | undefined) {
        this._inner.target = value;
    }
}

function createCompilerHost(options: CompilerOptions): CompilerHost {
    return new CompilerHost(ts.createCompilerHost(options.inner()));
}

class FnUseCaseSensitiveFileNames {
    private _fn: () => boolean;
    constructor(fn: () => boolean) {
        this._fn = fn;
    }
    call() {
        return this._fn();
    }
}

class FnGetCurrentDirectory {
    private _fn: () => string;
    public constructor(fn: () => string) {
        this._fn = fn;
    }
    call() {
        return this._fn();
    }
}

class FnGetCanonicalFileName {
    private _fn: (fileName: string) => string;
    constructor(fn: (fileName: string) => string) {
        this._fn = fn;
    }
    call(fileName: string) {
        return this._fn(fileName);
    }
}

class FnOnError {
    private _fn: (message: string) => void;
    constructor(fn: (message: string) => void) {
        this._fn = fn;
    }
    call(message: string) {
        return this._fn(message);
    }
}

class FnGetSourceFile {
    private _fn: (fileName: string, languageVersion: ts.ScriptTarget, onError?: FnOnError, shouldCreateNewSourceFile?: boolean) => ts.SourceFile | undefined;
    constructor(fn: (fileName: string, languageVersion: ts.ScriptTarget, onError?: FnOnError, shouldCreateNewSourceFile?: boolean) => ts.SourceFile | undefined) {
        this._fn = fn;
    }
    call(fileName: string, languageVersion: ts.ScriptTarget, onError?: FnOnError) {
        return this._fn(fileName, languageVersion, onError);
    }
}

class CompilerHost {
    private _inner: ts.CompilerHost;
    constructor(inner: ts.CompilerHost) {
        this._inner = inner;
    }
    inner() {
        return this._inner;
    }

    setGetCurrentDirectory(fn: FnGetCurrentDirectory) {
        this._inner.getCurrentDirectory = fn.call;
    }

    setGetCanonicalFileName(fn: FnGetCanonicalFileName) {
        this._inner.getCanonicalFileName = fn.call;
    }

    setGetSourceFile(fn: FnGetSourceFile) {
        this._inner.getSourceFile = function(fileName: string, languageVersionOrOptions: ts.ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean) {
            let fnOnError = new FnOnError(onError || (() => {}));
            if (typeof languageVersionOrOptions === "number") {
                return fn.call(fileName, languageVersionOrOptions, fnOnError);
            }
        }
    }

    setUseCaseSensitiveFileNames(fn: FnUseCaseSensitiveFileNames) {
        console.log("setUseCaseSensitiveFileNames");
        console.log("compilerHost", this._inner);
        // this._inner.useCaseSensitiveFileNames = fn.call;
    }
}

class SourceFile {
    private _value : ts.SourceFile;
    constructor(value: ts.SourceFile) {
        this._value = value;
    }
}

class Bundle {
    private _value : ts.Bundle;
    constructor() {
        this._value = new Object() as ts.Bundle;
    }
    kind() {
        return this._value.kind;
    }
}

class Nodefactory {
    private _value : ts.NodeFactory;
    constructor(value: ts.NodeFactory) {
        this._value = value;
    }
    createVoidZero() {
        return new Voidexpression(this._value.createVoidZero());
    }
}

class Voidexpression {
    private _value : ts.VoidExpression;
    constructor(value: ts.VoidExpression) {
        this._value = value;
    }
    kind() {
        return this._value.kind;
    }
}

function tsVersion() {
    // return ts.version;
    return "5.2";
}


function nodeFactory() {
    // would like to try to return existing types if possible
    // return ts.factory;
    return new Nodefactory(ts.factory);
}

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
    writeOutputIsTTY?(): boolean {
        console.log("System.writeOutputIsTTY");
        return this.inner.writeOutputIsTTY ? this.inner.writeOutputIsTTY() : false;
    }
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
        throw new Error('writeFile Method not implemented.');
    }
    watchFile?(path: string, callback: ts.FileWatcherCallback, pollingInterval?: number, options?: ts.WatchOptions): ts.FileWatcher {
        throw new Error('watchFile Method not implemented.');
    }
    watchDirectory?(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher {
        throw new Error('watchDirectory Method not implemented.');
    }
    resolvePath(path: string): string {
        throw new Error('resolvePath Method not implemented.');
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
        throw new Error('createDirectory Method not implemented.');
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
        throw new Error('readDirectory Method not implemented.');
    }
    getModifiedTime?(path: string): Date | undefined {
        throw new Error('getModifiedTime Method not implemented.');
    }
    setModifiedTime?(path: string, time: Date): void {
        throw new Error('setModifiedTime Method not implemented.');
    }
    deleteFile?(path: string): void {
        throw new Error('deleteFile Method not implemented.');
    }
    createHash?(data: string): string {
        throw new Error('createHash Method not implemented.');
    }
    createSHA256Hash?(data: string): string {
        throw new Error('createSHA256Hash Method not implemented.');
    }
    getMemoryUsage?(): number {
        throw new Error('getMemoryUsage Method not implemented.');
    }
    exit(exitCode?: number): void {
        throw new Error('exit Method not implemented.');
    }
    realpath?(path: string): string {
        let realpath = this.inner.realpath ? this.inner.realpath(path) : path;
        console.log("System.realpath: ", path, realpath);
        return realpath;
    }
    setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]) {
        throw new Error('setTimeout Method not implemented.');
    }
    clearTimeout?(timeoutId: any): void {
        throw new Error('clearTimeout Method not implemented.');
    }
    clearScreen?(): void {
        throw new Error('clearScreen Method not implemented.');
    }
    base64decode?(input: string): string {
        throw new Error('base64decode Method not implemented.');
    }
    base64encode?(input: string): string {
        throw new Error('base64encode Method not implemented.');
    }
}

class Program {
    private _value : ts.Program;
    constructor(value: ts.Program) {
        this._value = value;
    }
    inner() {
        return this._value;
    }
    getTypeChecker() {
        return new TypeChecker(this._value.getTypeChecker());
    }
}

class TypeChecker {
    private _value : ts.TypeChecker;
    constructor(value: ts.TypeChecker) {
        this._value = value;
    }
}

// function createProgram(rootNames: Array<string>, options: CompilerOptions, host: CompilerHost): Program {
// function createProgram(options: CompilerOptions, host: CompilerHost): Program {
function createProgram(options: CompilerOptions): Program {
    let rootNames = ["abc.ts"];
    console.log("createProgram called");
    // return new Program(ts.createProgram(rootNames, options.inner(), host.inner(), undefined, undefined));
    return new Program(ts.createProgram(rootNames, options.inner(), undefined, undefined, undefined));
}

class Diagnostic {
    private _value : ts.Diagnostic;
    constructor(value: ts.Diagnostic) {
        this._value = value;
    }
    inner() {
        return this._value;
    }
    category() {
        return this._value.category;
    }
    messageText() {
        return this._value.messageText;
    }
    start() {
        return this._value.start;
    }
}

function getPreEmitDiagnostics(program: Program): Diagnostic[] {
    let diagnostics = ts.getPreEmitDiagnostics(program.inner());
    return diagnostics.map(diagnostic => new Diagnostic(diagnostic));
}

export const canvas = {
    tsVersion,
    CompilerOptions,
    nodeFactory,
    Nodefactory,
    Voidexpression,
    CompilerHost,
    FnGetCurrentDirectory,
    createCompilerHost,
    FnGetCanonicalFileName,
    FnGetSourceFile,
    SourceFile,
    FnOnError,
    FnUseCaseSensitiveFileNames,
    Diagnostic,
    Program,
    TypeChecker,
    createProgram,
    getPreEmitDiagnostics,
};