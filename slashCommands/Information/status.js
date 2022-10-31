const { MessageEmbed, version, CommandInteraction, Client } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */

module.exports = {
    name: "status",
    description: "Show status of the bot",
    run: async (client, interaction) => {

        await interaction.deferReply({
            ephemeral: false
        });

        const promises = [
            client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.fetchClientValues('channels.cache.size'),
            client.shard.fetchClientValues('commandsran'),
            client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];

        return Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[3].reduce((acc, memberCount) => acc + memberCount, 0);
                const totalChannels = results[1].reduce((acc, channelcount) => acc + channelcount, 0);
                const totalcmdran = results[2].reduce((acc, cmdran) => acc + cmdran, 0);

                const embed = new MessageEmbed();
                embed.setColor(client.embedColor)
                    .setThumbnail(`https://cdn.discordapp.com/attachments/869853498093744163/937616714198315028/discord-loading.gif`)
                    .addFields(
                        { name: '**➥ Total Shards:**', value: `\`\`\`js\n[${client.shard.count}]\n\`\`\``, inline: true },
                        { name: `**➥ Ping**:`, value: `\`\`\`ini\n[${client.ws.ping}ms]\n\`\`\``, inline: true },
                        { name: "**➥ Servers:**", value: `\`\`\`js\n[${totalGuilds}]\n\`\`\``, inline: true },
                        { name: "**➥ Users:**", value: `\`\`\`js\n[${totalMembers}]\n\`\`\``, inline: true },
                        { name: "**➥ Channels:**", value: `\`\`\`js\n[${totalChannels}]\n\`\`\``, inline: true },
                        { name: "**➥ DiscordJS:**", value: `\`\`\`js\n[v${version}]\n\`\`\``, inline: true },
                        { name: "**➥ NodeJS:**", value: `\`\`\`js\n[${process.version}]\n\`\`\``, inline: true },
                        { name: '**➥ Platform**', value: `\`\`\`ini\n[${os.type}]\n\`\`\``, inline: true },
                        { name: '**➥ Commands Used**', value: `\`\`\`ini\n[${totalcmdran}]\n\`\`\``, inline: true },
                        { name: "**➥ Total Ram:**", value: `\`\`\`js\n[${(os.totalmem() / 1024 / 1024).toFixed(2)}MB]\n\`\`\``, inline: true },
                        { name: '**➥ Uptime:**', value: `\`\`\`js\n${moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}\n\`\`\`` }
                    )


                return interaction.followUp({ embeds: [embed] });
            })
            .catch(console.error);
    }

}


