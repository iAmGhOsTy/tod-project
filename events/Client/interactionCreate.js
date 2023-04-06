const { MessageEmbed, Client, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, interaction) => {
  const prefix = client.prefix;

  if (interaction.isButton()) {
    if (interaction.customId === 'DELETE_BUT' && interaction.user.id === client.owner) {
      interaction.message.delete();
    } else {
      await interaction.reply({
        embeds: [new MessageEmbed().setDescription("Can't Use This Man!").setColor("RED")],
        ephemeral: true
      });
    }
  } else if (interaction.isCommand()) {
    const SlashCommands = client.slashCommands.get(interaction.commandName);
    if (!SlashCommands) return;

    if (SlashCommands.owner && interaction.author.id !== client.owner) {
      await interaction.reply({
        content: `Only <@${client.owner}> can use this command!`
      }).catch(console.error);
    } else if (SlashCommands.voteonly && interaction.user.id !== client.owner) {
      const vote = await client.topgg.hasVoted(interaction.user.id);
      if (!vote) {
        const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setEmoji("<a:Snowflake:918072225192620052>")
              .setLabel("VOTE")
              .setStyle("LINK")
              .setURL("https://top.gg/bot/977584064808767518/vote")
          );
        await interaction.reply({
          embeds: [new MessageEmbed().setDescription("**Vote Me To Use This Command** ").setColor(client.config.embedColor)],
          components: [row]
        });
        return;
      }
    }

    try {
      client.commandsran++;
      await SlashCommands.run(client, interaction, prefix);
    } catch (error) {
      console.error(error);
      if (interaction.replied) {
        await interaction.editReply({
          content: `An unexpected error occurred.`
        }).catch(console.error);
      } else {
        await interaction.followUp({
          ephemeral: true,
          content: `An unexpected error occurred.`
        }).catch(console.error);
      }
    }

    const embed2 = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`Enjoying the bot, [Consider upvoting me](https://top.gg/bot/889026555454582804/vote)\nIf you have suggestions, join the [Support Server](https://discord.gg/sb2TMUsJQH)`);

    if (Math.random() > 0.7) {
      interaction.channel.send({ embeds: [embed2] }).catch(console.error);
    }
  }
};
