import { CacheLayerFetcher } from "./CacheLayerFetcher";
import { Fetcher, SourceConfig } from "./Fetcher";
import { StreamrFetcher } from "./StreamrFetcher";
import { StreamrStorageFetcher } from "./StreamrStorageFetcher";

export function createFetcher(config: SourceConfig, asset?: string) {
  switch (config.type) {
    case "cache-layer":
      return new CacheLayerFetcher(config, asset);
    case "streamr":
      return new StreamrFetcher(config, asset);
    case "streamr-storage":
      return new StreamrStorageFetcher(config, asset);
    default:
      throw new Error(`Data source type is not supported: ${config.type}`);
  }
}
