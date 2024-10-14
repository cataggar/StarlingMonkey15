import * as ts from 'typescript';

export function test() {
  return "ok";
}

export function tsVersion() {
  return ts.version;
}

export class CompilerOptions {
  inner: number;
  constructor(){
    this.inner = 3;
  }
}