const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")
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
        fetch('https://meme-api.com/gimme',{
          method: 'GET',
          // headers: {
          //   "x-api-key": "AbCd"
          // }
        })
        .then(res => res.json())
        .then(json => {
          
          interaction.followUp({
            embeds:[new EmbedBuilder()
            .setTitle(json.title)
            .setImage(json.url)
            .setColor(client.embedColor)
            .setFooter({text:"Upvotes: " + json.ups})]
          })
        });       
    }
}