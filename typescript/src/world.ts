import * as ts from '@typespec/compiler'
import { createTestRunner } from '@typespec/compiler/testing';

function version(): string {
    // console.log(ts.MANIFEST)
    // return ts.typespecVersion;
    // return ts.MANIFEST.version;
    return "0.0.1";
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