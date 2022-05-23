const { MessageEmbed } = require("discord.js");
const wyr = require('../../raw/wyr.json');
module.exports = {
    name: "wouldyourather",
    category: "Public",
    description: "Gives You A Truth Question",
    args: false,
    usage: "",
    aliases: [ "wyr" ],
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        const tembed = new MessageEmbed()
        .setAuthor("Damn!!", client.user.displayAvatarURL())
        .setColor(client.embedColor)    
        .setDescription(`**${wyr[Math.floor(Math.random() * wyr.length)]}**`)
        .setFooter(`requested by ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send({embeds: [tembed]});
 }
}
