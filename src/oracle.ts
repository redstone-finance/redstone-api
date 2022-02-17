export type ValueSelectionAlgorithm = "first-valid" | "newest-valid" | "oldest-valid"; // wa can add "median-valid" in future
export type SourceType = "cache-layer" | "streamr" | "streamr-storage";

const DEFAULT_TIMEOUT_MILLISECONDS = 10000; // 10 seconds

export interface DataSourcesConfig {
  valueSelectionAlgorithm: ValueSelectionAlgorithm,
  timeoutMilliseconds: number;
  maxTimestampDiffMilliseconds: number;
  verifySignature: boolean;
  defaultSignerEvmAddress: string;
  sources: SourceConfig[],
};

export interface SignedDataPackageResponse {
  timestamp: number;
  prices: { symbol: string; value: any }[];
  signature: string;
  liteSignature: string;
}

export interface SourceConfig {
  type: SourceType;
  url?: string; // required for "cache-layer" sources
  providerId?: string; // required for "cache-layer" sources (it's and Arweave address of provider)
  evmSignerAddress: string;
  streamrEndpointPrefix?: string; // required for "streamr" and "streamr-historical" sources
  disabledForSinglePrices?: boolean;
}

// TODO: implement
export async function fetch(dataSourcesConfig: DataSourcesConfig): Promise<SignedDataPackageResponse> {
  const timeoutMilliseconds =
    this.priceFeedOptions.dataSources?.timeoutMilliseconds
    || DEFAULT_TIMEOUT_MILLISECONDS;
  const useFirstValid =
    this.priceFeedOptions.dataSources!.valueSelectionAlgorithm === "first-valid";

  const selectedResponse = useFirstValid
    ? await this.fetchFirstValid(timeoutMilliseconds)
    : await this.fetchAllAndSelectValid(timeoutMilliseconds);

  return convertResponseToPricePackage(selectedResponse);
}

async function fetchFirstValid(timeoutMilliseconds: number): Promise<SignedDataPackageResponse> {
  let fetcherIndex = 0;
  const promises = this.fetchers.map(fetcher => {
    fetcherIndex++;
    return (async (fIndex: number) => {
      const response = await fetcher.getLatestDataWithTimeout(timeoutMilliseconds);
      const expectedSigner = fetcher.getEvmSignerAddress();
      const isValid = validateDataPackage(response, this.priceFeedOptions, expectedSigner);
      if (isValid) {
        return response;
      } else {
        console.warn(`Invalid response for fetcher ${fIndex}/${this.fetchers.length}: ` + JSON.stringify(response));
        throw new Error(
          `Received invalid response from fetcher: ${fIndex}/${this.fetchers.length}`);
      }
    })(fetcherIndex);
  });

  // Returning the reponse from the first resolved promise
  return await bluebird.Promise.any(promises);
}

// switch (config.type) {
//   case "cache-layer":
//     return new CacheLayerFetcher(config, asset);
//   case "streamr":
//     return new StreamrFetcher(config, asset);
//   case "streamr-storage":
//     return new StreamrStorageFetcher(config, asset);
//   default:
//     throw new Error(`Data source type is not supported: ${config.type}`);
// }

export default {
  fetch,
};
