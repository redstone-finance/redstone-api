import redstone from "../../src/index";
import { DataFeedId, DataSourcesConfig } from "../../src/oracle/redstone-data-feed";

const MAX_TIME_DIFF = 150000; // 150s

const dataFeedIds = [
  "redstone",
  "redstone-stocks",
  "redstone-rapid",
  "redstone-avalanche",
  "redstone-avalanche-prod",
] as DataFeedId[];

describe("Test all sources separately", () => {

  for (const dataFeedId of dataFeedIds) {
    describe(`Test data sources for: ${dataFeedId}`, () => {
      const defaultSourcesConfig = redstone.oracle.getDefaultDataSourcesConfig(dataFeedId);
      const sourcesCount = defaultSourcesConfig.sources.length;
  
      // Testing each data source seprately
      for (let sourceIndex = 0; sourceIndex < sourcesCount; sourceIndex++) {
        const source = defaultSourcesConfig.sources[sourceIndex];

        const shortUrl = source.url || "";
        test(`Should fetch using source: ${sourceIndex + 1}/${sourcesCount} (${source.type}: ${shortUrl})`, async () => {
          await testFetching({
            ...defaultSourcesConfig,
            sources: [ source ], // Single source
          });
        });
      }
    });
  }

});

async function testFetching(dataSourcesConfig: DataSourcesConfig, asset?: string) {
  const dataPackage = await redstone.oracle.get(dataSourcesConfig, asset);
  const timestampDiff = Date.now() - dataPackage.priceData.timestamp;
  expect(timestampDiff).toBeLessThan(MAX_TIME_DIFF);
}
