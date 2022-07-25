import StreamrClient from "streamr-client";
import _ from "lodash";
import { Fetcher, SignedDataPackageResponse, SourceConfig } from "./Fetcher";

export class StreamrFetcher extends Fetcher {
  protected lastValue?: SignedDataPackageResponse;
  protected streamrClient: StreamrClient;

  constructor(config: SourceConfig, asset?: string) {
    super(config, asset);
    this.streamrClient = new StreamrClient();
  }

  async getLatestData(): Promise<SignedDataPackageResponse> {
    // Getting streamr stream id
    const streamId = this.getStreamId();
    console.log(`Using streamr stream: ${streamId}`);

    const dataPackageResponse = await new Promise(resolve => {
      // Subscribe to streamr
      this.streamrClient.subscribe(streamId, resolve);
    });

    // Unsubscribe right after first received value
    await this.streamrClient.unsubscribe(streamId);

    // Convert response from streamr to SignedDataPackageResponse
    return this.extractPriceValue(dataPackageResponse);
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
