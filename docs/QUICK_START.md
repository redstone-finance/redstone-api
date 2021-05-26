# Quick start for Redstone API

## Install npm module
```bash
npm install redstone-api
```
## Fetch price for a single token
```js
const redstone = require("redstone-api");

// Prints the latest price for AR token in USD
redstone.getPrice("AR").then((price) => {
  console.log(price.value);
});
```

Explore [redstone api](../README.md#-usage)
