const { EmbedBuilder, CommandInteraction, Client, ButtonBuilder, ButtonStyle , ActionRowBuilder } = require("discord.js")

module.exports = {
    name: "about",
    description: "Show ToD project information",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
        const row = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
    .setEmoji("<:excited:900459364568137748> ")
    .setLabel("Invite")
    .setStyle(ButtonStyle.Link)
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=977584064808767518&permissions=3427392&scope=applications.commands%20bot`),
			new ButtonBuilder()
    .setEmoji("<:git:900460439836721173> ")
    .setLabel("GitHub")
    .setStyle(ButtonStyle.Link)
    .setURL("https://github.com/iAmGhosty"),
    new ButtonBuilder()
    .setEmoji("<:staff:900459948398493747> ")
    .setLabel("Support")
    .setStyle(ButtonStyle.Link)
    .setURL("https://discord.gg/sb2TMUsJQH")
			);

      const mainPage = new EmbedBuilder()
      .setAuthor({ name: `${client.user.name}`, iconURL: client.user.displayAvatarURL() })
      .setThumbnail(client.user.displayAvatarURL())
            .setColor('#303236')
            .setDescription("Hello, I am <@977584064808767518>, providing you with fun truths, dares, nhie, wyr questions. Add me in your server to know more.")
            .addFields({name:'Creator',value: '[G H O S T Y](https://discord.com/users/798245188413816833) ', inline: true })
        await interaction.followUp({embeds: [mainPage], components: [row]});
    }
}
