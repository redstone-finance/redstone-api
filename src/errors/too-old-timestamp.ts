export default class TooOldTimestampError extends Error {
    constructor(timestamp: number) {
        super(`Timestamp is too old: ${timestamp}`);
        this.name = "TooOldTimestampError";
    }
}
