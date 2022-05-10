import redstone from "../../src/index";
import { DataFeedId, DataSourcesConfig } from "../../src/oracle/redstone-data-feed";

const dataFeedIds = [
  "redstone",
  "redstone-stocks",
  "redstone-rapid",
  "redstone-avalanche",
  "redstone-avalanche-prod",
  "redstone-custom-urls-demo",
] as DataFeedId[];

describe("Test all data feeds", () => {

  for (const dataFeedId of dataFeedIds) {
    test(`Checking data feed: ${dataFeedId}`, async () => {
      await redstone.oracle.getFromDataFeed(dataFeedId);
    });
  }
});
