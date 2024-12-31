// import { System } from 'ts:typescript-system/types@0.1.0';
// import * as ts from 'typescript';
import * as ts from '@typespec/compiler'

function version() {
    return ts.typespecVersion;
}

export const typescript = {
    version,
}