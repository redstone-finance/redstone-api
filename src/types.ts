export type ConvertableToDate = Date | number | string;

export interface RedstoneApiConfig {
  useCache?: boolean;
  defaultProvider?: string; // Name of default provider
  version?: string;
  verifySignature?: boolean;
  cacheApiUrl?: string;
}

export interface PriceData {
  id?: string;
  symbol: string;
  provider: string;
  value: number;
  permawebTx: string;
  source?: string;
  timestamp: number;
}

export interface PriceDataWithSignature extends PriceData {
  signature: string;
  version?: string;
  providerPublicKey: string;
}

export interface ProviderNameToAddressMapping {
  [name: string]: string;
}

export interface GetPriceOptions {
  provider?: string;
  verifySignature?: boolean;
}

export interface GetHistoricalPriceOptions extends GetPriceOptions {
  date: ConvertableToDate;
}

export type GetHistoricalPriceForSingleTokenOptions =
  | GetHistoricalPriceInTimeRangeOptions
  | GetHistoricalPriceWithPaginationOptions;

interface GetHistoricalPriceWithPaginationOptions extends GetPriceOptions {
  offset: number;
  limit: number;
  startDate?: ConvertableToDate;
  endDate?: ConvertableToDate;
  interval?: number; // ms
}

interface GetHistoricalPriceInTimeRangeOptions extends GetPriceOptions {
  startDate: ConvertableToDate;
  endDate: ConvertableToDate;
  interval: number; // ms
}
