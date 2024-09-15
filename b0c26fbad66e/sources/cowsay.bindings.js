
import * as $source_mod from 'cowsay.js';

let repCnt = 1;
let repTable = new Map();

Symbol.dispose = Symbol.for('dispose');

let [$memory, $realloc] = $bindings;
delete globalThis.$bindings;



class BindingsError extends Error {
  constructor (path, type, helpContext, help) {
    super(`"cowsay.js" source does not export a "${path}" ${type} as expected by the world.${
      help ? `\n\n  Try defining it${helpContext}:\n\n${'    ' + help.split('\n').map(ln => `  ${ln}`).join('\n')}
      ` : ''
    }`);
  }
}
function getInterfaceExport (mod, exportNameOrAlias, exportId) {
  if (typeof mod[exportId] === 'object')
  return mod[exportId];
  if (exportNameOrAlias && typeof mod[exportNameOrAlias] === 'object')
  return mod[exportNameOrAlias];
  if (!exportNameOrAlias)
  throw new BindingsError(exportId, 'interface', ' by its qualified interface name', `const obj = {};
  
  export { obj as '${exportId}' }
  `);
  else
  throw new BindingsError(exportNameOrAlias, 'interface', exportId && exportNameOrAlias ? ' by its alias' : ' by name', `export const ${exportNameOrAlias} = {};`);
}
function verifyInterfaceFn (fn, exportName, ifaceProp, interfaceExportAlias) {
  if (typeof fn !== 'function') {
    if (!interfaceExportAlias)
    throw new BindingsError(exportName, `${ifaceProp} function`, ' on the exported interface object', `const obj = {
      ${ifaceProp} () {
        
      }
    };
    
    export { obj as '${exportName}' }
    `);
    else
    throw new BindingsError(exportName, `${ifaceProp} function`, ` on the interface alias "${interfaceExportAlias}"`, `export const ${interfaceExportAlias} = {
      ${ifaceProp} () {
        
      }
    };`);
  }
}
function verifyInterfaceResource (fn, exportName, ifaceProp, interfaceExportAlias) {
  if (typeof fn !== 'function') {
    if (!interfaceExportAlias)
    throw new BindingsError(exportName, `${ifaceProp} resource`, ' on the exported interface object', `const obj = {
      ${ifaceProp} () {
        
      }
    };
    
    export { obj as '${exportName}' }
    `);
    else
    throw new BindingsError(exportName, `${ifaceProp} resource`, ` on the interface alias "${interfaceExportAlias}"`, `export const ${interfaceExportAlias} = {
      ${ifaceProp} () {
        
      }
    };`);
  }
}

const { tsVersion: cowTsVersion } = getInterfaceExport($source_mod, 'cow', null);
verifyInterfaceFn(cowTsVersion, 'cow', 'tsVersion', null);

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let buf = utf8Encoder.encode(s);
  let ptr = realloc(0, 0, 1, buf.length);
  new Uint8Array(memory.buffer).set(buf, ptr);
  utf8EncodedLen = buf.length;
  return ptr;
}

export async function export_tsVersion(arg0) {
  const ret = await cowTsVersion();
  var ptr0 = utf8Encode(ret, $realloc, $memory);
  var len0 = utf8EncodedLen;
  dataView($memory).setInt32(arg0 + 4, len0, true);
  dataView($memory).setInt32(arg0 + 0, ptr0, true);
}
