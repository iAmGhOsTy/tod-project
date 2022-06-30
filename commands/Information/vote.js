const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "vote",
    category: "Information",
    description: "Gives the voting link",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

      const embed = new MessageEmbed()
      .setDescription('**Click below to vote me!<a:Tree:918072227025539092>**')
      .setColor("BLUE")
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setEmoji("<a:Snowflake:918072225192620052>")
        .setLabel("VOTE")
        .setStyle("LINK")
        .setURL("https://top.gg/bot/977584064808767518/vote"),
      )
    message.channel.send({embeds: [embed], components: [row]});
  }
};
