const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
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
        const x = new MessageEmbed()
        .setTitle(`**Shard Info**`)
        .addField('Shard ID', `\`\`\`yml\n${interaction.guild.shard.id}`+ `/` + `${client.shard.count}\`\`\``, false)
        .addField('Guild ID', `\`\`\`yml\n${interaction.guildId}\`\`\``, false)
        .setDescription(`Last restart: <t:${duration1}:R>`)
        .setColor(client.config.embedColor)
        .setFooter({text: `This server is in shard#${interaction.guild.shardId}`})

            interaction.followUp({ embeds: [x] });

       
    }
    
}