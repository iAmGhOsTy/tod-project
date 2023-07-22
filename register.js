// This file allows you to register slash commands, it must be launched each time you add a new (/) command

const { REST, Routes } = require('discord.js');
const { readdirSync } = require('node:fs');
const path = require('node:path');
require("dotenv").config()

const commands = []
readdirSync("slashCommands/").map(async dir => {
	readdirSync(`slashCommands/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `slashCommands/${dir}/${cmd}`)))
    })
})

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log('[Discord API] Started refreshing application (/) commands.');
		await rest.put(
            // GUILD SLASH COMMANDS (will deploy only in the server you put the ID of)
			// Routes.applicationGuildCommands(config.botID, 'ID_OF_THE_GUILD'),

            // GLOBAL SLASH COMMANDS
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);
		console.log('[Discord API] Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();