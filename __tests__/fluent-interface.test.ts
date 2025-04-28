import redstone from "../src/index";

const MAX_TIME_DIFF = 150000; // 150s

describe("Fluent interface tests ", () => {

  /********* SINGLE SYMBOL *********/

  test("Should get AR price", async () => {
    const price = await redstone.query()
      .symbol("AR")
      .latest()
      .exec();

    expect(price).toBeDefined();
    expect(price.symbol).toBe("AR");
    expect(price.value).toBeGreaterThan(1);
    expect(Date.now() - price.timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should get AAPL price with redstone-stocks provider", async () => {
    const price = await redstone.query()
      .symbol("AAPL")
      .latest()
      .exec({ provider: "redstone-stocks" });

    expect(price).toBeDefined();
    expect(price.symbol).toBe("AAPL");
    expect(price.value).toBeGreaterThan(50);
    expect(Date.now() - price.timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should get a single historical USDT price", async () => {
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const price = await redstone.query()
      .symbol("USDT")
      .atDate(date)
      .exec({ provider: "redstone" });

    const timeDiff = new Date(date).getTime() - price.timestamp;

    expect(price.symbol).toBe("USDT");
    expect(timeDiff).toBeLessThan(MAX_TIME_DIFF);
    expect(price.value).toBeCloseTo(1, 4);
  });

  test("Should get historical AR price for the last 12 hours", async () => {
    const prices = await redstone.query()
      .symbol("AR")
      .forLastHours(12)
      .exec();

    expect(prices.length).toBeGreaterThan(70);
    expect(prices.length).toBeLessThan(74);
    for (const price of prices) {
      expect(price.timestamp).toBeLessThan(Date.now());
      expect(price.timestamp).toBeGreaterThan(Date.now() - 12.5 * 3600 * 1000);
    }
  });

  test("Should get single historical AR price for the 24 hours ago", async () => {
    const price = await redstone.query()
      .symbol("AR")
      .hoursAgo(24)
      .exec();

    const timeDiff = Date.now() - 24 * 3600 * 1000 - price.timestamp;

    expect(price.symbol).toBe("AR");
    expect(price.value).toBeGreaterThan(1);
    expect(timeDiff).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should get historical AR price for last 7 days", async () => {
    const prices = await redstone.query()
      .symbol("AR")
      .forLastDays(7)
      .exec();

    expect(prices.length).toBeGreaterThan(165);
    expect(prices.length).toBeLessThan(171);
    for (const price of prices) {
      expect(price.timestamp).toBeLessThan(Date.now());
      expect(price.timestamp).toBeGreaterThan(Date.now() - 7.2 * 24 * 3600 * 1000);
    }
  });

  test("Should get historical AR price for the last 1 day", async () => {
    const prices = await redstone.query()
      .symbol("AR")
      .forLastDays(1)
      .exec();

    expect(prices.length).toBeGreaterThanOrEqual(23);
    expect(prices.length).toBeLessThanOrEqual(25);
    for (const price of prices) {
      expect(price.timestamp).toBeLessThan(Date.now());
      expect(price.timestamp).toBeGreaterThan(Date.now() - 1.2 * 24 * 3600 * 1000);
    }
  });

  test("Should get AR price in time range", async () => {
    const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const toDate =  new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);

    const prices = await redstone.query()
      .symbol("AR")
      .fromDate(fromDate)
      .toDate(toDate)
      .exec({ provider: "redstone" });

    expect(prices.length).toBe(24);
    for (const price of prices) {
      expect(price.timestamp).toBeLessThanOrEqual(
        new Date(toDate).getTime());
      expect(price.timestamp).toBeGreaterThanOrEqual(
        new Date(fromDate).getTime());
    }
  });

  // /********* SEVERAL SYMBOLS *********/

  test("Should get latest prices for AR, ETH and BTC", async () => {
    const prices = await redstone.query()
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

  test("Should get the historical price for USDT, USDC and BTC", async () => {
    const historicalDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const prices = await redstone.query()
      .symbols(["USDT", "USDC", "BTC"])
      .atDate(historicalDate)
      .exec({ provider: "redstone" });

    const timestamp = historicalDate.getTime();

    expect(prices["USDT"].value).toBeCloseTo(1, 4);
    expect(prices["USDC"].value).toBeCloseTo(1, 3);
    expect(prices["BTC"].value).toBeGreaterThan(10000);
    expect(timestamp - prices["USDT"].timestamp).toBeLessThan(MAX_TIME_DIFF);
    expect(timestamp - prices["USDC"].timestamp).toBeLessThan(MAX_TIME_DIFF);
    expect(timestamp - prices["BTC"].timestamp).toBeLessThan(MAX_TIME_DIFF);
  });


  // /********* ALL SYMBOLS *********/

  test("Should get the latest prices for all symbols", async () => {
    const prices = await redstone.query()
      .allSymbols()
      .latest()
      .exec();

    expect(Object.keys(prices)).toContain("BTC");
    expect(Object.keys(prices)).toContain("ETH");
    expect(Object.keys(prices)).toContain("AR");
    expect(Object.keys(prices).length).toBeGreaterThan(100);
    expect(Date.now() - prices["AR"].timestamp).toBeLessThan(MAX_TIME_DIFF);
    expect(Date.now() - prices["ETH"].timestamp).toBeLessThan(MAX_TIME_DIFF);
    expect(Date.now() - prices["BTC"].timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

});
