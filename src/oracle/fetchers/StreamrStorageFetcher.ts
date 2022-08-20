import { SignedDataPackageResponse, SourceConfig } from "./Fetcher";
import { StreamrFetcher } from "./StreamrFetcher";

export class StreamrStorageFetcher extends StreamrFetcher {
  constructor(config: SourceConfig, asset?: string) {
    super(config, asset);
  }

  // Overriding StreamrFetcher implementation
  // of init. As it's not required to subscribe to any stream
  // in the StreamrStorageFetcher
  init() {}

  getLatestData(): Promise<SignedDataPackageResponse> {
    throw new Error("Streamr Storage fetcher disabled");
    // const streamId = this.getStreamId();
    // return new Promise((resolve) => {
    //   // Getting data from streamr storage
    //   this.streamrClient.resend(
    //     {
    //       stream: streamId,
    //       resend: {
    //         last: 1,
    //       },
    //     },
    //     (value: any) => {
    //       resolve(this.extractPriceValue(value));
    //     }
    //   );
    // });
  }
}
