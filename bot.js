const { Client, Collection, WebhookClient } = require("discord.js");
const webhookClient = new WebhookClient({ url: `${process.env.ratelimit_webhook_token}` });
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const { readdirSync } = require("fs");

require('dotenv').config();


const client = new Client({
    
    shards: getInfo().SHARD_LIST, // An array of shards that will get spawned
    shardCount: getInfo().TOTAL_SHARDS, // Total number of shards
    intents: 1,
            allowedMentions: {
                parse: ["everyone", "roles", "users"],
                repliedUser: true
            },
    sweepers: {
		messages: {
			maximumSize: 100,
			interval: 2*50,
			lifetime: 2*50,
		},
		threads: {
            maximumSize: 100,
			interval: 2*50,
            lifetime: 2*50,
			keepOverLimit: (/* ... */) => { /* ... */ }
		},
        users: {
			interval: 3600, // Every hour...
			filter: () => user => user.bot && user.id !== client.user.id, // Remove all bots.
		}

	},
    //presence: { activities: [{ name: "with discord.js", type: "PLAYING" }], status: "online" },
    
    //partials: [Partials.Channel, Partials.GuildMember, Partials.User]

});
module.exports = client;

//TOPGG INTEGRATION
const Topgg = require("@top-gg/sdk")
client.topgg = new Topgg.Api(process.env.topggtoken);


client.slashCommands = new Collection();
client.config = require("./config.json");
client.owner = client.config.ownerID;
client.embedColor = client.config.embedColor;
client.categories = readdirSync("./slashCommands/");
client.logger = require("./utils/logger.js");
client.utils = require("./utils/convert.js")
// commands counting
client.commandsran = 0;

// HANDLER INITIATION
require("./handler/Client")(client);


// client.on('interactionCreate', interaction => {
// 	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
// });

client.rest.on('rateLimit', data => webhookClient.send({ content: `\`\`\`js\n
Timeout for: ${data.timeout}\n
Limit: ${data.limit}\n
Methods: ${data.method}\n
Path: ${data.path}\n
Route: ${data.route}\n
Global: ${data.global}\`\`\``, username: `${interaction.client.username}`, avatarURL: `${interaction.client.avatarURL()}` })
              )

client.cluster = new ClusterClient(client);
client.login(process.env.DISCORD_TOKEN);


