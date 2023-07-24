const { EmbedBuilder, inlineCode } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: "shard-dev",
    category: "Owner",
    description: "shard stats",
    permission: [],
 /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client,interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });

        if (!client.owner.includes(interaction.member.id)) {
            return interaction.editReply({content:"not for you :)", ephemeral:true});
            };
            let i=0, ser=0, mem=0, ch=0, ram=0, ping=0, cran=0;
            await client.cluster.broadcastEval(client => [
                client.cluster.id,
                client.guilds.cache.size,
                client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount||0), 0),
                client.channels.cache.size,
                (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
                client.ws.ping,
                client.uptime,
                client.commandsran,
                [...client.cluster.ids.keys()]])          
                .then(results => {
                    const em = new EmbedBuilder()
                    .setColor("#2F3136")    
                    .setDescription(`This server is currently on **Shard ${interaction.guild.shardId}** Of **Cluster ${client.cluster.id}**`)
                    results.map((data) => {
                      i += 1, ser += data[1], mem += data[2], ch += data[3], ram += parseInt(data[4]), ping += data[6], cran += data[7];
                
                    em.addFields({name:`<:green:869855270883438613> Cluster ${data[0]}`+`${data[0] === client.cluster.id ? `*` : ` `}`,value: `\`\`\`js\nShards: ${data[8]}\nServers: ${data[1]}\nUsers: ${data[2]}\nChannels: ${data[3]}\nTotal Commands Ran: ${data[7]}\nRam: ${data[4]}mb\nPing: ${data[5]}ms\nUptime: ${moment.duration(data[6]).format("D[d] H[h] m[m] s[s]")}\`\`\``,inline: true})
                    });
                    
                    em.addFields({name:`Total Stats`, value:`\`\`\`js\nTotal Shards:${client.cluster.info.TOTAL_SHARDS}\nTotal Servers: ${ser}\nTotal Users: ${mem}\nTotal Channels: ${ch}\nTotal Ram: ${ram}mb\nTotal cmds ran: ${cran}\`\`\``})
                    interaction.followUp({embeds: [em]})
                    })  
   }
}