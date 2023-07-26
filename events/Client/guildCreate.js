const { EmbedBuilder, WebhookClient } = require('discord.js');
const moment = require('moment');

module.exports = async (client, guild) => {
  
  const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/977786726862966825/9yieZCX-RVLtWTlZgxb5NRybGHFj45gEf38yFu92sJOfEfmCfH_43RpsVU7rr__8TgAD' });
  let own = await guild.fetchOwner()

  const promises = [
    client.cluster.fetchClientValues('guilds.cache.size'),
    client.cluster.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
  ];
  return Promise.all(promises)
  .then(results => {
    
    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
    const totalusers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
    const embed = new EmbedBuilder()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📥 Joined a Guild !!`)
    .addFields({name:'Name',value: `\`${guild.name}\``})
    .addFields({name:'ID',value: `\`${guild.id}\``})
    .addFields({name:'Owner', value:`\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``})
    .addFields({name:'Member Count',value: `\`${guild.memberCount}\` Members`})
    .addFields({name:'Creation Date',value: `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``})
    .setColor(5763719)
    .addFields({name:`${client.user.username}'s Server Count`,value: `\`${totalGuilds}\` Severs`})
    .addFields({name:`${client.user.username}'s User Count`,value: `\`${totalusers}\` Users`})
    .setTimestamp()
    webhookClient.send({embeds:[embed], username: client.user.username, avatarURL: client.user.displayAvatarURL()})
  }
  )}	

