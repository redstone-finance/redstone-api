import redstone from "../src/index";

const MAX_TIME_DIFF = 150000; // 150s

describe("Fluent interface tests ", () => {
  /********* SINGLE SYMBOL *********/

  test("Should get AR price", async () => {
    const price = await redstone.query().symbol("AR").latest().exec();

    expect(price).toBeDefined();
    expect(price.symbol).toBe("AR");
    expect(price.value).toBeGreaterThan(1);
    expect(Date.now() - price.timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should get AAPL price with redstone-stocks provider", async () => {
    const price = await redstone
      .query()
      .symbol("AAPL")
      .latest()
      .exec({ provider: "redstone-stocks" });

    expect(price).toBeDefined();
    expect(price.symbol).toBe("AAPL");
    expect(price.value).toBeGreaterThan(50);
    expect(Date.now() - price.timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  // /********* SEVERAL SYMBOLS *********/

  test("Should get latest prices for AR, ETH and BTC", async () => {
    const prices = await redstone
      .query()
      .symbols(["AR", "ETH", "BTC"])
      .latest()
      .exec();

    expect(prices["AR"]).toBeDefined();
    expect(prices["ETH"]).toBeDefined();
    expect(prices["BTC"]).toBeDefined();
    expect(prices["AR"].value).toBeGreaterThan(0.1);
    expect(prices["ETH"].value).toBeGreaterThan(100);
    expect(prices["BTC"].value).toBeGreaterThan(1000);
    expect(Date.now() - prices["AR"].timestamp).toBeLessThan(MAX_TIME_DIFF);
    expect(Date.now() - prices["BTC"].timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  // /********* ALL SYMBOLS *********/

  test("Should get the latest prices for all symbols", async () => {
    const prices = await redstone.query().allSymbols().latest().exec();

    expect(Object.keys(prices)).toContain("BTC");
    expect(Object.keys(prices)).toContain("ETH");
    expect(Object.keys(prices)).toContain("AR");
    expect(Object.keys(prices).length).toBeGreaterThan(100);
    expect(Date.now() - prices["AR"].timestamp).toBeLessThan(MAX_TIME_DIFF);
    expect(Date.now() - prices["ETH"].timestamp).toBeLessThan(MAX_TIME_DIFF);
    expect(Date.now() - prices["BTC"].timestamp).toBeLessThan(MAX_TIME_DIFF);
  });
});
