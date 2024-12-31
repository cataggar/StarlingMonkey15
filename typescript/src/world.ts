import * as ts from '@typespec/compiler'
import { createTestRunner } from '@typespec/compiler/testing';

function version() {
    return ts.typespecVersion;
}

async function test() {
    let runner = await createTestRunner();
    let diagnostics = await runner.compile('model Bar {}');
    console.log(diagnostics);
}

export const typescript = {
    version,
    test,
}