const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

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
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setEmoji("<a:Snowflake:918072225192620052>")
          .setLabel("VOTE")
          .setStyle("LINK")
          .setURL("https://top.gg/bot/889026555454582804/vote"),
        )
      const mainPage = new MessageEmbed()
      .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
      .setDescription('**Click below to vote me!<a:Tree:918072227025539092>**')
      .setColor("BLUE")
        await interaction.followUp({embeds: [mainPage], components: [row]});
    }
}