const { EmbedBuilder,ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "reload",
    category: "Owner",
    description: "Reloads The Command",
    options:[{
        name: "cmdname",
        description: "type cmd name",
        type: ApplicationCommandOptionType.String,
        required: true,
    }],
    permission: [],
 /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client,interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
     const toreload = interaction.options.getString("cmdname");
  if (!"798245188413816833".includes(interaction.member.id)) {
     return;
  };

      let reload = false;
      for (let i = 0; i < client.categories.length; i += 1) {
        let dir = client.categories[i];
        try {
          delete require.cache[require.resolve(`../../slashCommands/${dir}/${toreload}.js`)] // 
          client.slashCommands.delete(toreload)
          const pull = require(`../../slashCommands/${dir}/${toreload}.js`)
          client.slashCommands.set(toreload, pull)
          reload = true;
        } catch {}
      }
      if (reload) {
        const op = new EmbedBuilder()
        .setColor("#2F3136")
        .setDescription(` Reloaded \`**${toreload}**\``)
        return interaction.followUp({embeds: [op]})
      }
      const notop = new EmbedBuilder()
      .setColor("#ff0000")
      .setDescription(`error in reloading: \`${toreload}\``)
      return interaction.followUp({embeds: [notop]});
   }
}