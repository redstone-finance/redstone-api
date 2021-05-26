import redstone from "../src/index";

const MAX_TIME_DIFF = 7200 * 1000; // 2 hours

const shouldNotHaveTechProps = (price: any) => {
  const technicalProps = ["signature", "version", "providerPublicKey"];
  for (const prop of technicalProps) {
    expect(price).not.toHaveProperty(prop);
  }
};

describe("Test getPrice method", () => {
  const redstoneApiClient = new redstone.Api({
    useCache: false,
  });

  test("Should get AR price from arweave", async () => {
    const symbol = "AR";
    const price: any = await redstoneApiClient.getPrice(symbol);

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    expect(price.value).toBeGreaterThan(0.1);
    expect(Date.now() - price.timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should get ETH price from arweave", async () => {
    const symbol = "ETH";
    const price: any = await redstoneApiClient.getPrice(symbol);

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    expect(price.value).toBeGreaterThan(10);
    expect(Date.now() - price.timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should not have technical properties (ETH)", async () => {
    const symbol = "ETH";
    const price: any = await redstoneApiClient.getPrice(symbol);

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    shouldNotHaveTechProps(price);
  });

  test("Should not have technical properties (AR)", async () => {
    const symbol = "AR";
    const price: any = await redstoneApiClient.getPrice(symbol);

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    shouldNotHaveTechProps(price);
  });

  test("Should get ETH, BTC, and AR price from arweave", async () => {
    const symbols = ["ETH", "BTC", "AR"];
    const prices: any = await redstoneApiClient.getPrice(symbols);

    expect(Object.keys(prices)).toContain("BTC");
    expect(Object.keys(prices)).toContain("ETH");
    expect(Object.keys(prices)).toContain("AR");
    expect(prices["AR"].value).toBeGreaterThan(0.1);
    expect(prices["ETH"].value).toBeGreaterThan(100);
    expect(prices["BTC"].value).toBeGreaterThan(1000);
    shouldNotHaveTechProps(prices["BTC"]);
    expect(Date.now() - prices["ETH"].timestamp).toBeLessThan(MAX_TIME_DIFF);
    expect(Date.now() - prices["BTC"].timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should not get historical prices from arweave", async () => {
    const symbols = ["ETH", "BTC", "AR"];
    return redstoneApiClient.getHistoricalPrice(symbols, {
      date: new Date("021-03-01"),
    }).catch(e => expect(e.toString()).toMatch(
      "Getting historical prices from arweave is not supported"));
  });
});
