
const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")
const wyr = require('../../raw/wyr.json');

module.exports = {
    name: "wyr",
    description: "Gives a wyr question",

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
        .setAuthor({ name: `Damn!`, iconURL: client.user.displayAvatarURL() })
        .setColor(client.embedColor)    
        .setDescription(`**${wyr[Math.floor(Math.random() * wyr.length)]}**`)
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        interaction.followUp({embeds: [tembed]});
        
    }
}