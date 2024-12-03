
async function runScript(cwd: string, script: string) {
    let proc = Bun.spawn(["bun", "run", script], {cwd});
    let exitCode = await proc.exited;
    console.log(await new Response(proc.stdout).text());
    if(exitCode !== 0) {
        console.error(`In '${cwd}' script '${script}' failed with exit code ${exitCode}`);
        process.exit(exitCode);
    }
}

await runScript("typescript-system", "wkg");
await runScript("typescript-system", "cargo");

await runScript("typescript", "wkg");
await runScript("typescript", "cargo");

await runScript("test-rs", "wkg");
await runScript("test-rs", "cargo");
await runScript("test-rs", "plug");
await runScript("test-rs", "plug2");
await runScript("test-rs", "run");

export {};