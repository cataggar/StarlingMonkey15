import * as ts from 'typescript';
import { WasiFilesystemPreopens as preopens } from 'wasi-filesystem-preopens';
export function test() {
    let tsa = ts;
    tsa.setSys(new System());
    let dirs = preopens.getDirectories();
    let concatDirs = dirs.map(dir => dir + "/").join(":");
    return "not ok";
}
class CompilerOptions {
    _inner;
    constructor(inner) {
        this._inner = inner;
    }
    static create() {
        return new CompilerOptions(new Object());
    }
    inner() {
        return this._inner;
    }
    getAlwaysStrict() {
        return this._inner.alwaysStrict;
    }
    setAlwaysStrict(value) {
        this._inner.alwaysStrict = value;
    }
    setTarget(value) {
        this._inner.target = value;
    }
}
function createCompilerHost(options) {
    return new CompilerHost(ts.createCompilerHost(options.inner()));
}
class FnUseCaseSensitiveFileNames {
    _fn;
    constructor(fn) {
        this._fn = fn;
    }
    call() {
        return this._fn();
    }
}
class FnGetCurrentDirectory {
    _fn;
    constructor(fn) {
        this._fn = fn;
    }
    call() {
        return this._fn();
    }
}
class FnGetCanonicalFileName {
    _fn;
    constructor(fn) {
        this._fn = fn;
    }
    call(fileName) {
        return this._fn(fileName);
    }
}
class FnOnError {
    _fn;
    constructor(fn) {
        this._fn = fn;
    }
    call(message) {
        return this._fn(message);
    }
}
class FnGetSourceFile {
    _fn;
    constructor(fn) {
        this._fn = fn;
    }
    call(fileName, languageVersion, onError) {
        return this._fn(fileName, languageVersion, onError);
    }
}
class CompilerHost {
    _inner;
    constructor(inner) {
        this._inner = inner;
    }
    inner() {
        return this._inner;
    }
    setGetCurrentDirectory(fn) {
        this._inner.getCurrentDirectory = fn.call;
    }
    setGetCanonicalFileName(fn) {
        this._inner.getCanonicalFileName = fn.call;
    }
    setGetSourceFile(fn) {
        this._inner.getSourceFile = function (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) {
            let fnOnError = new FnOnError(onError || (() => { }));
            if (typeof languageVersionOrOptions === "number") {
                return fn.call(fileName, languageVersionOrOptions, fnOnError);
            }
        };
    }
    setUseCaseSensitiveFileNames(fn) {
        console.log("setUseCaseSensitiveFileNames");
        console.log("compilerHost", this._inner);
    }
}
class SourceFile {
    _value;
    constructor(value) {
        this._value = value;
    }
}
class Bundle {
    _value;
    constructor() {
        this._value = new Object();
    }
    kind() {
        return this._value.kind;
    }
}
class Nodefactory {
    _value;
    constructor(value) {
        this._value = value;
    }
    createVoidZero() {
        return new Voidexpression(this._value.createVoidZero());
    }
}
class Voidexpression {
    _value;
    constructor(value) {
        this._value = value;
    }
    kind() {
        return this._value.kind;
    }
}
function tsVersion() {
    return "5.2";
}
function nodeFactory() {
    return new Nodefactory(ts.factory);
}
class System {
    args = [];
    output = [];
    newLine = "\n";
    useCaseSensitiveFileNames = true;
    write(message) {
        throw new Error('System.write Method not implemented.');
    }
    writeOutputIsTTY() {
        throw new Error('System.writeOutputIsTTY Method not implemented.');
    }
    getWidthOfTerminal() {
        throw new Error('System.getWidthOfTerminal Method not implemented.');
        console.log("System.getWidthOfTerminal");
        return 120;
    }
    readFile(path, encoding) {
        throw new Error('System.readFile Method not implemented.');
    }
    getFileSize(path) {
        throw new Error('System.getFileSize Method not implemented.');
        console.log("System.getFileSize ", path);
    }
    writeFile(path, data, writeByteOrderMark) {
        throw new Error('System.writeFile Method not implemented.');
    }
    watchFile(path, callback, pollingInterval, options) {
        throw new Error('System.watchFile Method not implemented.');
    }
    watchDirectory(path, callback, recursive, options) {
        throw new Error('System.watchDirectory Method not implemented.');
    }
    resolvePath(path) {
        throw new Error('resolvePath Method not implemented.');
    }
    fileExists(path) {
        throw new Error('System.fileExists Method not implemented.');
    }
    directoryExists(path) {
        throw new Error('System.directoryExists Method not implemented.');
    }
    createDirectory(path) {
        throw new Error('System.createDirectory Method not implemented.');
    }
    getExecutingFilePath() {
        return "";
    }
    getCurrentDirectory() {
        return "";
    }
    getDirectories(path) {
        throw new Error('System.getDirectories Method not implemented.');
    }
    readDirectory(path, extensions, exclude, include, depth) {
        throw new Error('System.readDirectory Method not implemented.');
    }
    getModifiedTime(path) {
        throw new Error('System.getModifiedTime Method not implemented.');
    }
    setModifiedTime(path, time) {
        throw new Error('System.setModifiedTime Method not implemented.');
    }
    deleteFile(path) {
        throw new Error('System.deleteFile Method not implemented.');
    }
    createHash(data) {
        throw new Error('System.createHash Method not implemented.');
    }
    createSHA256Hash(data) {
        throw new Error('System.createSHA256Hash Method not implemented.');
    }
    getMemoryUsage() {
        throw new Error('getMemoryUsage Method not implemented.');
    }
    exit(exitCode) {
        throw new Error('exit Method not implemented.');
    }
    realpath(path) {
        console.log("System.realpath: ", path);
        return path;
    }
    setTimeout(callback, ms, ...args) {
        throw new Error('System.setTimeout Method not implemented.');
    }
    clearTimeout(timeoutId) {
        throw new Error('System.clearTimeout Method not implemented.');
    }
    clearScreen() {
        throw new Error('System.clearScreen Method not implemented.');
    }
    base64decode(input) {
        throw new Error('System.base64decode Method not implemented.');
    }
    base64encode(input) {
        throw new Error('System.base64encode Method not implemented.');
    }
}
class Program {
    _value;
    constructor(value) {
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
    _value;
    constructor(value) {
        this._value = value;
    }
}
function createProgram(options) {
    let rootNames = ["abc.ts"];
    console.log("createProgram called");
    return new Program(ts.createProgram(rootNames, options.inner(), undefined, undefined, undefined));
}
class Diagnostic {
    _value;
    constructor(value) {
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
function getPreEmitDiagnostics(program) {
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
