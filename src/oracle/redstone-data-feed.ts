import bluebird from "bluebird";
import _ from "lodash";
import { Fetcher, SignedDataPackageResponse, SourceConfig } from "./fetchers/Fetcher";
import { createFetcher } from "./fetchers";
import { convertResponseToPricePackage, selectDataPackage, validateDataPackage } from "./data-package-utils";

const DEFAULT_TIMEOUT_MILLISECONDS = 10000; // 10 seconds

export type ValueSelectionAlgorithm = "first-valid" | "newest-valid" | "oldest-valid"; // wa can add "median-valid" in future
export type SourceType = "cache-layer" | "streamr" | "streamr-storage";

export interface PriceDataType {
  symbols: string[];
  values: number[];
  timestamp: number;
}

export interface SignedPriceDataType {
  priceData: PriceDataType;
  signature: string;
  liteSignature: string;
}

export interface DataSourcesConfig {
  valueSelectionAlgorithm: ValueSelectionAlgorithm,
  timeoutMilliseconds: number;
  maxTimestampDiffMilliseconds: number;
  preVerifySignatureOffchain: boolean;
  defaultSignerEvmAddress: string;
  sources: SourceConfig[],
}

export interface DataFeedOptions {
  dataSources?: DataSourcesConfig;
  asset?: string;
}

export type DataFeedId =
  | "redstone"
  | "redstone-stocks"
  | "redstone-rapid"
  | "redstone-avalanche"
  | "redstone-avalanche-prod"
  | "custom";

export class RedstoneDataFeed {

  private fetchers: Fetcher[] = [];

  constructor(
    dataFeedId: DataFeedId,
    private dataFeedOptions: DataFeedOptions = {}) {

      // Getting default data sources config for provider if not specified
      if (!this.dataFeedOptions.dataSources) {
        this.dataFeedOptions.dataSources = getDefaultDataSourceConfig(dataFeedId);
      }

      // Init fetchers
      for (const [i, source] of Object.entries(this.dataFeedOptions.dataSources!.sources!)) {
        if (dataFeedOptions.asset && source.disabledForSinglePrices) {
          console.log(`Skipping ${i} (${source.type}) source init`);
        } else {
          const fetcherForSource = createFetcher(source, dataFeedOptions.asset);
          this.fetchers.push(fetcherForSource);
        }
      }
  }

  // This is the entrypoint function of this module
  async getSignedPrice(): Promise<SignedPriceDataType> {
    const timeoutMilliseconds =
      this.dataFeedOptions.dataSources?.timeoutMilliseconds
      || DEFAULT_TIMEOUT_MILLISECONDS;
    const useFirstValid =
      this.dataFeedOptions.dataSources!.valueSelectionAlgorithm === "first-valid";

    const selectedResponse = useFirstValid
      ? await this.fetchFirstValid(timeoutMilliseconds)
      : await this.fetchAllAndSelectValid(timeoutMilliseconds);

    return convertResponseToPricePackage(selectedResponse);
  }

  getDefaultSigner(): string {
    return this.dataFeedOptions.dataSources!.defaultSignerEvmAddress;
  }

  private async fetchFirstValid(timeoutMilliseconds: number): Promise<SignedDataPackageResponse> {
    let fetcherIndex = 0;
    const promises = this.fetchers.map(fetcher => {
      fetcherIndex++;
      return (async (fIndex: number) => {
        const response = await fetcher.getLatestDataWithTimeout(timeoutMilliseconds);
        const expectedSigner = fetcher.getEvmSignerAddress();
        const isValid = validateDataPackage(response, this.dataFeedOptions, expectedSigner);
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

  private async fetchAllAndSelectValid(timeoutMilliseconds: number): Promise<SignedDataPackageResponse> {
    // Fetching data from all sources simultaneously with timeout
    const promises = this.fetchers.map(fetcher =>
      fetcher.getLatestDataWithTimeout(timeoutMilliseconds));
    const results = await Promise.allSettled(promises);

    // Validating fetched data
    const validDataPackages = [];
    for (let fetcherIndex = 0; fetcherIndex < this.fetchers.length; fetcherIndex++) {
      const fetcher = this.fetchers[fetcherIndex];
      const fetcherResult = results[fetcherIndex];
      const expectedSigner = fetcher.getEvmSignerAddress();

      if (fetcherResult.status === "fulfilled" ) {
        const dataPackage = fetcherResult.value;
        const isValid = validateDataPackage(
          dataPackage,
          this.dataFeedOptions,
          expectedSigner
        );

        if (isValid) {
          validDataPackages.push(dataPackage);
        }
      }

    }

    // Checking if there are any valid data packages
    if (validDataPackages.length === 0) {
      console.error(results);
      throw new Error(`Failed to load valid data packages`);
    }

    // Selecting the final value
    const selectedResponse = selectDataPackage(
      validDataPackages,
      this.dataFeedOptions.dataSources!.valueSelectionAlgorithm);

    return selectedResponse;
  }
}

function getDefaultDataSourceConfig(priceFeedId: DataFeedId): DataSourcesConfig {
  try {
    return require(`./default-data-sources/${priceFeedId}.json`);
  } catch {
    throw new Error(
      `Selected price feed doesn't have default data sources config. `
      + `You should proide it for "${priceFeedId}" price feed`);
  }
}
