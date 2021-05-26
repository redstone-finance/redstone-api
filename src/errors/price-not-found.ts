export default class PriceNotFoundError extends Error {
  constructor(symbol: string) {
    super(`Price not found for symbol: ${symbol}`);
  }
}
