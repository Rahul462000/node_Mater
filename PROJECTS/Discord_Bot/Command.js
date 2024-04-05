const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping", // the use of this command is to check the connectivity
    description: "Replies with Pong!",
  },
  {
    name: "create", // the use of this command is to check the connectivity
    description: "Create a new short URL",
  },
];

const rest = new REST({ version: "10" }).setToken(
  "MTIyMzUyMjc5OTE5MzE2NTg3Ng.GIOkXW.7Dv32bbrCWeoY6hdyZayKLp30ZfpPm8CE5QF8I"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1223522799193165876"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
