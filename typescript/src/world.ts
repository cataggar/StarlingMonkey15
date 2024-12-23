// import { System } from 'ts:typescript-system/types@0.1.0';
import * as t from 'typescript';
// import * as sys from 'system';
// import * as sys from 'interfaces/ts-typescript-sys';
// import { System } from 'ts-sys';
// import * as sys from 'sys';
import { System } from 'ts:typescript/ts-sys@0.1.0';

export function setSystem() {
    (ts as any).setSys(new System2(new System()));
}

class CompilerOptions {
    private readonly _inner: t.CompilerOptions;

    constructor(inner: t.CompilerOptions) {
        this._inner = inner;
    }

    static new() {
        return new CompilerOptions(new Object() as t.CompilerOptions);
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

    // setTarget(value: ts.ScriptTarget | undefined) {
    //     this._inner.target = value;
    // }
}



class CompilerHost {
    private _inner: t.CompilerHost;
    constructor(inner: t.CompilerHost) {
        this._inner = inner;
    }
    inner() {
        return this._inner;
    }

    // setGetCurrentDirectory(fn: FnGetCurrentDirectory) {
    //     this._inner.getCurrentDirectory = fn.call;
    // }

    // setGetCanonicalFileName(fn: FnGetCanonicalFileName) {
    //     this._inner.getCanonicalFileName = fn.call;
    // }

    // setGetSourceFile(fn: FnGetSourceFile) {
    //     this._inner.getSourceFile = function(fileName: string, languageVersionOrOptions: ts.ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean) {
    //         let fnOnError = new FnOnError(onError || (() => {}));
    //         if (typeof languageVersionOrOptions === "number") {
    //             return fn.call(fileName, languageVersionOrOptions, fnOnError);
    //         }
    //     }
    // }

    setUseCaseSensitiveFileNames(fn: FnUseCaseSensitiveFileNames) {
        console.log("setUseCaseSensitiveFileNames");
        console.log("compilerHost", this._inner);
        // this._inner.useCaseSensitiveFileNames = fn.call;
    }
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

class Program {
    private _value : t.Program;
    constructor(value: t.Program) {
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
    private _value : t.TypeChecker;
    constructor(value: t.TypeChecker) {
        this._value = value;
    }
}

function version() {
    return ts.version;
}

class System2 implements t.System {
    public readonly args: string[] = [];
    public readonly output: string[] = [];
    public readonly newLine: string = "\n";
    public readonly useCaseSensitiveFileNames = true;

    constructor(private inner: System) {}

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
    watchFile?(path: string, callback: t.FileWatcherCallback, pollingInterval?: number, options?: t.WatchOptions): t.FileWatcher {
        throw new Error('System.watchFile Method not implemented.');
    }
    watchDirectory?(path: string, callback: t.DirectoryWatcherCallback, recursive?: boolean, options?: t.WatchOptions): t.FileWatcher {
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
        // console.log("inner", this.inner);
        // let currentDirectory = this.inner.getCurrentDirectory();
        // console.log("System.getCurrentDirectory: ", currentDirectory);
        // return currentDirectory;
        return "";
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

function createCompilerHost(options: CompilerOptions): CompilerHost {
    return new CompilerHost(t.createCompilerHost(options.inner()));
}

// function createProgram(rootNames: Array<string>, options: CompilerOptions, host: CompilerHost): Program {
// function createProgram(options: CompilerOptions, host: CompilerHost): Program {
// function createProgram(options: CompilerOptions): Program {
//     let rootNames = ["abc.ts"];
//     console.log("createProgram called");
//     // return new Program(ts.createProgram(rootNames, options.inner(), host.inner(), undefined, undefined));
//     return new Program(ts.createProgram(rootNames, options.inner(), undefined, undefined, undefined));
// }

// function createProgram(rootNames: string[], options: CompilerOptions, host: CompilerHost) {
// function createProgram(options: CompilerOptions, host: CompilerHost) {
function createProgram() {
    // try {
    //     return new Program(ts.createProgram(["abc.ts"], CompilerOptions.new().inner(), createCompilerHost(CompilerOptions.new()).inner()));
    // } catch (ex) {
    //     throw `createProgram failed: ${ex}`;
    // }
    throw 'createProgram not implemented';
}

function getPreEmitDiagnostics(program: Program) {
    // return ts.getPreEmitDiagnostics(program.inner()).map(Diagnostic.new);
    throw 'getPreEmitDiagnostics not implemented';
}

class Diagnostic {
    private _value : t.Diagnostic;
    constructor(value: t.Diagnostic) {
        this._value = value;
    }
    static new(value: t.Diagnostic) {
        return new Diagnostic(value);
    }
    inner() {
        return this._value;
    }
}

export const ts = {
    Program,
    version,
    CompilerOptions,
    setSystem,
    createCompilerHost,
    createProgram,
    getPreEmitDiagnostics
}