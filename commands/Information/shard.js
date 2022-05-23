const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: "shard",
    category: "Owner",
    description: "check shard info",
    args: false,
    aliases: [ "shards" ],
    usage: ``,
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        const duration1 = Math.round((Date.now() - message.client.uptime)/1000);
        const x = new MessageEmbed()
        .setTitle(`**Shard Info**`)
        .addField('Shard ID', `\`\`\`yml\n${message.guild.shard.id}`+ `/` + `${client.shard.count}\`\`\``, false)
        .addField('Guild ID', `\`\`\`yml\n${message.guildId}\`\`\``, false)
        .setDescription(`Last restart: <t:${duration1}:R>`)
        .setColor(client.config.embedColor)
        .setFooter({text: `This server is in shard#${message.guild.shardId}`})
        message.channel.send({embeds:[x]})
            
 
    }
}