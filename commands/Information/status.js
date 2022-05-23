const { MessageEmbed, version } = require("discord.js");
const os = require('os')
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "status",
    category: "Information",
    description: "Shows information about the working of bot",
    aliases: [ "stats" ],
    args: false,
    usage: "",

    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
		const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.fetchClientValues('channels.cache.size'),
			client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
		];

		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[2].reduce((acc, memberCount) => acc + memberCount, 0);
                const totalChannels = results[1].reduce((acc, channelcount) => acc + channelcount,0);

                const embed = new MessageEmbed();
                embed.setColor(message.client.embedColor)
                .setThumbnail(`https://cdn.discordapp.com/attachments/869853498093744163/937616714198315028/discord-loading.gif`)
                .addFields(
                    {name: '**➥ Total Shards:**', value: `\`\`\`js\n[${client.shard.count}]\n\`\`\``, inline: false},
                    {name: `**➥ Ping**:`, value: `\`\`\`ini\n[${client.ws.ping}ms]\n\`\`\`` , inline: false },
                    {name: "**➥ Servers:**", value: `\`\`\`js\n[${totalGuilds}]\n\`\`\`` , inline: false },
                    {name: "**➥ Users:**", value:  `\`\`\`js\n[${totalMembers}]\n\`\`\`` , inline: false},
                    {name: "**➥ Channels:**", value:  `\`\`\`js\n[${totalChannels}]\n\`\`\`` , inline: false },
                    {name: "**➥ DiscordJS:**", value:  `\`\`\`js\n[v${version}]\n\`\`\`` , inline: false },
                    {name: "**➥ NodeJS:**", value:  `\`\`\`js\n[${process.version}]\n\`\`\`` , inline: false },
                    {name: '**➥ Platform**', value:  `\`\`\`ini\n[${os.type}]\n\`\`\``, inline: false},
                    {name: "**➥ Total Ram:**", value:  `\`\`\`js\n[${(os.totalmem() / 1024 / 1024).toFixed(2)}MB]\n\`\`\`` , inline: false },
                    {name: '**➥ Uptime:**', value:`\`\`\`js\n${moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}\n\`\`\``}
                )
                
                
				return message.channel.send({embeds: [embed]});
			})
			.catch(console.error);
  }
};
