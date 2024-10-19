
// import { test, tsVersion } from 'cowsay';
import { test, canvas } from 'cowsay';
console.log(test());
console.log(canvas.tsVersion());
let options = new canvas.Compileroptions();
console.log(options.inner());

let nodeFactory = canvas.nodeFactory();
let voidZero = nodeFactory.createVoidZero();
console.log(voidZero.kind());

// import { cow } from 'cowsay';
// console.log(cow.tsVersion());