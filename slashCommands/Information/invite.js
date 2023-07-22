const { EmbedBuilder, CommandInteraction, Client, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "invite",
    description: "get my invite link",

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
.setLabel("Invite")
.setEmoji("<:excited:900459364568137748>")
.setStyle(ButtonStyle.Link)
.setURL(`https://discord.com/api/oauth2/authorize?client_id=977584064808767518&permissions=378944&scope=applications.commands%20bot`),
        new ButtonBuilder()
.setLabel("GitHub")
.setEmoji("<:git:900460439836721173>")
.setStyle(ButtonStyle.Link)
.setURL("https://github.com/iAmGhosty"),
new ButtonBuilder()
.setLabel("Support")
.setEmoji(" <a:woah:900763205503180811>")
.setStyle(ButtonStyle.Link)
.setURL("https://discord.gg/sb2TMUsJQH")
        );

          const mainPage = new EmbedBuilder()
          .setAuthor({ name: `${client.user.name}`, iconURL: client.user.displayAvatarURL() })
          .setThumbnail(client.user.displayAvatarURL())
             .setColor('#303236')
            .addFields({name:'invite me',value: `[Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=378944&scope=applications.commands%20bot)`, inline:true})
           await interaction.followUp({embeds: [mainPage], components: [row]})
    }
}

