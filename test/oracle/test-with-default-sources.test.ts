import redstone from "../../src/index";
import { DataFeedId } from "../../src/oracle/redstone-data-feed";

const MAX_TIME_DIFF = 150000; // 150s

const dataFeedIds = [
  "redstone",
  "redstone-stocks",
  "redstone-rapid",
  "redstone-avalanche",
  "redstone-avalanche-prod",
] as DataFeedId[];

describe("Test fetching data packages with default sources", () => {

  for (const dataFeedId of dataFeedIds) {
    test(`Should fetch whole data package from ${dataFeedId}`, async () => {
      await testFetchingFromDataFeed(dataFeedId);
    });
  }

  for (const dataFeedId of dataFeedIds) {
    test(`Should fetch data package for ETH from ${dataFeedId}`, async () => {
      await testFetchingFromDataFeed(dataFeedId, "ETH");
    });
  }

});

async function testFetchingFromDataFeed(dataFeedId: DataFeedId, asset?: string) {
  const dataPackage = await redstone.oracle.getFromDataFeed(dataFeedId, asset);
  const timestampDiff = Date.now() - dataPackage.priceData.timestamp;
  expect(timestampDiff).toBeLessThan(MAX_TIME_DIFF);
}
