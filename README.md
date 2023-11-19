# Aria2 Wrapper

This is a fully-typed fully-features wrapper for Aria2 JSON RPC API.
It is written in TypeScript.


It has the goal to make a real wrapper for Aria2, because none of the existing ones are complete.
Some exists, but they aren't compatible on browsers so not for webapps like Tauri.

## Installation

```bash
pnpm install aria2-wrapper
```

## Usage

```typescript
import { Aria2 } from 'aria2-wrapper';

async function main() {
    const aria = Aria2();
    await aria.connect();
    
    const res = await aria.getVersion()
    console.log(res);
}

main();
```

## Author

Pierre BIDET, Veagle Team