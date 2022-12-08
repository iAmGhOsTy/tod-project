const { MessageEmbed, WebhookClient } = require('discord.js');
const config = require('../../config.json');
const moment = require('moment');

module.exports = async (client, guild) => {
  const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1041029301245595739/FHNQHEIpJBd2ao28VTbKWFlmg40GPLRrdEWDz5Jqm1lh0aopYbiP4D-WtKAyJuqICjbQ' });
  let own = await guild.fetchOwner()

  const promises = [
    client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
  ];
  return Promise.all(promises)
  .then(results => {
    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
    const totalusers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
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
    .addField(`${client.user.username}'s User Count`, `\`${totalusers}\` Users`)
    .setTimestamp()
    webhookClient.send({embeds:[embed], username: client.user.username, avatarURL: client.user.displayAvatarURL()})
  }
  )}	

