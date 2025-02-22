const { Activity } = require("discord.js");
const { readdir } = require("node:fs/promises");
const path = require("node:path");

module.exports = async (client) => {
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

    let statuses = ['truths', 'dares'];
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, { type: Activity.WATCHING });
    }, 10000);

    async function reloadCommands() {
        const commands = [];

        try {
            const directories = await readdir("slashCommands/", { withFileTypes: true });

            for (const dir of directories) {
                if (dir.isDirectory()) {
                    const files = await readdir(path.join("slashCommands", dir.name));

                    for (const cmd of files) {
                        try {
                            const cmdPath = path.resolve(__dirname, "../../slashCommands", dir.name, cmd);
                            delete require.cache[require.resolve(cmdPath)]; 
                            client.slashCommands.delete(cmd); s

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

    await reloadCommands();
    client.logger.log("Commands reloaded on startup!", "ready");
 
    setInterval(async () => {
        await reloadCommands();
        client.logger.log("Commands reloaded after 1 hour.", "ready");
    }, 3600000);
};
