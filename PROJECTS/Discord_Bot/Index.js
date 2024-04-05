// 1. we need to login as bot

const { Client, GatewayIntentBits } = require("discord.js");
// a virtual client with which we can contact with our bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// setting up the listener
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
      content: "genrating shortID for " + url,
    });
  }
  message.reply({
    content: "Hi from BOT",
  });
  //   console.log(message.content);
  //   console.log(message);
});

//another listner
client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("Pong!!");
});

client.login(
  "MTIyMzUyMjc5OTE5MzE2NTg3Ng.GIOkXW.7Dv32bbrCWeoY6hdyZayKLp30ZfpPm8CE5QF8I"
);
