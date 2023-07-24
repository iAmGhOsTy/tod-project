const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")
const dares = require('../../raw/dares.json');

module.exports = {
    name: "dare",
    description: "Gives a dare",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });

        const tembed = new EmbedBuilder()
        .setAuthor({ name: `YOU ASKED FOR IT!!`, iconURL: client.user.displayAvatarURL() })
        .setColor(client.embedColor)    
        .setDescription(`**${dares[Math.floor(Math.random() * dares.length)]}**`)
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        interaction.followUp({embeds: [tembed]});
        
    }
}