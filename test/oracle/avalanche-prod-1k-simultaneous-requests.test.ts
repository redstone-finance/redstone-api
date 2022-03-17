import redstone from "../../src/index";

const REQ_COUNT = 1000;

describe("Send 1000 requests at once", () => {
  test(`Send ${REQ_COUNT} requests`, async () => {
    const promises = [];
    for (let i = 0; i < REQ_COUNT; i++) {
      promises.push(sendRequest(i));
    }
    await Promise.all(promises);
  });
});

async function sendRequest(reqNumber: number) {
  console.log(`Sending request: ${reqNumber}`);
  const dataSourcesConfig = redstone.oracle.getDefaultDataSourcesConfig("redstone-avalanche-prod");
  const startTime = Date.now();
  const dataPackage = await redstone.oracle.get({
    ...dataSourcesConfig,
    // timeoutMilliseconds: 50000,
    // sources: [dataSourcesConfig.sources[4]],
  });
  const reqTime = Date.now() - startTime;
  const timestampDiff = Date.now() - dataPackage.priceData.timestamp;
  console.log(`Req time: ${(reqTime / 1000).toFixed(2)} seconds`);
  console.log(`Timestamp diff: ${(timestampDiff / 1000).toFixed(2)} seconds`);
  console.log(`Got response for: ${reqNumber}`, dataPackage);
}
