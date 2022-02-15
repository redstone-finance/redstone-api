import { DataPackageFetchArgs, IDataPackageFetcher } from "./IDataPackageFetcher";

export default class CacheProxy implements IDataPackageFetcher {
  constructor(private streamId: string) {}

  // TODO: implement
  async fetchDataPackage(args: DataPackageFetchArgs) {
    console.log(streamId);
    throw 1;
  }
}
