const { MessageEmbed, WebhookClient } = require('discord.js');
const config = require('../../config.json');
const moment = require('moment');

module.exports = async (client, guild) => {
  const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/977786723306180608/DGEpMKnZwLR9ddMxYSOh8k0ci_yzOTNE-QWbfBXRJu3ge5DKBQC94Uix7W4-F8oJnBny' });
  let own = await guild.fetchOwner()

  const promises = [
    client.shard.fetchClientValues('guilds.cache.size'),
  ];
  return Promise.all(promises)
  .then(results => {
    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
    const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`:outbox_tray: Left a Guild !!`)
    .addField('Name', `\`${guild.name}\``)
    .addField('ID', `\`${guild.id}\``)
    .addField('Owner', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``)
    .addField('Member Count', `\`${guild.memberCount}\` Members`)
    .addField('Creation Date', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
    .setColor("RED")
    .addField(`${client.user.username}'s Server Count`, `\`${totalGuilds}\` Severs`)
    .setTimestamp()
    webhookClient.send({embeds:[embed]})
  }
  )}	

