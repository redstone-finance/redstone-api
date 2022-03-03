import { DataSourcesConfig } from "../redstone-data-feed";

const config: DataSourcesConfig = {
  "sources": [
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "I-5rWUehEv-MjdK9gFw09RxfSLQX9DIHxG614Wf8qo0",
      "evmSignerAddress": "0x0C39486f770B26F5527BBBf942726537986Cd7eb"
    }
  ],
  "valueSelectionAlgorithm": "first-valid",
  "timeoutMilliseconds": 10000,
  "maxTimestampDiffMilliseconds": 175000,
  "preVerifySignatureOffchain": true
};

export default config;
