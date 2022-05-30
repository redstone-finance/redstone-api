import { DataSourcesConfig } from "../redstone-data-feed";

const config: DataSourcesConfig = {
  "valueSelectionAlgorithm": "first-valid",
  "timeoutMilliseconds": 50000,
  "maxTimestampDiffMilliseconds": 175000,
  "preVerifySignatureOffchain": true,
  "sources": [
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
      "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "TEHhCDWy-vGmPSZsYJyM0aP_MM4xESgyIZdf5mVODzg",
      "evmSignerAddress": "0x981bdA8276ae93F567922497153de7A5683708d3"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
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
      "providerId": "ll8DlO4xMwHK7gIMsbnOnN7Jg8Sl674Ls4G0aBfHCyk",
      "evmSignerAddress": "0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "ll8DlO4xMwHK7gIMsbnOnN7Jg8Sl674Ls4G0aBfHCyk",
      "evmSignerAddress": "0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "MPkZQEzXbX9FajC3fuI4cIT3DQ6PPjp_H8Bf6lsJTHc",
      "evmSignerAddress": "0xc1D5b940659e57b7bDF8870CDfC43f41Ca699460"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "MPkZQEzXbX9FajC3fuI4cIT3DQ6PPjp_H8Bf6lsJTHc",
      "evmSignerAddress": "0xc1D5b940659e57b7bDF8870CDfC43f41Ca699460"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "MPkZQEzXbX9FajC3fuI4cIT3DQ6PPjp_H8Bf6lsJTHc",
      "evmSignerAddress": "0xc1D5b940659e57b7bDF8870CDfC43f41Ca699460"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "vgbNNhocuP7LRgogK_4TUobyN6jm0IUifUqgJjihGf4",
      "evmSignerAddress": "0x1Cd8F9627a2838a7DAE6b98CF71c08B9CbF5174a"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "vgbNNhocuP7LRgogK_4TUobyN6jm0IUifUqgJjihGf4",
      "evmSignerAddress": "0x1Cd8F9627a2838a7DAE6b98CF71c08B9CbF5174a"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "vgbNNhocuP7LRgogK_4TUobyN6jm0IUifUqgJjihGf4",
      "evmSignerAddress": "0x1Cd8F9627a2838a7DAE6b98CF71c08B9CbF5174a"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "6qI40buhziyE2TxRi65YAH2DmCWqJETHpz4qcdSGE9o",
      "evmSignerAddress": "0xbC5a06815ee80dE7d20071703C1F1B8fC511c7d4"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "6qI40buhziyE2TxRi65YAH2DmCWqJETHpz4qcdSGE9o",
      "evmSignerAddress": "0xbC5a06815ee80dE7d20071703C1F1B8fC511c7d4"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "6qI40buhziyE2TxRi65YAH2DmCWqJETHpz4qcdSGE9o",
      "evmSignerAddress": "0xbC5a06815ee80dE7d20071703C1F1B8fC511c7d4"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "wiXbi2nyzgDdCD8zgaNMt5pjrdkmKWwZfeACT-XfTAE",
      "evmSignerAddress": "0xe9Fa2869C5f6fC3A0933981825564FD90573A86D"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "wiXbi2nyzgDdCD8zgaNMt5pjrdkmKWwZfeACT-XfTAE",
      "evmSignerAddress": "0xe9Fa2869C5f6fC3A0933981825564FD90573A86D"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "wiXbi2nyzgDdCD8zgaNMt5pjrdkmKWwZfeACT-XfTAE",
      "evmSignerAddress": "0xe9Fa2869C5f6fC3A0933981825564FD90573A86D"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "vRhC_4qe7n8crD93pPhEL994NSqEOe1OP7GLPJrIVNc",
      "evmSignerAddress": "0xDf6b1cA313beE470D0142279791Fa760ABF5C537"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "vRhC_4qe7n8crD93pPhEL994NSqEOe1OP7GLPJrIVNc",
      "evmSignerAddress": "0xDf6b1cA313beE470D0142279791Fa760ABF5C537"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "vRhC_4qe7n8crD93pPhEL994NSqEOe1OP7GLPJrIVNc",
      "evmSignerAddress": "0xDf6b1cA313beE470D0142279791Fa760ABF5C537"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "_e3vAYq1ui3Ri0IMMYfXBBJpNE5Uh0f9a-kfwUgopBw",
      "evmSignerAddress": "0xa50abc5D76dAb99d5fe59FD32f239Bd37d55025f"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "_e3vAYq1ui3Ri0IMMYfXBBJpNE5Uh0f9a-kfwUgopBw",
      "evmSignerAddress": "0xa50abc5D76dAb99d5fe59FD32f239Bd37d55025f"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "_e3vAYq1ui3Ri0IMMYfXBBJpNE5Uh0f9a-kfwUgopBw",
      "evmSignerAddress": "0xa50abc5D76dAb99d5fe59FD32f239Bd37d55025f"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "dV92v1MZjhJiVEuqY86rtedfnVw4xGfimftlo9vqBbw",
      "evmSignerAddress": "0x496f4E8aC11076350A59b88D2ad62bc20d410EA3"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "dV92v1MZjhJiVEuqY86rtedfnVw4xGfimftlo9vqBbw",
      "evmSignerAddress": "0x496f4E8aC11076350A59b88D2ad62bc20d410EA3"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "dV92v1MZjhJiVEuqY86rtedfnVw4xGfimftlo9vqBbw",
      "evmSignerAddress": "0x496f4E8aC11076350A59b88D2ad62bc20d410EA3"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "WcjrFVhNe6s1eFboksinR0OqKe7FOvgmKrq9Thb32io",
      "evmSignerAddress": "0x41FB6b8d0f586E73d575bC57CFD29142B3214A47"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "WcjrFVhNe6s1eFboksinR0OqKe7FOvgmKrq9Thb32io",
      "evmSignerAddress": "0x41FB6b8d0f586E73d575bC57CFD29142B3214A47"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "WcjrFVhNe6s1eFboksinR0OqKe7FOvgmKrq9Thb32io",
      "evmSignerAddress": "0x41FB6b8d0f586E73d575bC57CFD29142B3214A47"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "adM0nPtmWHhbhuDFq1xz-b7ZFCQv_J38988HvxtsaYA",
      "evmSignerAddress": "0xC1068312a6333e6601f937c4773065B70D38A5bF"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "adM0nPtmWHhbhuDFq1xz-b7ZFCQv_J38988HvxtsaYA",
      "evmSignerAddress": "0xC1068312a6333e6601f937c4773065B70D38A5bF"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "adM0nPtmWHhbhuDFq1xz-b7ZFCQv_J38988HvxtsaYA",
      "evmSignerAddress": "0xC1068312a6333e6601f937c4773065B70D38A5bF"
    },
    {
      "type": "cache-layer",
      "url": "https://api.redstone.finance",
      "providerId": "3NyGT_mhEksAkGUSayKv0PKq7OL51c0RtPAh_dFOu08",
      "evmSignerAddress": "0xAE9D49Ea64DF38B9fcbC238bc7004a1421f7eeE8"
    },
    {
      "type": "cache-layer",
      "url": "https://vwx3eni8c7.eu-west-1.awsapprunner.com",
      "providerId": "3NyGT_mhEksAkGUSayKv0PKq7OL51c0RtPAh_dFOu08",
      "evmSignerAddress": "0xAE9D49Ea64DF38B9fcbC238bc7004a1421f7eeE8"
    },
    {
      "type": "cache-layer",
      "url": "https://container-service-1.dv9sai71f4rsq.eu-central-1.cs.amazonlightsail.com",
      "providerId": "3NyGT_mhEksAkGUSayKv0PKq7OL51c0RtPAh_dFOu08",
      "evmSignerAddress": "0xAE9D49Ea64DF38B9fcbC238bc7004a1421f7eeE8"
    },
  ],
};

export default config;
