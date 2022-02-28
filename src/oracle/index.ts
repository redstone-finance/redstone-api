export type DataFeedId =
  | "redstone"
  | "redstone-stocks"
  | "redstone-rapid"
  | "redstone-avalanche"
  | "redstone-prod-avalanche";

export interface DataPackageConfig {
  value: any;
}

export interface DataPackage {
  value: any;
  timestamp: number;
}

function getDefaultDataPackageConfig(dataFeedId: DataFeedId): DataPackageConfig {
  throw 1;
}

async function get(dataPackageConfig: DataPackageConfig): Promise<DataPackage> {
  throw 1;
}

async function getFromDataFeed(dataFeedId: DataFeedId): Promise<DataPackage> {
  const dataPackageConfig = getDefaultDataPackageConfig(dataFeedId);
  return await get(dataPackageConfig);
};

export default {
  get,
  getFromDataFeed,
  getDefaultDataPackageConfig,
};
