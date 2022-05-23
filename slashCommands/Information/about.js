const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "about",
    description: "Show Dreamer project information",

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
    .setEmoji("<:excited:900459364568137748> ")
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=977584064808767518&permissions=3427392&scope=applications.commands%20bot`),
			new MessageButton()
    .setEmoji("<:git:900460439836721173> ")
    .setLabel("GitHub")
    .setStyle("LINK")
    .setURL("https://github.com/iAmGhosty"),
    new MessageButton()
    .setEmoji("<:staff:900459948398493747> ")
    .setLabel("Support")
    .setStyle("LINK")
    .setURL("https://discord.gg/sb2TMUsJQH")
			);

      const mainPage = new MessageEmbed()
      .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(client.user.displayAvatarURL())
            .setColor('#303236')
            .setDescription("Hello, I am <@977584064808767518>, providing you with fun truths, dares, nhie, wyr questions. Add me in your server to know more.")
            .addField('Creator', '[G H O S T Y](https://discord.com/users/798245188413816833) ', true)
        await interaction.followUp({embeds: [mainPage], components: [row]});
    }
}
