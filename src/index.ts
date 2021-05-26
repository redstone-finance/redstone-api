import Api from "./api";
import Query from "./query";
import symbols from "./symbols";

class Redstone extends Api {
  query = Query;
  symbols = symbols;
  Api = Api;

  constructor(opts?: any) {
    super(opts);
  }
}

export = new Redstone();
