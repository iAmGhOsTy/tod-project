const { MessageEmbed, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: `${process.env.shard_hook}` });
module.exports = async (client,id, replayedEvents) => {
    client.logger.log(`Shard ${id} resumed with ${replayedEvents} replayed events`, "shard");
    webhookClient.send({embeds:[new MessageEmbed()
        .setTitle(`Shard ${id} resumed...`)
        .setColor("BLACK")
        .setDescription(`Resumed with ${replayedEvents} replayed events`)],
         username: "Shard Resumed",
          avatarURL: client.user.displayAvatarURL()})
}