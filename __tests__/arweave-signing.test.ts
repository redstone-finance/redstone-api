import ArweaveMultihost from "arweave-multihost";

describe("Test arweave signing and verification", () => {
  const arweaveClient = ArweaveMultihost.initWithDefaultHosts({
    timeout: 10000,         // Network request timeouts in milliseconds
    logging: false,         // Enable network request logging
    onError: console.error, // On request error callback
  });

  test("Should sign and verify signature", async () => {
    // Keys generation
    const jwk = await arweaveClient.wallets.generate();
    const publicKey = jwk.n;

    // Signing
    const strToSign = "This is a test string data";
    const dataToSign = new TextEncoder().encode(strToSign);
    const signature = await arweaveClient.crypto.sign(jwk, dataToSign);

    // Verification
    const validSignature = await arweaveClient.crypto.verify(
      publicKey,
      dataToSign,
      signature);

    expect(validSignature).toBeTruthy();
  });

  test("Should get address from owner", async () => {
    // Keys generation
    const jwk = await arweaveClient.wallets.generate();
    const publicKey = jwk.n;

    const address = await arweaveClient.wallets.jwkToAddress(jwk);
    const addressFromOwner = await arweaveClient.wallets.ownerToAddress(publicKey);

    expect(addressFromOwner).toBe(address);
  });
});
