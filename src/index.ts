import Api from "./api";
import Query from "./query";

class Redstone extends Api {
  query = Query;
  Api = Api;

  constructor(opts?: any) {
    super(opts);
  }
}

export = new Redstone();
