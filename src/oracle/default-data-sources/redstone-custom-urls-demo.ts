import { DataSourcesConfig } from "../redstone-data-feed";

const config: DataSourcesConfig = {
  "sources": [
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "5ktkAKcy_tou22r4eijcn_Xue3j6Rn9e8JckXRtHe8o",
      "evmSignerAddress": "0x11fFFc9970c41B9bFB9Aa35Be838d39bce918CfF"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "0Eu1WDQA61S98CB7XEQ_9SHpy9Ux06rd79u8jFuesjQ",
      "evmSignerAddress": "0xdBcC2C6c892C8d3e3Fe4D325fEc810B7376A5Ed6"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "5ktkAKcy_tou22r4eijcn_Xue3j6Rn9e8JckXRtHe8o",
      "evmSignerAddress": "0x11fFFc9970c41B9bFB9Aa35Be838d39bce918CfF"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "0Eu1WDQA61S98CB7XEQ_9SHpy9Ux06rd79u8jFuesjQ",
      "evmSignerAddress": "0xdBcC2C6c892C8d3e3Fe4D325fEc810B7376A5Ed6"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "5ktkAKcy_tou22r4eijcn_Xue3j6Rn9e8JckXRtHe8o",
      "evmSignerAddress": "0x11fFFc9970c41B9bFB9Aa35Be838d39bce918CfF"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "0Eu1WDQA61S98CB7XEQ_9SHpy9Ux06rd79u8jFuesjQ",
      "evmSignerAddress": "0xdBcC2C6c892C8d3e3Fe4D325fEc810B7376A5Ed6"
    }
  ],
  "valueSelectionAlgorithm": "first-valid",
  "timeoutMilliseconds": 50000,
  "maxTimestampDiffMilliseconds": 175000,
  "preVerifySignatureOffchain": true
};

export default config;
