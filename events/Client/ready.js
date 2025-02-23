const { Activity,WebhookClient } = require("discord.js");
const { readdir } = require("node:fs/promises");
const path = require("node:path");
const hook = new WebhookClient({ url: `${process.env.reloadHook}` });

module.exports = async (client) => {
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

    let statuses = ['truths', 'dares'];
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, { type: Activity.WATCHING });
    }, 10000);

    // Function to reload commands
    async function reloadCommands() {
        const commands = [];

        try {
            // Read the directories and reload all commands
            const directories = await readdir("slashCommands/", { withFileTypes: true });

            for (const dir of directories) {
                if (dir.isDirectory()) {
                    const files = await readdir(path.join("slashCommands", dir.name));

                    for (const cmd of files) {
                        try {
                            const cmdPath = path.resolve(__dirname, "../../slashCommands", dir.name, cmd);
                            delete require.cache[require.resolve(cmdPath)]; // Delete cache
                            client.slashCommands.delete(cmd); // Remove from the client's commands

                            // Require and add the command again
                            const pull = require(cmdPath);
                            client.slashCommands.set(cmd, pull);

                        } catch (error) {
                            console.error(`Error reloading command ${cmd}:`, error);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error reloading commands:", error);
        }
    }

    // Initial command reload when the bot starts
    await reloadCommands();
    client.logger.log("Commands reloaded on startup!", "ready");

    // Set an interval to reload the commands every hour (3600000 ms)
    setInterval(async () => {
        await reloadCommands();
        hook.send({ content: "Commands reloaded after 1 hour." });
        client.logger.log("Commands reloaded after 1 hour.", "ready");
    }, 3600000); // 1 hour = 3600000 milliseconds
};
