const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
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

        const tembed = new MessageEmbed()
        .setAuthor("YOU ASKED FOR IT!", client.user.displayAvatarURL())
        .setColor(client.embedColor)    
        .setDescription(`**${dares[Math.floor(Math.random() * dares.length)]}**`)
        .setFooter(`Requested by ${interaction.member.user.username}`, interaction.member.displayAvatarURL())
        interaction.followUp({embeds: [tembed]});
        
    }
}