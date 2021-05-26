import redstone from "../src/index";

const MAX_TIME_DIFF = 90000; // 90s

const shouldNotHaveTechProps = (price: any) => {
  const technicalProps = ["signature", "version", "providerPublicKey"];
  for (const prop of technicalProps) {
    expect(price).not.toHaveProperty(prop);
  }
};

describe("Test getPrice method", () => {
  test("Should get AR price", async () => {
    const symbol = "AR";
    const price: any = await redstone.getPrice(symbol);

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    expect(price.value).toBeGreaterThan(0.1);
    expect(Date.now() - price.timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should get ETH price", async () => {
    const symbol = "ETH";
    const price: any = await redstone.getPrice(symbol);

    expect(price).toBeDefined();
    expect(price.symbol).toBe(symbol);
    expect(price.value).toBeGreaterThan(10);
    expect(Date.now() - price.timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should not have technical properties", async () => {
    const symbol = "ETH";
    const price: any = await redstone.getPrice(symbol);

    expect(price).toBeDefined();
    shouldNotHaveTechProps(price);
  });

  test("Should get prices for AR, ETH and BTC", async () => {
    const symbols = ["AR", "ETH", "BTC"];
    const prices: any = await redstone.getPrice(symbols);

    expect(prices["AR"]).toBeDefined();
    expect(prices["ETH"]).toBeDefined();
    expect(prices["BTC"]).toBeDefined();
    expect(prices["AR"].value).toBeGreaterThan(0.1);
    expect(prices["ETH"].value).toBeGreaterThan(100);
    expect(prices["BTC"].value).toBeGreaterThan(1000);
    expect(Date.now() - prices["AR"].timestamp).toBeLessThan(MAX_TIME_DIFF);
    expect(Date.now() - prices["BTC"].timestamp).toBeLessThan(MAX_TIME_DIFF);
  });

  test("Should not have technical properties", async () => {
    const symbols = ["AR", "ETH", "BTC"];
    const prices: any = await redstone.getPrice(symbols);

    for (const symbol of symbols) {
      expect(prices[symbol]).toBeDefined();
      shouldNotHaveTechProps(prices[symbol]);
    }
  });

  test("Should get prices for AR, ETH, BNB, BTC and verify signature", async () => {
    const symbols = ["AR", "ETH", "BNB", "BTC"];
    const prices: any = await redstone.getPrice(symbols, {
      verifySignature: true,
    });

    for (const symbol of symbols) {
      expect(prices[symbol]).toBeDefined();
    }
  });

  test("Should verify signature for latest ETH price", async () => {
    const symbol = "ETH";
    const price = await redstone.getPrice(symbol, {
      verifySignature: true,
    });

    expect(price).toBeDefined();
  });

});
