# Redstone HTTP Api

Redstone HTTP Api is accessible at https://api.redstone.finance/prices.

It allows to fetch financial data from [Redstone data ecosystem](https://github.com/redstone-finance/redstone-api/blob/main/docs/REDSTONE_DATA_ECOSYSTEM.md).

## Usage

### Using curl

#### ⦿ Fetch latest price for a single currency
```bash
curl "https://api.redstone.finance/prices/?symbol=ETH&provider=redstone&limit=1"
```

💡 Note: You can replace symbol query param with a currency symbol of [any supported token](ALL_SUPPORTED_TOKENS.md)

#### ⦿ Fetch latest price for several currencies
```bash
curl "https://api.redstone.finance/prices/?symbols=ETH,BTC,AR,EUR,CHF,BNB&provider=redstone"
```
