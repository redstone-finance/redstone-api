import EvmPriceSigner from "redstone-node/dist/src/signers/EvmPriceSigner";
import _ from "lodash";
import { PriceDataType, SignedPriceDataType } from "../PriceFeedConnector";
import { SignedDataPackageResponse } from "./fetchers/Fetcher";
import { PriceFeedOptions, ValueSelectionAlgorithm } from "./RedStonePriceFeed";

const priceSigner = new EvmPriceSigner();

export function selectDataPackage(
  packages: SignedDataPackageResponse[],
  valueSelectionAlgorithm: ValueSelectionAlgorithm,
): SignedDataPackageResponse {
  const sortedPackages = [...packages];
  sortedPackages.sort((p1, p2) => p1.timestamp - p2.timestamp); // sorting prices from oldest to newest
  switch (valueSelectionAlgorithm) {

    // We don't handle first-valid here, because it works in a completely different way
    // than other value selection algorithms and it doesn't use this function

    case "newest-valid":
      return packages[packages.length - 1];

    case "oldest-valid":
      return packages[0];

    default:
      throw new Error(
        `Unsupported value for valueSelectionAlgorithm: ${valueSelectionAlgorithm}`);
  }
}

export function validateDataPackage(
  fetchedPackage: SignedDataPackageResponse,
  priceFeedOptions: PriceFeedOptions,
  signer: string,
): boolean {

  const maxTimestampDiffMilliseconds = priceFeedOptions.dataSources?.maxTimestampDiffMilliseconds;
  const preVerifySignatureOffchain = priceFeedOptions.dataSources?.preVerifySignatureOffchain;

  // Checking timestamp diff
  const timeDiffMilliseconds = Date.now() - fetchedPackage.timestamp;

  // Checking timestamp diff
  if (maxTimestampDiffMilliseconds && maxTimestampDiffMilliseconds < timeDiffMilliseconds) {
    console.warn(`Timestamp is too old: ${fetchedPackage.timestamp}`);
    return false;
  }

  // Offchain signature verification
  // (only liteSignature offchain verification is implemented for now)
  if (preVerifySignatureOffchain) {
    const isValidSignature = priceSigner.verifyLiteSignature({
      pricePackage: {
        prices: fetchedPackage.prices,
        timestamp: fetchedPackage.timestamp,
      },
      signer,
      signature: fetchedPackage.signature,
      liteSignature: fetchedPackage.liteSignature,
    });
    
    if (!isValidSignature) {
      console.warn(`Signature is invalid: ${fetchedPackage.liteSignature}`);
      return false;
    }
  }

  return true;
}

export function convertResponseToPricePackage(data: SignedDataPackageResponse): SignedPriceDataType {
  const pricePackage = _.pick(data, ["prices", "timestamp"]);
  const serialized = priceSigner.serializeToMessage(pricePackage);
  const priceData: PriceDataType = serialized as PriceDataType;
  return {
    priceData,
    signature: data.signature,
    liteSignature: data.liteSignature,
  };
}

export default {
  selectDataPackage,
  validateDataPackage,
  convertResponseToPricePackage,
};
