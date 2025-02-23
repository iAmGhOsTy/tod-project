const { EmbedBuilder, CommandInteraction, Client, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  name: "meme",
  description: "Gives a meme",

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });

    const memeButton = new ButtonBuilder()
      .setCustomId("meme")
      .setLabel("Meme")
      .setStyle("Success");

    const actionRow = new ActionRowBuilder().addComponents(memeButton);

    const tempEmbed = new EmbedBuilder()
      .setTitle("Searching for meme...")
      .setDescription("Hold tight, memes are coming your way... 🚀")
      .setColor(client.embedColor)
      .setFooter({ text: "Looking for the funniest meme..." });

    await interaction.followUp({
      embeds: [tempEmbed],
      components: [actionRow]
    });

    try {
      const res = await fetch('https://meme-api.com/gimme');
      const json = await res.json();

      const memeEmbed = new EmbedBuilder()
        .setTitle(json.title)
        .setImage(json.url)
        .setColor(client.embedColor)
        .setFooter({ text: `Upvotes: ${json.ups}` });

      await interaction.editReply({
        embeds: [memeEmbed],
        components: [actionRow]
      });

    } catch (err) {
      console.error("Error fetching meme:", err);
      await interaction.editReply({
        embeds: [new EmbedBuilder()
          .setTitle("Oops! Something went wrong.")
          .setColor('#FF0000')
          .setDescription("We couldn't fetch a meme at this time. Please try again later.")]
      });
    }
  }
};
