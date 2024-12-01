
import { typescript } from 'ts-typescript';
// import { test, canvas } from '../../typescript/dist/cowsay';

typescript.setSys();

console.log("test returns", typescript.test());  // sets the TS System

let options = typescript.CompilerOptions.new();
console.log("options created", options);

console.log("call createProgram");
// let program = typescript.createProgram(["abc.ts"], options, compilerHost);
// let program = typescript.createProgram(options, compilerHost);
let program = typescript.createProgram(options);


