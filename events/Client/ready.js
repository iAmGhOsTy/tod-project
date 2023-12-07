const {Activity} = require("discord.js");
module.exports = async (client) => {


    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");
    

    let statuses = ['truths', `dares`];
    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status, {type: Activity.WATCHING});
  	}, 10000)
    //   await client.shard.broadcastEval(client => [
    //     client.shard.ids,
    //     client.guilds.cache.size,
    //     client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount||0), 0),
    //     client.channels.cache.size,
    //     (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
    //     client.ws.ping,
    //     client.uptime,
    //     client.commandsran])
    //     .then(results => {
            
    //     })
    // setInterval(function() {
    //     client.channels.cache.get('941744653231882270').messages.fetch('1041346719406895174').then(message => {
    //         message.edit({ embeds: [new EmbedBuilder()
    //             .setDescription(`**${client.guilds.cache.size}** servers\n**${client.users.cache.size}** users`).setColor(client.embedColor).setAuthor({ name: `STATS`, iconURL: client.user.displayAvatarURL() })
    //             .setFooter({ text: `Requested by ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })] })
    //     })
    // },10000)
}