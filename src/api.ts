import _ from "lodash";
import ArweaveProxy from "./proxies/arweave-proxy";
import CacheProxy from "./proxies/cache-proxy";
import SignatureVerifier from "./signature-verifier";
import PriceNotFoundError from "./errors/price-not-found";
import {
  PriceData,
  GetPriceOptions,
  ConvertableToDate,
  RedstoneApiConfig,
  PriceDataWithSignature,
  GetHistoricalPriceOptions,
  GetHistoricalPriceForSingleTokenOptions,
} from "./types";
import config from "./config/index";

const REDSTONE_API_DEFAULTS = {
  defaultProvider: "redstone",
  useCache: true,
  verifySignature: false,
};

// Providers list is sorted by priority (redstone-rapid has the highest priority)
const PROVIDERS_SORTED_BY_PRIORITY = [
  "redstone-rapid",
  "redstone-stocks",
  "redstone"];

export default class RedstoneApi {
  private defaultProvider: string;
  private useCache: boolean;
  private version: string;
  private verifySignature: boolean;
  private arweaveProxy: ArweaveProxy;
  private cacheProxy: CacheProxy;
  private signatureVerifier: SignatureVerifier;

  constructor(redstoneConfig: RedstoneApiConfig = {}) {
    this.arweaveProxy = new ArweaveProxy();
    this.cacheProxy = new CacheProxy(
      _.defaultTo(redstoneConfig.cacheApiUrl, config.cacheApiUrl),
    );
    this.signatureVerifier = new SignatureVerifier(this.arweaveProxy);
    this.version = _.defaultTo(redstoneConfig.version, config.version);
    this.verifySignature = _.defaultTo(
      redstoneConfig.verifySignature,
      REDSTONE_API_DEFAULTS.verifySignature,
    );
    this.defaultProvider = _.defaultTo(
      redstoneConfig.defaultProvider,
      REDSTONE_API_DEFAULTS.defaultProvider,
    );
    this.useCache = _.defaultTo(
      redstoneConfig.useCache,
      REDSTONE_API_DEFAULTS.useCache,
    );
  }

  setCacheApiUrl(cacheApiUrl: string) {
    this.cacheProxy.setCacheApiUrl(cacheApiUrl);
  }

  /**
   * Returns the latest price for a single symbol
   *
   * @param symbol - Token symbol (string)
   * @param opts - Optional params (object)
   * * opts.provider: provider name (string)
   * * opts.verifySignature: enable signature verification (boolean)
   * @returns The latest price for the token
   *
   */
  async getPrice(symbol: string, opts?: GetPriceOptions): Promise<PriceData>;
  /**
   * Returns the latest price for several symbols
   *
   * @param symbols - Token symbols (array of strings)
   * @param opts - Optional params (object)
   * * opts.provider: provider name (string)
   * * opts.verifySignature: enable signature verification (boolean)
   * @returns The latest price for the tokens
   *
   */
  async getPrice(
    symbols: string[],
    opts?: GetPriceOptions,
  ): Promise<{ [token: string]: PriceData }>;
  async getPrice(
    symbolOrSymbols: any,
    opts: GetPriceOptions = {},
  ): Promise<any> {
    const shouldVerifySignature = _.defaultTo(
      opts.verifySignature,
      this.verifySignature,
    );

    if (_.isArray(symbolOrSymbols)) {
      // Getting latest price for many tokens
      const symbols = symbolOrSymbols;
      const provider = this.getProviderForSymbols(symbols, opts.provider);
      return await this.getPriceForManyTokens({
        symbols,
        provider,
        shouldVerifySignature,
      });
    } else if (typeof symbolOrSymbols === "string") {
      // Getting latest price for one token
      const symbol = symbolOrSymbols;
      const provider = this.getProviderForSymbol(symbol, opts.provider);
      return await this.getLatestPriceForOneToken({
        symbol,
        provider,
        shouldVerifySignature,
      });
    }
  }

  /**
   * Returns the historical price for a single token
   *
   * @remarks
   * Full list of supported tokens is available at
   * {@link https://github.com/redstone-finance/redstone-api/blob/main/ALL_SUPPORTED_TOKENS.md}
   *
   * @param symbol - Token symbol (string)
   * @param opts - Optional params (object)
   * * opts.date: Date for the historical price
   * * opts.provider: provider name (string)
   * * opts.verifySignature: enable signature verification (boolean)
   * @returns The historical price for token
   *
   */
  async getHistoricalPrice(
    symbol: string,
    opts: GetHistoricalPriceOptions,
  ): Promise<PriceData>;
  /**
   * Returns the historical prices for a token in a time range with the specified interval
   *
   * @remarks
   * This method can be used to display charts with historical prices.
   * Full list of supported tokens is available at
   * {@link https://github.com/redstone-finance/redstone-api/blob/main/ALL_SUPPORTED_TOKENS.md}
   *
   * @param symbol - Token symbol
   * @param opts - Options object.
   * It must contain either a startDate, an endDate, and interval properties
   * or an offset and a limit (used for pagination) properties.
   * * opts.startDate: Start time for the time range (date | timestamp | string)
   * * opts.endDate: End time for the time range (date | timestamp | string)
   * * opts.interval: Interval in milliseconds (number)
   * * opts.provider: provider name (string)
   * * opts.offset: query offset (number)
   * * opts.limit: query limit (number)
   * * opts.verifySignature: enable signature verification (boolean)
   * @returns The historical prices for the symbol with the passed interval
   *
   */
  async getHistoricalPrice(
    symbol: string,
    opts: GetHistoricalPriceForSingleTokenOptions,
  ): Promise<PriceData[]>;
  /**
   * Returns the historical prices for several tokens
   *
   * @param symbols - Array of token symbols
   * @param opts - Options object. It must contain the date property.
   * * opts.date: Date for the historical price (date | timestamp | string)
   * * opts.provider: provider name (string)
   * * opts.verifySignature: enable signature verification (boolean)
   * @returns The historical prices for several tokens
   *
   */
  async getHistoricalPrice(
    symbols: string[],
    opts: GetHistoricalPriceOptions,
  ): Promise<{ [token: string]: PriceData }>;
  async getHistoricalPrice(symbolOrSymbols: any, opts: any): Promise<any> {
    const shouldVerifySignature = _.defaultTo(
      opts.verifySignature,
      this.verifySignature,
    );

    if (_.isArray(symbolOrSymbols)) {
      // Getting historical price for many tokens
      const symbols = symbolOrSymbols;
      const provider = this.getProviderForSymbols(symbols, opts.provider);
      return await this.getPriceForManyTokens({
        symbols,
        timestamp: getTimestamp(opts.date),
        provider,
        shouldVerifySignature,
      });
    } else if (typeof symbolOrSymbols === "string") {
      const symbol = symbolOrSymbols;
      const provider = this.getProviderForSymbol(symbol, opts.provider);
      if (opts.interval !== undefined || opts.limit !== undefined) {
        return await this.getHistoricalPricesForOneSymbol({
          symbol,
          fromTimestamp: getTimestamp(opts.startDate),
          toTimestamp: getTimestamp(opts.endDate),
          interval: opts.interval,
          offset: opts.offset,
          limit: opts.limit,
          provider,
          shouldVerifySignature,
        });
      } else {
        return await this.getHistoricalPriceForOneSymbol({
          symbol,
          timestamp: getTimestamp(opts.date) as number,
          provider,
          shouldVerifySignature,
        });
      }
    }
  }

  /**
   * Returns the latest price for all the supported symbols
   *
   * @param opts - Optioanl options object.
   * * opts.provider: provider name (string)
   * * opts.verifySignature: enable signature verification (boolean)
   * @returns The latest price for all the supported tokens
   *
   */
  async getAllPrices(
    opts: GetPriceOptions = {},
  ): Promise<{ [symbol: string]: PriceData }> {
    const provider = _.defaultTo(opts.provider, this.defaultProvider);

    if (this.useCache) {
      const pricesObj = await this.cacheProxy.getPriceForManyTokens({
        provider,
      });

      // Signature verification
      if (_.defaultTo(opts.verifySignature, this.verifySignature)) {
        for (const symbol of _.keys(pricesObj)) {
          this.signatureVerifier.assertValidSignature(pricesObj[symbol]);
        }
      }

      return convertPricesToUserFacingFormat(pricesObj);
    } else {
      return await this.getPricesFromArweave(provider);
    }
  }

  private async getLatestPriceForOneToken(args: {
    symbol: string;
    provider: string;
    shouldVerifySignature: boolean;
  }): Promise<PriceData> {
    if (this.useCache) {
      // Getting price from cache
      const price = await this.cacheProxy.getPrice(
        _.pick(args, ["symbol", "provider"]),
      );
      if (args.shouldVerifySignature && price !== undefined) {
        await this.signatureVerifier.assertValidSignature(price);
      }

      if (price === undefined) {
        throw new PriceNotFoundError(args.symbol);
      }

      return convertToUserFacingFormat(price);
    } else {
      // Getting price from arweave

      // Try to get price from graphql if possible
      if (args.symbol === "AR") {
        const price = await this.tryToGetPriceFromGQL(
          _.pick(args, ["provider", "symbol"]),
        );
        if (price !== undefined) {
          return convertToUserFacingFormat(price);
        }
      }

      // Getting price from arweave in a "standard" way (from data)
      const prices = await this.getPricesFromArweave(args.provider);
      const priceForSymbol = prices[args.symbol];
      return convertToUserFacingFormat(priceForSymbol);
    }
  }

  private async getPriceForManyTokens(args: {
    symbols: string[];
    provider: string;
    timestamp?: number;
    shouldVerifySignature: boolean;
  }): Promise<{ [token: string]: PriceData }> {
    // Fetching prices
    if (this.useCache) {
      const pricesObj = await this.cacheProxy.getPriceForManyTokens(
        _.pick(args, ["symbols", "provider", "timestamp"]),
      );

      // Signature verification
      if (args.shouldVerifySignature) {
        for (const symbol of _.keys(pricesObj)) {
          this.signatureVerifier.assertValidSignature(pricesObj[symbol]);
        }
      }

      return convertPricesToUserFacingFormat(pricesObj);
    } else {
      if (args.timestamp !== undefined) {
        throw new Error(
          "Getting historical prices from arweave is not supported",
        );
      }
      const allPrices = await this.getPricesFromArweave(args.provider);
      const pricesObj = _.pick(allPrices, args.symbols);

      return convertPricesToUserFacingFormat(pricesObj);
    }
  }

  private async getPricesFromArweave(
    provider: string,
  ): Promise<{ [symbol: string]: PriceData }> {
    const { address } = await this.arweaveProxy.getProviderDetails(provider);

    const gqlResponse = await this.arweaveProxy.findPricesInGraphQL({
      type: "data",
      providerAddress: address,
      version: this.version,
    });

    if (gqlResponse === undefined) {
      return {};
    }

    const prices = await this.arweaveProxy.getTxDataById(
      gqlResponse.permawebTx,
      { parseJSON: true },
    );

    // Building prices object
    const pricesObj: any = {};
    for (const price of prices) {
      pricesObj[price.symbol] = {
        ...price,
        provider: address,
        permawebTx: gqlResponse.permawebTx,
      };
    }

    return convertPricesToUserFacingFormat(pricesObj);
  }

  private async getHistoricalPriceForOneSymbol(args: {
    symbol: string;
    provider: string;
    timestamp: number;
    shouldVerifySignature: boolean;
  }): Promise<PriceData> {
    if (this.useCache) {
      const price = await this.cacheProxy.getPrice(
        _.pick(args, ["symbol", "provider", "timestamp"]),
      );

      // Signature verification
      if (args.shouldVerifySignature && price !== undefined) {
        await this.signatureVerifier.assertValidSignature(price);
      }

      if (price === undefined) {
        throw new PriceNotFoundError(args.symbol);
      }

      return convertToUserFacingFormat(price);
    } else {
      // TODO: we cannot query ArGQL with timestamp comparators like timestamp_gt
      // But in future we can think of querying based on block numbers
      throw new Error(
        "Fetching historical price from arweave is not supported",
      );
    }
  }

  private async tryToGetPriceFromGQL(args: {
    symbol: string;
    provider: string;
  }): Promise<PriceData> {
    const { address } = await this.arweaveProxy.getProviderDetails(
      args.provider,
    );

    const response = await this.arweaveProxy.findPricesInGraphQL({
      type: "data",
      providerAddress: address,
      version: this.version,
    });

    if (response === undefined || response.tags[args.symbol] === undefined) {
      throw new PriceNotFoundError(args.symbol);
    } else {
      return {
        symbol: args.symbol,
        value: Number(response.tags[args.symbol]),
        permawebTx: response.permawebTx,
        timestamp: Number(response.tags.timestamp),
        provider: address,
      };
    }
  }

  private async getHistoricalPricesForOneSymbol(args: {
    symbol: string;
    provider: string;
    fromTimestamp?: number;
    toTimestamp?: number;
    interval?: number;
    shouldVerifySignature: boolean;
    limit?: number;
    offset?: number;
  }): Promise<PriceData[]> {
    if (this.useCache) {
      const prices = await this.cacheProxy.getManyPrices(
        _.pick(args, [
          "symbol",
          "provider",
          "fromTimestamp",
          "toTimestamp",
          "interval",
          "offset",
          "limit",
        ]),
      );

      // Signature verification for all prices
      if (args.shouldVerifySignature) {
        for (const price of prices) {
          await this.signatureVerifier.assertValidSignature(price);
        }
      }

      return prices.map(convertToUserFacingFormat);
    } else {
      // TODO: we cannot query ArGQL with timestamp comparators like timestamp_gt
      // But in future we can think of querying based on block numbers
      throw new Error(
        "Fetching historical prices from arweave is not supported",
      );
    }
  }

  private getProviderForSymbol(symbol: string, provider?: string): string {
    return this.getProviderForSymbols([symbol], provider);
  }

  private getProviderForSymbols(symbols: string[], passedProvider?: string): string {
    if (passedProvider !== undefined) {
      return passedProvider;
    } else {
      // Calculating a list of providers which support all symbols in the list
      let possibleProviders = Array.from(PROVIDERS_SORTED_BY_PRIORITY);
      for (const symbol of symbols) {
        const providersForToken = (config.tokens as any)[symbol];
        if (providersForToken && Array.isArray(providersForToken)) {
          for (const provider of possibleProviders) {
            // If any of symbols doesn't support the provider
            // it can not be used
            if (!providersForToken.includes(provider)) {
              possibleProviders = possibleProviders.filter(p => p !== provider);
            }
          }
        } else {
          // If any symbol has no supported providers in redstone-node config
          // we break the loop and return the default provider
          possibleProviders = [];
          break;
        }
      }

      // Returning the best possible provider
      if (possibleProviders.length > 0) {
        return possibleProviders[0];
      } else {
        return this.defaultProvider;
      }
    }
  }

}

function getTimestamp(date?: ConvertableToDate): number | undefined {
  if (_.isUndefined(date)) {
    return undefined;
  }
  return new Date(date).getTime();
}

function convertToUserFacingFormat(
  price: PriceDataWithSignature | PriceData,
): PriceData {
  const result = _.omit(price, ["version", "signature", "providerPublicKey"]);
  return result as PriceData;
}

function convertPricesToUserFacingFormat(prices: {
  [symbol: string]: PriceDataWithSignature | PriceData;
}): { [symbol: string]: PriceData } {
  const userFacingPricesObj: { [symbol: string]: PriceData } = {};
  for (const symbol of _.keys(prices)) {
    userFacingPricesObj[symbol] = convertToUserFacingFormat(prices[symbol]);
  }

  return userFacingPricesObj;
}
