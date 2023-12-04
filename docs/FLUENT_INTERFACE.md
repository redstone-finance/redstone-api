# Fluent interface for redstone

Redstone implements a fluent interface to simplify query creation thanks to a human readable syntax.

### Importing
To use the fluent interface you should import the redstone-api in a standard way and initialize a query calling `redstone.query()`;
```js
// Using Node.js `require()`
const redstone = require('redstone-api');

// Using ES6 imports
import redstone from 'redstone-api';

```

## Usage
All redstone queries consists of 4 parts:
- Query initialization (`redstone.query()`)
- What to fetch (`symbol` or `symbols`)
- For which date/dates (`latest`, `atDate`, `forLastHours`, `hoursAgo`, `fromDate`, `toDate`)
- Query execution (`exec`)

## Examples

### Get the latest price for a single token
```js
const price = await redstone.query()
  .symbol("AR")
  .latest()
  .exec();

console.log(price.value); // latest price value for AR token (in USD)
console.log(price.timestamp); // the exact timestamp of the price
```

### Get the historical price for a single token
```js
const price = await redstone.query()
  .symbol("AR")
  .atDate("2021-04-19")
  .exec();
```
💡 Note: The argument passed to `atDate` must be convertable to date. You may pass date (e.g. `new Date(2021-04-01)`), timestamp (e.g. `1617709771289`), or just string (e.g. `2021-04-01` or `2021-04-01T12:30:58`)

### Get the historical price for the last X hours
```js
// Returns an array of prices with ~10 minutes interval
const prices = await redstone.query()
  .symbol("AR")
  .forLastHours(12)
  .exec();
```

### Get the historical price for X hours ago
```js
const price = await redstone.query()
  .symbol("AR")
  .hoursAgo(24)
  .exec();
```

### Get the historical price for the last X days
```js
// Returns an array of prices with ~1h minutes interval
const prices = await redstone.query()
  .symbol("AR")
  .forLastDays(7)
  .exec();
```

### Get the historical prices in a time range
```js
// Returns an array of prices
// Interval depends on the time range
// For ranges more than 24 hours interval is 1h
const prices = await redstone.query()
  .symbol("AR")
  .fromDate("2021-04-19")
  .toDate("2021-04-20")
  .exec();
```

### Get the latest prices for several tokens
```js
const prices = await redstone.query()
  .symbols(["AR", "BTC", "ETH"])
  .latest()
  .exec();

console.log(prices); // Example output below
/*
{
  "BTC": {
    value: 58953.39,
    timestamp: 1617152802779,
    ...
  },
  "ETH": {
    value: 1856.75,
    timestamp: 1617152802779,
    ...
  },
  ...
}
*/
```

### Get the historical prices for several tokens
```js
const prices: any = await redstone.query()
  .symbols(["AR", "ETH", "BTC"])
  .atDate("2021-04-19")
  .exec();
```


### Get prices for all available tokens
```js
const prices = await redstone.query()
  .allSymbols()
  .latest()
  .exec();

console.log(prices); // Example output below
/*
{
  "BTC": {...},
  "ETH": {...},
  ...
}
*/

console.log(prices["AR"].value); // latest price value for AR
console.log(prices["EUR"].value); // latest price value for EUR
```

