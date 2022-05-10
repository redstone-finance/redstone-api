import { DataSourcesConfig } from "../redstone-data-feed";
import redstoneCustomUrlsDemo from "./redstone-custom-urls-demo";
import redstoneAvalancheProd from "./redstone-avalanche-prod";
import redstoneAvalanche from "./redstone-avalanche";
import redstoneRapid from "./redstone-rapid";
import redstoneStocks from "./redstone-stocks";
import redstone from "./redstone";

const dataSourcesConfigs: { [dataFeedId: string]: DataSourcesConfig } = {
  "redstone-custom-urls-demo": redstoneCustomUrlsDemo,
  "redstone-avalanche-prod": redstoneAvalancheProd,
  "redstone-avalanche": redstoneAvalanche,
  "redstone-rapid": redstoneRapid,
  "redstone-stocks": redstoneStocks,
  "redstone": redstone,
};

export default dataSourcesConfigs;
