
const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
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

        const tembed = new MessageEmbed()
        .setAuthor("Damn!", client.user.displayAvatarURL())
        .setColor(client.embedColor)    
        .setDescription(`**${wyr[Math.floor(Math.random() * wyr.length)]}**`)
        .setFooter(`Requested by ${interaction.member.user.username}`, interaction.member.displayAvatarURL())
        interaction.followUp({embeds: [tembed]});
        
    }
}