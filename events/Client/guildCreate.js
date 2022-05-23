const { MessageEmbed, WebhookClient } = require('discord.js');
const config = require('../../config.json');
const moment = require('moment');

module.exports = async (client, guild) => {
  
  const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/977786726862966825/9yieZCX-RVLtWTlZgxb5NRybGHFj45gEf38yFu92sJOfEfmCfH_43RpsVU7rr__8TgAD' });
  const channel = client.channels.cache.get(config.logs);
  let own = await guild.fetchOwner()

  const promises = [
    client.shard.fetchClientValues('guilds.cache.size'),
  ];
  return Promise.all(promises)
  .then(results => {
    
    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
    const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📥 Joined a Guild !!`)
    .addField('Name', `\`${guild.name}\``)
    .addField('ID', `\`${guild.id}\``)
    .addField('Owner', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``)
    .addField('Member Count', `\`${guild.memberCount}\` Members`)
    .addField('Creation Date', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
    .setColor("GREEN")
    .addField(`${client.user.username}'s Server Count`, `\`${totalGuilds}\` Severs`)
    .setTimestamp()
    webhookClient.send({embeds:[embed]})
  }
  )}	

