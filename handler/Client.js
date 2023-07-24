const { Client } = require("discord.js");
const { readdirSync } = require("fs");

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  /**
   * Error Handler
   */
  client.on("disconnect", () => console.log("Bot is disconnecting..."));
  client.on("reconnecting", () => console.log("Bot reconnecting..."));
  client.on("warn", (error) => console.log(error));
  client.on("error", (error) => console.log(error));
  process.on("unhandledRejection", (error) => console.log(error));
  process.on("uncaughtException", (error) => console.log(error));

  /**
   * Client Events
   */
  readdirSync("./events/Client/").forEach((file) => {
    const event = require(`../events/Client/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Events Client ${eventName}`, "event");
    client.on(eventName, event.bind(null, client));
  });

  /**
   * extra event handlers
   */
  // readdirSync("./events/more/").forEach(file => {
  //     const event = require(`../events/more/${file}`);
  //     let eventName = file.split(".")[0];
  //     client.logger.log(`Loading Events more ${eventName}`, "event");
  //     client.manager.on(eventName, event.bind(null, client));
  // });

  /**
   * Import all commands
   */
  // readdirSync("./commands/").forEach(dir => {
  //     const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
  //     for (const file of commandFiles) {
  //         const command = require(`../commands/${dir}/${file}`);
  //         client.logger.log(`Loading ${command.category} commands ${command.name}`, "cmd");
  //         client.commands.set(command.name, command);
  //     }
  // })

  /// slashCommands

  readdirSync("./slashCommands/").forEach((dir) => {
          const slashCommandFile = readdirSync(`./slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));

          for (const file of slashCommandFile) {
              const slashCommand = require(`../slashCommands/${dir}/${file}`);

              if(!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);

              if(!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);

              client.slashCommands.set(slashCommand.name, slashCommand);
              client.logger.log(`Client SlashCommands Command (/) Loaded: ${slashCommand.name}`, "cmd");
          }
      });

  client.on("ready", async () => {
    client.logger.log(`Client is ready`, "ready");
    
    
  });
};
