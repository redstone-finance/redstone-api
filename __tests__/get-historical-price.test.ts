import redstone from "../src/index";

const shouldNotHaveTechProps = (price: any) => {
  const technicalProps = ["signature", "version", "providerPublicKey"];
  for (const prop of technicalProps) {
    expect(price).not.toHaveProperty(prop);
  }
};

describe("Test getHistoricalPrice method", () => {
  test("Should get AR price for 2021-04-17", async () => {
    const symbol = "AR";
    const date = new Date("2021-04-17");
    const price: any =
      await redstone.getHistoricalPrice(symbol, { date, provider: "redstone" });

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    expect(price.value).toBeCloseTo(25.923827794046517, 15);
    shouldNotHaveTechProps(price);
  });

  test("Should get ETH price for 2021-04-17", async () => {
    const symbol = "ETH";
    const date = new Date("2021-04-17");
    const price: any =
      await redstone.getHistoricalPrice(symbol, { date, provider: "redstone" });

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    expect(price.value).toBeCloseTo(2421.882615498678, 12);
    expect(price.timestamp).toBeLessThanOrEqual(date.getTime());
    expect(price.timestamp).toBeGreaterThan(date.getTime() - 2 * 60 * 1000);
    shouldNotHaveTechProps(price);
  });

  test("Should get ETH price for 2021-04-17 and verify signature", async () => {
    const symbol = "ETH";
    const date = new Date("2021-04-17");

    await redstone.getHistoricalPrice(symbol, {
      date,
      verifySignature: true,
      provider: "redstone",
    });
  });

  test("Should get AR, BTC and ETH price for 2021-04-17", async () => {
    const symbols = ["AR", "BTC", "ETH"];
    const prices: any =
      await redstone.getHistoricalPrice(symbols, {
        date: "2021-04-17",
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

  test("Should get AR prices in a time range", async () => {
    const symbol = "AR";

    const prices: any = await redstone.getHistoricalPrice(symbol, {
      startDate: "2021-06-17",
      endDate: "2021-06-18",
      interval: 600000,
      provider: "redstone",
    });

    expect(prices).toBeDefined();
    expect(prices.length).toBe(144);

    for (const price of prices) {
      shouldNotHaveTechProps(price);
    }
  });

  test("Should get AR prices with hourly interval", async () => {
    const symbol = "AR";


    const endDate = new Date("2021-06-20T23:59:00+00:00").getTime();
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

  test("Should get AR prices with paging", async () => {
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

  test("Should not found AR price for 2019-01-01", async () => {
    await redstone.getHistoricalPrice("AR", {
      date: "2019-01-01",
      provider: "redstone"
    }).catch(e => {
      const msg = e.toString();
      expect(msg.includes("Price not found for symbol: AR")).toBe(true);
    });
  });
});
