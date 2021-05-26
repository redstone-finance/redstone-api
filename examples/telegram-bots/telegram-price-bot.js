const { Telegraf } = require("telegraf");
const Markup = require("telegraf/markup");
const Redstone = require("@redstonefi/api");

const bot = new Telegraf("YOUR TELEGRAM BOT TOKEN");

// initialize keyboard command list with the /start command
bot.command("start", ({ reply }) => {
  return reply("Hello Arweaver!", Markup
    .keyboard([
      ["📈 AR Price 📉"],
    ])
    .oneTime()
    .resize()
    .extra()
  )
})


// price command
bot.hears("📈 AR Price 📉" , async(ctx) => {

  const fetch = await Redstone.getPrice("AR");

  let update = new Date - Date.parse(fetch["updated"]); //last update timestamp
  let price = fetch["price"];

  let message = (`<a href="https://www.coingecko.com/en/coins/arweave#markets/">AR/USDT</a>` +
                 `\n\nprice: $ ${price} ` +
                 `\nLast update: ${Math.round(update / 1000 / 60)} min ago` +
                 `\n\n<i>Data provided by <a href="https://redstone.finance">redstone</a></i>`
                );

  ctx.replyWithHTML(message, {disable_web_page_preview: true});
});


// custom auto-reply on any sticker
bot.on("sticker", (ctx) => ctx.reply("i like stickers!"));


bot.launch();
