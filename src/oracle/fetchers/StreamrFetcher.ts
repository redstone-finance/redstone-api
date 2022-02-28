import StreamrClient from "streamr-client";
import _ from "lodash";
import { Fetcher, SignedDataPackageResponse, SourceConfig } from "./Fetcher";

// This "private" key is used for streamr client initialization.
// It can be anythng, because redstone data streams are always
// public and can be accessed by any party.
// Previously we generated a random key each time, but turned
// out that it consumes significant amount of CPU resources
// and slows down web apps that use redstone-evm-connector
const ANY_PRIVATE_KEY = "0000000000000000000000000000000000000000000000000000000000000001";

export class StreamrFetcher extends Fetcher {
  protected lastValue?: SignedDataPackageResponse;
  protected streamrClient: StreamrClient;

  constructor(config: SourceConfig, asset?: string) {
    super(config, asset);
    this.streamrClient = new StreamrClient({
      auth: {
        privateKey: ANY_PRIVATE_KEY,
      },
    });
  }

  init() {
    const streamId = this.getStreamId();
    this.streamrClient.subscribe(
      streamId,
      (value: any) => {
        console.log(`Received new value from: ${streamId}`);
        this.lastValue = this.extractPriceValue(value);
      });
    console.log(`Subscribed to streamr: ${streamId}`);
  }

  async getLatestData(): Promise<SignedDataPackageResponse> {
    if (!this.lastValue) {
      throw new Error("No data received from stream yet");
    }
    return this.lastValue;
  }

  protected getStreamId() {
    return `${this.config.streamrEndpointPrefix!}/`
      + (this.asset ? "prices" : "package");
  }

  protected extractPriceValue(receivedValue: any): SignedDataPackageResponse {
    if (this.asset) {
      const assetsArray: any[] = Object.values(receivedValue);
      const assetData = assetsArray.find(
        ({ symbol }: any) => symbol === this.asset);
      if (!assetData) {
        throw new Error(
          `Data not found for symbol: ${this.asset}`);
      }
      return {
        timestamp: assetData.timestamp,
        prices: [_.pick(assetData, ["symbol", "value"])],
        signature: assetData.evmSignature,
        liteSignature: assetData.liteEvmSignature,
      };
    } else {
      return {
        timestamp: receivedValue.pricePackage.timestamp,
        signature: receivedValue.signature,
        liteSignature: receivedValue.liteSignature,
        prices: receivedValue.pricePackage.prices,
      };
    }
  }
}
