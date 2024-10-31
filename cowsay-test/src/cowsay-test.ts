
// import { test, tsVersion } from 'cowsay';
import { test, canvas } from 'cowsay';
console.log(test());
console.log(canvas.tsVersion());
let options = new canvas.CompilerOptions();
console.log(options.inner());
console.log(options.getAlwaysStrict());
options.setAlwaysStrict(true);
console.log(options.getAlwaysStrict());
options.setAlwaysStrict(false);
console.log(options.getAlwaysStrict());
options.setAlwaysStrict(undefined);
console.log(options.getAlwaysStrict());

let nodeFactory = canvas.nodeFactory();
let voidZero = nodeFactory.createVoidZero();
console.log(voidZero.kind());

// import { cow } from 'cowsay';
// console.log(cow.tsVersion());