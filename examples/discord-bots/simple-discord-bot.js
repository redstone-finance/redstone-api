// Format logs
require("console-stamp")(console, "[HH:MM:ss.l]");
const Discord = require("discord.js");

function runSimpleDiscordBot({ titleGetter, botToken, interval = 5000 }) {
  if (!botToken) {
    throw new Error("Bot token is required to run discord bot");
  }

  const Client = new Discord.Client();

  Client.on("ready", () => {
    // Setting subtitle (as an activity)
    Client.user.setActivity("Redstone", {
      type: "LISTENING",
    });

    setInterval(async () => {
      try {
        const title = await titleGetter();

        console.log(`Updating title: ${title}`);

        // Displaying title (as a nickname)
        Client.guilds.cache.forEach((guild) => {
          guild.me.setNickname(title);
        });
      } catch (err) {
        console.log("Error fetching title for discord bot:");
        console.log(err);
      }
    }, interval);
  });

  Client.login(botToken);
}

module.exports = { runSimpleDiscordBot };
