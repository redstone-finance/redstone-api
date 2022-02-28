import {
  DataSourcesConfig,
  SignedPriceDataType,
  DataFeedId,
  RedstoneDataFeed,
} from "./redstone-data-feed";

function getDefaultDataSourcesConfig(dataFeedId: DataFeedId): DataSourcesConfig {
  try {
    return require(`./default-data-sources/${dataFeedId}.json`);
  } catch {
    throw new Error(
      `Selected price feed doesn't have default data sources config. `
      + `You should proide it for "${dataFeedId}" price feed`);
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

export default {
  get,
  getFromDataFeed,
  getDefaultDataSourcesConfig,
};
