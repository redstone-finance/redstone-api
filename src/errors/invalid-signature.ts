export default class InvalidSignatureError extends Error {
    constructor(liteSignature: string) {
        super(`Signature is invalid: ${liteSignature}`);
        this.name = "InvalidSignatureError";
    }
}
