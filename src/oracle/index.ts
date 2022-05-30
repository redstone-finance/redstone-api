import {
  DataSourcesConfig,
  SignedPriceDataType,
  DataFeedId,
  RedstoneDataFeed,
} from "./redstone-data-feed";
import defaultDataSources from "./default-data-sources";

function getDefaultDataSourcesConfig(dataFeedId: DataFeedId): DataSourcesConfig {
  const dataSourcesConfig = defaultDataSources[dataFeedId];
  if (!dataSourcesConfig) {
    throw new Error(
      `Selected price feed doesn't have default data sources config. `
      + `You should provide it for "${dataFeedId}" price feed`);
  } else {
    return dataSourcesConfig;
  }
}

async function getFromDataFeed(
  dataFeedId: DataFeedId,
  asset?: string
): Promise<SignedPriceDataType> {
  const dataPackageConfig = getDefaultDataSourcesConfig(dataFeedId);
  return await get(dataPackageConfig, asset);
}

async function get(
  dataSourcesConfig: DataSourcesConfig,
  asset?: string
): Promise<SignedPriceDataType> {
  return await new RedstoneDataFeed({
    dataSources: dataSourcesConfig,
    asset,
  }).getSignedPrice();
}

async function getMultiple(
  dataSourcesConfig: DataSourcesConfig,
  asset?: string
): Promise<SignedPriceDataType> {
  return await new RedstoneDataFeed({
    dataSources: dataSourcesConfig,
    asset,
  }).getSignedMultiplePrices();
}

export default {
  get,
  getMultiple,
  getFromDataFeed,
  getDefaultDataSourcesConfig,
};
