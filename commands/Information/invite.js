
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Information",
    aliases: [ "addme" ],
    description: "invite me",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {
         
         
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("Invite")
    .setEmoji("<:excited:900459364568137748>")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=977584064808767518&permissions=378944&scope=applications.commands%20bot`),
			new MessageButton()
    .setLabel("GitHub")
    .setEmoji("<:git:900460439836721173>")
    .setStyle("LINK")
    .setURL("https://github.com/iAmGhosty"),
    new MessageButton()
    .setLabel("Support")
    .setEmoji(" <a:woah:900763205503180811>")
    .setStyle("LINK")
    .setURL("https://discord.gg/sb2TMUsJQH")
			);

          const mainPage = new MessageEmbed()
            .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.user.displayAvatarURL())
             .setColor('#303236')
            .addField('invite me ', `[Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=378944&scope=applications.commands%20bot)`, true)
           message.channel.send({embeds: [mainPage], components: [row]})
    }
}
