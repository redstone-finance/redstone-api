import redstone from "../src/index";

const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

const shouldNotHaveTechProps = (price: any) => {
  const technicalProps = ["signature", "version", "providerPublicKey"];
  for (const prop of technicalProps) {
    expect(price).not.toHaveProperty(prop);
  }
};

describe("Test getHistoricalPrice method", () => {
  test("Should get historical USDT price", async () => {
    const symbol = "USDT";
    const price: any =
      await redstone.getHistoricalPrice(symbol, { date, provider: "redstone" });

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    expect(price.value).toBeCloseTo(1, 4);
    shouldNotHaveTechProps(price);
  });

  test("Should get historical USDC price", async () => {
    const symbol = "USDC";
    const price: any =
      await redstone.getHistoricalPrice(symbol, { date, provider: "redstone" });

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    expect(price.value).toBeCloseTo(1, 3);
    expect(price.timestamp).toBeLessThanOrEqual(date.getTime());
    expect(price.timestamp).toBeGreaterThan(date.getTime() - 2 * 60 * 1000);
    shouldNotHaveTechProps(price);
  });

  test("Should get historical ETH price and verify signature", async () => {
    const symbol = "ETH";

    await redstone.getHistoricalPrice(symbol, {
      date,
      verifySignature: true,
      provider: "redstone",
    });
  });

  test("Should get historical AR, BTC and ETH price", async () => {
    const symbols = ["AR", "BTC", "ETH"];
    const prices: any =
      await redstone.getHistoricalPrice(symbols, {
        date: date.toISOString(),
        provider: "redstone",
      });

    for (const symbol of symbols) {
      expect(prices[symbol]).toBeDefined();
      shouldNotHaveTechProps(prices[symbol]);
    }

    expect(prices["AR"].value).toBeGreaterThan(0.1);
    expect(prices["ETH"].value).toBeGreaterThan(100);
    expect(prices["BTC"].value).toBeGreaterThan(1000);
  });

  test("Should get historical AR prices in a time range", async () => {
    const symbol = "AR";

    const endDate = date.getTime();
    const startDate = endDate - 1 * 24 * 3600 * 1000; // 1 day before

    const prices: any = await redstone.getHistoricalPrice(symbol, {
      startDate: startDate,
      endDate: endDate,
      interval: 600000,
      provider: "redstone",
    });

    expect(prices).toBeDefined();
    expect(prices.length).toBe(144);

    for (const price of prices) {
      shouldNotHaveTechProps(price);
    }
  });

  test("Should get historical AR prices with hourly interval", async () => {
    const symbol = "AR";


    const endDate = date.getTime();
    const startDate = endDate - 2 * 24 * 3600 * 1000; // 2 days before

    const prices: any = await redstone.getHistoricalPrice(symbol, {
      startDate,
      endDate,
      interval: 3600 * 1000, // 1 hour
      verifySignature: true,
      provider: "redstone",
    });

    expect(prices).toBeDefined();
    expect(prices.length).toBeGreaterThanOrEqual(48);
    expect(prices.length).toBeLessThanOrEqual(50);
  });

  test("Should get historical AR prices with paging", async () => {
    const symbol = "AR";

    const prices: any = await redstone.getHistoricalPrice(symbol, {
      offset: 1000,
      limit: 100,
      provider: "redstone",
    });
    
    expect(prices).toHaveLength(100);

    for (const price of prices) {
      shouldNotHaveTechProps(price);
    }
  });

  test("Should not found historical AR price", async () => {
    await redstone.getHistoricalPrice("AR", {
      date: date,
      provider: "redstone"
    }).catch(e => {
      const msg = e.toString();
      expect(msg.includes("Price not found for symbol: AR")).toBe(true);
    });
  });
});
