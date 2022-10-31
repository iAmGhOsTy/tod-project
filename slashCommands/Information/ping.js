const { MessageEmbed, CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "ping",
  description: "return websocket ping",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    await interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setAuthor(`Pong`, client.user.displayAvatarURL({ dynamic: true }))
          .setColor(client.embedColor)
          .setFooter(
            `Requested by ${interaction.member.user.username}`,
            interaction.member.user.displayAvatarURL({ dynamic: true })
          )
          .addFields([
            {
              name: "API Latency",
              value: `\`\`\`ini\n[ ${client.ws.ping}ms ]\n\`\`\``,
              inline: true,
            },
          ])
          .setTimestamp(),
      ],
    });
  },
};
