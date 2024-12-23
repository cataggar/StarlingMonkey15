import { System } from 'ts:typescript-system/types@0.1.0';
import * as ts from 'typescript';

export function setSys() {
    (ts as any).setSys(new System2(new System()));
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

    // setTarget(value: ts.ScriptTarget | undefined) {
    //     this._inner.target = value;
    // }
}



class CompilerHost {
    private _inner: ts.CompilerHost;
    constructor(inner: ts.CompilerHost) {
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
    private _value : ts.Program;
    constructor(value: ts.Program) {
        this._value = value;
    }
    inner() {
        return this._value;
    }
    getTypeChecker() {
        try {
            return new TypeChecker(this._value.getTypeChecker());
            // return new TypeChecker(new Object() as ts.TypeChecker);
        } catch (ex) {
            throw `getTypeChecker failed: ${ex}`;
        }
    }
    getNodeCount() {
        return this._value.getNodeCount();
    }
    getSourceFiles() {
        try {
            return this._value.getSourceFiles().map(SourceFile.new);
        } catch (ex) {
            throw `getSourceFiles failed: ${ex}`;
        }
    }
}

class SourceFile {
    private _value : ts.SourceFile;
    constructor(value: ts.SourceFile) {
        this._value = value;
    }
    static new(value: ts.SourceFile) {
        return new SourceFile(value);
    }
    inner() {
        return this._value;
    }
}

class TypeChecker {
    private _value : ts.TypeChecker;
    constructor(value: ts.TypeChecker) {
        this._value = value;
    }


}

function version() {
    return ts.version;
}

class System2 implements ts.System {
    public readonly args: string[] = [];
    public readonly output: string[] = [];
    public readonly newLine: string = "\n";
    public readonly useCaseSensitiveFileNames = true;

    constructor(private inner: System) {}

    write(message: string): void {
        // throw 'System.write Method not implemented.';
        // console.log("System.write ", message);
        // this.output.push(message);
        this.inner.write(message);
    }
    writeOutputIsTTY?(): boolean {
        return this.inner.writeOutputIsTty();
    }
    getWidthOfTerminal?(): number {
        return this.inner.getWidthOfTerminal();
    }
    readFile(path: string, encoding?: string): string | undefined {
        // return fs.readFileSync(path, encoding as BufferEncoding || 'utf-8');
        return this.inner.readFile(path, encoding);
    }
    getFileSize?(path: string): number {
        return this.inner.getFileSize(path);
    }
    writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
        this.inner.writeFile(path, data, writeByteOrderMark || false);
    }
    watchFile?(path: string, callback: ts.FileWatcherCallback, pollingInterval?: number, options?: ts.WatchOptions): ts.FileWatcher {
        throw 'System.watchFile Method not implemented.';
    }
    watchDirectory?(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher {
        throw 'System.watchDirectory Method not implemented.';
    }
    resolvePath(path: string): string {
        return this.inner.resolvePath(path);
    }
    fileExists(path: string): boolean {
        return this.inner.fileExists(path);
    }
    directoryExists(path: string): boolean {
        return this.inner.directoryExists(path);
    }
    createDirectory(path: string): void {
        this.inner.createDirectory(path);
    }
    getExecutingFilePath(): string {
        return this.inner.getExecutingFilePath();
    }
    getCurrentDirectory(): string {
        console.log("System.getCurrentDirectory");
        return this.inner.getCurrentDirectory();
    }
    getDirectories(path: string): string[] {
        return this.inner.getDirectories(path);
    }
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        return this.inner.readDirectory(path, extensions ? [...extensions] : [], exclude ? [...exclude] : [], include ? [...include] : [], depth);
    }
    getModifiedTime?(path: string): Date | undefined {
        throw 'System.getModifiedTime Method not implemented.';
    }
    setModifiedTime?(path: string, time: Date): void {
        throw 'System.setModifiedTime Method not implemented.';
    }
    deleteFile?(path: string): void {
        throw 'System.deleteFile Method not implemented.';
    }
    createHash?(data: string): string {
        throw 'System.createHash Method not implemented.';
    }
    createSHA256Hash?(data: string): string {
        throw 'System.createSHA256Hash Method not implemented.';
    }
    getMemoryUsage?(): number {
        throw 'getMemoryUsage Method not implemented.';
    }
    exit(exitCode?: number): void {
        throw 'exit Method not implemented.';
    }
    realpath?(path: string): string {
        console.log("System.realpath: ", path);
        return path;
    }
    setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]) {
        throw 'System.setTimeout Method not implemented.';
    }
    clearTimeout?(timeoutId: any): void {
        throw 'System.clearTimeout Method not implemented.';
    }
    clearScreen?(): void {
        throw 'System.clearScreen Method not implemented.';
    }
    base64decode?(input: string): string {
        throw 'System.base64decode Method not implemented.';
    }
    base64encode?(input: string): string {
        throw 'System.base64encode Method not implemented.';
    }
}

function createCompilerHost(options: CompilerOptions): CompilerHost {
    return new CompilerHost(ts.createCompilerHost(options.inner()));
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
    try {
        var program = ts.createProgram(["abc.ts"], CompilerOptions.new().inner(), createCompilerHost(CompilerOptions.new()).inner());
        if (!program) {
            throw "createProgram returned undefined";
        }
        return new Program(program);
    } catch (ex) {
        throw `createProgram failed: ${ex}`;
    }
}

function getPreEmitDiagnostics(program: Program) {
    return ts.getPreEmitDiagnostics(program.inner()).map(Diagnostic.new);
}

class Diagnostic {
    private _value : ts.Diagnostic;
    constructor(value: ts.Diagnostic) {
        this._value = value;
    }
    static new(value: ts.Diagnostic) {
        return new Diagnostic(value);
    }
    inner() {
        return this._value;
    }
}

export const typescript = {
    Program,
    version,
    CompilerOptions,
    setSys,
    createCompilerHost,
    createProgram,
    getPreEmitDiagnostics
}