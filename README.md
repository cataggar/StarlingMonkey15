# StarlingMonkey15
https://github.com/bytecodealliance/StarlingMonkey/issues/15

I'm using [Nushell](https://www.nushell.sh/) as the NPM script-shell, but should work with other Unix shells. Nushell works on Windows too. On my Mac:
```
npm config set script-shell /opt/homebrew/bin/nu
```

To reproduce:
```
npm ci
npm run build
```