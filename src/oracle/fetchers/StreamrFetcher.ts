import StreamrClient from "streamr-client";
import _ from "lodash";
import { Fetcher, SignedDataPackageResponse, SourceConfig } from "./Fetcher";

// This "private" key is used for streamr client initialization.
// It can be anythng, because redstone data streams are always
// public and can be accessed by any party.
// Previously we generated a random key each time, but turned
// out that it consumes significant amount of CPU resources
// and slows down web apps that use redstone-evm-connector
const ANY_PRIVATE_KEY =
  "0000000000000000000000000000000000000000000000000000000000000001";

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

  async getLatestData(): Promise<SignedDataPackageResponse> {
    // Getting streamr stream id
    const streamId = this.getStreamId();
    console.log(`Using streamr stream: ${streamId}`);

    const dataPackageResponse = await new Promise((resolve) => {
      // Subscribe to streamr
      this.streamrClient.subscribe(streamId, resolve);
    });

    // Unsubscribe right after first received value
    await this.streamrClient.unsubscribe(streamId);

    // Convert response from streamr to SignedDataPackageResponse
    return this.extractPriceValue(dataPackageResponse);
  }

  protected getStreamId() {
    return (
      `${this.config.streamrEndpointPrefix!}/` +
      (this.asset ? "prices" : "package")
    );
  }

  protected extractPriceValue(receivedValue: any): SignedDataPackageResponse {
    if (this.asset) {
      const assetsArray: any[] = Object.values(receivedValue);
      const assetData = assetsArray.find(
        ({ symbol }: any) => symbol === this.asset
      );
      if (!assetData) {
        throw new Error(`Data not found for symbol: ${this.asset}`);
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
