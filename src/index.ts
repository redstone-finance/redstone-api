import Api from "./api";
import Query from "./query";
import symbols from "./symbols";
import oracle from "./oracle";

class Redstone extends Api {
  query = Query;
  symbols = symbols;
  Api = Api;
  oracle = oracle;

  constructor(opts?: any) {
    super(opts);
  }
}

export = new Redstone();
