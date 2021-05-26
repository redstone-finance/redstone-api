# Redstone HTTP Api

Redstone HTTP Api is accessible at https://api.redstone.finance/prices.

It allows to fetch financial data from [Limesteone data ecosystem](https://github.com/redstone-finance/redstone/blob/master/README.md).

## Usage

### Using curl

#### ⦿ Fetch latest price for a single currency
```bash
curl "https://api.redstone.finance/prices/?symbol=ETH&provider=redstone&limit=1"
```

💡 Note: You can replace symbol query param with a currency symbol of [any supported token](ALL_SUPPORTED_CURRENCIES.md)

#### ⦿ Fetch latest price for several currencies
```bash
curl "https://api.redstone.finance/prices/?symbols=ETH,BTC,AR,EUR,CHF,BNB&provider=redstone"
```
