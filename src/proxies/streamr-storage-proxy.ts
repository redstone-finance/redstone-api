import { DataPackageFetchArgs, IDataPackageFetcher } from "./IDataPackageFetcher";

// TODO: maybe remove storage proxy
export default class StreamrStorageProxy implements IDataPackageFetcher {
  constructor(private streamId: string) {}

  // TODO: implement
  async fetchDataPackage(args: DataPackageFetchArgs) {
    console.log(this.streamId);
    throw 1;
  }
}
