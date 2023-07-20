const { EmbedBuilder, CommandInteraction, Client, ButtonBuilder, ActionRowBuilder,ButtonStyle  } = require("discord.js")

module.exports = {
    name: "vote",
    description: "Gives The Voting Link",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
        const row = new ActionRowBuilder ()
        .addComponents(
          new ButtonBuilder()
          .setEmoji("<a:Snowflake:918072225192620052>")
          .setLabel("VOTE")
          .setStyle(ButtonStyle.Link)
          .setURL("https://top.gg/bot/977584064808767518/vote"),
        )
      const mainPage = new EmbedBuilder()
      .setAuthor({ name: `${client.user.name}`, iconURL: client.user.displayAvatarURL() })
      .setDescription('**Click below to vote me!<a:Tree:918072227025539092>**')
      .setColor(client.embedColor)
        await interaction.followUp({embeds: [mainPage], components: [row]});
    }
}