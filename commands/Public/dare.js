const { MessageEmbed } = require("discord.js");
const dares = require('../../raw/dares.json');
module.exports = {
    name: "dare",
    category: "Public",
    description: "Gives You A Truth Question",
    args: false,
    usage: "",
    aliases: [ "d" ],
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        const tembed = new MessageEmbed()
        .setAuthor("Complete the dare", client.user.displayAvatarURL())
        .setColor(client.embedColor)    
        .setDescription(`**${dares[Math.floor(Math.random() * dares.length)]}**`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send({embeds: [tembed]});
 }
}
