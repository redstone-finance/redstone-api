import redstone from "../../src/index";

const TRIES_COUNT = 1000;

describe("Test ENTROPY data fetching", () => {

  for (let i = 0; i < TRIES_COUNT; i++) {
    const testTitle = `Fetching ENTROPY from redstone provider (${i + 1}/${TRIES_COUNT})`;
    test(testTitle, async () => {
      console.log(testTitle);
      console.log(`Timestamp: ${Date.now()}`);
      const dataPackage = await redstone.oracle.getFromDataFeed("redstone", "ENTROPY");
      const timestampDiff = Date.now() - dataPackage.priceData.timestamp;
      console.log(`Timestamp diff: ${(timestampDiff / 1000).toFixed(2)} seconds`)
    });
  }
});
