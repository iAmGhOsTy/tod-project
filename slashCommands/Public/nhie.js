const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "nhie",
    description: "never have i ever",
    options: [
        {
            name: "type",
            description: "maturity of the question",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "NSFW",
                    value: "nsfw"
                },
                {
                    name: "PG13",
                    value: "pg13"
                },
                {
                    name: "Casual",
                    value: "normal"
                }
            ]
        }
    ],


    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });

        let ctg = interaction.options.getString("type") || "normal";
        let nhies = require("../../raw/nhie.json").find(e => e.type.toLowerCase().includes(ctg.toLowerCase()));
        if (!nhies) return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`No such category!`)]
        });
        if ((nhies.type == "nsfw") && !interaction.channel.nsfw) return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`This channel is not NSFW! 🔞`)]
        });
        interaction.followUp({
            embeds: [new MessageEmbed()
                .setAuthor("Never have I-", client.user.displayAvatarURL())
                .setDescription(`** Never have I ever ${nhies.item[Math.floor(Math.random() * nhies.item.length)]}**`)
                .setFooter(`Requested by :${interaction.member.user.username} || Type: ${nhies.type}`)
                .setColor(client.embedColor)]
        });

    }
}