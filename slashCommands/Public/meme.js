const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const fetch = require('node-fetch')

module.exports = {
    name: "meme",
    description: "Gives a meme",
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
        fetch('http://194.60.87.120:4076/memes')
        .then(res => res.json())
        .then(json => {
          interaction.followUp({
            embeds:[new MessageEmbed()
            .setTitle(json.memes.title)
            .setImage(json.memes.url)]
            .setfooter(`Upvotes: ${json.memes.upvotes}`)
          })
        });
        // const eb = new MessageEmbed()
        // .setAuthor("Answer Truthfully!!!", client.user.displayAvatarURL())
        // .setColor(client.embedColor)    
        // .setDescription(`**${truths[Math.floor(Math.random() * truths.length)]}**`)
        // .setFooter(`Requested by ${interaction.member.user.username}`, interaction.member.displayAvatarURL())
        // interaction.followUp({embeds: [tembed]});
        
    }
}