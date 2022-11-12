const { Client, Collection, WebhookClient } = require("discord.js");
const webhookClient = new WebhookClient({ url: `${process.env.webhook_token}` });
const { readdirSync } = require("fs");
require('dotenv').config();


const client = new Client({


    intents: 1,//[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    // DEPRICATED
    // messageCacheMaxSize: 10,
    // messageCacheLifetime: 30 * 60,
    // messageSweepInterval: 5 * 60,
    //
    sweepers: {
        messages: {
            maximumSize: 200,
            interval: 2 * 100,
            lifetime: 5 * 100,
        },
        threads: {
            maximumSize: 100,
            interval: 5 * 100,
            lifetime: 5 * 100,
            keepOverLimit: (/* ... */) => { /* ... */ }
        }

    },
    partials: ["CHANNEL", "GUILD_MEMBER", "USER"]

});
module.exports = client;

//TOPGG INTEGRATION
const Topgg = require("@top-gg/sdk")
client.topgg = new Topgg.Api(process.env.topggtoken);

//client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.owner = client.config.ownerID;
//client.prefix = client.config.prefix;
client.embedColor = client.config.embedColor;
// client.aliases = new Collection();
//client.commands = new Collection();
client.categories = readdirSync("./slashCommands/");
client.logger = require("./utils/logger.js");
client.utils = require("./utils/convert.js")
// commands counting
client.commandsran = 0;

// HANDLER INITIATION
require("./handler/Client")(client);

// MEMORY SWEEPER
require("./handler/MemorySweeper")(client);

client.on('interactionCreate', interaction => {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} used ${interaction.commandName}.`);
});

client.on('rateLimit', data => webhookClient.send(`\`\`\`js\n
Timeout for: ${data.timeout}\n
Limit: ${data.limit}\n
Methods: ${data.method}\n
Path: ${data.path}\n
Route: ${data.route}\n
Global: ${data.global}\`\`\``)
)

client.login(process.env.DISCORD_TOKEN);


