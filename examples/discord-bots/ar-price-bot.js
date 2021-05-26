const redstone = require("../../lib/index.js");
const { runSimpleDiscordBot } = require("./simple-discord-bot");

runSimpleDiscordBot({
  titleGetter: async () => {
    const priceFeed = await redstone.getPrice("AR");
    return `$${priceFeed.value.toFixed(2)} = 1 AR`;
  },
  botToken: process.env.BOT_TOKEN,
});
