import * as ts from 'typescript';
// import { TsTypescriptSystemTs as tssystem } from 'ts-typescript-system-ts';
// import { System as TsSystem } from 'ts-typescript-system-ts';
import { System } from 'ts-typescript-system-ts';
// import { filesystem as fs, cli } from '@bytecodealliance/preview2-shim';
// import { TsTypescriptSystemTs } from './interfaces/ts-typescript-system-ts';
// import { typescript } from './wit.js';
// import { typescript } from './wit.js';

// let sys = new tssystem.System();

export function setSys() {
    (ts as any).setSys(new System2(new System()));
}
// function setSys() {
//     (ts as any).setSys(new System(new tssystem.System()));
// }

// Convert a string to a Uint8Array using TextEncoder
function stringToBytes(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

function test() {
    // let dirs = fs.preopens.getDirectories();
    // let concatDirs = dirs.map(dir => dir + "/").join(":");
    // let concatDirs = dirs.map((descriptor, path) => path ).join(",");
    // let concatDirs = dirs.map(([descriptor, path]) => path ).join(",");

    // let cwd = cli.environment.initialCwd();
    // cli.terminalStdout.write(`dirs: ${concatDirs}\n`);
    // cli.terminalOutput.write(`dirs: ${concatDirs}\n`);
    // cli.terminalStdout.getTerminalStdout()?.write(`dirs: ${concatDirs}\n`);
    // let stdout = cli.stdout.getStdout();
    // stdout.write(new TextEncoder().encode(`dirs: ${concatDirs}\n`));
    // stdout.write(stringToBytes(`cwd: ${cwd}\n`));
    // stdout.write(stringToBytes(`Is this another line?\n`));

    // return concatDirs;
    // return `dirs: ${concatDirs}`;
    return "ok";
}

class CompilerOptions {
    private readonly _inner: ts.CompilerOptions;

    constructor(inner: ts.CompilerOptions) {
        this._inner = inner;
    }

    static new() {
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

class System2 implements ts.System {
    public readonly args: string[] = [];
    public readonly output: string[] = [];
    public readonly newLine: string = "\n";
    public readonly useCaseSensitiveFileNames = true;

    constructor(private inner: TsSystem) {}

    write(message: string): void {
        throw new Error('System.write Method not implemented.');
        // console.log("System.write ", message);
        // this.output.push(message);
    }
    writeOutputIsTTY?(): boolean {
        throw new Error('System.writeOutputIsTTY Method not implemented.');
        // console.log("System.writeOutputIsTTY");
        // return false;
    }
    getWidthOfTerminal?(): number {
        throw new Error('System.getWidthOfTerminal Method not implemented.');
        console.log("System.getWidthOfTerminal");
        return 120;
    }
    readFile(path: string, encoding?: string): string | undefined {
        throw new Error('System.readFile Method not implemented.');
        // console.log("System.readFile ", path);
        // return fs.readFileSync(path, encoding as BufferEncoding || 'utf-8');
    }
    getFileSize?(path: string): number {
        throw new Error('System.getFileSize Method not implemented.');
        console.log("System.getFileSize ", path);
        // return this.inner.getFileSize ? this.inner.getFileSize(path) : 0;
    }
    writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
        throw new Error('System.writeFile Method not implemented.');
    }
    watchFile?(path: string, callback: ts.FileWatcherCallback, pollingInterval?: number, options?: ts.WatchOptions): ts.FileWatcher {
        throw new Error('System.watchFile Method not implemented.');
    }
    watchDirectory?(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher {
        throw new Error('System.watchDirectory Method not implemented.');
    }
    resolvePath(path: string): string {
        throw new Error('resolvePath Method not implemented.');
    }
    fileExists(path: string): boolean {
        throw new Error('System.fileExists Method not implemented.');
        // let fileExists = fs.existsSync(path);
        // console.log("System.fileExists ", path, fileExists);
        // return fileExists;
    }
    directoryExists(path: string): boolean {
        throw new Error('System.directoryExists Method not implemented.');
        // let directoryExists = fs.existsSync(path);
        // console.log("System.directoryExists ", path, directoryExists);
        // return directoryExists;
    }
    createDirectory(path: string): void {
        throw new Error('System.createDirectory Method not implemented.');
    }
    getExecutingFilePath(): string {
        // let executingFilePath = process.argv[1];
        // console.log("System.executingFilePath: ", executingFilePath);
        // return executingFilePath;
        // return "cowsay.js";
        return "";
    }
    getCurrentDirectory(): string {
        console.log("System.getCurrentDirectory");
        // throw new Error('System.getCurrentDirectory Method not implemented.');
        console.log("inner", this.inner);
        let currentDirectory = this.inner.getCurrentDirectory();
        console.log("System.getCurrentDirectory: ", currentDirectory);
        return currentDirectory;
    }
    getDirectories(path: string): string[] {
        throw new Error('System.getDirectories Method not implemented.');
        // let directories = this.inner.getDirectories(path);
        // console.log("System.getDirectories: ", path, directories);
        // return directories;
    }
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        throw new Error('System.readDirectory Method not implemented.');
    }
    getModifiedTime?(path: string): Date | undefined {
        throw new Error('System.getModifiedTime Method not implemented.');
    }
    setModifiedTime?(path: string, time: Date): void {
        throw new Error('System.setModifiedTime Method not implemented.');
    }
    deleteFile?(path: string): void {
        throw new Error('System.deleteFile Method not implemented.');
    }
    createHash?(data: string): string {
        throw new Error('System.createHash Method not implemented.');
    }
    createSHA256Hash?(data: string): string {
        throw new Error('System.createSHA256Hash Method not implemented.');
    }
    getMemoryUsage?(): number {
        throw new Error('getMemoryUsage Method not implemented.');
    }
    exit(exitCode?: number): void {
        throw new Error('exit Method not implemented.');
    }
    realpath?(path: string): string {
        console.log("System.realpath: ", path);
        return path;
    }
    setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]) {
        throw new Error('System.setTimeout Method not implemented.');
    }
    clearTimeout?(timeoutId: any): void {
        throw new Error('System.clearTimeout Method not implemented.');
    }
    clearScreen?(): void {
        throw new Error('System.clearScreen Method not implemented.');
    }
    base64decode?(input: string): string {
        throw new Error('System.base64decode Method not implemented.');
    }
    base64encode?(input: string): string {
        throw new Error('System.base64encode Method not implemented.');
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

export const typescript = {
    setSys,
    test,
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
}