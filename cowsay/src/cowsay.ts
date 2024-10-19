import * as ts from 'typescript';
export function test() {
    return "ok";
}

class Compileroptions {
    private _inner;
    constructor() {
        this._inner = 3;
    }
    inner() {
        return this._inner;
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
    Compileroptions,
    nodeFactory,
    Nodefactory,
    Voidexpression,
};