const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const truths = require('../../raw/truths.json');

module.exports = {
    name: "truth",
    description: "Gives a truth question",
  //  voteonly: true,

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
        .setAuthor("Answer Truthfully!!!", client.user.displayAvatarURL())
        .setColor(client.embedColor)    
        .setDescription(`**${truths[Math.floor(Math.random() * truths.length)]}**`)
        .setFooter(`Requested by ${interaction.member.user.username}`, interaction.member.displayAvatarURL())
        interaction.followUp({embeds: [tembed]});
        
    }
}