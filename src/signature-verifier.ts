import deepSortObject from "deep-sort-object";
import _ from "lodash";
import ArweaveProxy from "./proxies/arweave-proxy";
import { PriceDataWithSignature } from "./types";

export default class SignatureVerifier {
  private arweaveProxy: ArweaveProxy;

  constructor(arweaveProxy: ArweaveProxy) {
    this.arweaveProxy = arweaveProxy;
  }

  public async assertValidSignature(
    _price: PriceDataWithSignature,
  ): Promise<void> {
    // We've decided to disable signing with Arweave signature
    // and use only EVM compatible signatures instead

    // const signedData = this.getPriceSignedData(price);
    // const publicKey = price.providerPublicKey;

    // const validSignature = await this.arweaveProxy.verifySignature({
    //   signedData,
    //   signature: price.signature,
    //   signerPublicKey: publicKey,
    // });

    // const addressFromPublicKey = await this.arweaveProxy.arweaveClient.wallets.ownerToAddress(
    //   publicKey,
    // );

    // if (!validSignature) {
    //   throw new Error("Signature verification failed for price: " + signedData);
    // }

    // if (addressFromPublicKey !== price.provider) {
    //   throw new Error(
    //     `Provider address doesn't match the public key.` +
    //       ` Address: ${price.provider}.` +
    //       ` Public key: ${publicKey}.`,
    //   );
    // }
  }

  private getPriceSignedData(price: PriceDataWithSignature) {
    const priceWithPickedProps = _.pick(price, [
      "id",
      "source",
      "symbol",
      "timestamp",
      "version",
      "value",
      "permawebTx",
      "provider",
    ]);

    if (price.version === "3" || price.version?.includes(".")) {
      return JSON.stringify(deepSortObject(priceWithPickedProps));
    } else {
      return JSON.stringify(priceWithPickedProps);
    }
  }
}
