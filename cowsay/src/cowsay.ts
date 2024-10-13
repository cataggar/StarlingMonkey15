import * as ts from 'typescript';

export function test() {
  return "ok";
}

export function tsVersion() {
  // return ts.version;
  return ts.versionMajorMinor;
}