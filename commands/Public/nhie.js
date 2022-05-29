const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "neverhaveiever",
    category: "Public",
    description: "Gives You A Truth Question",
    args: false,
    usage: "",
    aliases: [ "nhie" ],
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        let ctg = args.join(" ") || "pg13";
        let nhies = require("../../raw/nhie.json").find(e => e.type.toLowerCase().includes(ctg.toLowerCase()));
        if(!nhies) return message.channel.send({
            embeds: [new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`No such category!`)]
        });
        if((nhies.type == "nsfw") && !message.channel.nsfw) return message.channel.send({
            embeds: [new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`This channel is not NSFW! 🔞`)]
        });
        message.channel.send({
            embeds: [new MessageEmbed()
            .setAuthor("Never have I-", client.user.displayAvatarURL())
            .setDescription(`** Never have I ever ${nhies.item[Math.floor(Math.random() * nhies.item.length)]}**`)
            .setFooter(`Requested by :${message.author.tag} || Type: ${nhies.type}`)
            .setColor(client.embedColor)]
        });
 }
}
