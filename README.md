# Redstone API (extended)

[![License](https://img.shields.io/badge/license-MIT-green)](https://choosealicense.com/licenses/mit/)
[![Github activity](https://img.shields.io/github/commit-activity/m/redstone-finance/redstone-api)](https://github.com/redstone-finance/redstone-api)
[![Discord](https://img.shields.io/discord/786251205008949258?logo=discord)](https://discord.gg/2CT6hN6C)
[![NPM](https://img.shields.io/npm/v/redstone-api)](https://www.npmjs.com/package/redstone-api)

[![Twitter](https://img.shields.io/twitter/follow/redstone_defi?style=flat&logo=twitter)](https://twitter.com/intent/follow?screen_name=limestone_defi)

This is an extended version of [redstone-api.](https://www.npmjs.com/package/redstone-api)
It adds the `oracle` module, allowing to fetch data packages from decentralized cache layer (including redstone-cache-layer nodes and streamr network) and use it in Blockchain Smart Contracts with tools like [redstone-evm-connector.](https://www.npmjs.com/package/redstone-evm-connector)

## 📦 Installation

### Using npm
```bash
npm install redstone-api-extended
```

### Using yarn
```bash
yarn add redstone-api-extended
```

## 🤖 Usage

### Importing

```js
// Using Node.js `require()`
const redstone = require('redstone-api-extended');

// Using ES6 imports
import redstone from 'redstone-api-extended';
```

### Get data packages with default sources configuration
```js
// Get package for all symbols
const dataPackage = await redstone.oracle.getFromDataFeed("redstone-avalanche-prod");

// Get package for one symbol
const dataPackage = await redstone.oracle.getFromDataFeed("redstone-avalanche-prod", "ETH");
```

#### Available data feed ids
- redstone
- redstone-stocks
- redstone-rapid
- redstone-avalanche
- redstone-avalanche-prod

### Get default data sources configuration for data feed
```js
const dataPackage = redstone.oracle.getDefaultDataSourcesConfig("redstone-stocks");
```

### Get data packages with custom sources configuration
```js
// Get with custom data sources config
const dataPackage = await redstone.oracle.get({
  "sources": [
    {
      "type": "streamr",
      "streamrEndpointPrefix": "0x981bdA8276ae93F567922497153de7A5683708d3/redstone-oracle",
      "disabledForSinglePrices": false,
      "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
      "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "ll8DlO4xMwHK7gIMsbnOnN7Jg8Sl674Ls4G0aBfHCyk",
      "evmSignerAddress": "0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
      "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
    }
  ],
  "valueSelectionAlgorithm": "first-valid",
  "timeoutMilliseconds": 10000,
  "maxTimestampDiffMilliseconds": 150000,
  "preVerifySignatureOffchain": true
});
```

### Get the latest data package

## 💬 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## 📜 License
This software is licensed under the [MIT](https://choosealicense.com/licenses/mit/) © [Redstone](https://github.com/redstone-finance)
