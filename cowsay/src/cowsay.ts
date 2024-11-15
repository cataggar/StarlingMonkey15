import * as ts from 'typescript';
export function test() {
    return "ok";
}

class CompilerOptions {
    private _inner: ts.CompilerOptions;
    constructor() {
        this._inner = new Object() as ts.CompilerOptions;
        this._inner.alwaysStrict
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

function createCompilerHost(options: CompilerOptions) {
    return ts.createCompilerHost(options.inner());
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
    constructor(fn: () => string) {
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
    constructor(options: CompilerOptions) {
        this._inner = createCompilerHost(options);
    }

    setGetCurrentDirectory(fn: FnGetCurrentDirectory) {
        this._inner.getCurrentDirectory = fn.call;
    }

    setGetCanonicalFileName(fn: FnGetCanonicalFileName) {
        this._inner.getCanonicalFileName = fn.call;
    }

    setGetSourceFile(fn: FnGetSourceFile) {
        this._inner.getSourceFile = (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
            let fnOnError = new FnOnError(onError || (() => {}));
            if (typeof languageVersionOrOptions === "number") {
                return fn.call(fileName, languageVersionOrOptions, fnOnError);
            }
        }
    }

    setUseCaseSensitiveFileNames(fn: FnUseCaseSensitiveFileNames) {
        console.log("setUseCaseSensitiveFileNames");
        console.log("comiplerHost", this._inner);
        this._inner.useCaseSensitiveFileNames = fn.call;
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
};