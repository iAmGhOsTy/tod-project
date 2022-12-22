const { MessageEmbed, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: `${process.env.shard_hook}` });
module.exports = async (client,id) => {
    
    client.logger.log(`Shard ${id} reconnecting...`, "shard");
    
    webhookClient.send({embeds:[new MessageEmbed()
        .setTitle(`Shard ${id} reconnecting...`)
        .setColor("BLACK")
        .setDescription(`\u200b`)],
         username: "Shard reconnecting",
          avatarURL: client.user.displayAvatarURL()})
    
}