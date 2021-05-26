import axios from "axios";
import _ from "lodash";
import { PriceDataWithSignature } from "../types";

export default class CacheProxy {
  cacheApiUrl: string;

  constructor(cacheApiUrl: string) {
    this.cacheApiUrl = cacheApiUrl;
  }

  setCacheApiUrl(cacheApiUrl: string) {
    this.cacheApiUrl = cacheApiUrl;
  }

  async getPrice(args: {
    symbol: string;
    provider: string;
    timestamp?: number;
  }): Promise<PriceDataWithSignature | undefined> {
    const params: any = {
      symbol: args.symbol,
      provider: args.provider,
      limit: 1,
    };

    // If timestamp is passed we fetch the latest price
    // with timestamp which is less or equal to the passed one
    if (args.timestamp !== undefined) {
      params.toTimestamp = args.timestamp;
    }

    const { data } = await axios.get(this.cacheApiUrl, { params });

    if (Array.isArray(data) && data.length === 1) {
      return data[0];
    } else {
      return undefined;
    }
  }

  // If 'symbols' is not passed it will fetch prices for all tokens
  async getPriceForManyTokens(args: {
    provider: string;
    timestamp?: number;
    symbols?: string[];
  }): Promise<{ [symbol: string]: PriceDataWithSignature }> {
    const params: any = {
      provider: args.provider,
      toTimestamp: args.timestamp,
    };

    if (args.symbols !== undefined) {
      params.symbols = args.symbols.join(",");
    }

    const { data } = await axios.get(this.cacheApiUrl, { params });

    return data;
  }

  async getManyPrices(args: {
    symbol: string;
    provider: string;
    fromTimestamp?: number;
    toTimestamp?: number;
    interval?: number;
    offset?: number;
    limit?: number;
  }): Promise<PriceDataWithSignature[]> {
    const params = _.pickBy(args, (prop) => !_.isUndefined(prop));
    const { data } = await axios.get(this.cacheApiUrl, { params });
    return data;
  }
}
