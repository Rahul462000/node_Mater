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

// here the secret key command is present

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
