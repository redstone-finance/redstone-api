import { DataPackageFetchArgs, IDataPackageFetcher } from "./IDataPackageFetcher";

export default class StreamrProxy implements IDataPackageFetcher {
  constructor(private streamId: string) {}

  // TODO: implement
  async fetchDataPackage(args: DataPackageFetchArgs) {
    console.log(this.streamId);
    throw 1;
  }
}
