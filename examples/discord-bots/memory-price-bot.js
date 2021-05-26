const axios = require("axios");
const redstone = require("../../lib/index.js");
const { runSimpleDiscordBot } = require("./simple-discord-bot");

async function getCurrentARPricePerGB() {
  const response = await axios.get("https://arweave.dev/price/1073741824");
  return response.data * 0.000000000001;
}

runSimpleDiscordBot({
  titleGetter: async () => {
    const priceFeed = await redstone.getPrice("AR");
    const arPricePerGB = await getCurrentARPricePerGB();
    const usdPricePerGB = arPricePerGB * priceFeed.value;
    const usdPricePerGBFormatted = +usdPricePerGB.toFixed(2);
    return `$${usdPricePerGBFormatted} = 1 GB`;
  },
  botToken: process.env.BOT_TOKEN,
});
