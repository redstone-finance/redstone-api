import axios from "axios";
import { Fetcher, SignedDataPackageResponse, SourceConfig } from "./Fetcher";

export class CacheLayerFetcher extends Fetcher {

  async getLatestData(): Promise<SignedDataPackageResponse> {
    const response = await axios.get(`${this.config.url!}/packages/latest`, {
      params: {
        symbol: this.asset,
        provider: this.config.providerId!,
      },
    });
    return response.data;
  }

  async getLatestMultipleData(): Promise<SignedDataPackageResponse> {
    const response = await axios.get(`${this.config.url!}/packages/multiple`, {
      params: {
        symbol: this.asset,
      },
    });
    return response.data;
  }
}
