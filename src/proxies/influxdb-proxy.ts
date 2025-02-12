import {FluxTableMetaData, InfluxDB, ParameterizedQuery} from '@influxdata/influxdb-client';
import {RedstoneCommon} from "@redstone-finance/utils";
import {z} from "zod";

export interface InfluxConfig {
  influxUrl?: string;
  InfluxAuthToken?: string;
}

export const config: InfluxConfig = Object.freeze({
  influxUrl: RedstoneCommon.getFromEnv(
    "INFLUXDB_URL",
    z.string().optional()
  ),
  InfluxAuthToken: RedstoneCommon.getFromEnv(
    "INFLUXDB_TOKEN",
    z.string().optional()
  ),
} as InfluxConfig);

export interface Price {
  // tags
  symbol: string;
  provider: string;
  version: string;

  // fields
  value: number;
  timestamp: number;
  permawebTx: string;
  signature?: string;
  evmSignature?: string;
  liteEvmSignature?: string;
}

interface InfluxParams {
  type: string;
  version: string;
  providerAddress: string;
  symbols: string[];
}

export default class InfluxDBProxy {
  private influxService: InfluxService;

  constructor() {
    this.influxService = createInfluxService();
  }

  async findPrices(
    parameters: InfluxParams,
  ): Promise<Price[] | undefined> {
    return this.influxService.findPrices(parameters);
  }
}

export interface InfluxConstructorAuthParams {
  url: string;
  token: string;
}

type InfluxConnectionInfo = {
  url: string;
  org: string;
  bucket: string;
  precision: string;
};

interface InfluxAuthParams extends InfluxConnectionInfo {
  token: string;
}

export interface IInfluxService {
  findPrices(args: InfluxParams): Promise<Price[] | undefined>;
}

export class InfluxService implements IInfluxService {
  private influx: InfluxDB;
  private authParams: InfluxAuthParams;

  private static parseInfluxUrl(influxUrl: string): InfluxConnectionInfo {
    const parsedUrl = new URL(influxUrl);
    const pathNameWithoutInfluxApi = parsedUrl.pathname.replace(
      "/api/v2/write",
      ""
    );
    return {
      url: `${parsedUrl.protocol}//${parsedUrl.host}${pathNameWithoutInfluxApi}`,
      org: parsedUrl.searchParams.get("org") || "",
      bucket: parsedUrl.searchParams.get("bucket") || "",
      precision: parsedUrl.searchParams.get("precision") || "ms",
    };
  }

  constructor(constructorAuthParams: InfluxConstructorAuthParams) {
    const connectionInfo = InfluxService.parseInfluxUrl(
      constructorAuthParams.url
    );
    this.authParams = {
      ...connectionInfo,
      token: constructorAuthParams.token
    };

    this.influx = new InfluxDB({
      url: this.authParams.url,
      token: this.authParams.token,
    });

    const originalSend = this.influx.transport.send.bind(this.influx.transport);

    this.influx.transport.send = (path, body, options, callbacks) => {
      if (!options.headers) options.headers = {};
      options.headers["x-api-key"] = this.authParams.token; // add additional header in case we send request to API Gateway proxy
      return originalSend(path, body, options, callbacks);
    };
  }

  async findPrices(
    args: InfluxParams
  ): Promise<Price[] | undefined> {
    const { type, version, providerAddress, symbols } = args;

    const queryApi = this.influx.getQueryApi(this.authParams.org);

    const measurement = type;

    const symbolsList = symbols.map(symbol => `"${symbol}"`).join(', ');
    const query = `
      from(bucket: "${this.authParams.bucket}")
        |> range(start: -1d)
        |> filter(fn: (r) => r["_measurement"] == "${measurement}")
        |> filter(fn: (r) => r["version"] == "${version}")
        |> filter(fn: (r) => r["provider"] == "${providerAddress}")
        |> filter(fn: (r) => contains(value: r["symbol"], set: [${symbolsList}]))
        |> group(columns: ["symbol"])
        |> sort(columns: ["_time"], desc: true)
        |> limit(n:1)
        |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
    `;

    return new Promise((resolve, reject) => {
      const prices: Price[] = [];

      queryApi.queryRows(query, {
        next(row: string[], tableMeta: FluxTableMetaData) {
          const o = tableMeta.toObject(row);

          const price: Price = {
            symbol: o.symbol,
            provider: o.provider,
            version: o.version,
            value: parseFloat(o.value),
            timestamp: new Date(o._time).getTime(),
            permawebTx: o.permawebTx,
            signature: o.signature,
            evmSignature: o.evmSignature,
            liteEvmSignature: o.liteEvmSignature,
          };
          prices.push(price);
        },
        error(error: Error) {
          reject(error);
        },
        complete() {
          if (prices.length > 0) {
            resolve(prices);
          } else {
            resolve(undefined);
          }
        },
      });
    });
  }
}

export const createInfluxService = () => {
  if (config.influxUrl && config.InfluxAuthToken) {
    return new InfluxService({
      url: config.influxUrl,
      token: config.InfluxAuthToken,
    });
  } else {
    throw new Error("InfluxDB configuration is missing: 'influxUrl' and 'InfluxAuthToken' must be provided.");
  }
};
