const {SnowflakeUtil,MessageEmbed,WebhookClient} = require('discord.js');
const {formatBytes} = require('../utils/convert.js');
const memoryLogger = new WebhookClient({
    url: process.env.memoryLogger
})

module.exports = async (client) => {
    setInterval(function () {
        const THRESHOLD = 1000 * 60 * 30;
        const OLD_SNOWFLAKE = SnowflakeUtil.generate(Date.now() - THRESHOLD);
            guildMembers = 0,
            lastMessages = 0,
            emojis = 0,
            voiceStates = 0,
            users = 0;

        let oldMemoryUsage = process.memoryUsage().heapUsed;

        for (const guild of client.guilds.cache.values()) {
            if (!guild.available)
                continue;

            for (const [id, member] of guild.members.cache) {
                if (member.id === client.user.id)
                    continue;
                if (member.voice.channelId && member.user.bot)
                    guild.voiceStates.cache.delete(id);
                if (member.lastMessageId && member.lastMessageId > OLD_SNOWFLAKE)
                    guild.members.cache.delete(id);
                guildMembers++;
                voiceStates++;
            }

            if (guild.id !== '911685816328269894') {
                emojis += guild.emojis.cache.size;
                guild.emojis.cache.clear();
            }
        }

        for (const channel of client.channels.cache.values()) {
            if (!channel.lastMessageId)
                continue;
            channel.lastMessageId = null;
            lastMessages++;
        }

        for (const user of client.users.cache.values()) {
            if (user.lastMessageId && user.lastMessageId > OLD_SNOWFLAKE)
                continue;
            client.users.cache.delete(user.id);
            users++;
        }

        const embed = new MessageEmbed()
            .setTitle(`Shard ${client.shard.ids} | Memory Sweeper`)
            .setColor(client.embedColor)
            .setDescription(`**Cache sweeped:**\n` +
                `Guild Members: \`${guildMembers}\`\n` +
                `Users: \`${users}\`\n` +
                `Emojis: \`${emojis}\`\n` +
                `Voice States: \`${voiceStates}\`\n` +
                `Messages: \`${lastMessages}\``)
            .addField('Memory Sweeped:', `\`${formatBytes(process.memoryUsage().heapUsed - oldMemoryUsage)}\``, true)
            .addField('Memory Usage:', `\`${formatBytes(process.memoryUsage().heapUsed)}\``, true);

        memoryLogger.send({
            embeds: [embed]
        }).catch(() => null);
    }, 60000 * 1)
}