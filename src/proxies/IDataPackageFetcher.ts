export interface DataPackageFetchArgs {
  symbol?: string;
  providerId: string;
  timeoutMilliseconds: number;
  verifySignatureForAddress?: string; // will skip verification if address is not provided
}

export interface IDataPackageFetcher {
  // TODO: improve returned type
  fetchDataPackage(args: DataPackageFetchArgs): Promise<any>
}
