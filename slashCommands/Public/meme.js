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
        fetch('http://dono-03.danbot.host:2176/memes',{
          method: 'GET',
          headers: {
            "x-api-key": "AbCd"
          }
        })
        .then(res => res.json())
        .then(json => {
          interaction.followUp({
            embeds:[new EmbedBuilder()
            .setTitle(json.memes.title)
            .setImage(json.memes.url)
            .setColor(client.embedColor)
            .setFooter({text:"Upvotes: " + json.memes.upvotes})]
          })
        });       
    }
}