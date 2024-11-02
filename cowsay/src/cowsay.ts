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

class FnGetCurrentDirectory {
    private _fn: () => string;
    constructor(fn: () => string) {
        this._fn = fn;
    }
    call() {
        return this._fn();
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
};