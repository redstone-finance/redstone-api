import { DataSourcesConfig } from "../redstone-data-feed";

const config: DataSourcesConfig = {
  "sources": [
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
      "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "ll8DlO4xMwHK7gIMsbnOnN7Jg8Sl674Ls4G0aBfHCyk",
      "evmSignerAddress": "0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
      "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "ll8DlO4xMwHK7gIMsbnOnN7Jg8Sl674Ls4G0aBfHCyk",
      "evmSignerAddress": "0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
      "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "ll8DlO4xMwHK7gIMsbnOnN7Jg8Sl674Ls4G0aBfHCyk",
      "evmSignerAddress": "0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48"
    }
  ],
  "valueSelectionAlgorithm": "first-valid",
  "timeoutMilliseconds": 10000,
  "maxTimestampDiffMilliseconds": 150000,
  "preVerifySignatureOffchain": true
};

export default config;
