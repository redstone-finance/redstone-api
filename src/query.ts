import _ from "lodash";
import {
  ConvertableToDate,
  GetPriceOptions,
  RedstoneApiConfig,
  PriceData,
} from "./types";
import RedstoneApi from "./api";

type QueryParams = {
  symbols: string[];
  startDate?: ConvertableToDate;
  endDate?: ConvertableToDate;
  date?: ConvertableToDate;
  interval?: number;
  latest?: boolean;
};

export class RedstoneQuery {
  protected params: QueryParams;

  constructor(params = {}) {
    this.params = {
      symbols: [],
      ...params,
    };
  }

  /**
   * Sets a token symbol to fetch
   * @param symbol - Token symbol string
   * @returns query object
   */
  symbol(symbol: string): RedstoneQueryForSingleSymbol {
    return new RedstoneQueryForSingleSymbol({
      symbols: [symbol],
    });
  }

  /**
   * Sets token symbols to fetch
   * @param symbols - Array of strings (token symbols)
   * @returns query object
   */
  symbols(symbols: string[]): RedstoneQueryForSeveralSymbols {
    return new RedstoneQueryForSeveralSymbols({ symbols });
  }

  /**
   * Configures query to fetch prices for all supported tokens.
   * It doesn't support any params
   * @returns query object
   */
  allSymbols(): RedstoneQueryForSeveralSymbols {
    // return this.getQueryWithUpdatedSymbols<{ [symbol: string]: PriceData }>([]);
    return new RedstoneQueryForSeveralSymbols({
      symbols: [],
    });
  }
}

export class RedstoneQueryForSingleOrSeveralSymbols<QueryResultType> {
  protected params: QueryParams;

  constructor(params: QueryParams) {
    this.params = params;
  }

  // TODO: Maybe improve the type later (replace any with more detailed one)
  protected getExecutableQuery<T>(update: any): RedstoneQueryExecutable<T> {
    return new RedstoneQueryExecutable<T>({
      ...this.params,
      ...update,
    });
  }

  /**
   * Configures query to fetch the latest price/prices
   * It doesn't support any params
   * @returns query object
   */
  latest(): RedstoneQueryExecutable<QueryResultType> {
    return this.getExecutableQuery({});
  }

  /**
   * Configures query to fetch the price for X hours ago.
   * @param hoursCount - Number of hours ago
   * @returns query object
   */
  hoursAgo(hoursCount: number): RedstoneQueryExecutable<QueryResultType> {
    return this.getExecutableQuery({
      date: Date.now() - hoursCount * 3600 * 1000,
    });
  }

  /**
   * Configures query to fetch the price for a specific date.
   * @param date - Date for the historical price (date | timestamp | string)
   * @returns query object
   */
  atDate(date: ConvertableToDate): RedstoneQueryExecutable<QueryResultType> {
    return this.getExecutableQuery({ date });
  }
}

export class RedstoneQueryForSingleSymbol extends RedstoneQueryForSingleOrSeveralSymbols<PriceData> {
  constructor(params: QueryParams) {
    super(params);
  }

  /**
   * Configures query to fetch the price in a time range. It is important to use fromDate with toDate query methods
   * @param date - Start date/time for the time range
   *
   * @returns query object
   */
  fromDate(date: ConvertableToDate): RedstoneQueryForSingleSymbol {
    return new RedstoneQueryForSingleSymbol({
      ...this.params,
      startDate: date,
    });
  }

  /**
   * Configures query to fetch the price in a time range. toDate method should go after the fromDate
   * @param date - End date/time for the time range
   *
   * @returns query object
   */
  toDate(date: ConvertableToDate): RedstoneQueryExecutable<PriceData[]> {
    if (this.params.startDate === undefined) {
      throw new Error("Please specify fromDate before using toDate");
    }
    return this.getExecutableQuery<PriceData[]>({ endDate: date });
  }

  /**
   * Configures query to fetch the price for the last few hours
   * @param hoursCount - Number of hours in the time range
   *
   * @returns query object
   */
  forLastHours(hoursCount: number): RedstoneQueryExecutable<PriceData[]> {
    const endDate = Date.now();
    return this.getExecutableQuery({
      endDate,
      startDate: endDate - hoursCount * 3600 * 1000,
      interval: 600 * 1000,
    });
  }

  /**
   * Configures query to fetch the price for the last few days
   * @param daysCount - Number of days in the time range
   *
   * @returns query object
   */
  forLastDays(daysCount: number): RedstoneQueryExecutable<PriceData[]> {
    const endDate = Date.now();
    return this.getExecutableQuery({
      endDate,
      startDate: endDate - daysCount * 24 * 3600 * 1000,
      interval: 3600 * 1000,
    });
  }
}

export class RedstoneQueryForSeveralSymbols extends RedstoneQueryForSingleOrSeveralSymbols<{
  [symbol: string]: PriceData;
}> {
  constructor(params: QueryParams) {
    super(params);
  }
}

export class RedstoneQueryExecutable<QueryResultType> {
  private params: QueryParams;

  constructor(params = {}) {
    this.params = {
      symbols: [],
      ...params,
    };
  }

  /**
   * Executes the query
   *
   * @returns Promise resolving the query result (result type depends on the query)
   */
  async exec(
    redstoneApiConfig?: RedstoneApiConfig,
  ): Promise<QueryResultType> {
    const redstone = new RedstoneApi(redstoneApiConfig);
    const symbols = this.params.symbols;
    if (symbols.length > 0) {
      const symbolOrSymbols = symbols.length === 1 ? symbols[0] : symbols;
      const { startDate, endDate, date, interval } = this.params;

      if ([startDate, endDate, date].every((el) => el === undefined)) {
        // Fetch the latest price
        return (await redstone.getPrice(
          symbolOrSymbols as any,
          this.params as any,
        )) as any;
      } else {
        // Fetch the historical price
        if (
          startDate !== undefined &&
          endDate !== undefined &&
          interval === undefined
        ) {
          const diff = getTimeDiff(startDate, endDate);
          if (diff >= 24 * 3600 * 1000) {
            this.params.interval = 3600 * 1000;
          } else {
            this.params.interval = 1;
          }
        }

        return (await redstone.getHistoricalPrice(
          symbolOrSymbols as any,
          this.params as any,
        )) as any;
      }
    } else {
      // Fetch prices for all tokens
      return (await redstone.getAllPrices(
        this.params as GetPriceOptions,
      )) as any;
    }
  }
}

function getTimeDiff(
  date1: ConvertableToDate,
  date2: ConvertableToDate,
): number {
  const timestamp1 = new Date(date1).getTime();
  const timestamp2 = new Date(date2).getTime();
  return Math.abs(timestamp2 - timestamp1);
}

/**
 * Initializes and returns an empty query.
 * It doesn't support any params
 * @returns query object
 */
const query = () => new RedstoneQuery();

export default query;
