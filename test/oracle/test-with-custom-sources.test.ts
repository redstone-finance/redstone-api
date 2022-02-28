import redstone from "../../src/index";
import { DataFeedId, DataSourcesConfig } from "../../src/oracle/redstone-data-feed";

const MAX_TIME_DIFF = 90000; // 90s

describe("Test redstone-avalanche-prod data feed with custom sources", () => {

  const defaultSourcesConfig = redstone.oracle.getDefaultDataSourcesConfig("redstone-avalanche-prod");
  const sourcesCount = defaultSourcesConfig.sources.length;

  test("Should receive correct default source config for redstone-avalanche-prod", () => {
    expect(defaultSourcesConfig).toEqual(getExpectedDefaultSourcesConfig());
  });

  // Testing each data source seprately
  for (let sourceIndex = 0; sourceIndex < sourcesCount; sourceIndex++) {
    const source = defaultSourcesConfig.sources[sourceIndex];
    test(`Should fetch using source: ${sourceIndex + 1}/${sourcesCount}`, async () => {
      await testFetching({
        ...defaultSourcesConfig,
        sources: [ source ], // Single source
      });
    });
  }

});

async function testFetching(dataSourcesConfig: DataSourcesConfig, asset?: string) {
  const dataPackage = await redstone.oracle.get(dataSourcesConfig, asset);
  const timestampDiff = Date.now() - dataPackage.priceData.timestamp;
  expect(timestampDiff).toBeLessThan(MAX_TIME_DIFF);
}

function getExpectedDefaultSourcesConfig() {
  return {
    "sources": [
      {
        "type": "streamr",
        "streamrEndpointPrefix": "0x981bdA8276ae93F567922497153de7A5683708d3/redstone-oracle",
        "disabledForSinglePrices": false,
        "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
      },
      {
        "type": "cache-layer",
        "url": "https://api.redstone.finance",
        "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
        "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
      },
      {
        "type": "cache-layer",
        "url": "https://api.redstone.finance",
        "providerId": "ll8DlO4xMwHK7gIMsbnOnN7Jg8Sl674Ls4G0aBfHCyk",
        "evmSignerAddress": "0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48"
      },
      {
        "type": "cache-layer",
        "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
        "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
        "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
      },
      {
        "type": "cache-layer",
        "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
        "providerId": "ll8DlO4xMwHK7gIMsbnOnN7Jg8Sl674Ls4G0aBfHCyk",
        "evmSignerAddress": "0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48"
      },
      {
        "type": "cache-layer",
        "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
        "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
        "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
      },
      {
        "type": "cache-layer",
        "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
        "providerId": "ll8DlO4xMwHK7gIMsbnOnN7Jg8Sl674Ls4G0aBfHCyk",
        "evmSignerAddress": "0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48"
      }
    ],
    "valueSelectionAlgorithm": "first-valid",
    "timeoutMilliseconds": 10000,
    "maxTimestampDiffMilliseconds": 150000,
    "preVerifySignatureOffchain": true
  };
}
