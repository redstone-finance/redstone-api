import { DataSourcesConfig } from "../redstone-data-feed";

const config: DataSourcesConfig = {
  "sources": [
    {
      "type": "streamr",
      "streamrEndpointPrefix": "0x3a7d971de367fe15d164cdd952f64205f2d9f10c/redstone-oracle",
      "disabledForSinglePrices": false,
      "evmSignerAddress": "0x3a7d971de367fe15d164cdd952f64205f2d9f10c"
    },
    {
      "type": "streamr-storage",
      "streamrEndpointPrefix": "0x3a7d971de367fe15d164cdd952f64205f2d9f10c/redstone-oracle",
      "disabledForSinglePrices": false,
      "evmSignerAddress": "0x3a7d971de367fe15d164cdd952f64205f2d9f10c"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "f1Ipos2fVPbxPVO65GBygkMyW0tkAhp2hdprRPPBBN8",
      "evmSignerAddress": "0x3a7d971De367FE15D164CDD952F64205F2D9f10c"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "6bZ3yxPYy0LHPqo7MNqw0PHTeIM2PR-RmfTPYLltsfw",
      "evmSignerAddress": "0x41ed5321B76C045f5439eCf9e73F96c6c25B1D75"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "f1Ipos2fVPbxPVO65GBygkMyW0tkAhp2hdprRPPBBN8",
      "evmSignerAddress": "0x3a7d971De367FE15D164CDD952F64205F2D9f10c"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "6bZ3yxPYy0LHPqo7MNqw0PHTeIM2PR-RmfTPYLltsfw",
      "evmSignerAddress": "0x41ed5321B76C045f5439eCf9e73F96c6c25B1D75"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "f1Ipos2fVPbxPVO65GBygkMyW0tkAhp2hdprRPPBBN8",
      "evmSignerAddress": "0x3a7d971De367FE15D164CDD952F64205F2D9f10c"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "6bZ3yxPYy0LHPqo7MNqw0PHTeIM2PR-RmfTPYLltsfw",
      "evmSignerAddress": "0x41ed5321B76C045f5439eCf9e73F96c6c25B1D75"
    }
  ],
  "valueSelectionAlgorithm": "first-valid",
  "timeoutMilliseconds": 10000,
  "maxTimestampDiffMilliseconds": 150000,
  "preVerifySignatureOffchain": true
};

export default config;