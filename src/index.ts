import Api from "./api";
import Query from "./query";
import oracle from "./oracle";

class Redstone extends Api {
  query = Query;
  Api = Api;
  oracle = oracle;

  constructor(opts?: any) {
    super(opts);
  }
}

export = new Redstone();
