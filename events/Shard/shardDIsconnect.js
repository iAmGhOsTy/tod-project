const { MessageEmbed, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: `${process.env.shard_hook}` });
module.exports = async (client,event,id) => {
    client.logger.log(`Shard ${id} disconnected (${event.code})`, "shard");
    webhookClient.send({embeds:[new MessageEmbed()
        .setTitle(`Shard ${id} disconnected`)
        .setColor("BLACK")
        .setDescription(`(${event.code})`)],
         username: "Shard Disconnected",
          avatarURL: client.user.displayAvatarURL()})

    
}