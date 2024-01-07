const { EmbedBuilder, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: `${process.env.shard_hook}` });
module.exports = async (client,error) => {
    client.logger.log(`Shard ${error.id} error: ${error.error}`, "shard");
    webhookClient.send({
        embeds:[new EmbedBuilder()
            .setTitle(`Shard ${error.id} error`)
            .setColor("BLACK")
            .setDescription(`error: ${error.error}`)],
             username: "Shard Error",
              avatarURL: client.user.displayAvatarURL()
    })
    
}