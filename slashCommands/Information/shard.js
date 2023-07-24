const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: "shard",
    description: "Shows Shard Stats",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
        const duration1 = Math.round((Date.now() - client.uptime)/1000);
        const x = new EmbedBuilder()
        .setTitle(`**Shard Info**`)
        .addFields({name:'Shard ID', value:`\`\`\`yml\n${interaction.guild.shard.id}`+ `/` + `${client.cluster.info.TOTAL_SHARDS}\`\`\``,inline: false})
        .addFields({name:'Guild ID',value: `\`\`\`yml\n${interaction.guildId}\`\`\``, inline:false})
        .setDescription(`Last restart: <t:${duration1}:R>`)
        .setColor(client.config.embedColor)
        .setFooter({text: `This server is in shard#${interaction.guild.shardId}`})

            interaction.followUp({ embeds: [x] });

       
    }
    
}