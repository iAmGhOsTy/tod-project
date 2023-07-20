const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")
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

        const tembed = new EmbedBuilder()
        .setAuthor({ name: `ANSWER TRUTHFULLY`, iconURL: client.user.displayAvatarURL() })
        .setColor(client.embedColor)    
        .setDescription(`**${truths[Math.floor(Math.random() * truths.length)]}**`)
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        interaction.followUp({embeds: [tembed]});
        
    }
}