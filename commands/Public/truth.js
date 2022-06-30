const { MessageEmbed } = require("discord.js");
const truths = require('../../raw/truths.json');
module.exports = {
    name: "truth",
    category: "Public",
    description: "Gives You A Truth Question",
    args: false,
    usage: "",
    aliases: [ "t" ],
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        const tembed = new MessageEmbed()
        .setAuthor("Answer Truthfully!!!", client.user.displayAvatarURL())
        .setColor(client.embedColor)    
        .setDescription(`**${truths[Math.floor(Math.random() * truths.length)]}**`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send({embeds: [tembed]});
 }
}
