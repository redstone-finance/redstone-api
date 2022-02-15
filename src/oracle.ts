// TODO: update this interface
export interface SignedDataPackage {
  value: any;
  signature: string;
}

// TODO: update this interface
export interface DataFeedSourcesConfig {
  sources: any[];
  verifySignature: boolean;
}

// TODO: implement
export async function fetch(dataFeedSourcesConfig: DataFeedSourcesConfig): Promise<SignedDataPackage> {
  throw 1;
}

export default {
  fetch,
};
