const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: "shard-dev",
    category: "Owner",
    description: "check shard info",
    args: false,
    aliases: [ "shards" ],
    usage: ``,
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
        client.shard.broadcastEval(client => [
            client.shard.ids,
            client.guilds.cache.size,
            client.channels.cache.size,
            client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0),
            (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
            client.ws.ping,
            client.uptime])
        .then((results) =>{
            const embed = new MessageEmbed()
                .setDescription(`This server is in shard#${message.guild.shardId}`)
                .setTitle(`👨‍💻 Total Shards (${client.shard.count})`)
                .setColor(client.embedColor)
                .setTimestamp();
            
            results.map((data) => {
                embed.addField(`
 __Shard#__ ${data[0]}`,
 `\`\`\`js\n
Servers: ${data[1]}
Channels: ${data[2]}
Users: ${data[3]}
RAM: ${data[4]}MB
Ping: ${data[5]}ms
Uptime ${moment.duration(data[6]).format(" D [days], H [hrs], m [mins], s [secs]")}\n\`\`\``, true)

            });

            message.channel.send({ embeds: [embed] });
 
           
        })
        .catch((error) => {
            console.error(error);
            message.reply(`${error}`);
        });
    }
}