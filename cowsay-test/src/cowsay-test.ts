
// import { test, tsVersion } from 'cowsay';
import { test, canvas } from 'cowsay';

export enum ScriptTarget {
    /** @deprecated */
    ES3 = "es3",
    ES5 = "es5",
    ES6 = "es6",
    ES2015 = "es2015",
    ES2016 = "es2016",
    ES2017 = "es2017",
    ES2018 = "es2018",
    ES2019 = "es2019",
    ES2020 = "es2020",
    ES2021 = "es2021",
    ES2022 = "es2022",
    ES2023 = "es2023",
    ESNext = "esnext",
    JSON = "json",
    Latest = "esnext",
}

console.log(test());
console.log(canvas.tsVersion());
let options = new canvas.CompilerOptions();
// console.log(options.inner());
// console.log(options.getAlwaysStrict());
// options.setAlwaysStrict(true);
// console.log(options.getAlwaysStrict());
// options.setAlwaysStrict(false);
// console.log(options.getAlwaysStrict());
// options.setAlwaysStrict(undefined);
// console.log(options.getAlwaysStrict());

options.setTarget(ScriptTarget.ESNext);

let compilerHost = canvas.createCompilerHost(options, false);
console.log("compilerHost created", compilerHost);

let fnUseCaseSensitiveFileNames = new canvas.FnUseCaseSensitiveFileNames();
fnUseCaseSensitiveFileNames.call = () => {
    console.log("call useCaseSensitiveFileNames");
    return true;
};
compilerHost.setUseCaseSensitiveFileNames(fnUseCaseSensitiveFileNames);

let fnGetCurrentDirectory = new canvas.FnGetCurrentDirectory();
fnGetCurrentDirectory.call = () => {
    console.log("call getCurrentDirectory");
    return "";
};
compilerHost.setGetCurrentDirectory(fnGetCurrentDirectory);

let fnGetCanonicalFileName = new canvas.FnGetCanonicalFileName();
fnGetCanonicalFileName.call = (fileName: string) => {
    console.log("call getCanonicalFileName");
    return fileName;
};
compilerHost.setGetCanonicalFileName(fnGetCanonicalFileName);

let fnOnError = new canvas.FnOnError();
fnOnError.call = (message) => {
    console.log("call onError");
};

let fnGetSourceFile = new canvas.FnGetSourceFile();
fnGetSourceFile.call = (fileName, languageVersion, onError) => {
    console.log("call getSourceFile");
    return undefined;
};
compilerHost.setGetSourceFile(fnGetSourceFile);

let nodeFactory = canvas.nodeFactory();
let voidZero = nodeFactory.createVoidZero();
console.log(voidZero.kind());

// import { cow } from 'cowsay';
// console.log(cow.tsVersion());



