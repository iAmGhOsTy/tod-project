const { EmbedBuilder, CommandInteraction, Client,ButtonBuilder,ActionRowBuilder } = require("discord.js")
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
        const dareBut = new ButtonBuilder().setCustomId("dare").setLabel("Dare").setStyle("Primary")
        const truthBut = new ButtonBuilder().setCustomId("truth").setLabel("Truth").setStyle("Secondary")
        const nhieBut = new ButtonBuilder().setCustomId("nhie").setLabel("Never Have I Ever").setStyle("Success")
        const row = new ActionRowBuilder().addComponents([dareBut,truthBut,nhieBut])
        const tembed = new EmbedBuilder()
        .setAuthor({ name: `YOU ASKED FOR IT!!`, iconURL: client.user.displayAvatarURL() })
        .setColor(client.embedColor)    
        .setDescription(`**${dares[Math.floor(Math.random() * dares.length)]}**`)
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
       const int =  interaction.followUp({embeds: [tembed], components: [row]});



        
    }
}